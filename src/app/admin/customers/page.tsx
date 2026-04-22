'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Search, Filter, User, Mail, Phone, Calendar as CalendarIcon, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { formatSAR } from '@/utils/pricing';

export default function CustomersPage() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const supabase = createClient();

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .order('total_bookings', { ascending: false });
        if (!error) setCustomers(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

    const filtered = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
        (c.phone && c.phone.includes(search))
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Customers</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Manage client profiles and booking history.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={fetchCustomers} className="admin-btn-secondary">
                        <RefreshCw size={15} /> Refresh
                    </button>
                </div>
            </div>

            <div className="admin-filter-bar">
                <div className="admin-search-wrap">
                    <Search size={16} className="admin-search-icon" />
                    <input
                        type="text"
                        className="admin-search-input"
                        placeholder="Search by name, email, or phone..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    <Filter size={14} />
                    {filtered.length} customers
                </div>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Customer Profile</th>
                            <th>Contact Info</th>
                            <th>Total Bookings</th>
                            <th>Total Spent</th>
                            <th>Last Booking</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading customers...</td></tr>
                        ) : filtered.length > 0 ? filtered.map(c => (
                            <tr key={c.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, color: '#1e293b' }}>{c.name}</div>
                                            {c.is_vip && <span style={{ fontSize: '0.65rem', background: '#fef3c7', color: '#d97706', padding: '0.1rem 0.4rem', borderRadius: 4, fontWeight: 700 }}>VIP</span>}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {c.email && <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={12} /> {c.email}</div>}
                                    {c.phone && <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}><Phone size={12} /> {c.phone}</div>}
                                </td>
                                <td>
                                    <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{c.total_bookings}</div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#10b981' }}>{formatSAR(c.total_spent)}</div>
                                </td>
                                <td>
                                    {c.last_booking_date ? (
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <CalendarIcon size={12} /> {format(new Date(c.last_booking_date), 'dd MMM yyyy')}
                                        </div>
                                    ) : <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>No bookings</span>}
                                </td>
                                <td>
                                    {c.total_bookings > 5 ? (
                                        <span className="badge-confirmed">Loyal</span>
                                    ) : c.total_bookings > 0 ? (
                                        <span className="badge-completed">Active</span>
                                    ) : (
                                        <span className="badge-pending">New</span>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No customers found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
