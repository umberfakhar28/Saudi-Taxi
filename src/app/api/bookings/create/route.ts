import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

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
 */

const REQUIRED_FIELDS = [
    'customer_name', 'customer_phone', 'service_type',
    'pickup_location', 'dropoff_location', 'travel_date', 'travel_time',
] as const;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const missing = REQUIRED_FIELDS.filter((f) => !body?.[f] || String(body[f]).trim() === '');
        if (missing.length > 0) {
            return NextResponse.json({ error: `Missing required field(s): ${missing.join(', ')}` }, { status: 400 });
        }

        const bookingData = {
            customer_id: body.customer_id ?? null,
            customer_name: String(body.customer_name).trim(),
            customer_email: body.customer_email ? String(body.customer_email).trim() : null,
            customer_phone: String(body.customer_phone).trim(),
            service_type: body.service_type,
            pickup_location: body.pickup_location,
            dropoff_location: body.dropoff_location,
            pickup_location_type: body.pickup_location_type ?? 'custom',
            dropoff_location_type: body.dropoff_location_type ?? 'custom',
            travel_date: body.travel_date,
            travel_time: body.travel_time,
            passengers_count: Number.isFinite(Number(body.passengers_count)) ? parseInt(body.passengers_count, 10) : 1,
            special_notes: body.special_notes ?? null,
            car_type: body.car_type ?? null,
            vehicle_slug: body.vehicle_slug ?? null,
            status: 'pending',
        };

        const supabase = createAdminClient();
        const { data: insertedBooking, error: dbError } = await supabase
            .from('bookings')
            .insert([bookingData])
            .select()
            .single();

        if (dbError) {
            // Real technical detail goes to the server log only — the
            // customer-facing message from the caller stays generic/friendly.
            console.error('[BOOKING_SUBMISSION_ERROR]', dbError);
            return NextResponse.json({ error: 'Could not save your booking. Please try again.' }, { status: 500 });
        }

        return NextResponse.json({ id: insertedBooking.id, booking: insertedBooking });
    } catch (error: unknown) {
        console.error('[BOOKING_SUBMISSION_ERROR]', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
