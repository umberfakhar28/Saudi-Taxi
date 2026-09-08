'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Search, RefreshCw, Filter, ExternalLink, X, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';
import Tooltip from '@/components/admin/Tooltip';
import { useFeedback } from '@/components/admin/AdminFeedback';
import { displayDate, formatTime12h } from '@/lib/datetime';

/**
 * Email Log — every transactional email the portal has attempted.
 *
 * Rows are written by /api/emails/send. This page is read-only by design:
 * a delivery record that the portal can edit is not a record. Whether the
 * message actually reached the inbox (delivered / bounced / opened) lives
 * with Resend, so each row that has a provider id links straight to it.
 */

const TYPE_LABELS: Record<string, string> = {
    new_booking: 'New Booking',
    booking_confirmed: 'Booking Confirmed',
    booking_completed: 'Booking Completed',
    quote_sent: 'Quote Sent',
    destination_enquiry: 'Destination Enquiry',
    invoice: 'Invoice',
};

const STATUS_FILTERS = ['all', 'sent', 'failed'] as const;

interface EmailLogRow {
    id: string;
    created_at: string;
    sent_at: string | null;
    email_type: string;
    recipient_email: string;
    from_address: string | null;
    subject: string;
    status: string;
    error_message: string | null;
    resend_id: string | null;
    booking_id: string | null;
}

