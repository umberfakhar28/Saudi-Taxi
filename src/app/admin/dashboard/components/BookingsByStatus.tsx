'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatMoney, type CurrencyCode } from '@/lib/currency';
import Tooltip from '@/components/admin/Tooltip';

export interface StatusDatum {
    status: string;
    count: number;
    /** Revenue kept separate per currency — see the note below. */
    revenueByCurrency: Record<string, number>;
}

/**
 * Status colours are the portal's existing ones, unchanged. They were run
 * through the palette validator: all four pass the lightness band, chroma
 * floor and CVD separation checks. The contrast check warns that amber and
 * green sit below 3:1 on white, which obliges visible labels rather than
 * colour alone — every row here is directly labelled with its status name
 * and its count, so identity never depends on the colour.
 */
const STATUS_COLORS: Record<string, string> = {
    pending: '#f59e0b',
    confirmed: '#10b981',
    completed: '#6366f1',
    cancelled: '#f43f5e',
};

const STATUS_HELP: Record<string, string> = {
    pending: 'Received but not yet confirmed with the customer.',
    confirmed: 'Confirmed with the customer; the trip has not happened yet.',
    completed: 'The trip has been carried out.',
    cancelled: 'Called off — kept for the record, and excluded from revenue.',
};

/**
 * Bookings by status.
 *
 * This was a donut with no labels and no numbers, which is the wrong form
 * for the job: reading a count per category means comparing magnitudes, and
 * angles are the hardest encoding to read a number from. A labelled
 * horizontal bar shows the count directly, keeps a zero-count status visible
 * as a real row rather than a missing slice, and matches the funnel widget
 * already on this dashboard.
 */
export function BookingsByStatus({ data }: { data: StatusDatum[] }) {
    const [view, setView] = useState<'count' | 'revenue'>('count');

    // Only offer currencies that actually appear in the data.
    const currenciesPresent = Array.from(
        new Set(data.flatMap((d) => Object.keys(d.revenueByCurrency).filter((c) => d.revenueByCurrency[c] > 0)))
    ).sort();
    const [currency, setCurrency] = useState<string>(currenciesPresent[0] ?? 'SAR');
    const activeCurrency = currenciesPresent.includes(currency) ? currency : (currenciesPresent[0] ?? 'SAR');

    const valueOf = (d: StatusDatum) =>
        view === 'count' ? d.count : (d.revenueByCurrency[activeCurrency] ?? 0);

    const total = data.reduce((sum, d) => sum + valueOf(d), 0);
    const max = Math.max(...data.map(valueOf), 1);
    const totalBookings = data.reduce((sum, d) => sum + d.count, 0);

    return (
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 14, border: '1px solid #e8edf2', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>Bookings by Status</div>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {view === 'revenue' && currenciesPresent.length > 1 && (
                        <select
                            value={activeCurrency}
                            onChange={(e) => setCurrency(e.target.value)}
                            aria-label="Currency"
                            style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', borderRadius: 4, border: '1px solid #cbd5e1' }}
                        >
                            {currenciesPresent.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    )}
                    <select
                        value={view}
                        onChange={(e) => setView(e.target.value as 'count' | 'revenue')}
                        aria-label="Show count or revenue"
                        style={{ fontSize: '0.75rem', padding: '0.2rem 0.4rem', borderRadius: 4, border: '1px solid #cbd5e1' }}
                    >
                        <option value="count">Count</option>
                        <option value="revenue">Revenue</option>
                    </select>
                </div>
            </div>

            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>
                {view === 'count'
                    ? `${totalBookings} booking${totalBookings === 1 ? '' : 's'} in total`
                    : `${formatMoney(total, activeCurrency)} across all statuses`}
            </div>

            {totalBookings === 0 ? (
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 180, textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', padding: '1rem' }}>
                    No bookings yet. Statuses will appear here as soon as the first booking comes in.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {data.map((d) => {
                        const value = valueOf(d);
                        const color = STATUS_COLORS[d.status] ?? '#94a3b8';
                        const share = totalBookings > 0 ? Math.round((d.count / totalBookings) * 100) : 0;
                        const label = d.status.charAt(0).toUpperCase() + d.status.slice(1);
                        return (
                            <Link
                                key={d.status}
                                href={`/admin/bookings?status=${d.status}`}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
                            >
                                <div style={{ width: 92, display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: color, flexShrink: 0 }} />
                                    <span style={{ fontSize: '0.8rem', color: '#334155', fontWeight: 500 }}>{label}</span>
                                </div>

                                <Tooltip
                                    label={`${label} — ${d.count}`}
                                    text={`${STATUS_HELP[d.status] ?? ''} ${share}% of all bookings.`}
                                >
                                    <div style={{ flex: 1, height: 22, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden', minWidth: 40, width: '100%' }}>
                                        <div
                                            style={{
                                                width: `${max > 0 ? (value / max) * 100 : 0}%`,
                                                height: '100%',
                                                background: color,
                                                borderRadius: 4,
                                                transition: 'width 0.4s ease',
                                            }}
                                        />
                                    </div>
                                </Tooltip>

                                <div style={{ minWidth: view === 'count' ? 34 : 92, textAlign: 'right', fontWeight: 700, fontSize: '0.85rem', color: value === 0 ? '#94a3b8' : '#0f172a', flexShrink: 0 }}>
                                    {view === 'count' ? d.count : formatMoney(value, activeCurrency)}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Currencies are never summed together: there is no exchange rate in
                this system, and inventing one would misstate real money. */}
            {view === 'revenue' && currenciesPresent.length > 1 && (
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.85rem', lineHeight: 1.4 }}>
                    Bookings exist in {currenciesPresent.join(', ')}. Each currency is totalled separately —
                    switch above to see the others.
                </div>
            )}
        </div>
    );
}
