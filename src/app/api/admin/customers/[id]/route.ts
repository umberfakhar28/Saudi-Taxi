import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { audit, guard, isUuid, badRequest, notFound, serverError } from '@/utils/adminApi';

/**
 * PATCH  /api/admin/customers/:id — Manager and up (§10.2)
 * DELETE /api/admin/customers/:id — Admin only (§10.1)
 *
 * Deletion is SOFT, and that is a deliberate data-integrity decision rather
 * than a shortcut. bookings.customer_id references customers, and bookings,
 * quotes and invoices each keep their own copy of the customer's name, phone
 * and email at the time of the trip. A hard delete would either cascade away
 * real booking history or leave dangling references, and would rewrite what
 * an already-issued invoice says. Marking deleted_at hides the customer from
 * the portal while leaving every historical record intact and readable.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const gate = await guard('customers.edit');
    if (!gate.ok) return gate.response;

    const { id } = await params;
    if (!isUuid(id)) return badRequest('Invalid customer id.');

    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return badRequest('Expected a JSON body.');
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';

    if (!name) return badRequest('A customer name is required.');
    if (email && !EMAIL_RE.test(email)) return badRequest('That email address is not valid.');
    if (!phone && !email) return badRequest('Give at least a phone number or an email address.');

    // Only these fields are writable. Totals (total_bookings, total_spent)
    // are derived from real activity and must not be editable by hand.
    const patch: Record<string, unknown> = {
        name,
        email: email || null,
        phone: phone || null,
    };
    if (typeof body.notes === 'string') patch.notes = body.notes.trim() || null;
    if (typeof body.is_vip === 'boolean') patch.is_vip = body.is_vip;

    try {
        const supabase = createAdminClient();
        const { data, error } = await supabase
            .from('customers')
            .update(patch)
            .eq('id', id)
            .select('id, name, email, phone, notes, is_vip')
            .maybeSingle();
        if (error) return serverError('customer update failed', error);
        if (!data) return notFound('That customer no longer exists.');

        await audit(gate.identity, 'customer', id, 'updated', `Customer ${name} updated`);
        return NextResponse.json({ ok: true, customer: data });
    } catch (error) {
        return serverError('unexpected failure updating customer', error);
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const gate = await guard('customers.delete');
    if (!gate.ok) return gate.response;

    const { id } = await params;
    if (!isUuid(id)) return badRequest('Invalid customer id.');

    try {
        const supabase = createAdminClient();

        const { data: customer, error: readError } = await supabase
            .from('customers')
            .select('id, name')
            .eq('id', id)
            .maybeSingle();
        if (readError) return serverError('customer lookup failed', readError);
        if (!customer) return notFound('That customer no longer exists.');

        // Reported back so the UI can tell the admin exactly what is being
        // preserved rather than making them guess.
        const { count: bookingCount } = await supabase
            .from('bookings')
            .select('id', { count: 'exact', head: true })
            .eq('customer_id', id);

        const { error: deleteError } = await supabase
            .from('customers')
            .update({ deleted_at: new Date().toISOString() })
            .eq('id', id);

        if (deleteError) {
            // The column only exists once supabase/sql/002 has been applied.
            if (/deleted_at/i.test(deleteError.message ?? '')) {
                return NextResponse.json(
                    {
                        error:
                            'Customer deletion needs the 002 migration (supabase/sql/002_roles_currency_soft_delete.sql) ' +
                            'to be run first. It adds the column that lets a customer be removed without destroying their booking history.',
                    },
                    { status: 503 }
                );
            }
            return serverError('customer soft delete failed', deleteError);
        }

        await audit(
            gate.identity,
            'customer',
            id,
            'deleted',
            `Customer ${customer.name} removed (${bookingCount ?? 0} booking(s) kept)`
        );

        return NextResponse.json({ ok: true, bookingsPreserved: bookingCount ?? 0 });
    } catch (error) {
        return serverError('unexpected failure deleting customer', error);
    }
}
