'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, Download, Mail, CheckCircle2, Image as ImageIcon, Printer, Trash2, Pencil } from 'lucide-react';
import { downloadInvoicePdf, downloadInvoicePng } from '@/lib/invoicePng';
import InvoiceDocumentView from '@/components/admin/InvoiceDocumentView';
import InvoiceForm, {
    invoiceFormFromInvoice,
    invoiceFormToRow,
    type InvoiceFormValues,
} from '@/components/admin/InvoiceForm';
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
    // Which export is running, so each button shows its own progress.
    const [exporting, setExporting] = useState<'png' | 'pdf' | null>(null);
    const [deleting, setDeleting] = useState(false);
    // Non-null while the invoice is being edited; the document view is
    // replaced by the form for as long as it is.
    const [form, setForm] = useState<InvoiceFormValues | null>(null);
    const [savingEdits, setSavingEdits] = useState(false);

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
    // The PDF is the same canvas rendering wrapped in a PDF file, so the two
    // downloads always match — and unlike "Print", it saves a real file.
    const exportDoc = async (kind: 'png' | 'pdf') => {
        setExporting(kind);
        try {
            // booking_number is stored on the invoice itself since migration
             // 007; bookingNumber is the older lookup, kept as the fallback for
             // invoices raised before that.
            const doc = { ...invoice, bookingNumber: invoice.booking_number ?? bookingNumber };
            if (kind === 'pdf') await downloadInvoicePdf(doc);
            else await downloadInvoicePng(doc);
            showToast('success', kind === 'pdf' ? 'Invoice PDF saved.' : 'Invoice image saved.');
        } catch (err: any) {
            showToast('error', 'Could not create the file: ' + (err?.message || 'unknown error'));
        } finally {
            setExporting(null);
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

    // Editing a saved invoice uses the same form as raising one, so a
    // payment method or a part payment can be recorded after the fact
    // without a second, divergent screen to maintain.
    const startEditing = () => setForm(invoiceFormFromInvoice(invoice));

    const saveEdits = async () => {
        if (!form) return;
        if (!form.customer_name.trim()) { showToast('error', 'The invoice needs a customer name.'); return; }
        setSavingEdits(true);
        const row = invoiceFormToRow(form);
        const { error } = await supabase.from('invoices').update(row).eq('id', invoice.id);
        setSavingEdits(false);
        if (error) { showToast('error', 'Could not save the invoice: ' + error.message); return; }
        setInvoice((prev: any) => ({ ...prev, ...row }));
        setForm(null);
        fetch('/api/admin/audit-log', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ entityType: 'invoice', entityId: invoice.id, action: 'updated', description: `Invoice ${invoice.invoice_number} edited` }),
        }).catch(() => {});
        showToast('success', 'Invoice updated.');
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
                    {allowed('invoices.edit') && !form && (
                        <button onClick={startEditing} className="admin-btn-secondary">
                            <Pencil size={15} /> Edit
                        </button>
                    )}
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
                    <button onClick={() => exportDoc('pdf')} disabled={exporting !== null} className="admin-btn-primary">
                        <Download size={15} /> {exporting === 'pdf' ? 'Preparing...' : 'Download PDF'}
                    </button>
                    <button onClick={() => exportDoc('png')} disabled={exporting !== null} className="admin-btn-secondary">
                        <ImageIcon size={15} /> {exporting === 'png' ? 'Preparing...' : 'Download Image'}
                    </button>
                    <button onClick={() => window.print()} className="admin-btn-secondary">
                        <Printer size={15} /> Print
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

            {/* Editing replaces the document with the same form the Bookings
                page raises an invoice through — one form, two entry points. */}
            {form ? (
                <div className="invoice-print-hide" style={{ maxWidth: 760, margin: '0 auto' }}>
                    <InvoiceForm value={form} onChange={setForm} />
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                        <button onClick={() => setForm(null)} disabled={savingEdits} className="admin-btn-secondary">Cancel</button>
                        <button onClick={saveEdits} disabled={savingEdits} className="admin-btn-primary">
                            {savingEdits ? 'Saving…' : 'Save changes'}
                        </button>
                    </div>
                </div>
            ) : (
                <InvoiceDocumentView invoice={{ ...invoice, booking_number: invoice.booking_number ?? bookingNumber }} />
            )}
        </div>
    );
}
