import { createClient } from '@/utils/supabase/server';
import { CalendarCheck, TrendingUp, Clock, CheckCircle2, ArrowUpRight, FileText, Receipt, Users } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
    const supabase = await createClient();

    const [
        { count: totalBookings },
        { count: pendingBookings },
        { count: confirmedBookings },
        { count: completedBookings },
        { count: cancelledBookings },
        { data: recentBookings },
        { data: revenue },
        { count: totalQuotes },
        { count: unpaidInvoices },
        { count: totalCustomers },
    ] = await Promise.all([
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'confirmed'),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'cancelled'),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('invoices').select('total_amount, status'),
        supabase.from('quotes').select('*', { count: 'exact', head: true }),
        supabase.from('invoices').select('*', { count: 'exact', head: true }).eq('status', 'unpaid'),
        supabase.from('customers').select('*', { count: 'exact', head: true }),
    ]);

    const totalRevenue = (revenue ?? []).filter(i => i.status === 'paid').reduce((s: number, i: any) => s + (i.total_amount || 0), 0);
    const pendingRevenue = (revenue ?? []).filter(i => i.status === 'unpaid').reduce((s: number, i: any) => s + (i.total_amount || 0), 0);

    const stats = [
        { name: 'Total Bookings', value: totalBookings ?? 0, icon: CalendarCheck, color: '#6366f1', bg: '#eef2ff', href: '/admin/bookings' },
        { name: 'Pending', value: pendingBookings ?? 0, icon: Clock, color: '#f59e0b', bg: '#fffbeb', href: '/admin/bookings?status=pending' },
        { name: 'Completed', value: completedBookings ?? 0, icon: CheckCircle2, color: '#10b981', bg: '#ecfdf5', href: '/admin/bookings?status=completed' },
        { name: 'Revenue (Paid)', value: `SAR ${totalRevenue.toFixed(0)}`, icon: TrendingUp, color: '#fbbf24', bg: '#fffbeb', href: '/admin/invoices' },
        { name: 'Active Quotes', value: totalQuotes ?? 0, icon: FileText, color: '#8b5cf6', bg: '#f5f3ff', href: '/admin/quotes' },
        { name: 'Unpaid Invoices', value: unpaidInvoices ?? 0, icon: Receipt, color: '#ef4444', bg: '#fef2f2', href: '/admin/invoices' },
        { name: 'Customers', value: totalCustomers ?? 0, icon: Users, color: '#0ea5e9', bg: '#f0f9ff', href: '/admin/customers' },
        { name: 'Pending Revenue', value: `SAR ${pendingRevenue.toFixed(0)}`, icon: TrendingUp, color: '#f59e0b', bg: '#fffbeb', href: '/admin/invoices' },
    ];

    const statusClass = (status: string) => {
        const map: Record<string, string> = {
            pending: 'badge-pending', confirmed: 'badge-confirmed',
            completed: 'badge-completed', cancelled: 'badge-cancelled',
        };
        return map[status] ?? 'badge-pending';
    };

    // Build pie chart data
    const total = (pendingBookings ?? 0) + (confirmedBookings ?? 0) + (completedBookings ?? 0) + (cancelledBookings ?? 0) || 1;
    const slices = [
        { label: 'Pending', count: pendingBookings ?? 0, color: '#f59e0b' },
        { label: 'Confirmed', count: confirmedBookings ?? 0, color: '#10b981' },
        { label: 'Completed', count: completedBookings ?? 0, color: '#6366f1' },
        { label: 'Cancelled', count: cancelledBookings ?? 0, color: '#f43f5e' },
    ];

    // Build SVG pie chart
    let cumulative = 0;
    const pieSegments = slices.map(s => {
        const pct = s.count / total;
        const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
        cumulative += pct;
        const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;
        const r = 50; const cx = 60; const cy = 60;
        const x1 = cx + r * Math.cos(startAngle); const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle); const y2 = cy + r * Math.sin(endAngle);
        const large = pct > 0.5 ? 1 : 0;
        return { ...s, pct, d: `M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${large},1 ${x2.toFixed(1)},${y2.toFixed(1)} Z` };
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Dashboard</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Live overview of your business.</p>
                </div>
                <Link href="/admin/quotes/new" className="admin-btn-primary">+ New Quote</Link>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {stats.map(s => {
                    const Icon = s.icon;
                    return (
                        <Link key={s.name} href={s.href} style={{ textDecoration: 'none' }}>
                            <div className="admin-stat-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                                        <Icon size={19} />
                                    </div>
                                    <ArrowUpRight size={14} color="#cbd5e1" />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{s.name}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', lineHeight: 1.1 }}>{s.value}</div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Content grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
                {/* Recent Bookings */}
                <div className="admin-table-wrap">
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e8edf2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Recent Bookings</div>
                        <Link href="/admin/bookings" className="admin-btn-secondary" style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem' }}>View All</Link>
                    </div>
                    <table className="admin-table">
                        <thead><tr><th>Customer</th><th>Trip</th><th>Date</th><th>Status</th></tr></thead>
                        <tbody>
                            {recentBookings && recentBookings.length > 0 ? recentBookings.map(b => (
                                <tr key={b.id}>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{b.customer_name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{b.customer_phone}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.8rem' }}><span style={{ color: '#10b981', fontWeight: 600 }}>↑</span> {b.pickup_location}</div>
                                        <div style={{ fontSize: '0.8rem', marginTop: 2 }}><span style={{ color: '#f43f5e', fontWeight: 600 }}>↓</span> {b.dropoff_location}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{new Date(b.travel_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{b.travel_time}</div>
                                    </td>
                                    <td><span className={statusClass(b.status)}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span></td>
                                </tr>
                            )) : (
                                <tr><td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No bookings yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Side panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Pie Chart */}
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf2', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '1rem' }}>Bookings by Status</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                {total > 0 && pieSegments.filter(s => s.count > 0).map((s, i) => (
                                    <path key={i} d={s.d} fill={s.color} stroke="#fff" strokeWidth="2" />
                                ))}
                                {total === 1 && <circle cx="60" cy="60" r="50" fill="#e2e8f0" />}
                                <circle cx="60" cy="60" r="30" fill="#fff" />
                                <text x="60" y="55" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">{totalBookings ?? 0}</text>
                                <text x="60" y="68" textAnchor="middle" fontSize="8" fill="#94a3b8">TOTAL</text>
                            </svg>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                                {slices.map(s => (
                                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.75rem', color: '#475569', flex: 1 }}>{s.label}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0f172a' }}>{s.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf2', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.875rem' }}>Quick Actions</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {[
                                { label: '📋 Pending Bookings', href: '/admin/bookings' },
                                { label: '📄 Create New Quote', href: '/admin/quotes/new' },
                                { label: '💰 View Invoices', href: '/admin/invoices' },
                                { label: '⚡ Automation Rules', href: '/admin/automation' },
                                { label: '📊 Export Reports', href: '/admin/reports' },
                                { label: '🌐 Open Website', href: '/' },
                            ].map(a => (
                                <Link key={a.label} href={a.href} style={{ display: 'block', padding: '0.6rem 0.8rem', borderRadius: 8, background: '#f8fafc', color: '#334155', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500, transition: 'background 0.15s' }}>
                                    {a.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
