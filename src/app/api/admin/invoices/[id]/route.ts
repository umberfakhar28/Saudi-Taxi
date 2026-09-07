import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { audit, guard, isUuid, badRequest, notFound, serverError } from '@/utils/adminApi';

/**
 * DELETE /api/admin/invoices/:id — Admin only (§9.5).
 *
 * The booking the invoice was raised against is deliberately kept; only its
 * invoice_id pointer is cleared, so the trip stays in the record and can be
 * invoiced again later.
 */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const gate = await guard('invoices.delete');
    if (!gate.ok) return gate.response;

    const { id } = await params;
    if (!isUuid(id)) return badRequest('Invalid invoice id.');

    try {
        const supabase = createAdminClient();

        const { data: invoice, error: readError } = await supabase
            .from('invoices')
            .select('id, invoice_number, booking_id, customer_name')
            .eq('id', id)
            .maybeSingle();
        if (readError) return serverError('invoice lookup failed', readError);
        if (!invoice) return notFound('That invoice no longer exists.');

        // Clear the booking's pointer first. Doing it the other way round
        // would leave the booking referencing a deleted row if the second
        // statement failed.
        if (invoice.booking_id) {
            const { error: unlinkError } = await supabase
                .from('bookings')
                .update({ invoice_id: null })
                .eq('id', invoice.booking_id);
            if (unlinkError) return serverError('could not unlink booking', unlinkError);
        }

        const { error: deleteError } = await supabase.from('invoices').delete().eq('id', id);
        if (deleteError) return serverError('invoice delete failed', deleteError);

        await audit(
            gate.identity,
            'invoice',
            id,
            'deleted',
            `Invoice ${invoice.invoice_number} for ${invoice.customer_name ?? 'unknown customer'} deleted`
        );

        return NextResponse.json({ ok: true });
    } catch (error) {
        return serverError('unexpected failure deleting invoice', error);
    }
}
