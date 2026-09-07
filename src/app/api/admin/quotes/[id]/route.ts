import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { audit, guard, isUuid, badRequest, notFound, serverError } from '@/utils/adminApi';

/**
 * DELETE /api/admin/quotes/:id — Admin only (§8.1).
 *
 * A quote that has already been converted into a booking is refused rather
 * than silently removed: the booking references it, and deleting it would
 * erase how that booking was priced.
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

        if (quote.booking_id) {
            return NextResponse.json(
                {
                    error:
                        'This quote has been converted into a booking, so it cannot be deleted. ' +
                        'Delete the booking first if you really need to remove it.',
                },
                { status: 409 }
            );
        }

        const { error: deleteError } = await supabase.from('quotes').delete().eq('id', id);
        if (deleteError) return serverError('quote delete failed', deleteError);

        await audit(
            gate.identity,
            'quote',
            id,
            'deleted',
            `Quote for ${quote.customer_name ?? 'unknown customer'} deleted`
        );

        return NextResponse.json({ ok: true });
    } catch (error) {
        return serverError('unexpected failure deleting quote', error);
    }
}
