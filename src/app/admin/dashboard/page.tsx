import {
    CalendarCheck,
    TrendingUp,
    Users,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    CheckCircle2
} from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function AdminDashboard() {
    const supabase = await createClient();

    const { count: totalBookings } = await supabase
        .from('bookings').select('*', { count: 'exact', head: true });

    const { count: pendingBookings } = await supabase
        .from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending');

    const { count: completedBookings } = await supabase
        .from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'completed');

    const { data: recentBookings } = await supabase
        .from('bookings').select('*').order('created_at', { ascending: false }).limit(6);

    const stats = [
        { name: 'Total Bookings', value: totalBookings ?? 0, icon: CalendarCheck, change: '+12%', trend: 'up', color: '#6366f1', bg: '#eef2ff' },
        { name: 'Pending', value: pendingBookings ?? 0, icon: Clock, change: '-3%', trend: 'down', color: '#f59e0b', bg: '#fffbeb' },
        { name: 'Completed', value: completedBookings ?? 0, icon: CheckCircle2, change: '+8%', trend: 'up', color: '#10b981', bg: '#ecfdf5' },
        { name: 'Est. Revenue', value: 'SAR 12,450', icon: TrendingUp, change: '+10%', trend: 'up', color: '#fbbf24', bg: '#fffbeb' },
    ];

    const statusClass = (status: string) => {
        const map: Record<string, string> = {
            pending: 'badge-pending',
            confirmed: 'badge-confirmed',
            completed: 'badge-completed',
            cancelled: 'badge-cancelled',
        };
        return map[status] ?? 'badge-pending';
    };

    return (
        <div>
            {/* Title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Dashboard</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Welcome back — here's what's happening today.</p>
                </div>
                <Link href="/book-online" target="_blank" className="admin-btn-primary">+ New Booking</Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                {stats.map(s => {
                    const Icon = s.icon;
                    return (
                        <div key={s.name} className="admin-stat-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ width: 42, height: 42, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                                    <Icon size={20} />
                                </div>
                                <span style={{
                                    display: 'flex', alignItems: 'center', gap: 2,
                                    fontSize: '0.78rem', fontWeight: 700,
                                    color: s.trend === 'up' ? '#10b981' : '#f43f5e'
                                }}>
                                    {s.change}
                                    {s.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                </span>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{s.name}</div>
                                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', lineHeight: 1.1 }}>{s.value}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Content grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
                {/* Recent Bookings */}
                <div className="admin-table-wrap">
                    <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e8edf2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Recent Bookings</div>
                            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 2 }}>Latest ride requests</div>
                        </div>
                        <Link href="/admin/bookings" className="admin-btn-secondary" style={{ fontSize: '0.78rem', padding: '0.45rem 0.9rem' }}>View All</Link>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Trip</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings && recentBookings.length > 0 ? recentBookings.map(b => (
                                <tr key={b.id}>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{b.customer_name}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{b.customer_phone}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '0.8rem' }}>
                                            <span style={{ color: '#10b981', fontWeight: 600 }}>↑</span> {b.pickup_location}
                                        </div>
                                        <div style={{ fontSize: '0.8rem', marginTop: 2 }}>
                                            <span style={{ color: '#f43f5e', fontWeight: 600 }}>↓</span> {b.dropoff_location}
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{new Date(b.travel_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{b.travel_time}</div>
                                    </td>
                                    <td>
                                        <span className={statusClass(b.status)}>
                                            {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="admin-icon-btn"><MoreHorizontal size={15} /></button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No bookings yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Side panel */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Quick actions */}
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf2', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '1rem' }}>Quick Actions</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {[
                                { label: '📋 View Pending Bookings', href: '/admin/bookings?status=pending' },
                                { label: '🚗 Add New Vehicle', href: '/admin/fleet' },
                                { label: '🌐 Open Website', href: '/', target: '_blank' },
                            ].map(a => (
                                <Link key={a.label} href={a.href} target={a.target} style={{
                                    display: 'block', padding: '0.65rem 0.875rem', borderRadius: 8,
                                    background: '#f8fafc', color: '#334155', textDecoration: 'none',
                                    fontSize: '0.85rem', fontWeight: 500, transition: 'all 0.15s'
                                }}>
                                    {a.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Top Routes */}
                    <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf2', padding: '1.25rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '1rem' }}>Popular Routes</div>
                        {[
                            { route: 'Jeddah → Makkah', count: 45, pct: 80 },
                            { route: 'Makkah → Madinah', count: 32, pct: 57 },
                            { route: 'Airport Transfer', count: 28, pct: 50 },
                            { route: 'Ziyarat Tour', count: 15, pct: 27 },
                        ].map(r => (
                            <div key={r.route} style={{ marginBottom: '0.875rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#334155' }}>{r.route}</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{r.count}</span>
                                </div>
                                <div style={{ height: 5, background: '#f1f5f9', borderRadius: 9999 }}>
                                    <div style={{ height: '100%', width: `${r.pct}%`, background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', borderRadius: 9999 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
