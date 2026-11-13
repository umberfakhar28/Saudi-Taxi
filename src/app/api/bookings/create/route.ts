import { NextResponse } from 'next/server';
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
        if (blocked) return NextResponse.json({ error: blocked.error }, { status: blocked.status });

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
            customer_email: text(body.customer_email, MAX_LENGTHS.email) || null,
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

        const { data: insertedBooking, error: dbError } = await supabase
            .from('bookings')
            .insert([bookingData])
            .select()
            .single();

        if (dbError) {
            // Real technical detail goes to the server log only — the
            // customer-facing message from the caller stays generic/friendly.
            console.error('[BOOKING_SUBMISSION_ERROR]', dbError);
            return NextResponse.json({ error: 'save_failed', code: 'save_failed' }, { status: 500 });
        }

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
