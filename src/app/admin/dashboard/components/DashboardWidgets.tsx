import Link from 'next/link';
import { Clock, AlertTriangle, FileText, Activity, Users, CheckCircle2 } from 'lucide-react';
import { displayTime } from '@/lib/datetime';

export function ConversionFunnel({ quotesCreated, quotesSent, bookingsCreated, bookingsCompleted }: any) {
    const qCreated = quotesCreated || 1; // prevent div by 0
    const sentRate = ((quotesSent / qCreated) * 100).toFixed(0);
    const bookingRate = ((bookingsCreated / Math.max(quotesSent, 1)) * 100).toFixed(0);
    const completeRate = ((bookingsCompleted / Math.max(bookingsCreated, 1)) * 100).toFixed(0);

    return (
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 14, border: '1px solid #e8edf2' }}>
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>Conversion Funnel</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <FunnelStage label="Quotes Created" count={quotesCreated} max={qCreated} color="#94a3b8" />
                <div style={{ paddingLeft: '2rem', fontSize: '0.75rem', color: '#64748b' }}>↳ {sentRate}% Sent</div>
                <FunnelStage label="Quotes Sent" count={quotesSent} max={qCreated} color="#3b82f6" />
                <div style={{ paddingLeft: '2rem', fontSize: '0.75rem', color: '#64748b' }}>↳ {bookingRate}% Converted</div>
                <FunnelStage label="Bookings Created" count={bookingsCreated} max={qCreated} color="#10b981" />
                <div style={{ paddingLeft: '2rem', fontSize: '0.75rem', color: '#64748b' }}>↳ {completeRate}% Completed</div>
                <FunnelStage label="Bookings Completed" count={bookingsCompleted} max={qCreated} color="#6366f1" />
            </div>
        </div>
    );
}

function FunnelStage({ label, count, max, color }: any) {
    const width = `${Math.max((count / max) * 100, 5)}%`;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '120px', fontSize: '0.8rem', color: '#334155', fontWeight: 500 }}>{label}</div>
            <div style={{ flex: 1, height: '24px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width, height: '100%', background: color, transition: 'width 0.5s ease' }} />
            </div>
            <div style={{ width: '40px', textAlign: 'right', fontWeight: 700, fontSize: '0.85rem' }}>{count}</div>
        </div>
    );
}

/**
 * Attention Required.
 *
 * Moved to the very top of the dashboard: it is the only widget that asks
 * the admin to DO something, so sitting below the stat cards and three
 * charts meant the actionable items were the last thing seen. Laid out
 * horizontally to suit a full-width slot, and it now says so when there is
 * nothing to do instead of rendering an empty red box.
 */
export function AlertsSection({ overdueInvoices, expiredQuotes, pendingOldBookings }: any) {
    const items = [
        {
            label: 'Overdue Invoices',
            count: Number(overdueInvoices) || 0,
            href: '/admin/invoices?status=unpaid',
            help: 'Invoices past their due date with payment still outstanding.',
        },
        {
            label: 'Expired Quotes',
            count: Number(expiredQuotes) || 0,
            href: '/admin/quotes?status=expired',
            help: 'Quotes whose validity window passed without being accepted.',
        },
        {
            label: 'Pending Bookings',
            count: Number(pendingOldBookings) || 0,
            href: '/admin/bookings?status=pending',
            help: 'Bookings the customer has not yet been told are confirmed.',
        },
    ];

    const actionable = items.filter((i) => i.count > 0);

    if (actionable.length === 0) {
        return (
            <div style={{ background: '#f0fdf4', padding: '1rem 1.25rem', borderRadius: 14, border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <div>
                    <div style={{ fontWeight: 700, color: '#166534', fontSize: '0.92rem' }}>Nothing needs attention</div>
                    <div style={{ fontSize: '0.78rem', color: '#15803d', marginTop: 1 }}>
                        No overdue invoices, expired quotes or unconfirmed bookings.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: '#fef2f2', padding: '1.25rem', borderRadius: 14, border: '1px solid #fecaca', marginBottom: '2rem' }}>
            <div style={{ fontWeight: 700, color: '#991b1b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} /> Attention Required
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {actionable.map((item) => (
                    <AlertItem key={item.label} label={item.label} count={item.count} href={item.href} help={item.help} />
                ))}
            </div>
        </div>
    );
}

function AlertItem({ label, count, href, help }: any) {
    if (!count) return null;
    return (
        <Link href={href} title={help} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.9rem', background: '#fff', borderRadius: 8, textDecoration: 'none', border: '1px solid #fee2e2' }}>
            <span style={{ color: '#7f1d1d', fontSize: '0.85rem', fontWeight: 500 }}>{label}</span>
            <span style={{ background: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: '0.75rem', fontWeight: 700 }}>{count}</span>
        </Link>
    );
}

export function UpcomingBookings({ bookings }: { bookings: any[] }) {
    if (!bookings || bookings.length === 0) {
        return (
            <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 14, border: '1px solid #e8edf2' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Upcoming Bookings</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No upcoming bookings in the next 48 hours.</div>
            </div>
        );
    }
    
    return (
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 14, border: '1px solid #e8edf2' }}>
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Upcoming (Next 48h)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {bookings.map((b) => (
                    <Link key={b.id} href={`/admin/bookings?edit=${b.id}`} style={{ display: 'block', textDecoration: 'none', border: '1px solid #f1f5f9', padding: '0.875rem', borderRadius: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>{b.customer_name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 600 }}>{displayTime(b.travel_time)}</div>
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Clock size={14} /> {new Date(b.travel_date).toLocaleDateString()}
                        </div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#475569' }}>
                            <span style={{ color: '#10b981' }}>↑</span> {b.pickup_location} <br/>
                            <span style={{ color: '#f43f5e' }}>↓</span> {b.dropoff_location}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function RecentActivity({ activities }: { activities: any[] }) {
    return (
        <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 14, border: '1px solid #e8edf2' }}>
            <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} /> Recent Activity
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activities.length > 0 ? activities.map((a, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', marginTop: 6 }} />
                        <div>
                            <div style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>{a.description}</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>{new Date(a.created_at).toLocaleString()}</div>
                        </div>
                    </div>
                )) : (
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>No recent activity.</div>
                )}
            </div>
        </div>
    );
}
