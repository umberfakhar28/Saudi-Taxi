'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Search, Filter, User, Mail, Phone, Calendar as CalendarIcon, RefreshCw, Plus, Edit, Trash2, MessageCircle } from 'lucide-react';
import { formatMoney } from '@/lib/currency';
import { displayDate } from '@/lib/datetime';
import { canWhatsApp, waLinkTo } from '@/lib/whatsapp';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';
import { useFeedback } from '@/components/admin/AdminFeedback';
import Tooltip from '@/components/admin/Tooltip';

function CustomersPageInner() {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
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

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        // Soft-deleted customers are hidden from the portal but their rows —
        // and every booking, quote and invoice that references them — remain
        // intact. `.is('deleted_at', null)` is applied client-side after the
        // fetch so the page still works if supabase/sql/002 has not been run
        // and the column does not exist yet.
        const { data, error } = await supabase
            .from('customers')
            .select('*')
            .order('total_bookings', { ascending: false });
        if (!error) setCustomers((data ?? []).filter((c: any) => !c.deleted_at));
        setLoading(false);
    }, []);

    useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

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
            setCustomers(prev => prev.filter(x => x.id !== c.id));
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
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                                <RefreshCw className="animate-spin" style={{ margin: '0 auto', display: 'block', marginBottom: '0.75rem' }} /> Loading customers…
                            </td></tr>
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
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#10b981' }}>{formatMoney(c.total_spent, 'SAR')}</div>
                                </td>
                                <td>
                                    {c.last_booking_date ? (
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <CalendarIcon size={12} /> {displayDate(c.last_booking_date)}
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
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                                        {allowed('comms.send') && canWhatsApp(c.phone) && (
                                            <Tooltip label="WhatsApp customer" text="Open WhatsApp with this customer's stored number.">
                                                <button
                                                    onClick={() => messageCustomer(c)}
                                                    aria-label={`WhatsApp ${c.name}`}
                                                    style={{ background: '#dcfce7', border: 'none', padding: '0.35rem', borderRadius: 6, cursor: 'pointer', color: '#15803d' }}
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
                                                    style={{ background: '#f1f5f9', border: 'none', padding: '0.35rem', borderRadius: 6, cursor: 'pointer', color: '#10b981' }}
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
                                                    style={{ background: '#fef2f2', border: 'none', padding: '0.35rem', borderRadius: 6, cursor: 'pointer', color: '#991b1b' }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </Tooltip>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                                {search ? `No customers match “${search}”.` : 'No customers yet. They are added automatically when a booking comes in.'}
                            </td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)', padding: '1rem' }}>
                    <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', maxWidth: 440, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>{editingId ? 'Edit Customer' : 'Add New Customer'}</h2>
                            <button onClick={() => { setModal(false); setEditingId(null); }} aria-label="Close" style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
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
                                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '0.6rem 0.8rem', borderRadius: 8, fontSize: '0.8rem', marginBottom: '0.75rem' }}>
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
        <Suspense fallback={<div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>}>
            <CustomersPageInner />
        </Suspense>
    );
}
