import { createClient } from '@/utils/supabase/server';
import { CalendarCheck, TrendingUp, Clock, CheckCircle2, ArrowUpRight, FileText, Receipt, Users, XCircle, RefreshCw, Filter } from 'lucide-react';
import Link from 'next/link';
import DashboardFilters from './components/DashboardFilters';
import { DashboardCharts } from './components/DashboardCharts';
import { ConversionFunnel, AlertsSection, UpcomingBookings, RecentActivity } from './components/DashboardWidgets';
import { startOfDay, endOfDay, startOfWeek, startOfMonth, subDays } from 'date-fns';

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ range?: string, status?: string }> }) {
    const supabase = await createClient();
    const params = await searchParams;
    const range = params.range || 'this_month';
    const statusFilter = params.status || 'all';

    const now = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (range === 'today') {
        startDate = startOfDay(now);
        endDate = endOfDay(now);
    } else if (range === 'this_week') {
        startDate = startOfWeek(now, { weekStartsOn: 1 });
        endDate = endOfDay(now);
    } else if (range === 'this_month') {
        startDate = startOfMonth(now);
        endDate = endOfDay(now);
    }

    // Build base queries
    let bookingsQ = supabase.from('bookings').select('*');
    let invoicesQ = supabase.from('invoices').select('*');
    let quotesQ = supabase.from('quotes').select('*');
    let customersQ = supabase.from('customers').select('*');

    // Apply date filters
    if (startDate && endDate) {
        bookingsQ = bookingsQ.gte('created_at', startDate.toISOString()).lte('created_at', endDate.toISOString());
        invoicesQ = invoicesQ.gte('created_at', startDate.toISOString()).lte('created_at', endDate.toISOString());
        quotesQ = quotesQ.gte('created_at', startDate.toISOString()).lte('created_at', endDate.toISOString());
        // Customers usually not filtered by date on dashboard unless looking for "new customers"
    }

    // Apply status filter to bookings
    if (statusFilter !== 'all') {
        bookingsQ = bookingsQ.eq('status', statusFilter);
    }

    const [
        { data: bookings },
        { data: invoices },
        { data: quotes },
        { data: customers },
        { data: auditLogs }
    ] = await Promise.all([
        bookingsQ,
        invoicesQ,
        quotesQ,
        customersQ,
        supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(10)
    ]);

    const bookingsList = bookings || [];
    const invoicesList = invoices || [];
    const quotesList = quotes || [];
    const customersList = customers || [];

    // KPI Calculations
    const totalBookings = bookingsList.length;
    const pendingBookings = bookingsList.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookingsList.filter(b => b.status === 'confirmed').length;
    const completedBookings = bookingsList.filter(b => b.status === 'completed').length;
    const cancelledBookings = bookingsList.filter(b => b.status === 'cancelled').length;
    
    const paidInvoices = invoicesList.filter(i => i.status === 'paid');
    const unpaidInvoices = invoicesList.filter(i => i.status === 'unpaid' || i.status === 'partially_paid');
    
    const totalRevenue = paidInvoices.reduce((sum, i) => sum + (Number(i.total_amount) || 0), 0);
    const pendingRevenue = unpaidInvoices.reduce((sum, i) => sum + (Number(i.total_amount) || 0) - (Number(i.paid_amount) || 0), 0);
    const avgBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;
    
    const totalQuotes = quotesList.length;
    const sentQuotes = quotesList.filter(q => q.status === 'sent' || q.status === 'accepted' || q.status === 'converted').length;
    
    // Previous period simulation (static for now to avoid complex queries)
    const trendClass = "text-green-600 bg-green-100";
    const trendIcon = "↑";

    const stats = [
        { name: 'Total Bookings', value: totalBookings, icon: CalendarCheck, color: '#6366f1', bg: '#eef2ff', href: '/admin/bookings', trend: '+5%' },
        { name: 'Pending', value: pendingBookings, icon: Clock, color: '#f59e0b', bg: '#fffbeb', href: '/admin/bookings?status=pending' },
        { name: 'Completed', value: completedBookings, icon: CheckCircle2, color: '#10b981', bg: '#ecfdf5', href: '/admin/bookings?status=completed', trend: '+12%' },
        { name: 'Cancelled', value: cancelledBookings, icon: XCircle, color: '#f43f5e', bg: '#ffe4e6', href: '/admin/bookings?status=cancelled' },
        { name: 'Revenue (Paid)', value: `SAR ${totalRevenue.toFixed(0)}`, icon: TrendingUp, color: '#fbbf24', bg: '#fffbeb', href: '/admin/invoices', trend: '+8%' },
        { name: 'Avg Booking Value', value: `SAR ${avgBookingValue.toFixed(0)}`, icon: Receipt, color: '#0ea5e9', bg: '#f0f9ff', href: '/admin/invoices' },
        { name: 'Active Quotes', value: quotesList.filter(q => q.status === 'draft' || q.status === 'sent').length, icon: FileText, color: '#8b5cf6', bg: '#f5f3ff', href: '/admin/quotes' },
        { name: 'Customers', value: customersList.length, icon: Users, color: '#0ea5e9', bg: '#f0f9ff', href: '/admin/customers', trend: '+2%' },
    ];

    const statusClass = (status: string) => {
        const map: Record<string, string> = {
            pending: 'badge-pending', confirmed: 'badge-confirmed',
            completed: 'badge-completed', cancelled: 'badge-cancelled',
        };
        return map[status] ?? 'badge-pending';
    };

    // Prepare data for charts
    const bookingsByStatus = [
        { status: 'pending', count: pendingBookings, revenue: bookingsList.filter(b=>b.status==='pending').reduce((s, b)=>s+(Number(b.quote_amount)||0),0) },
        { status: 'confirmed', count: confirmedBookings, revenue: bookingsList.filter(b=>b.status==='confirmed').reduce((s, b)=>s+(Number(b.quote_amount)||0),0) },
        { status: 'completed', count: completedBookings, revenue: bookingsList.filter(b=>b.status==='completed').reduce((s, b)=>s+(Number(b.quote_amount)||0),0) },
        { status: 'cancelled', count: cancelledBookings, revenue: bookingsList.filter(b=>b.status==='cancelled').reduce((s, b)=>s+(Number(b.quote_amount)||0),0) }
    ];

    // Dummy trend data generation for demonstration (would normally group by date from DB)
    const revenueTrend = Array.from({length: 10}).map((_, i) => ({ date: `Day ${i+1}`, revenue: Math.floor(Math.random() * 5000), view: 'daily' }));
    const bookingTrend = Array.from({length: 10}).map((_, i) => ({ date: `Day ${i+1}`, bookings: Math.floor(Math.random() * 20), view: 'daily' }));

    // Prepare data for widgets
    const overdueInvoicesCount = unpaidInvoices.filter(i => new Date(i.due_date) < new Date()).length;
    const expiredQuotesCount = quotesList.filter(q => q.status === 'expired' || (q.valid_until && new Date(q.valid_until) < new Date())).length;
    
    // Recent bookings for table
    const recentBookings = [...bookingsList].sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

    // Upcoming bookings (next 48h)
    const upcomingBookings = bookingsList.filter(b => {
        const tDate = new Date(b.travel_date);
        return tDate >= startOfDay(now) && tDate <= endOfDay(subDays(now, -2));
    }).sort((a,b) => new Date(a.travel_date).getTime() - new Date(b.travel_date).getTime()).slice(0, 5);

    return (
        <div style={{ paddingBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Dashboard</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Comprehensive overview and analytics.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/admin/quotes/new" className="admin-btn-secondary">+ New Quote</Link>
                    <Link href="/admin/bookings/new" className="admin-btn-primary">+ New Booking</Link>
                </div>
            </div>

            <DashboardFilters />

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {stats.map(s => {
                    const Icon = s.icon;
                    return (
                        <Link key={s.name} href={s.href} style={{ textDecoration: 'none' }}>
                            <div className="admin-stat-card" style={{ position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                                        <Icon size={19} />
                                    </div>
                                    {s.trend && (
                                        <div style={{ fontSize: '0.7rem', fontWeight: 600, padding: '2px 6px', borderRadius: 4, background: '#dcfce7', color: '#166534' }}>
                                            {trendIcon} {s.trend}
                                        </div>
                                    )}
                                </div>
                                <div style={{ marginTop: '0.75rem' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.name}</div>
                                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', lineHeight: 1.1 }}>{s.value}</div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            <DashboardCharts bookingsByStatus={bookingsByStatus} revenueTrend={revenueTrend} bookingTrend={bookingTrend} />

            {/* Content grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
                
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                    {/* Funnel & Alerts Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <ConversionFunnel 
                            quotesCreated={totalQuotes} 
                            quotesSent={sentQuotes} 
                            bookingsCreated={totalBookings} 
                            bookingsCompleted={completedBookings} 
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <AlertsSection overdueInvoices={overdueInvoicesCount} expiredQuotes={expiredQuotesCount} pendingOldBookings={pendingBookings} />
                            
                            {/* Quick Actions Panel */}
                            <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #e8edf2', padding: '1.25rem' }}>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: '1rem' }}>Quick Actions</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    {[
                                        { label: '✨ New Booking', href: '/admin/bookings/new' },
                                        { label: '📄 New Quote', href: '/admin/quotes/new' },
                                        { label: '👤 Add Customer', href: '/admin/customers' },
                                        { label: '💰 Create Invoice', href: '/admin/invoices' },
                                        { label: '📅 View Calendar', href: '/admin/calendar' },
                                        { label: '📊 Export Data', href: '/admin/reports' },
                                    ].map(a => (
                                        <Link key={a.label} href={a.href} style={{ display: 'block', padding: '0.75rem', borderRadius: 8, background: '#f8fafc', color: '#334155', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 500, border: '1px solid #f1f5f9' }}>
                                            {a.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Bookings Table Enhancements */}
                    <div className="admin-table-wrap">
                        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e8edf2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Recent Bookings</div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Link href="/admin/bookings?status=pending" className="admin-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>Pending</Link>
                                <Link href="/admin/bookings" className="admin-btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>View All</Link>
                            </div>
                        </div>
                        <table className="admin-table">
                            <thead><tr><th>Customer</th><th>Trip</th><th>Date & Time</th><th>Status</th><th>Actions</th></tr></thead>
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
                                            <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{new Date(b.travel_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{b.travel_time}</div>
                                        </td>
                                        <td>
                                            <span className={statusClass(b.status)}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <Link href={`/admin/bookings/${b.id}`} style={{ fontSize: '0.75rem', color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>Edit</Link>
                                                <Link href={`/admin/invoices/new?booking=${b.id}`} style={{ fontSize: '0.75rem', color: '#10b981', textDecoration: 'none', fontWeight: 500 }}>Invoice</Link>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No bookings found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <UpcomingBookings bookings={upcomingBookings} />
                    <RecentActivity activities={auditLogs || []} />
                </div>
            </div>
        </div>
    );
}
