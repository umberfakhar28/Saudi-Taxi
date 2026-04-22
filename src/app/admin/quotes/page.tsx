'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Search, Plus, Filter, FileText, CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { formatSAR } from '@/utils/pricing';

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
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
                    <button className="admin-btn-primary">
                        <Plus size={15} /> New Quote
                    </button>
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
                                        <button className="admin-icon-btn" title="View details"><FileText size={15} /></button>
                                        {q.status === 'draft' && (
                                            <button className="admin-icon-btn success" title="Mark as Sent"><CheckCircle size={15} /></button>
                                        )}
                                        {q.status === 'sent' && (
                                            <button className="admin-icon-btn success" title="Mark as Accepted"><CheckCircle size={15} /></button>
                                        )}
                                        {q.status !== 'expired' && q.status !== 'converted' && (
                                            <button className="admin-icon-btn danger" title="Mark as Expired"><XCircle size={15} /></button>
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
        </div>
    );
}
