'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, Download, Mail, CheckCircle2, Image as ImageIcon, Trash2 } from 'lucide-react';
import { LogoMark } from '@/components/Logo';
import { formatMoney } from '@/lib/currency';
import { displayDate } from '@/lib/datetime';
import { EMAIL, PHONE_DISPLAY } from '@/lib/contact';
import { downloadInvoicePng } from '@/lib/invoicePng';
import { useAdminAuth } from '@/components/admin/AdminAuthProvider';
import { useFeedback } from '@/components/admin/AdminFeedback';

export default function InvoiceDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const supabase = createClient();

    const [invoice, setInvoice] = useState<any>(null);
    const [bookingNumber, setBookingNumber] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [emailing, setEmailing] = useState(false);
    const [marking, setMarking] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const router = useRouter();
    const { allowed } = useAdminAuth();
    const { showToast, confirm } = useFeedback();

    const fetchInvoice = useCallback(async () => {
        setLoading(true);
        setNotFound(false);
        const { data, error } = await supabase.from('invoices').select('*').eq('id', id).single();
        if (error || !data) { setNotFound(true); setLoading(false); return; }
        setInvoice(data);
        if (data.booking_id) {
            const { data: b } = await supabase.from('bookings').select('booking_number').eq('id', data.booking_id).single();
            setBookingNumber(b?.booking_number ?? null);
        }
        setLoading(false);
    }, [id]);

    useEffect(() => { fetchInvoice(); }, [fetchInvoice]);

    // Real invoice email via the same api/emails/send `invoice` handler used
    // from the Bookings page's invoice modal — previously this route didn't
    // exist at all, so Invoices list's View/Download/Email actions were all
    // dead buttons (Admin Portal audit §8).
    const sendInvoiceEmail = async () => {
        if (!invoice?.customer_email) { showToast('error', 'This invoice has no customer email on file.'); return; }
        setEmailing(true);
        try {
            const res = await fetch('/api/emails/send', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'invoice', invoiceData: { ...invoice, invoice_db_id: invoice.id } }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Unknown error');
            fetch('/api/admin/audit-log', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entityType: 'invoice', entityId: invoice.id, action: 'email_sent', description: `Invoice ${invoice.invoice_number} emailed to ${invoice.customer_email}` }),
            }).catch(() => {});
            showToast('success', 'Invoice emailed to ' + invoice.customer_email);
        } catch (err: any) {
            showToast('error', 'Failed to send invoice email: ' + err.message);
        } finally {
            setEmailing(false);
        }
    };

    const markPaid = async () => {
        setMarking(true);
        try {
            const { error } = await supabase.from('invoices').update({ status: 'paid', paid_amount: invoice.total_amount }).eq('id', invoice.id);
            if (error) throw new Error(error.message);
            if (invoice.customer_phone) {
                const { data: cust } = await supabase.from('customers').select('id, total_spent').eq('phone', invoice.customer_phone).maybeSingle();
                if (cust) {
                    await supabase.from('customers').update({ total_spent: (Number(cust.total_spent) || 0) + Number(invoice.total_amount || 0) }).eq('id', cust.id);
                }
            }
            setInvoice((prev: any) => ({ ...prev, status: 'paid', paid_amount: invoice.total_amount }));
            fetch('/api/admin/audit-log', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entityType: 'invoice', entityId: invoice.id, action: 'paid', description: `Invoice ${invoice.invoice_number} marked paid` }),
            }).catch(() => {});
        } catch (err: any) {
            showToast('error', 'Failed to mark paid: ' + err.message);
        } finally {
            setMarking(false);
        }
    };

    // PNG export (§9.4). Drawn on a canvas rather than screenshotting the
    // page, so the output is high-resolution and a long invoice extends the
    // image instead of being cropped.
    const exportPng = async () => {
        setExporting(true);
        try {
            await downloadInvoicePng({ ...invoice, bookingNumber });
            showToast('success', 'Invoice image saved.');
        } catch (err: any) {
            showToast('error', 'Could not create the image: ' + (err?.message || 'unknown error'));
        } finally {
            setExporting(false);
        }
    };

    const deleteInvoice = async () => {
        const ok = await confirm({
            title: 'Delete this invoice?',
            body: `Invoice ${invoice.invoice_number} will be permanently deleted. The booking it was raised against is kept, and can be invoiced again later.`,
            confirmLabel: 'Delete invoice',
        });
        if (!ok) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/admin/invoices/${invoice.id}`, { method: 'DELETE' });
            const json = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(json.error || 'Unknown error');
            showToast('success', 'Invoice deleted.');
            router.push('/admin/invoices');
        } catch (err: any) {
            showToast('error', 'Failed to delete invoice: ' + err.message);
            setDeleting(false);
        }
    };

    if (loading) {
        return <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>Loading invoice...</div>;
    }

    if (notFound || !invoice) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', marginBottom: '1rem' }}>Invoice not found.</div>
                <Link href="/admin/invoices" className="admin-btn-secondary">Back to Invoices</Link>
            </div>
        );
    }

    return (
        <div>
            <div className="invoice-print-hide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Link href="/admin/invoices" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                    <ArrowLeft size={16} /> Back to Invoices
                </Link>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                    {invoice.status !== 'paid' && allowed('invoices.edit') && (
                        <button onClick={markPaid} disabled={marking} className="admin-btn-secondary">
                            <CheckCircle2 size={15} /> {marking ? 'Marking...' : 'Mark as Paid'}
                        </button>
                    )}
                    {allowed('comms.send') && (
                        <button onClick={sendInvoiceEmail} disabled={emailing} className="admin-btn-secondary">
                            <Mail size={15} /> {emailing ? 'Sending...' : 'Email to Customer'}
                        </button>
                    )}
                    <button onClick={exportPng} disabled={exporting} className="admin-btn-secondary">
                        <ImageIcon size={15} /> {exporting ? 'Preparing...' : 'Download PNG'}
                    </button>
                    <button onClick={() => window.print()} className="admin-btn-primary">
                        <Download size={15} /> Print / Save as PDF
                    </button>
                    {allowed('invoices.delete') && (
                        <button
                            onClick={deleteInvoice}
                            disabled={deleting}
                            className="admin-btn-secondary"
                            style={{ background: '#fef2f2', borderColor: '#fca5a5', color: '#991b1b' }}
                        >
                            <Trash2 size={15} /> {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                    )}
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '2.5rem', maxWidth: 700, margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div>
                        <div style={{ fontWeight: 900, fontSize: '1.8rem', color: '#0f172a', letterSpacing: '-0.5px' }}>INVOICE</div>
                        <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: 4, fontFamily: 'monospace' }}>{invoice.invoice_number}</div>
                        <div style={{ marginTop: 8 }}>
                            <span className={invoice.status === 'paid' ? 'badge-confirmed' : invoice.status === 'partially_paid' ? 'badge-completed' : 'badge-pending'}>
                                {(invoice.status || 'unpaid').replace('_', ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                            </span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                        {/* The brand's own full-colour mark, from the same geometry the
                            site header uses — not a flattened one-colour stand-in. */}
                        <LogoMark size={46} variant="color" />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>Gulf Trip Service</div>
                            {/* Contact details come from src/lib/contact.ts, the single
                                source of truth the rest of the site already uses, rather
                                than being hardcoded here. */}
                            <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: 4, lineHeight: 1.5 }}>
                                {PHONE_DISPLAY}<br />{EMAIL}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 10 }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>Bill To</div>
                        <div style={{ fontWeight: 700, color: '#1e293b' }}>{invoice.customer_name}</div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 4 }}>{invoice.customer_phone}</div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{invoice.customer_email}</div>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 10 }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 8 }}>Trip Details</div>
                        <div style={{ fontSize: '0.82rem', color: '#334155' }}><span style={{ color: '#10b981', fontWeight: 700 }}>↑</span> {invoice.pickup_location || '—'}</div>
                        <div style={{ fontSize: '0.82rem', color: '#334155', marginTop: 4 }}><span style={{ color: '#f43f5e', fontWeight: 700 }}>↓</span> {invoice.dropoff_location || '—'}</div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 6 }}>{displayDate(invoice.travel_date)} · {invoice.service_type || 'Transportation'}</div>
                    </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
                    <thead><tr style={{ background: '#0f172a', color: '#fff' }}>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, borderRadius: '8px 0 0 8px' }}>Description</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontSize: '0.78rem', fontWeight: 700, borderRadius: '0 8px 8px 0' }}>Amount</th>
                    </tr></thead>
                    <tbody><tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#334155' }}>
                            {invoice.service_type || 'Transportation Service'}<br />
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{bookingNumber ? `Booking Ref: ${bookingNumber}` : ''}</span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{formatMoney(invoice.subtotal ?? invoice.total_amount ?? 0, invoice.currency)}</td>
                    </tr></tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ background: '#0f172a', color: '#fff', padding: '1rem 1.5rem', borderRadius: 10, minWidth: 220 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}><span>Subtotal</span><span>{formatMoney(invoice.subtotal ?? invoice.total_amount ?? 0, invoice.currency)}</span></div>
                        {Number(invoice.tax_amount) > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}><span>Tax</span><span>{formatMoney(invoice.tax_amount, invoice.currency)}</span></div>
                        )}
                        {Number(invoice.discount_amount) > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}><span>Discount</span><span>−{formatMoney(invoice.discount_amount, invoice.currency)}</span></div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: '#fbbf24', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8 }}><span>Total</span><span>{formatMoney(invoice.total_amount ?? 0, invoice.currency)}</span></div>
                        {Number(invoice.paid_amount) > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}><span>Paid</span><span>{formatMoney(invoice.paid_amount, invoice.currency)}</span></div>
                        )}
                    </div>
                </div>
                {invoice.notes && (
                    <div style={{ marginTop: '1.5rem', fontSize: '0.82rem', color: '#64748b' }}>
                        <strong>Notes:</strong> {invoice.notes}
                    </div>
                )}
                {/* Footer — given real hierarchy rather than a single grey line of
                    text with an emoji: a hairline rule, a confident thank-you, and
                    the contact details a customer needs if they have a question
                    about this invoice. */}
                <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.01em' }}>
                        Thank you for travelling with Gulf Trip Service
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 6, lineHeight: 1.6 }}>
                        Questions about this invoice? Call or message {PHONE_DISPLAY} — or email {EMAIL}.
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 14 }}>
                        <span style={{ width: 28, height: 1, background: '#e2e8f0' }} />
                        <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#b8945b', fontWeight: 700 }}>
                            Gulf Trip Service
                        </span>
                        <span style={{ width: 28, height: 1, background: '#e2e8f0' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
