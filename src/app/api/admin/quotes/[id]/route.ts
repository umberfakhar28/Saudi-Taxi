import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { audit, guard, isUuid, badRequest, notFound, serverError } from '@/utils/adminApi';

/**
 * DELETE /api/admin/quotes/:id — Admin only (§8.1).
 *
 * A quote may carry a booking_id, either because it was converted into a
 * booking or because it was raised from one ("Create Quote for Customer").
 * The foreign key runs quote -> booking, so deleting the quote never orphans
 * or alters the booking; the link is recorded in the audit entry instead.
 */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const gate = await guard('quotes.delete');
    if (!gate.ok) return gate.response;

    const { id } = await params;
    if (!isUuid(id)) return badRequest('Invalid quote id.');

    try {
        const supabase = createAdminClient();

        const { data: quote, error: readError } = await supabase
            .from('quotes')
            .select('id, customer_name, status, booking_id')
            .eq('id', id)
            .maybeSingle();
        if (readError) return serverError('quote lookup failed', readError);
        if (!quote) return notFound('That quote no longer exists.');

        // The foreign key runs quote -> booking, so removing the quote cannot
        // orphan or alter the booking; only the pricing record is lost. The
        // link is recorded in the audit entry so the history still shows what
        // was removed and from where.
        const { error: deleteError } = await supabase.from('quotes').delete().eq('id', id);
        if (deleteError) return serverError('quote delete failed', deleteError);

        await audit(
            gate.identity,
            'quote',
            id,
            'deleted',
            `Quote for ${quote.customer_name ?? 'unknown customer'} deleted` +
                (quote.booking_id ? ` (was linked to booking ${quote.booking_id})` : '')
        );

        return NextResponse.json({ ok: true });
    } catch (error) {
        return serverError('unexpected failure deleting quote', error);
    }
}
