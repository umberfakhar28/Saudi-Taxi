'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import {
    Search,
    Filter,
    MoreVertical,
    MessageCircle,
    CheckCircle2,
    XCircle,
    Clock,
    RefreshCw,
    ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';

const STATUS_OPTIONS = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const supabase = createClient();

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        let q = supabase
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });
        if (statusFilter !== 'all') q = q.eq('status', statusFilter);
        const { data, error } = await q;
        if (!error) setBookings(data ?? []);
        setLoading(false);
    }, [statusFilter]);

    useEffect(() => { fetchBookings(); }, [fetchBookings]);

    const updateStatus = async (id: string, newStatus: string) => {
        await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
        
        if (newStatus === 'confirmed') {
            await fetch('/api/emails/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'booking_confirmed', bookingId: id }),
            });
        }
        
        if (newStatus === 'completed') {
            const booking = bookings.find(b => b.id === id);
            if (booking) {
                // Generate Invoice
                const invoiceNumber = `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
                await supabase.from('invoices').insert({
                    invoice_number: invoiceNumber,
                    booking_id: booking.id,
                    customer_name: booking.customer_name,
                    customer_email: booking.customer_email,
                    customer_phone: booking.customer_phone,
                    pickup_location: booking.pickup_location,
                    dropoff_location: booking.dropoff_location,
                    travel_date: booking.travel_date,
                    service_type: booking.service_type,
                    subtotal: booking.quote_amount || 0,
                    total_amount: booking.quote_amount || 0,
                    status: 'unpaid',
                    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
                });
            }
        }
        
        fetchBookings();
    };

    const filtered = bookings.filter(b =>
        b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        b.customer_phone.includes(search) ||
        b.pickup_location.toLowerCase().includes(search.toLowerCase()) ||
        b.service_type.toLowerCase().includes(search.toLowerCase())
    );

    const statusClass = (s: string) =>
        ({ pending: 'badge-pending', confirmed: 'badge-confirmed', completed: 'badge-completed', cancelled: 'badge-cancelled' } as Record<string, string>)[s] ?? 'badge-pending';

    const counts = STATUS_OPTIONS.reduce((acc, s) => {
        acc[s] = s === 'all' ? bookings.length : bookings.filter(b => b.status === s).length;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div>
            {/* Title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Bookings</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>All customer ride requests in one place.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={fetchBookings} className="admin-btn-secondary">
                        <RefreshCw size={15} /> Refresh
                    </button>
                    <a href="/book-online" target="_blank" className="admin-btn-primary">
                        <ExternalLink size={15} /> New Booking
                    </a>
                </div>
            </div>

            {/* Status tab pills */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                {STATUS_OPTIONS.map(s => (
                    <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        style={{
                            padding: '0.45rem 1rem',
                            borderRadius: 9999,
                            border: '1.5px solid',
                            borderColor: statusFilter === s ? '#fbbf24' : '#e2e8f0',
                            background: statusFilter === s ? '#fffbeb' : '#fff',
                            color: statusFilter === s ? '#92400e' : '#64748b',
                            fontWeight: statusFilter === s ? 700 : 500,
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                        }}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                        <span style={{
                            background: statusFilter === s ? '#fbbf24' : '#f1f5f9',
                            color: statusFilter === s ? '#0f172a' : '#64748b',
                            borderRadius: 9999, padding: '0 0.4rem', fontSize: '0.72rem', fontWeight: 700
                        }}>{counts[s]}</span>
                    </button>
                ))}
            </div>

            {/* Search bar */}
            <div className="admin-filter-bar">
                <div className="admin-search-wrap">
                    <Search size={16} className="admin-search-icon" />
                    <input
                        type="text"
                        className="admin-search-input"
                        placeholder="Search by name, phone, location, or service..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    <Filter size={14} />
                    {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Table */}
            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Trip</th>
                            <th>Service</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading bookings…</td></tr>
                        ) : filtered.length > 0 ? filtered.map(b => (
                            <tr key={b.id}>
                                <td>
                                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{b.customer_name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>{b.customer_email}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: 1 }}>{b.customer_phone}</div>
                                </td>
                                <td style={{ minWidth: 180 }}>
                                    <div style={{ fontSize: '0.82rem' }}><span style={{ color: '#10b981', fontWeight: 700 }}>↑</span> {b.pickup_location}</div>
                                    <div style={{ fontSize: '0.82rem', marginTop: 3 }}><span style={{ color: '#f43f5e', fontWeight: 700 }}>↓</span> {b.dropoff_location}</div>
                                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 3 }}>{b.passengers_count} passenger{b.passengers_count > 1 ? 's' : ''}</div>
                                </td>
                                <td>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6366f1' }}>{b.service_type}</span>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                                        {format(new Date(b.travel_date), 'dd MMM yyyy')}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
                                        <Clock size={11} /> {b.travel_time}
                                    </div>
                                </td>
                                <td>
                                    <span className={statusClass(b.status)}>
                                        {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                                        {b.status === 'pending' && (
                                            <button
                                                className="admin-icon-btn success"
                                                title="Confirm booking"
                                                onClick={() => updateStatus(b.id, 'confirmed')}
                                            >
                                                <CheckCircle2 size={15} />
                                            </button>
                                        )}
                                        {b.status === 'confirmed' && (
                                            <button
                                                className="admin-icon-btn success"
                                                title="Mark as completed"
                                                onClick={() => updateStatus(b.id, 'completed')}
                                            >
                                                ✓
                                            </button>
                                        )}
                                        <button
                                            className="admin-icon-btn"
                                            title="WhatsApp customer"
                                            onClick={() => window.open(`https://wa.me/${b.customer_phone.replace(/\D/g, '')}`, '_blank')}
                                        >
                                            <MessageCircle size={15} />
                                        </button>
                                        {b.status !== 'cancelled' && (
                                            <button
                                                className="admin-icon-btn danger"
                                                title="Cancel booking"
                                                onClick={() => { if (confirm('Cancel this booking?')) updateStatus(b.id, 'cancelled'); }}
                                            >
                                                <XCircle size={15} />
                                            </button>
                                        )}
                                        <button className="admin-icon-btn">
                                            <MoreVertical size={15} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                                    No bookings match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
