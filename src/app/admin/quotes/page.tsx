'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Search, Plus, Filter, FileText, CheckCircle, XCircle, Clock, RefreshCw, Send, X, ChevronDown, Trash2, Download, Share2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { displayDate, displayTime, toStorableTime, toTimeInputValue } from '@/lib/datetime';
import { CURRENCY_CODES, formatMoney, toCurrencyCode } from '@/lib/currency';
import { downloadInvoicePng } from '@/lib/invoicePng';
import { canWhatsApp, waLinkTo } from '@/lib/whatsapp';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';
import { useFeedback } from '@/components/admin/AdminFeedback';
import Tooltip from '@/components/admin/Tooltip';

/**
 * The complete quote lifecycle, matching the quotes_status_check constraint
 * added in supabase/sql/002. The database rejects anything outside this set,
 * so the UI and the schema cannot drift apart.
 */
const QUOTE_STATUSES = ['draft', 'sent', 'accepted', 'expired', 'converted'] as const;
type QuoteStatus = (typeof QUOTE_STATUSES)[number];

const STATUS_ICONS: Record<QuoteStatus, string> = {
    draft: '📝',
    sent: '📤',
    accepted: '✅',
    expired: '⌛',
    converted: '🚗',
};

const QUOTE_STATUS_HELP: Record<QuoteStatus, string> = {
    draft: 'Prepared but not yet given to the customer.',
    sent: 'The customer has been given this quote.',
    accepted: 'The customer agreed to this price.',
    expired: 'The validity window passed without acceptance.',
    converted: 'This quote became a real booking.',
};

/** Quotes have no number column of their own, so the id gives a stable ref. */
function quoteRef(q: any): string {
    return `Q-${String(q?.id ?? '').slice(0, 8).toUpperCase()}`;
}

