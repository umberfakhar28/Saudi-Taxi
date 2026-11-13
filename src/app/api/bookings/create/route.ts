import { NextResponse, after } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { guardPublicRequest } from '@/lib/antiSpam';
import {
    validateBookingPayload,
    MAX_LENGTHS,
    PASSENGERS_MIN,
    PASSENGERS_MAX,
    PASSENGERS_MAX_ENQUIRY,
    DESTINATION_ENQUIRY_SERVICE,
} from '@/lib/bookingValidation';
import { toAsciiDigits } from '@/lib/digits';
import { notifyNewBooking } from '@/lib/bookingNotify';

/** Bookings one phone number or email address may make in 10 minutes. */
const SAME_CUSTOMER_LIMIT = 5;
const SAME_CUSTOMER_WINDOW_MS = 10 * 60 * 1000;

/**
 * Creates a `bookings` row. Public booking forms (Book Online, the
 * destination enquiry form) used to call `supabase.from('bookings').insert()`
 * directly from the browser with the anon client — the `bookings` table's
 * RLS policy blocks anonymous inserts (confirmed against the live project:
 * Postgres error 42501, "new row violates row-level security policy for
 * table bookings"), so every public submission failed at the database step.
 * The generic "Something went wrong" message came from the frontend catch
 * block's `error instanceof Error` check being false for a raw
 * PostgrestError object, silently swallowing the real reason.
 *
 * Fix: route the insert through this server-side endpoint using the
 * service-role admin client — the same pattern every other write to this
 * table already uses (see /api/customers/upsert, /api/emails/send,
 * /api/health, and the authenticated /admin panel).
 *
 * Validation lives in src/lib/bookingValidation.ts and is shared with the
 * form. This endpoint used to check only that the required fields were
 * non-empty, which let "abc" through as a phone number, accepted past
 * travel dates, took any string at all as `service_type`, and put no
 * ceiling on free text. Browser validation is not validation: anything can
 * POST here, so this side decides.
 *
 * Errors are returned as stable codes, not sentences. The Arabic booking
 * page surfaced this endpoint's English strings verbatim, so the customer-
 * facing wording now lives in i18n.ts and the response only says which rule
 * failed.
 */

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Spam guard: honeypot, per-IP ceiling, and the Turnstile pass the
        // browser obtained at /api/antispam/verify. Skipped entirely while
        // TURNSTILE_SECRET_KEY is unset — see src/lib/antiSpam.ts.
        const blocked = guardPublicRequest(req, body, { bucket: 'booking', limit: 10 });
        if (blocked) {
            // A code the form can translate, like every other refusal here.
            const code = blocked.status === 429 ? 'too_many' : 'request_rejected';
            return NextResponse.json({ error: blocked.error, code }, { status: blocked.status });
        }

        const invalid = validateBookingPayload(body);
        if (invalid) {
            return NextResponse.json({ error: invalid, code: invalid }, { status: 400 });
        }

        const text = (v: unknown, max: number): string => String(v ?? '').trim().slice(0, max);
        // ASCII digits in storage, so customer matching and wa.me links work
        // for a number typed on an Arabic keyboard.
        const phone = toAsciiDigits(text(body.customer_phone, MAX_LENGTHS.phone));
        const serviceType = String(body.service_type).trim();
        // The destination enquiry form allows group sizes the booking form's
        // own 1-10 select does not; clamp to whichever ceiling applies.
        const passengerCeiling = serviceType === DESTINATION_ENQUIRY_SERVICE
            ? PASSENGERS_MAX_ENQUIRY
            : PASSENGERS_MAX;

        const supabase = createAdminClient();
        const email = text(body.customer_email, MAX_LENGTHS.email);

        /**
         * Database-backed limit per customer. The per-IP limit above lives in
         * one server instance's memory, so it resets on every cold start and
         * is not shared between instances; this count is. Five requests in ten
         * minutes from one phone or one address is not a person booking.
         */
        const since = new Date(Date.now() - SAME_CUSTOMER_WINDOW_MS).toISOString();
        const recentFor = async (column: 'customer_phone' | 'customer_email', value: string) => {
            const { count, error } = await supabase
                .from('bookings')
                .select('id', { count: 'exact', head: true })
                .eq(column, value)
                .gte('created_at', since);
            if (error) console.error('[BOOKING_LIMIT_CHECK]', error);
            return count ?? 0;
        };
        if ((await recentFor('customer_phone', phone)) >= SAME_CUSTOMER_LIMIT
            || (email && (await recentFor('customer_email', email)) >= SAME_CUSTOMER_LIMIT)) {
            return NextResponse.json({ error: 'too_many', code: 'too_many' }, { status: 429 });
        }

        /**
         * Resolve the customer link server-side instead of trusting the id
         * the browser sent.
         *
         * The audit found `customer_id: body.customer_id ?? null` written
         * straight through, so a crafted POST carrying someone else's
         * customer uuid would have attached this booking to that customer's
         * record. The phone number is already the dedupe key that
         * /api/customers/upsert uses, and `customer_phone` is NOT NULL on
         * this table, so the association can be looked up here from data
         * this request is entitled to supply.
         *
         * A client-supplied id is honoured only when it matches the row that
         * this phone number resolves to; otherwise the lookup wins. Nothing
         * is created or modified here — /api/customers/upsert owns writing
         * to `customers`, and still runs first — so a failed lookup simply
         * leaves the booking unlinked rather than failing the booking.
         */
        let customerId: string | null = null;
        const { data: customerRow, error: customerLookupError } = await supabase
            .from('customers')
            .select('id')
            .eq('phone', phone)
            .maybeSingle();
        if (customerLookupError) {
            // Not fatal: the booking itself carries name, phone and email, so
            // an unlinked row is recoverable. Logged, never surfaced.
            console.error('[BOOKING_CUSTOMER_LOOKUP]', customerLookupError);
        } else if (customerRow?.id) {
            customerId = customerRow.id;
        }

        const bookingData = {
            customer_id: customerId,
            customer_name: text(body.customer_name, MAX_LENGTHS.name),
            customer_email: email || null,
            customer_phone: phone,
            service_type: serviceType,
            pickup_location: text(body.pickup_location, MAX_LENGTHS.location),
            dropoff_location: text(body.dropoff_location, MAX_LENGTHS.location),
            // Only the two values the form actually produces; anything else
            // from a crafted request falls back to 'custom'.
            pickup_location_type: body.pickup_location_type === 'suggested' ? 'suggested' : 'custom',
            dropoff_location_type: body.dropoff_location_type === 'suggested' ? 'suggested' : 'custom',
            travel_date: String(body.travel_date).trim(),
            travel_time: String(body.travel_time).trim(),
            passengers_count: Math.min(passengerCeiling, Math.max(PASSENGERS_MIN, parseInt(String(body.passengers_count), 10) || PASSENGERS_MIN)),
            special_notes: text(body.special_notes, MAX_LENGTHS.notes) || null,
            car_type: text(body.car_type, MAX_LENGTHS.vehicle) || null,
            vehicle_slug: text(body.vehicle_slug, MAX_LENGTHS.vehicle) || null,
            status: 'pending',
        };

        // The language the customer booked in, so their emails follow it.
        const locale = body.locale === 'ar' ? 'ar' : 'en';

        let { data: insertedBooking, error: dbError } = await supabase
            .from('bookings')
            .insert([{ ...bookingData, locale }])
            .select()
            .single();

        // supabase/sql/009 adds bookings.locale. Until it has been run, save
        // without it rather than lose the booking; the booking-received email
        // still goes out in the right language from the value in hand.
        if (dbError && /locale/i.test(dbError.message ?? '')) {
            console.warn('[BOOKING] bookings.locale is missing — run supabase/sql/009_booking_locale.sql. Saving without it.');
            ({ data: insertedBooking, error: dbError } = await supabase
                .from('bookings')
                .insert([bookingData])
                .select()
                .single());
            if (insertedBooking) insertedBooking = { ...insertedBooking, locale };
        }

        if (dbError) {
            // Real technical detail goes to the server log only — the
            // customer-facing message from the caller stays generic/friendly.
            console.error('[BOOKING_SUBMISSION_ERROR]', dbError);
            return NextResponse.json({ error: 'save_failed', code: 'save_failed' }, { status: 500 });
        }

        // Admin alert and emails, after the response has gone: the customer's
        // browser has no part in it any more, so a closed tab can no longer
        // leave a booking that nobody was told about. after() keeps the
        // function alive until this finishes (waitUntil on Vercel).
        const saved = insertedBooking;
        after(async () => {
            try {
                await notifyNewBooking(createAdminClient(), saved);
            } catch (err) {
                console.error('[BOOKING_NOTIFY]', err);
            }
        });

        return NextResponse.json({ id: insertedBooking.id, booking: insertedBooking });
    } catch (error: unknown) {
        // The outer catch used to return `error.message` to the browser,
        // which could carry internal detail from an unexpected failure
        // (a malformed body, a client construction error). Logged in full,
        // reported as a code.
        console.error('[BOOKING_SUBMISSION_ERROR]', error);
        return NextResponse.json({ error: 'save_failed', code: 'save_failed' }, { status: 500 });
    }
}
