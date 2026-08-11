'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Search, Plus, Filter, FileText, CheckCircle, XCircle, Clock, RefreshCw, Send, X } from 'lucide-react';
import { format } from 'date-fns';
import { formatSAR } from '@/utils/pricing';
import Link from 'next/link';

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [viewModal, setViewModal] = useState<any | null>(null);
    const supabase = createClient();

    const fetchQuotes = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('quotes')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) setQuotes(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchQuotes(); }, [fetchQuotes]);

    const logActivity = useCallback((entityId: string | null, action: string, description: string) => {
        fetch('/api/admin/audit-log', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entityType: 'quote', entityId, action, description }),
        }).catch(() => { /* non-critical */ });
    }, []);

    const statusClass = (s: string) => {
        const map: Record<string, string> = {
            draft: 'badge-pending',
            sent: 'badge-completed',
            accepted: 'badge-confirmed',
            expired: 'badge-cancelled',
            converted: 'badge-confirmed'
        };
        return map[s] ?? 'badge-pending';
    };

    // "Mark as Sent" used to just flip a status column — the customer never
    // actually received anything (Admin Portal audit §8). This now sends
    // the real quote_sent email first and only persists the status change
    // once Resend confirms delivery, so "Sent" in the table always means a
    // quote genuinely went out.
    const markAsSent = async (q: any) => {
        setActionLoading(q.id);
        try {
            const validUntil = new Date();
            validUntil.setHours(validUntil.getHours() + 24);
            const emailRes = await fetch('/api/emails/send', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'quote_sent', quoteData: { ...q, valid_until: validUntil.toISOString() } }),
            });
            if (!emailRes.ok) {
                const e = await emailRes.json().catch(() => ({}));
                throw new Error(e.error || 'Failed to send quote email');
            }
            const { error } = await supabase.from('quotes').update({ status: 'sent', valid_until: validUntil.toISOString() }).eq('id', q.id);
            if (error) throw new Error(error.message);
            setQuotes(prev => prev.map(x => x.id === q.id ? { ...x, status: 'sent', valid_until: validUntil.toISOString() } : x));
            logActivity(q.id, 'quote_sent', `Quote sent to ${q.customer_name} (${q.customer_email})`);
        } catch (err: any) {
            alert('Could not send quote to customer: ' + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const updateStatus = async (q: any, status: 'accepted' | 'expired') => {
        setActionLoading(q.id);
        try {
            const { error } = await supabase.from('quotes').update({ status }).eq('id', q.id);
            if (error) throw new Error(error.message);
            setQuotes(prev => prev.map(x => x.id === q.id ? { ...x, status } : x));
            logActivity(q.id, 'status_changed', `Quote for ${q.customer_name} marked ${status}`);
        } catch (err: any) {
            alert('Error updating quote: ' + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const filtered = quotes.filter(q =>
        q.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        q.pickup_location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Quotes</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Manage price quotes for customers.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={fetchQuotes} className="admin-btn-secondary">
                        <RefreshCw size={15} /> Refresh
                    </button>
                    <Link href="/admin/quotes/new" className="admin-btn-primary">
                        <Plus size={15} /> New Quote
                    </Link>
                </div>
            </div>

            <div className="admin-filter-bar">
                <div className="admin-search-wrap">
                    <Search size={16} className="admin-search-icon" />
                    <input
                        type="text"
                        className="admin-search-input"
                        placeholder="Search by customer name or location..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    <Filter size={14} />
                    {filtered.length} quotes
                </div>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Trip Info</th>
                            <th>Pricing</th>
                            <th>Date generated</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading quotes...</td></tr>
                        ) : filtered.length > 0 ? filtered.map(q => (
                            <tr key={q.id}>
                                <td>
                                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{q.customer_name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 2 }}>{q.customer_email}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{q.customer_phone}</div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.8rem' }}><span style={{ color: '#10b981' }}>↑</span> {q.pickup_location}</div>
                                    <div style={{ fontSize: '0.8rem', marginTop: 3 }}><span style={{ color: '#f43f5e' }}>↓</span> {q.dropoff_location}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: 4 }}>
                                        {q.vehicle_type} • {q.distance_km} km
                                    </div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{formatSAR(q.admin_override_amount ?? q.total_amount)}</div>
                                    {q.admin_override_amount && (
                                        <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 600 }}>Edited</div>
                                    )}
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.82rem', fontWeight: 500 }}>{format(new Date(q.created_at), 'dd MMM yyyy, HH:mm')}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
                                        <Clock size={11} /> Expires: {q.valid_until ? format(new Date(q.valid_until), 'dd MMM HH:mm') : 'N/A'}
                                    </div>
                                </td>
                                <td>
                                    <span className={statusClass(q.status)}>
                                        {q.status.charAt(0).toUpperCase() + q.status.slice(1)}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                                        <button className="admin-icon-btn" title="View details" onClick={() => setViewModal(q)}>
                                            <FileText size={15} />
                                        </button>
                                        {q.status === 'draft' && (
                                            <button className="admin-icon-btn success" title="Send to customer & mark as Sent" disabled={actionLoading === q.id} onClick={() => markAsSent(q)}>
                                                {actionLoading === q.id ? <RefreshCw size={15} /> : <Send size={15} />}
                                            </button>
                                        )}
                                        {q.status === 'sent' && (
                                            <button className="admin-icon-btn success" title="Mark as Accepted" disabled={actionLoading === q.id} onClick={() => updateStatus(q, 'accepted')}>
                                                <CheckCircle size={15} />
                                            </button>
                                        )}
                                        {q.status !== 'expired' && q.status !== 'converted' && q.status !== 'accepted' && (
                                            <button className="admin-icon-btn danger" title="Mark as Expired" disabled={actionLoading === q.id} onClick={() => updateStatus(q, 'expired')}>
                                                <XCircle size={15} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No quotes found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {viewModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setViewModal(null)}>
                    <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, maxWidth: 480, width: '100%', maxHeight: '85vh', overflowY: 'auto' }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a' }}>Quote Details</div>
                            <button onClick={() => setViewModal(null)} className="admin-icon-btn"><X size={16} /></button>
                        </div>
                        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                            <Row label="Status"><span className={statusClass(viewModal.status)}>{viewModal.status.charAt(0).toUpperCase() + viewModal.status.slice(1)}</span></Row>
                            <Row label="Customer">{viewModal.customer_name}</Row>
                            <Row label="Email">{viewModal.customer_email || '—'}</Row>
                            <Row label="Phone">{viewModal.customer_phone || '—'}</Row>
                            <Row label="From">{viewModal.pickup_location}</Row>
                            <Row label="To">{viewModal.dropoff_location || '—'}</Row>
                            <Row label="Vehicle">{viewModal.vehicle_type}</Row>
                            <Row label="Distance">{viewModal.distance_km} km</Row>
                            <Row label="Travel Date">{viewModal.travel_date || 'TBD'}</Row>
                            <Row label="Travel Time">{viewModal.travel_time || '—'}</Row>
                            <Row label="Passengers">{viewModal.passengers_count || '—'}</Row>
                            <Row label="Calculated Price">{formatSAR(viewModal.total_amount)}</Row>
                            {viewModal.admin_override_amount && <Row label="Final (Override)">{formatSAR(viewModal.admin_override_amount)}</Row>}
                            <Row label="Created">{format(new Date(viewModal.created_at), 'dd MMM yyyy, HH:mm')}</Row>
                            <Row label="Expires">{viewModal.valid_until ? format(new Date(viewModal.valid_until), 'dd MMM yyyy, HH:mm') : 'N/A'}</Row>
                            {viewModal.notes && <Row label="Notes">{viewModal.notes}</Row>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', paddingBottom: '0.6rem', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ color: '#94a3b8', fontWeight: 500 }}>{label}</span>
            <span style={{ color: '#1e293b', fontWeight: 600, textAlign: 'right' }}>{children}</span>
        </div>
    );
}
