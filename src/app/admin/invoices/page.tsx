'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Search, Filter, RefreshCw, FileText, Download } from 'lucide-react';
import { format } from 'date-fns';
import { formatSAR } from '@/utils/pricing';

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const supabase = createClient();

    const fetchInvoices = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('invoices')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) setInvoices(data ?? []);
        setLoading(false);
    }, []);

    useEffect(() => { fetchInvoices(); }, [fetchInvoices]);

    const statusClass = (s: string) => {
        const map: Record<string, string> = {
            unpaid: 'badge-pending',
            paid: 'badge-confirmed',
            partially_paid: 'badge-completed',
        };
        return map[s] ?? 'badge-pending';
    };

    const filtered = invoices.filter(i =>
        i.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        i.invoice_number.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                    <h1 className="admin-page-title">Invoices</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>Track payments and generate bills.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={fetchInvoices} className="admin-btn-secondary">
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
                        placeholder="Search by invoice # or customer..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    <Filter size={14} />
                    {filtered.length} invoices
                </div>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Date Issued</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading invoices...</td></tr>
                        ) : filtered.length > 0 ? filtered.map(inv => (
                            <tr key={inv.id}>
                                <td>
                                    <div style={{ fontWeight: 700, color: '#1e293b' }}>{inv.invoice_number}</div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 600, color: '#1e293b' }}>{inv.customer_name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{inv.customer_email}</div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{formatSAR(inv.total_amount)}</div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.85rem' }}>{format(new Date(inv.created_at), 'dd MMM yyyy')}</div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.85rem', color: inv.status === 'unpaid' && new Date(inv.due_date) < new Date() ? '#ef4444' : 'inherit' }}>
                                        {inv.due_date ? format(new Date(inv.due_date), 'dd MMM yyyy') : 'N/A'}
                                    </div>
                                </td>
                                <td>
                                    <span className={statusClass(inv.status)}>
                                        {inv.status.replace('_', ' ').charAt(0).toUpperCase() + inv.status.replace('_', ' ').slice(1)}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                                        <button className="admin-icon-btn" title="View Details"><FileText size={15} /></button>
                                        <button className="admin-icon-btn" title="Download PDF"><Download size={15} /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No invoices found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
