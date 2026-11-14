'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Search, Filter, User, Mail, Phone, Calendar as CalendarIcon, RefreshCw, Plus, Edit, Trash2, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMoney } from '@/lib/currency';
import { displayDate } from '@/lib/datetime';
import { canWhatsApp, waLinkTo } from '@/lib/whatsapp';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';
import { useFeedback } from '@/components/admin/AdminFeedback';
import Tooltip from '@/components/admin/Tooltip';

/** Item 19: customers are paged on the server, 25 at a time. */
const PAGE_SIZE = 25;
const SORTS = {
    total_bookings: 'Total bookings',
    total_spent: 'Total spent',
    last_booking_date: 'Last booking',
    name: 'Name',
} as const;
type SortKey = keyof typeof SORTS;

/** Search text safe to put inside a PostgREST or() filter. */
const searchTerm = (q: string) => q.trim().replace(/[,()*\\%_]/g, ' ').replace(/\s+/g, ' ').trim();

function CustomersPageInner() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '', is_vip: false });
    // When set, the modal is editing this customer instead of creating one.
    const [editingId, setEditingId] = useState<string | null>(null);
    const [busyId, setBusyId] = useState<string | null>(null);

    const { allowed } = useAdminAuth();
    const { showToast, confirm } = useFeedback();
    const supabase = createClient();
    const searchParams = useSearchParams();
    const router = useRouter();

    // Page, search and sort live in the URL (?page=2&q=ahmed&sort=name&dir=asc),
    // so a page can be bookmarked, shared, and survives a refresh.
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);
    const query = searchParams.get('q') ?? '';
    const sort: SortKey = (searchParams.get('sort') as SortKey) in SORTS ? (searchParams.get('sort') as SortKey) : 'total_bookings';
    const dir: 'asc' | 'desc' = searchParams.get('dir') === 'asc' ? 'asc' : searchParams.get('dir') === 'desc' ? 'desc' : (sort === 'name' ? 'asc' : 'desc');
    const [search, setSearch] = useState(query);
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

    const setParams = useCallback((next: Record<string, string | number | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const [k, v] of Object.entries(next)) {
            if (v === null || v === '' || (k === 'page' && Number(v) === 1)) params.delete(k);
            else params.set(k, String(v));
        }
        const qs = params.toString();
        router.replace(`/admin/customers${qs ? `?${qs}` : ''}`, { scroll: false });
    }, [searchParams, router]);

    // Typing searches the whole table (not just this page), a moment after
    // the last keystroke, and goes back to page 1.
    useEffect(() => {
        if (search === query) return;
        const t = setTimeout(() => setParams({ q: search.trim() || null, page: 1 }), 300);
        return () => clearTimeout(t);
    }, [search, query, setParams]);

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        const from = (page - 1) * PAGE_SIZE;
        const build = (withDeleted: boolean) => {
            let q = supabase.from('customers').select('*', { count: 'exact' });
            // Soft-deleted customers stay in the table (their bookings and
            // invoices reference them) but are hidden here.
            if (withDeleted) q = q.is('deleted_at', null);
            const term = searchTerm(query);
            if (term) q = q.or(`name.ilike.*${term}*,email.ilike.*${term}*,phone.ilike.*${term}*`);
            return q
                .order(sort, { ascending: dir === 'asc', nullsFirst: false })
                .order('id', { ascending: true })
                .range(from, from + PAGE_SIZE - 1);
        };
        let { data, error, count } = await build(true);
        // Before migration 002 the deleted_at column does not exist.
        if (error && /deleted_at/i.test(error.message)) ({ data, error, count } = await build(false));
        if (!error) {
            setCustomers(data ?? []);
            setTotal(count ?? 0);
            // A page past the end (rows removed, or a stale link) goes to the last real page.
            const last = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE));
            if (page > last) setParams({ page: last });
        } else {
            showToast('error', 'Could not load customers: ' + error.message);
        }
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, query, sort, dir]);

    useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

    const sortBy = (key: SortKey) => {
        const nextDir = sort === key ? (dir === 'asc' ? 'desc' : 'asc') : (key === 'name' ? 'asc' : 'desc');
        setParams({ sort: key, dir: nextDir, page: 1 });
    };
    const sortMark = (key: SortKey) => (sort === key ? (dir === 'asc' ? ' ↑' : ' ↓') : '');

    // Deep link from Dashboard's "Add Customer" quick action.
    useEffect(() => {
        if (searchParams.get('new') === '1') {
            setModal(true);
            router.replace('/admin/customers');
        }
    }, [searchParams, router]);

    const openAdd = () => {
        setFormError(null);
        setEditingId(null);
        setForm({ name: '', email: '', phone: '', notes: '', is_vip: false });
        setModal(true);
    };

    // §10.2 — Edit Customer. Pre-populated with the existing values.
    const openEdit = (c: any) => {
        setFormError(null);
        setEditingId(c.id);
        setForm({
            name: c.name ?? '',
            email: c.email ?? '',
            phone: c.phone ?? '',
            notes: c.notes ?? '',
            is_vip: !!c.is_vip,
        });
        setModal(true);
    };

    // §10.1 — Delete Customer. Soft delete through the API, which checks the
    // permission server-side and reports how much history is being kept.
    const deleteCustomer = async (c: any) => {
        const ok = await confirm({
            title: `Remove ${c.name}?`,
            body:
                `${c.name} will no longer appear in the portal. Their ${c.total_bookings || 0} booking(s) and any ` +
                'invoices are kept exactly as they are — removing the customer never rewrites booking history.',
            confirmLabel: 'Remove customer',
        });
        if (!ok) return;
        setBusyId(c.id);
        try {
            const res = await fetch(`/api/admin/customers/${c.id}`, { method: 'DELETE' });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.error || 'The customer could not be removed.');
            fetchCustomers();
            showToast(
                'success',
                json.bookingsPreserved
                    ? `${c.name} removed. ${json.bookingsPreserved} booking(s) kept.`
                    : `${c.name} removed.`
            );
        } catch (err: any) {
            showToast('error', err.message);
        } finally {
            setBusyId(null);
        }
    };

    const messageCustomer = (c: any) => {
        const link = waLinkTo(c.phone, `Hello ${c.name}, this is Gulf Trip Service.`);
        if (!link) { showToast('error', 'This customer has no usable phone number on file.'); return; }
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        if (!form.name.trim()) { setFormError('Name is required.'); return; }
        if (!form.email.trim() && !form.phone.trim()) { setFormError('Provide at least an email or phone number.'); return; }

        setSaving(true);

        // Dedupe by phone the same way the public booking flow does
        // (/api/customers/upsert), so manually-added customers never
        // collide with one created automatically from a real booking. When
        // editing, the customer's own row is obviously not a duplicate.
        if (form.phone.trim()) {
            const { data: existing } = await supabase
                .from('customers')
                .select('id')
                .eq('phone', form.phone.trim())
                .maybeSingle();
            if (existing && existing.id !== editingId) {
                setSaving(false);
                setFormError('A customer with this phone number already exists.');
                return;
            }
        }

        if (editingId) {
            // Edits go through the API so the permission is enforced on the
            // server and the change is written to the audit log. Derived
            // totals are never sent — they come from real activity.
            try {
                const res = await fetch(`/api/admin/customers/${editingId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: form.name.trim(),
                        email: form.email.trim(),
                        phone: form.phone.trim(),
                        notes: form.notes.trim(),
                        is_vip: form.is_vip,
                    }),
                });
                const json = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(json.error || 'The customer could not be saved.');
                showToast('success', `${form.name.trim()} updated.`);
                setModal(false);
                setEditingId(null);
                fetchCustomers();
            } catch (err: any) {
                setFormError(err.message);
            } finally {
                setSaving(false);
            }
            return;
        }

        const { error } = await supabase.from('customers').insert({
            name: form.name.trim(),
            email: form.email.trim() || null,
            phone: form.phone.trim() || null,
            notes: form.notes.trim() || null,
            is_vip: form.is_vip,
            total_bookings: 0, total_spent: 0,
        });
        setSaving(false);
        if (error) { setFormError(error.message); return; }
        showToast('success', `${form.name.trim()} added.`);
        setModal(false);
        fetchCustomers();
    };

    const filtered = customers;
    const firstRow = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
    const lastRow = Math.min(page * PAGE_SIZE, total);
    // Page numbers around the current one, with the first and last always shown.
    const pageNumbers = Array.from(new Set([1, page - 2, page - 1, page, page + 1, page + 2, pageCount]))
        .filter((n) => n >= 1 && n <= pageCount).sort((a, b) => a - b);

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
                    {allowed('customers.edit') && (
                    <button onClick={openAdd} className="admin-btn-primary">
                        <Plus size={15} /> Add Customer
                    </button>
                    )}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--adm-faint)', fontSize: '0.8rem' }}>
                    <Filter size={14} />
                    {total} customer{total === 1 ? '' : 's'}{query ? ' found' : ''}
                </div>
            </div>

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th onClick={() => sortBy('name')} style={{ cursor: 'pointer' }} aria-sort={sort === 'name' ? (dir === 'asc' ? 'ascending' : 'descending') : undefined}>Customer Profile{sortMark('name')}</th>
                            <th>Contact Info</th>
                            <th onClick={() => sortBy('total_bookings')} style={{ cursor: 'pointer' }} aria-sort={sort === 'total_bookings' ? (dir === 'asc' ? 'ascending' : 'descending') : undefined}>Total Bookings{sortMark('total_bookings')}</th>
                            <th onClick={() => sortBy('total_spent')} style={{ cursor: 'pointer' }} aria-sort={sort === 'total_spent' ? (dir === 'asc' ? 'ascending' : 'descending') : undefined}>Total Spent{sortMark('total_spent')}</th>
                            <th onClick={() => sortBy('last_booking_date')} style={{ cursor: 'pointer' }} aria-sort={sort === 'last_booking_date' ? (dir === 'asc' ? 'ascending' : 'descending') : undefined}>Last Booking{sortMark('last_booking_date')}</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: 'var(--adm-faint)' }}>
                                <RefreshCw className="animate-spin" style={{ margin: '0 auto', display: 'block', marginBottom: '0.75rem' }} /> Loading customers…
                            </td></tr>
                        ) : filtered.length > 0 ? filtered.map(c => (
                            <tr key={c.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--adm-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--adm-muted)' }}>
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, color: 'var(--adm-ink)' }}>{c.name}</div>
                                            {c.is_vip && <span style={{ fontSize: '0.65rem', background: 'var(--adm-warning-tint)', color: 'var(--adm-warning)', padding: '0.1rem 0.4rem', borderRadius: 4, fontWeight: 700 }}>VIP</span>}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {c.email && <div style={{ fontSize: '0.75rem', color: 'var(--adm-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={12} /> {c.email}</div>}
                                    {c.phone && <div style={{ fontSize: '0.75rem', color: 'var(--adm-muted)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}><Phone size={12} /> {c.phone}</div>}
                                </td>
                                <td>
                                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--adm-navy)' }}>{c.total_bookings}</div>
                                </td>
                                <td>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--adm-success)' }}>{formatMoney(c.total_spent, 'SAR')}</div>
                                </td>
                                <td>
                                    {c.last_booking_date ? (
                                        <div style={{ fontSize: '0.8rem', color: 'var(--adm-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <CalendarIcon size={12} /> {displayDate(c.last_booking_date)}
                                        </div>
                                    ) : <span style={{ color: 'var(--adm-line-strong)', fontSize: '0.8rem' }}>No bookings</span>}
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
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                        {allowed('comms.send') && canWhatsApp(c.phone) && (
                                            <Tooltip label="WhatsApp customer" text="Open WhatsApp with this customer's stored number.">
                                                <button
                                                    onClick={() => messageCustomer(c)}
                                                    aria-label={`WhatsApp ${c.name}`}
                                                    style={{ background: 'var(--adm-success-tint)', border: 'none', padding: '0.35rem', borderRadius: 6, cursor: 'pointer', color: 'var(--adm-success-ink)' }}
                                                >
                                                    <MessageCircle size={14} />
                                                </button>
                                            </Tooltip>
                                        )}
                                        {allowed('customers.edit') && (
                                            <Tooltip label="Edit customer" text="Change this customer's name, phone, email, notes or VIP status.">
                                                <button
                                                    onClick={() => openEdit(c)}
                                                    aria-label={`Edit ${c.name}`}
                                                    style={{ background: 'var(--adm-tint)', border: 'none', padding: '0.35rem', borderRadius: 6, cursor: 'pointer', color: 'var(--adm-success)' }}
                                                >
                                                    <Edit size={14} />
                                                </button>
                                            </Tooltip>
                                        )}
                                        {allowed('customers.delete') && (
                                            <Tooltip label="Remove customer" text="Hides the customer from the portal. Their bookings and invoices are kept.">
                                                <button
                                                    onClick={() => deleteCustomer(c)}
                                                    disabled={busyId === c.id}
                                                    aria-label={`Remove ${c.name}`}
                                                    style={{ background: 'var(--adm-danger-tint)', border: 'none', padding: '0.35rem', borderRadius: 6, cursor: 'pointer', color: 'var(--adm-danger-ink)' }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </Tooltip>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--adm-faint)' }}>
                                {search ? `No customers match “${search}”.` : 'No customers yet. They are added automatically when a booking comes in.'}
                            </td></tr>
                        )}
                    </tbody>
                </table>

                {/* Item 19: pagination. */}
                {!loading && total > 0 && (
                    <nav aria-label="Customer pages" style={{ padding: '0.9rem 1.25rem', borderTop: '1px solid var(--adm-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', background: 'var(--adm-card)' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--adm-muted)' }}>
                            Showing <strong>{firstRow}–{lastRow}</strong> of <strong>{total}</strong> customers
                        </div>
                        <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            <button onClick={() => setParams({ page: page - 1 })} disabled={page <= 1} className="admin-btn-secondary" style={{ padding: '0.35rem 0.6rem' }} aria-label="Previous page">
                                <ChevronLeft size={15} /> Prev
                            </button>
                            {pageNumbers.map((n, i) => (
                                <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                    {i > 0 && n - pageNumbers[i - 1] > 1 && <span style={{ color: 'var(--adm-faint)' }}>…</span>}
                                    <button
                                        onClick={() => setParams({ page: n })}
                                        aria-current={n === page ? 'page' : undefined}
                                        style={{
                                            minWidth: 34, padding: '0.35rem 0.5rem', borderRadius: 8, cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem',
                                            border: `1px solid ${n === page ? 'var(--adm-gold)' : 'var(--adm-line)'}`,
                                            background: n === page ? 'var(--adm-gold)' : 'var(--adm-card)',
                                            color: n === page ? 'var(--adm-navy)' : 'var(--adm-text)',
                                        }}
                                    >{n}</button>
                                </span>
                            ))}
                            <button onClick={() => setParams({ page: page + 1 })} disabled={page >= pageCount} className="admin-btn-secondary" style={{ padding: '0.35rem 0.6rem' }} aria-label="Next page">
                                Next <ChevronRight size={15} />
                            </button>
                        </div>
                    </nav>
                )}
            </div>

            {modal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)', padding: '1rem' }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', maxWidth: 440, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--adm-navy)' }}>{editingId ? 'Edit Customer' : 'Add New Customer'}</h2>
                            <button onClick={() => { setModal(false); setEditingId(null); }} aria-label="Close" style={{ background: 'none', border: 'none', color: 'var(--adm-faint)', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input type="text" className="form-input" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone</label>
                                    <input type="tel" className="form-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Notes</label>
                                <textarea className="form-input" rows={3} style={{ resize: 'vertical' }} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <input type="checkbox" checked={form.is_vip} onChange={e => setForm({ ...form, is_vip: e.target.checked })} />
                                    Mark as VIP
                                </label>
                            </div>
                            {formError && (
                                <div style={{ background: 'var(--adm-danger-tint)', border: '1px solid var(--adm-danger-line)', color: 'var(--adm-danger-ink)', padding: '0.6rem 0.8rem', borderRadius: 8, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                                    {formError}
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                                <button type="button" className="admin-btn-secondary" onClick={() => { setModal(false); setEditingId(null); }}>Cancel</button>
                                <button type="submit" className="admin-btn-primary" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Save Changes' : 'Add Customer'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function CustomersPage() {
    return (
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: 'var(--adm-faint)' }}>Loading...</div>}>
            <CustomersPageInner />
        </Suspense>
    );
}