export default function EmailLogPage() {
    const supabase = createClient();
    const { showToast } = useFeedback();

    const [rows, setRows] = useState<EmailLogRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]>('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [detail, setDetail] = useState<EmailLogRow | null>(null);

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        setLoadError(null);
        const { data, error } = await supabase
            .from('email_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(500);
        if (error) {
            // Most likely supabase/sql/003 has not been run yet, which both
            // adds from_address and grants portal users read access.
            setLoadError(
                /from_address/i.test(error.message)
                    ? 'The email log needs migration 003 (supabase/sql/003_email_log_and_rls_hardening.sql) to be run first.'
                    : `Could not load the email log: ${error.message}`
            );
            setRows([]);
        } else {
            setRows((data ?? []) as EmailLogRow[]);
        }
        setLoading(false);
    }, [supabase]);

    useEffect(() => { fetchLogs(); }, [fetchLogs]);

    const filtered = useMemo(() => {
        const needle = search.trim().toLowerCase();
        return rows.filter((r) => {
            if (status !== 'all' && r.status !== status) return false;
            if (typeFilter !== 'all' && r.email_type !== typeFilter) return false;
            if (!needle) return true;
            return (
                r.recipient_email?.toLowerCase().includes(needle) ||
                r.subject?.toLowerCase().includes(needle) ||
                (r.from_address ?? '').toLowerCase().includes(needle) ||
                (r.error_message ?? '').toLowerCase().includes(needle)
            );
        });
    }, [rows, search, status, typeFilter]);

    const counts = useMemo(() => ({
        all: rows.length,
        sent: rows.filter((r) => r.status === 'sent').length,
        failed: rows.filter((r) => r.status === 'failed').length,
    }), [rows]);

    const typesPresent = useMemo(
        () => Array.from(new Set(rows.map((r) => r.email_type))).sort(),
        [rows]
    );

    const when = (row: EmailLogRow) => {
        const raw = row.sent_at || row.created_at;
        if (!raw) return '—';
        const d = new Date(raw);
        if (Number.isNaN(d.getTime())) return '—';
        const hhmm = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        return `${displayDate(d.toISOString().slice(0, 10))} · ${formatTime12h(hhmm) ?? hhmm}`;
    };

    const copy = async (value: string, label: string) => {
        try {
            await navigator.clipboard.writeText(value);
            showToast('success', `${label} copied.`);
        } catch {
            showToast('error', 'Could not copy to the clipboard.');
        }
    };

    return (
        <div style={{ paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                <div>
                    <h1 className="admin-page-title">Email Log</h1>
                    <p className="admin-page-sub" style={{ margin: 0 }}>
                        Every transactional email this portal has attempted, and what it was sent as.
                    </p>
                </div>
                <button onClick={fetchLogs} className="admin-btn-secondary"><RefreshCw size={15} /> Refresh</button>
            </div>

            {/* Status pills double as an at-a-glance health check. */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {STATUS_FILTERS.map((s) => (
                    <button
                        key={s}
                        onClick={() => setStatus(s)}
                        style={{
                            padding: '0.45rem 1rem', borderRadius: 9999, border: '1.5px solid',
                            borderColor: status === s ? '#fbbf24' : '#e2e8f0',
                            background: status === s ? '#fffbeb' : '#fff',
                            color: status === s ? '#92400e' : '#64748b',
                            fontWeight: status === s ? 700 : 500, fontSize: '0.8rem', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                        }}
                    >
                        {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                        <span style={{ background: status === s ? '#fbbf24' : '#f1f5f9', color: status === s ? '#0f172a' : '#64748b', borderRadius: 9999, padding: '0 0.4rem', fontSize: '0.72rem', fontWeight: 700 }}>
                            {counts[s]}
                        </span>
                    </button>
                ))}
            </div>

            <div className="admin-filter-bar" style={{ marginBottom: '1.25rem' }}>
                <div className="admin-search-wrap">
                    <Search size={16} className="admin-search-icon" />
                    <input
                        type="text"
                        className="admin-search-input"
                        placeholder="Search recipient, subject, sender or error…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="admin-filter-select">
                    <option value="all">All types</option>
                    {typesPresent.map((t) => <option key={t} value={t}>{TYPE_LABELS[t] ?? t}</option>)}
                </select>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                    <Filter size={14} /> {filtered.length} shown
                </div>
            </div>

            {loadError && (
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.25rem', fontSize: '0.85rem', color: '#92400e', lineHeight: 1.6 }}>
                    {loadError}
                </div>
            )}

            <div className="admin-table-wrap">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>When</th>
                            <th>Type</th>
                            <th>To</th>
                            <th>Sent as</th>
                            <th>Subject</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
                                <RefreshCw className="animate-spin" style={{ margin: '0 auto', display: 'block', marginBottom: '0.75rem' }} /> Loading the email log…
                            </td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={6} style={{ padding: '3.5rem', textAlign: 'center', color: '#94a3b8' }}>
                                <Mail size={30} style={{ opacity: 0.3, margin: '0 auto 0.85rem', display: 'block' }} />
                                {rows.length === 0
                                    ? 'No emails have been sent yet. Confirming a booking or sending a quote will appear here.'
                                    : 'No emails match these filters.'}
                            </td></tr>
                        ) : filtered.map((r) => (
                            <tr key={r.id} onClick={() => setDetail(r)} style={{ cursor: 'pointer' }}>
                                <td style={{ whiteSpace: 'nowrap', fontSize: '0.8rem', color: '#334155' }}>{when(r)}</td>
                                <td>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4338ca', background: '#eef2ff', padding: '0.15rem 0.5rem', borderRadius: 6, whiteSpace: 'nowrap' }}>
                                        {TYPE_LABELS[r.email_type] ?? r.email_type}
                                    </span>
                                </td>
                                <td style={{ fontSize: '0.82rem', color: '#1e293b' }}>{r.recipient_email}</td>
                                <td style={{ fontSize: '0.78rem', color: r.from_address ? '#334155' : '#cbd5e1' }}>
                                    {r.from_address ?? (
                                        <Tooltip label="Not recorded" text="This email was sent before the sender was stored on the log. Its sender can still be checked in the Resend dashboard.">
                                            <span>not recorded</span>
                                        </Tooltip>
                                    )}
                                </td>
                                <td style={{ fontSize: '0.8rem', color: '#475569', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.subject}</td>
                                <td>
                                    {r.status === 'sent' ? (
                                        <span className="badge-confirmed" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                            <CheckCircle2 size={12} /> Sent
                                        </span>
                                    ) : (
                                        <Tooltip label="Failed" text={r.error_message || 'The provider rejected this email.'}>
                                            <span className="badge-cancelled" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                                <AlertCircle size={12} /> Failed
                                            </span>
                                        </Tooltip>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.9rem', lineHeight: 1.6 }}>
                This log records what the portal <em>attempted</em>. Whether a message reached the inbox —
                delivered, bounced or opened — is tracked by Resend; open any row and follow its provider link.
            </p>

            {/* ── Detail ── */}
            {detail && (
                <div
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                    onClick={() => setDetail(null)}
                >
                    <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '88vh', overflowY: 'auto' }}>
                        <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                                    {TYPE_LABELS[detail.email_type] ?? detail.email_type}
                                </div>
                                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 3 }}>{when(detail)}</div>
                            </div>
                            <button onClick={() => setDetail(null)} aria-label="Close" className="admin-icon-btn"><X size={16} /></button>
                        </div>

                        <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.86rem' }}>
                            <DetailRow label="Status">
                                <span className={detail.status === 'sent' ? 'badge-confirmed' : 'badge-cancelled'}>
                                    {detail.status === 'sent' ? 'Sent' : 'Failed'}
                                </span>
                            </DetailRow>
                            <DetailRow label="To">{detail.recipient_email}</DetailRow>
                            <DetailRow label="Sent as">
                                {detail.from_address ?? <span style={{ color: '#94a3b8' }}>not recorded</span>}
                            </DetailRow>
                            <DetailRow label="Subject">{detail.subject}</DetailRow>

                            {detail.error_message && (
                                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: '0.85rem 1rem' }}>
                                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5 }}>
                                        Why it failed
                                    </div>
                                    <div style={{ fontSize: '0.82rem', color: '#7f1d1d', lineHeight: 1.55 }}>{detail.error_message}</div>
                                </div>
                            )}

                            {detail.resend_id && (
                                <DetailRow label="Provider ID">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                        <code style={{ fontSize: '0.74rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>{detail.resend_id}</code>
                                        <button onClick={() => copy(detail.resend_id!, 'Provider ID')} className="admin-btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}>
                                            Copy
                                        </button>
                                    </span>
                                </DetailRow>
                            )}

                            {detail.booking_id && (
                                <DetailRow label="Booking">
                                    <a href={`/admin/bookings?view=${detail.booking_id}`} style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                                        Open booking
                                    </a>
                                </DetailRow>
                            )}
                        </div>

                        <div style={{ padding: '1rem 1.75rem 1.5rem', display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                            <a
                                href="https://resend.com/emails"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="admin-btn-secondary"
                                style={{ textDecoration: 'none' }}
                            >
                                <ExternalLink size={14} /> Check delivery in Resend
                            </a>
                            <button onClick={() => setDetail(null)} className="admin-btn-primary">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.25rem', paddingBottom: '0.7rem', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ color: '#94a3b8', fontWeight: 500, flexShrink: 0 }}>{label}</span>
            <span style={{ color: '#1e293b', fontWeight: 600, textAlign: 'right', wordBreak: 'break-word' }}>{children}</span>
        </div>
    );
}
