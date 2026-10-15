import { displayDate, displayTime } from '@/lib/datetime';
import { formatMoney } from '@/lib/currency';

/**
 * Quote helpers shared by the Quotes page and the Bookings page, which can
 * now raise and track a quote without leaving the booking row. They lived
 * inside the Quotes page until the second caller appeared; one copy means
 * the two pages can't drift on what a quote says or what it is worth.
 */

/** Quotes have no number column of their own, so the id gives a stable ref. */
export function quoteRef(q: QuoteRecord | null | undefined): string {
    return `Q-${String(q?.id ?? '').slice(0, 8).toUpperCase()}`;
}

/**
 * The price being offered. New quotes store it in total_amount; quotes made
 * before the calculator was removed may carry an admin override, which wins.
 */
export function quoteTotal(q: QuoteRecord | null | undefined): number {
    return Number(q?.admin_override_amount ?? q?.total_amount ?? 0);
}

/** The shape these helpers read. Everything is optional: the admin tables
 * hand over raw rows, and a quote may be half-filled while being drafted. */
export interface QuoteRecord {
    id?: string | null;
    status?: string | null;
    shared_at?: string | null;
    created_at?: string | null;
    customer_email?: string | null;
    customer_phone?: string | null;
    passengers_count?: number | null;
    booking_id?: string | null;
    customer_name?: string | null;
    pickup_location?: string | null;
    dropoff_location?: string | null;
    vehicle_type?: string | null;
    travel_date?: string | null;
    travel_time?: string | null;
    currency?: string | null;
    admin_note?: string | null;
    notes?: string | null;
    admin_override_amount?: number | null;
    total_amount?: number | null;
}

/** The message a customer receives when a quote is shared with them. */
export function quoteSummary(q: QuoteRecord): string {
    return [
        `Gulf Trip Service — Quotation ${quoteRef(q)}`,
        '',
        `Customer: ${q.customer_name}`,
        `From: ${q.pickup_location}`,
        q.dropoff_location ? `To: ${q.dropoff_location}` : '',
        q.vehicle_type ? `Vehicle: ${q.vehicle_type}` : '',
        q.travel_date ? `Date: ${displayDate(q.travel_date)}${q.travel_time ? ` at ${displayTime(q.travel_time)}` : ''}` : '',
        `Price: ${formatMoney(quoteTotal(q), q.currency)}`,
        q.admin_note ? `\n${q.admin_note}` : '',
        q.notes ? `\nYour trip requirements: ${q.notes}` : '',
        '',
        'Reply to confirm and we will hold the vehicle for you.',
    ].filter(Boolean).join('\n');
}

/**
 * How a quote reads on the booking it belongs to.
 *
 * "Shared" is the state the Quotes page has no word for: the price was given
 * to the customer directly (WhatsApp, in person) rather than emailed through
 * the system. It is a draft with a shared_at stamp — the status column itself
 * is untouched, so the Quotes page and the database constraint still agree.
 */
export type BookingQuoteState = 'none' | 'draft' | 'shared' | 'sent' | 'accepted' | 'expired' | 'converted';

export function bookingQuoteState(q: QuoteRecord | null | undefined): BookingQuoteState {
    if (!q) return 'none';
    const status = String(q.status ?? 'draft');
    if (status === 'draft') return q.shared_at ? 'shared' : 'draft';
    if (status === 'sent' || status === 'accepted' || status === 'expired' || status === 'converted') return status;
    return 'draft';
}

export const QUOTE_STATE_LABEL: Record<BookingQuoteState, string> = {
    none: 'No quote',
    draft: 'Draft',
    shared: 'Shared',
    sent: 'Sent',
    accepted: 'Accepted',
    expired: 'Expired',
    converted: 'Converted',
};

/** Badge colours, matching the tone the admin tables already use. */
export const QUOTE_STATE_STYLE: Record<BookingQuoteState, { bg: string; fg: string }> = {
    none: { bg: '#f1f5f9', fg: '#94a3b8' },
    draft: { bg: '#f1f5f9', fg: '#475569' },
    shared: { bg: '#e0f2fe', fg: '#0369a1' },
    sent: { bg: '#dcfce7', fg: '#166534' },
    accepted: { bg: '#dcfce7', fg: '#15803d' },
    expired: { bg: '#fee2e2', fg: '#b91c1c' },
    converted: { bg: '#ede9fe', fg: '#6d28d9' },
};

/** The quote that represents a booking: the most recent one raised for it. */
export function latestQuote(quotes: QuoteRecord[] | null | undefined): QuoteRecord | null {
    if (!quotes || quotes.length === 0) return null;
    return [...quotes].sort((a, b) => String(b.created_at ?? '').localeCompare(String(a.created_at ?? '')))[0];
}
