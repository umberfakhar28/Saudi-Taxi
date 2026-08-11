import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

/**
 * Creates or updates the `customers` record tied to a booking (Admin Portal
 * audit §Customers / §10 — the table existed with a full read UI but nothing
 * ever wrote to it). Called by every booking-creation path (public
 * /book-online, destination enquiries, admin "New Booking") right before the
 * `bookings` insert, so the returned `customerId` can be stored as a proper
 * foreign key on the booking rather than re-derived later by fuzzy matching.
 *
 * Dedupe key is `phone` (bookings.customer_phone is NOT NULL, so it's always
 * present, and it's the more stable identity for a transport service than
 * email). Uses the service-role client — bypasses RLS so this works
 * identically whether called from the public site or the admin panel.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const name = (body?.name ?? '').trim();
        const email = (body?.email ?? '').trim() || null;
        const phone = (body?.phone ?? '').trim();

        if (!name || !phone) {
            return NextResponse.json({ error: 'name and phone are required' }, { status: 400 });
        }

        const supabase = createAdminClient();
        const today = new Date().toISOString().slice(0, 10);

        const { data: existing, error: findError } = await supabase
            .from('customers')
            .select('id, name, email, total_bookings')
            .eq('phone', phone)
            .maybeSingle();

        if (findError) {
            return NextResponse.json({ error: findError.message }, { status: 500 });
        }

        if (existing) {
            const { error: updateError } = await supabase
                .from('customers')
                .update({
                    // Keep the existing name/email unless this booking supplied
                    // something and the record didn't have one yet — a returning
                    // customer's established profile shouldn't be silently
                    // overwritten by a typo on a later booking.
                    name: existing.name || name,
                    email: existing.email || email,
                    total_bookings: (existing.total_bookings || 0) + 1,
                    last_booking_date: today,
                })
                .eq('id', existing.id);

            if (updateError) {
                return NextResponse.json({ error: updateError.message }, { status: 500 });
            }
            return NextResponse.json({ customerId: existing.id, created: false });
        }

        const { data: created, error: insertError } = await supabase
            .from('customers')
            .insert({ name, email, phone, total_bookings: 1, last_booking_date: today })
            .select('id')
            .single();

        if (insertError) {
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        return NextResponse.json({ customerId: created.id, created: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