/** The price actually being offered: an admin override wins over the calculation. */
function quoteTotal(q: any): number {
    return Number(q?.admin_override_amount ?? q?.total_amount ?? 0);
}

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [viewModal, setViewModal] = useState<any | null>(null);
    const [editModal, setEditModal] = useState<any | null>(null);
    // The status the quote had when the modal opened, so the save can tell
    // whether it actually changed.
    const [originalStatus, setOriginalStatus] = useState<string>('draft');
    const [savingEdit, setSavingEdit] = useState(false);
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

    const { allowed } = useAdminAuth();
    const { showToast, confirm } = useFeedback();
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

    // Same reasoning as the Bookings page: the App Router hydrates
    // <html>/<body>, so React's delegated listener and this one both sit on
    // `document` and stopPropagation cannot separate them. Hit-test instead.
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (target && typeof target.closest === 'function' && target.closest('[data-menu-root]')) return;
            setOpenMenu(null);
        };
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenMenu(null); };
        document.addEventListener('click', onClick);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('click', onClick);
            document.removeEventListener('keydown', onKey);
        };
    }, []);

    useEffect(() => {
        if (!openMenu) return;
        const close = () => setOpenMenu(null);
        window.addEventListener('scroll', close, true);
        window.addEventListener('resize', close);
        return () => {
            window.removeEventListener('scroll', close, true);
            window.removeEventListener('resize', close);
        };
    }, [openMenu]);

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
            showToast('success', `Quote emailed to ${q.customer_email}.`);
        } catch (err: any) {
            showToast('error', 'Could not send quote to customer: ' + err.message);
        } finally {
            setActionLoading(null);
        }
    };

    // §8.2 — Edit. Opens the quote in an editable form; Save writes to the
    // database and the row updates immediately.
    const saveEdit = async () => {
        if (!editModal) return;
        if (!String(editModal.customer_name || '').trim()) {
            showToast('error', 'A customer name is required.');
            return;
        }
        setSavingEdit(true);
        const nextStatus: QuoteStatus = QUOTE_STATUSES.includes(editModal.status)
            ? editModal.status
            : (originalStatus as QuoteStatus);

        const patch = {
            status: nextStatus,
            customer_name: editModal.customer_name,
            customer_email: editModal.customer_email || null,
            customer_phone: editModal.customer_phone || null,
            pickup_location: editModal.pickup_location,
            dropoff_location: editModal.dropoff_location || null,
            vehicle_type: editModal.vehicle_type || null,
            distance_km: parseFloat(editModal.distance_km) || null,
            travel_date: editModal.travel_date || null,
            travel_time: toStorableTime(editModal.travel_time),
            passengers_count: parseInt(editModal.passengers_count) || 1,
            admin_override_amount: editModal.admin_override_amount === '' || editModal.admin_override_amount === null
                ? null
                : parseFloat(editModal.admin_override_amount),
            currency: toCurrencyCode(editModal.currency),
            notes: editModal.notes || null,
        };
        const { error } = await supabase.from('quotes').update(patch).eq('id', editModal.id);
        setSavingEdit(false);
        if (error) { showToast('error', 'Could not save the quote: ' + error.message); return; }
        setQuotes(prev => prev.map(x => (x.id === editModal.id ? { ...x, ...patch } : x)));
        logActivity(editModal.id, 'updated', `Quote for ${editModal.customer_name} edited`);
        if (nextStatus !== originalStatus) {
            logActivity(editModal.id, 'status_changed', `Quote for ${editModal.customer_name} marked ${nextStatus}`);
        }
        showToast('success', nextStatus !== originalStatus
            ? `Quote updated and marked ${nextStatus}.`
            : 'Quote updated.');
        setEditModal(null);
    };

    // §8.2 — Download. Reuses the same canvas renderer as invoices, so the
    // quote goes out as a sharp image the customer can read on a phone.
    const downloadQuote = async (q: any) => {
        setOpenMenu(null);
        setActionLoading(q.id);
        try {
            await downloadInvoicePng({
                documentTitle: 'Quotation',
                invoice_number: quoteRef(q),
                validUntil: q.valid_until,
                status: q.status,
                customer_name: q.customer_name,
                customer_phone: q.customer_phone,
                customer_email: q.customer_email,
                pickup_location: q.pickup_location,
                dropoff_location: q.dropoff_location,
                travel_date: q.travel_date,
                service_type: q.vehicle_type ? `${q.vehicle_type} transfer` : 'Private transfer',
                subtotal: quoteTotal(q),
                total_amount: quoteTotal(q),
                currency: q.currency,
                notes: q.notes,
            });
            showToast('success', 'Quote image saved.');
        } catch (err: any) {
            showToast('error', 'Could not create the file: ' + (err?.message || 'unknown error'));
        } finally {
            setActionLoading(null);
        }
    };

    /** The plain-text summary used by both Share actions. */
    const quoteSummary = (q: any) => [
        `Gulf Trip Service — Quotation ${quoteRef(q)}`,
        '',
        `Customer: ${q.customer_name}`,
        `From: ${q.pickup_location}`,
        q.dropoff_location ? `To: ${q.dropoff_location}` : '',
        q.vehicle_type ? `Vehicle: ${q.vehicle_type}` : '',
        q.travel_date ? `Date: ${displayDate(q.travel_date)}${q.travel_time ? ` at ${displayTime(q.travel_time)}` : ''}` : '',
        `Price: ${formatMoney(quoteTotal(q), q.currency)}`,
        q.valid_until ? `Valid until: ${displayDate(q.valid_until)}` : '',
        '',
        'Reply to confirm and we will hold the vehicle for you.',
    ].filter(Boolean).join('\n');

    // §8.2 — Share. Copies the quote to the clipboard so it can be pasted
    // anywhere; WhatsApp is offered separately when the number is usable.
    const shareQuote = async (q: any) => {
        setOpenMenu(null);
        const text = quoteSummary(q);
        try {
            // The Web Share sheet is the better experience where it exists
            // (phones, tablets); the clipboard is the desktop fallback.
            if (typeof navigator !== 'undefined' && navigator.share) {
                await navigator.share({ title: `Quotation ${quoteRef(q)}`, text });
                return;
            }
            await navigator.clipboard.writeText(text);
            showToast('success', 'Quote copied — paste it wherever you need it.');
        } catch (err: any) {
            // A cancelled share sheet is not an error worth reporting.
            if (err?.name === 'AbortError') return;
            showToast('error', 'Could not share the quote. Copy the details from the View panel instead.');
        }
    };

    const shareQuoteOnWhatsApp = (q: any) => {
        setOpenMenu(null);
        const link = waLinkTo(q.customer_phone, quoteSummary(q));
        if (!link) { showToast('error', 'This customer has no usable phone number on file.'); return; }
        window.open(link, '_blank', 'noopener,noreferrer');
        logActivity(q.id, 'whatsapp_opened', `Quote ${quoteRef(q)} shared on WhatsApp`);
    };

    // §8.1 — Delete. Goes through the API so the permission is enforced on
    // the server and the deletion is written to the audit log.
    const deleteQuote = async (q: any) => {
        setOpenMenu(null);
        const ok = await confirm({
            title: 'Delete this quote?',
            body: `The quote for ${q.customer_name} (${formatMoney(quoteTotal(q), q.currency)}) will be permanently removed. This cannot be undone.`,
            confirmLabel: 'Delete quote',
        });
        if (!ok) return;
        setActionLoading(q.id);
        try {
            const res = await fetch(`/api/admin/quotes/${q.id}`, { method: 'DELETE' });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.error || 'The quote could not be deleted.');
            setQuotes(prev => prev.filter(x => x.id !== q.id));
            showToast('success', 'Quote deleted.');
        } catch (err: any) {
            showToast('error', err.message);
        } finally {
            setActionLoading(null);
        }
    };

    const updateStatus = async (q: any, status: QuoteStatus) => {
        setOpenMenu(null);
        if (status === q.status) return;

        // "Sent" is the one status that normally carries a side effect: the
        // Send to Customer action emails the quote and only then records
        // 'sent', so the column means the customer genuinely received it.
        // Setting it by hand is still legitimate — the quote may have gone
        // out over WhatsApp or as a downloaded file — but the difference has
        // to be stated rather than assumed.
        if (status === 'sent') {
            const ok = await confirm({
                title: 'Mark as sent without emailing?',
                body: 'This records the status only — no email goes to the customer. Choose this if you have already shared the quote another way, such as WhatsApp. To actually email it, use "Send to Customer" instead.',
                confirmLabel: 'Mark as sent',
                tone: 'primary',
            });
            if (!ok) return;
        }

        setActionLoading(q.id);
        try {
            const patch: Record<string, unknown> = { status };
            // A quote that is now "sent" needs a validity window, or the
            // Expires column would stay blank for it.
            if (status === 'sent' && !q.valid_until) {
                const validUntil = new Date();
                validUntil.setHours(validUntil.getHours() + 24);
                patch.valid_until = validUntil.toISOString();
            }
            const { error } = await supabase.from('quotes').update(patch).eq('id', q.id);
            if (error) throw new Error(error.message);
            setQuotes(prev => prev.map(x => x.id === q.id ? { ...x, ...patch } : x));
            logActivity(q.id, 'status_changed', `Quote for ${q.customer_name} marked ${status}`);
            showToast('success', `Quote marked ${status}.`);
        } catch (err: any) {
            showToast('error', 'Error updating quote: ' + err.message);
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
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{formatMoney(quoteTotal(q), q.currency)}</div>
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
                                    <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                                        <Tooltip label="View quote" text="See every detail recorded on this quote.">
                                            <button className="admin-icon-btn" aria-label="View quote" onClick={() => setViewModal(q)}>
                                                <FileText size={15} />
                                            </button>
                                        </Tooltip>
                                        <div data-menu-root style={{ position: 'relative', display: 'inline-block' }}>
                                            <button
                                                className="admin-btn-secondary"
                                                aria-haspopup="menu"
                                                aria-expanded={openMenu === q.id}
                                                disabled={actionLoading === q.id}
                                                style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 4 }}
                                                onClick={(e) => {
                                                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                                                    const MENU_H = 300;
                                                    const openUp = rect.bottom + MENU_H > window.innerHeight && rect.top > MENU_H;
                                                    setMenuPos({
                                                        top: openUp ? Math.max(8, rect.top - MENU_H - 4) : rect.bottom + 4,
                                                        right: Math.max(8, window.innerWidth - rect.right),
                                                    });
                                                    setOpenMenu(openMenu === q.id ? null : q.id);
                                                }}
                                            >
                                                {actionLoading === q.id ? <RefreshCw size={13} className="animate-spin" /> : <>Actions <ChevronDown size={12} /></>}
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No quotes found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ── Actions menu (fixed, never clipped by the table) ── */}
            {openMenu && filtered.map(q => q.id === openMenu ? (
                <div
                    key={`menu-${q.id}`}
                    data-menu-root
                    role="menu"
                    style={{ position: 'fixed', top: menuPos.top, right: menuPos.right, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.15)', zIndex: 9999, minWidth: 220, overflow: 'hidden', textAlign: 'left', maxHeight: 'calc(100vh - 16px)', overflowY: 'auto' }}
                >
                    <button onClick={() => { setViewModal(q); setOpenMenu(null); }} className="dropdown-item">👁️ View Quote</button>

                    {allowed('quotes.edit') && (
                        <button onClick={() => { setEditModal({ ...q }); setOriginalStatus(q.status); setOpenMenu(null); }} className="dropdown-item">✏️ Edit Quote</button>
                    )}

                    <button onClick={() => downloadQuote(q)} className="dropdown-item">⬇️ Download Quote</button>
                    <button onClick={() => shareQuote(q)} className="dropdown-item">🔗 Share / Copy</button>
                    {canWhatsApp(q.customer_phone) && allowed('comms.send') && (
                        <button onClick={() => shareQuoteOnWhatsApp(q)} className="dropdown-item">💬 Share on WhatsApp</button>
                    )}

                    {allowed('quotes.send') && q.status === 'draft' && q.customer_email && (
                        <button onClick={() => { setOpenMenu(null); markAsSent(q); }} className="dropdown-item">📩 Send to Customer</button>
                    )}

                    {/* Every status is reachable from every other one. The menu
                        previously offered "Mark Accepted" only from 'sent' and
                        never offered 'converted' at all, so a draft quote could
                        only ever become sent or expired. */}
                    {allowed('quotes.edit') && (
                        <>
                            <div style={{ padding: '0.4rem 0.75rem', fontSize: '0.62rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', background: '#f8fafc', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>Quote Status</div>
                            {QUOTE_STATUSES.map(st => (
                                <button
                                    key={st}
                                    onClick={() => updateStatus(q, st)}
                                    className="dropdown-item"
                                    disabled={q.status === st}
                                    title={QUOTE_STATUS_HELP[st]}
                                >
                                    {STATUS_ICONS[st]} {st.charAt(0).toUpperCase() + st.slice(1)}
                                    {q.status === st && <span style={{ color: '#94a3b8', fontWeight: 400 }}> — current</span>}
                                </button>
                            ))}
                        </>
                    )}

                    {allowed('quotes.delete') && (
                        <>
                            <div style={{ padding: '0.4rem 0.75rem', fontSize: '0.62rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', background: '#fef2f2', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #fee2e2' }}>Danger Zone</div>
                            <button onClick={() => deleteQuote(q)} className="dropdown-item" style={{ color: '#dc2626' }}>🗑️ Delete Quote</button>
                        </>
                    )}
                </div>
            ) : null)}

            {/* ── Edit Quote ── */}
            {editModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setEditModal(null)}>
                    <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, padding: '1.75rem', width: '100%', maxWidth: 620, maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>Edit Quote</div>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace', marginTop: 2 }}>{quoteRef(editModal)}</div>
                            </div>
                            <button onClick={() => setEditModal(null)} aria-label="Close" className="admin-icon-btn"><X size={16} /></button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {[
                                { key: 'customer_name', label: 'Customer Name', span: true },
                                { key: 'customer_phone', label: 'Phone' },
                                { key: 'customer_email', label: 'Email' },
                                { key: 'pickup_location', label: 'Pickup Location', span: true },
                                { key: 'dropoff_location', label: 'Drop-off Location', span: true },
                                { key: 'vehicle_type', label: 'Vehicle Type' },
                                { key: 'distance_km', label: 'Distance (km)', type: 'number' },
                                { key: 'travel_date', label: 'Travel Date', type: 'date' },
                                { key: 'travel_time', label: 'Travel Time', type: 'time' },
                                { key: 'passengers_count', label: 'Passengers', type: 'number' },
                                { key: 'admin_override_amount', label: 'Final Price (override)', type: 'number' },
                            ].map(f => (
                                <div key={f.key} style={{ gridColumn: (f as any).span ? '1/-1' : 'auto' }}>
                                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>{f.label}</label>
                                    <input
                                        type={f.type || 'text'}
                                        value={f.type === 'time' ? toTimeInputValue(editModal[f.key]) : (editModal[f.key] ?? '')}
                                        onChange={e => setEditModal({ ...editModal, [f.key]: e.target.value })}
                                        className="admin-search-input"
                                        style={{ width: '100%', boxSizing: 'border-box' }}
                                    />
                                </div>
                            ))}
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Currency</label>
                                <select
                                    value={toCurrencyCode(editModal.currency)}
                                    onChange={e => setEditModal({ ...editModal, currency: e.target.value })}
                                    className="admin-search-input"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                >
                                    {CURRENCY_CODES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Status</label>
                                <select
                                    value={QUOTE_STATUSES.includes(editModal.status) ? editModal.status : 'draft'}
                                    onChange={e => setEditModal({ ...editModal, status: e.target.value })}
                                    className="admin-search-input"
                                    style={{ width: '100%', boxSizing: 'border-box' }}
                                >
                                    {QUOTE_STATUSES.map(st => (
                                        <option key={st} value={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>
                                    ))}
                                </select>
                                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 5, lineHeight: 1.45 }}>
                                    {QUOTE_STATUS_HELP[(QUOTE_STATUSES.includes(editModal.status) ? editModal.status : 'draft') as QuoteStatus]}
                                    {editModal.status === 'sent' && editModal.status !== originalStatus && ' Saving does not email the customer.'}
                                </div>
                            </div>
                            <div style={{ gridColumn: '1/-1' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Notes</label>
                                <textarea
                                    value={editModal.notes || ''}
                                    onChange={e => setEditModal({ ...editModal, notes: e.target.value })}
                                    rows={3}
                                    className="admin-search-input"
                                    style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                                />
                            </div>
                        </div>

                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.9rem', lineHeight: 1.5 }}>
                            The calculated price stays as it was; entering a final price records an admin override,
                            which is what the customer is shown.
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', justifyContent: 'flex-end' }}>
                            <button className="admin-btn-secondary" onClick={() => setEditModal(null)}>Cancel</button>
                            <button className="admin-btn-primary" onClick={saveEdit} disabled={savingEdit}>
                                {savingEdit ? 'Saving…' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
                            <Row label="Travel Date">{displayDate(viewModal.travel_date, 'TBD')}</Row>
                            <Row label="Travel Time">{displayTime(viewModal.travel_time)}</Row>
                            <Row label="Passengers">{viewModal.passengers_count || '—'}</Row>
                            <Row label="Calculated Price">{formatMoney(viewModal.total_amount, viewModal.currency)}</Row>
                            {viewModal.admin_override_amount && <Row label="Final (Override)">{formatMoney(viewModal.admin_override_amount, viewModal.currency)}</Row>}
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
