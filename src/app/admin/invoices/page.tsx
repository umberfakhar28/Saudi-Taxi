'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Search, Filter, RefreshCw, FileText, Download, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { formatSAR } from '@/utils/pricing';
import Link from 'next/link';

/**
 * Invoices list.
 *
 * `?id=<invoice id>` (item 17 — the invoice tag on a Bookings row links
 * here) selects that invoice: its row is highlighted and scrolled into view,
 * with a one-click "Open" bar above the table.
 */
function InvoicesPageInner() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const supabase = createClient();
    const searchParams = useSearchParams();
    const selectedId = searchParams.get('id');
    const selectedRow = useRef<HTMLTableRowElement | null>(null);

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

    // Bring the selected invoice into view once the list has rendered.
    useEffect(() => {
        if (!loading && selectedId && selectedRow.current) {
            selectedRow.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    }, [loading, selectedId]);

    const statusClass = (s: string) => {
        const map: Record<string, string> = {
            unpaid: 'badge-unpaid',
            paid: 'badge-paid',
            partially_paid: 'badge-completed',
        };
        return map[s] ?? 'badge-unpaid';
    };

    const filtered = invoices.filter(i =>
        i.id === selectedId ||
        i.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        i.invoice_number.toLowerCase().includes(search.toLowerCase())
    );
    const selected = selectedId ? invoices.find((i) => i.id === selectedId) : null;

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

            {selected && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', background: 'var(--adm-gold-tint)', border: '1px solid var(--adm-gold)', borderRadius: 12, padding: '0.75rem 1rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--adm-ink)' }}>
                        Selected: <strong style={{ fontFamily: 'monospace' }}>{selected.invoice_number}</strong> · {selected.customer_name}
                    </div>
                    <Link href={`/admin/invoices/${selected.id}`} className="admin-btn-primary" style={{ padding: '0.45rem 0.9rem' }}>
                        Open invoice <ArrowRight size={14} />
                    </Link>
                </div>
            )}

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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--adm-faint)', fontSize: '0.8rem' }}>
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
                            <tr><td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: 'var(--adm-faint)' }}>Loading invoices...</td></tr>
                        ) : filtered.length > 0 ? filtered.map(inv => {
                            const isSelected = inv.id === selectedId;
                            return (
                            <tr
                                key={inv.id}
                                ref={isSelected ? selectedRow : undefined}
                                aria-selected={isSelected || undefined}
                                style={isSelected ? { background: 'var(--adm-gold-tint)', boxShadow: 'inset 4px 0 0 var(--adm-gold)' } : undefined}
                            >
                                <td>
                                    <div style={{ fontWeight: 700, color: 'var(--adm-ink)' }}>{inv.invoice_number}</div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 600, color: 'var(--adm-ink)' }}>{inv.customer_name}</div>
                                    {/* Email is optional; the phone is what the row
                                        is actually traced by, so it stands in. */}
                                    <div style={{ fontSize: '0.75rem', color: 'var(--adm-muted)' }}>{inv.customer_email || inv.customer_phone || '—'}</div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{formatSAR(inv.total_amount)}</div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.85rem' }}>{format(new Date(inv.created_at), 'dd MMM yyyy')}</div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.85rem', color: inv.status === 'unpaid' && new Date(inv.due_date) < new Date() ? 'var(--adm-danger)' : 'inherit' }}>
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
                                        <Link href={`/admin/invoices/${inv.id}`} className="admin-icon-btn" title="View Details"><FileText size={15} /></Link>
                                        <Link href={`/admin/invoices/${inv.id}`} className="admin-icon-btn" title="Download PDF"><Download size={15} /></Link>
                                    </div>
                                </td>
                            </tr>
                            );
                        }) : (
                            <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--adm-faint)' }}>No invoices found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function InvoicesPage() {
    return (
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: 'var(--adm-faint)' }}>Loading…</div>}>
            <InvoicesPageInner />
        </Suspense>
    );
}
