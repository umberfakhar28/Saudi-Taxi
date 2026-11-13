import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { displayDate, displayTime } from '@/lib/datetime';
import { formatMoney } from '@/lib/currency';
import { serviceLabel } from '@/lib/serviceLabels';
import { resolveSender } from '@/lib/emailSender';
import { requireAdmin } from '@/utils/supabase/requireAdmin';
import { TRUSTPILOT_REVIEW_URL, trustpilotBcc } from '@/lib/trustpilot';
import { buildInvoiceDocument, type InvoiceRecord } from '@/lib/invoiceDocument';
import {
    SITE, baseStyle, btnStyle, cardStyle, escapeHtml, headerStyle, noteBlock, row, rowsTable, sendEmail, whatsappStrip, logEmail,
} from '@/lib/emailKit';
import { confirmedEmail, sendReceivedEmail } from '@/lib/bookingNotify';

/**
 * Admin email actions. Layout helpers, the send log and retrying sends live
 * in lib/emailKit; the booking-shaped customer emails in lib/bookingNotify.
 */

const SUPPORTED_TYPES = ['new_booking', 'booking_confirmed', 'booking_completed', 'quote_sent', 'destination_enquiry', 'invoice'] as const;

/**
 * `new_booking` / `destination_enquiry` here mean an admin pressing
 * "Resend booking-received email". The automatic emails for a new booking
 * are sent by /api/bookings/create itself (lib/bookingNotify) the moment the
 * booking is saved, so no public caller is served by this route any more —
 * which is also what closed the "send email as the business to anyone" hole
 * (QA report 13 Nov 2026, B4).
 */
const RESEND_TYPES = ['new_booking', 'destination_enquiry'] as const;

export async function POST(req: Request) {
    const supabase = createAdminClient();

    try {
        const payload = await req.json();
        const { type, bookingData, bookingId, quoteData, invoiceData } = payload;

        if (!SUPPORTED_TYPES.includes(type)) {
            // Previously this fell through every `if` block untouched and
            // still returned {success:true, results:[]} — the caller had no
            // way to tell "sent" from "silently did nothing" (Admin Portal
            // audit §9). An unrecognized type is now a real 400, not a lie.
            return NextResponse.json(
                { error: `Unsupported email type: "${type}". Supported: ${SUPPORTED_TYPES.join(', ')}` },
                { status: 400 }
            );
        }

        // Every type is admin-only. A customer's tab opened before this change
        // may still call new_booking / destination_enquiry after booking; the
        // server has already sent those emails, so that call is a no-op.
        const admin = await requireAdmin();
        const isResend = (RESEND_TYPES as readonly string[]).includes(type);
        if (!admin) {
            if (isResend) {
                return NextResponse.json({ success: true, results: [], skipped: 'Booking emails are sent by the server when the booking is saved.' });
            }
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // A resend always reads the saved row. Other types may pass the
        // record they act on, or its id.
        let b = isResend ? null : bookingData;
        if (!b && (bookingId || (isResend && bookingData?.id))) {
            const { data } = await supabase.from('bookings').select('*').eq('id', bookingId ?? bookingData.id).maybeSingle();
            b = data;
        }

        // One sender identity for every type below. Resolved per request so a
        // corrected environment variable takes effect on the next call, and
        // checked BEFORE anything is sent so a misconfiguration can never
        // reach Resend as a sandbox address.
        const senderResult = resolveSender();
        if (!senderResult.ok) {
            console.error('[EMAIL_CONFIG]', senderResult.message);
            return NextResponse.json({ error: senderResult.message }, { status: 500 });
        }
        const { from, replyTo } = senderResult.sender;

        /**
         * Every outgoing email goes through here, so no call site can omit
         * the from/reply-to pair or drift from the others. Recipients are
         * unchanged — each caller still passes its own.
         */
        const sendMail = async (to: string, subject: string, html: string, bcc?: string) => {
            // Retries a transient failure twice before giving up (emailKit).
            const r = await sendEmail({ from, replyTo, to, subject, html, bcc });
            return { data: r.id ? { id: r.id } : null, error: r.error ? { message: r.error } : null };
        };

        /**
         * A customer's address, or null when none was recorded.
         *
         * Email is optional for a customer (migration 006) — this business
         * reaches people on WhatsApp, and plenty of bookings arrive by phone
         * with no address at all. Every customer-facing send below asks for
         * this first rather than handing Resend an empty recipient, which
         * would fail the request and then fail again writing the email_logs
         * row (recipient_email is NOT NULL there, and rightly so).
         */
        const recipient = (value: unknown): string | null => {
            const addr = typeof value === 'string' ? value.trim() : '';
            return addr || null;
        };

        /** What the admin is told when there is nowhere to send. */
        const NO_EMAIL = 'This customer has no email address on file. Share it on WhatsApp instead.';

        const results: Array<Record<string, unknown>> = [];

        // ─── RESEND "WE RECEIVED YOUR BOOKING" ─────────────────────────
        // Customer copy only, in the booking's own language, ignoring the
        // automatic-email limits: an admin chose to send it.
        if (isResend) {
            if (!b) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
            const outcome = await sendReceivedEmail(supabase, b, { force: true });
            if (outcome.status !== 'sent') {
                return NextResponse.json({ error: outcome.reason }, { status: outcome.status === 'skipped' ? 422 : 502 });
            }
            results.push({ customer: outcome.to });
        }

        // ─── BOOKING CONFIRMED ─────────────────────────────────────────
        if (type === 'booking_confirmed') {
            if (!b) return NextResponse.json({ error: 'bookingData or a resolvable bookingId is required' }, { status: 400 });

            // English or Arabic, following the language the customer booked in.
            const { subject, html } = confirmedEmail(b);
            const confirmTo = recipient(b.customer_email);
            if (!confirmTo) return NextResponse.json({ error: NO_EMAIL }, { status: 422 });
            const { data: r, error: e } = await sendMail(confirmTo, subject, html);
            await logEmail(supabase, b.id || bookingId, type, confirmTo, subject, r?.id || null, e ? 'failed' : 'sent', e?.message, from);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        // ─── BOOKING COMPLETED ─────────────────────────────────────────
        if (type === 'booking_completed') {
            if (!b) return NextResponse.json({ error: 'bookingData or a resolvable bookingId is required' }, { status: 400 });

            const subject = `Trip Completed – Thank You! | Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">🚗 Trip Completed</p></div>
                <p style="color:#475569;">Dear <strong>${escapeHtml(b.customer_name)}</strong>,</p>
                <p style="color:#475569;">Thank you for travelling with Gulf Trip Service! We hope you had a great experience. An invoice has been generated for your records.</p>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-top:20px;text-align:center;">
                    <p style="color:#0f172a;font-weight:700;margin:0 0 6px;font-size:1rem;">How did we do?</p>
                    <p style="color:#475569;margin:0 0 16px;font-size:0.9rem;">Your review helps other travellers choose with confidence — it takes a minute.</p>
                    <a href="${TRUSTPILOT_REVIEW_URL}" style="${btnStyle}">⭐ Leave a review on Trustpilot</a>
                </div>
                <p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">Book your next trip at any time.</p>
            </div></div>`;
            // Blind-copied to the Trustpilot invite address so Trustpilot
            // sends its own invitation to this customer as well.
            const completedTo = recipient(b.customer_email);
            if (!completedTo) return NextResponse.json({ error: NO_EMAIL }, { status: 422 });
            const { data: r, error: e } = await sendMail(completedTo, subject, html, trustpilotBcc() ?? undefined);
            await logEmail(supabase, b.id || bookingId, type, completedTo, subject, r?.id || null, e ? 'failed' : 'sent', e?.message, from);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        // ─── QUOTE SENT ────────────────────────────────────────────────
        if (type === 'quote_sent') {
            if (!quoteData) return NextResponse.json({ error: 'quoteData is required' }, { status: 400 });
            const q = quoteData;
            const finalAmount = q.admin_override_amount ?? q.total_amount;
            const subject = `Your Price Quote – Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">📋 Price Quote</p></div>
                ${whatsappStrip(`Hi, about the quote you sent me${q.pickup_location ? ` for ${q.pickup_location}` : ''}${q.dropoff_location ? ` to ${q.dropoff_location}` : ''}.`)}
                <p style="color:#475569;">Dear <strong>${escapeHtml(q.customer_name)}</strong>,</p>
                <p style="color:#475569;">Here is your price estimate for your requested trip:</p>
                ${rowsTable([
                    row('From', q.pickup_location),
                    row('To', q.dropoff_location),
                    row('Vehicle', q.vehicle_type),
                    row('Distance', q.distance_km ? `${q.distance_km} km` : ''),
                    row('Date', displayDate(q.travel_date as string | null | undefined, 'TBD')),
                    row('Time', displayTime(q.travel_time as string | null | undefined, 'TBD')),
                ].join(''))}
                <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-top:16px;text-align:center;">
                    <p style="color:#94a3b8;margin:0;font-size:0.8rem;">QUOTED PRICE</p>
                    <p style="color:#0f172a;font-size:1.8rem;font-weight:800;margin:8px 0 0;">${formatMoney(Number(finalAmount ?? 0), q.currency as string | null | undefined)}</p>
                </div>
                ${noteBlock('A note from our team', q.admin_note as string | null | undefined, '#fbf6ec', '#b8945b', '#8a6a35')}
                ${noteBlock('Your trip requirements', q.notes as string | null | undefined, '#f8fafc', '#94a3b8', '#64748b')}
                <p style="color:#94a3b8;font-size:0.8rem;margin-top:16px;">To accept this quote, reply to this email or message us on WhatsApp.</p>
            </div></div>`;
            const quoteTo = recipient(q.customer_email);
            if (!quoteTo) return NextResponse.json({ error: NO_EMAIL }, { status: 422 });
            const { data: r, error: e } = await sendMail(quoteTo, subject, html);
            await logEmail(supabase, null, type, quoteTo, subject, r?.id || null, e ? 'failed' : 'sent', e?.message, from);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        // ─── INVOICE ───────────────────────────────────────────────────
        // Previously called from the Bookings page's invoice modal with no
        // matching handler at all — the request "succeeded" and emailed
        // nothing (Admin Portal audit §9). Real handler, real invoice line
        // item + total, sent to the invoice's own customer_email.
        if (type === 'invoice') {
            if (!invoiceData) return NextResponse.json({ error: 'invoiceData is required' }, { status: 400 });
            const inv = invoiceData;
            // Built from the same model as the invoice page, the preview and
            // the PNG/PDF, so the four cannot disagree about what is owed,
            // what the trip was, or how it was paid.
            const d = buildInvoiceDocument(inv as InvoiceRecord);
            const headline = d.totalRows.find((r) => r.kind === 'balance')
                ?? d.totalRows.find((r) => r.kind === 'total');
            const subject = `Invoice ${inv.invoice_number} – Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">🧾 Invoice ${escapeHtml(d.number)}</p></div>
                <p style="color:#475569;">Dear <strong>${escapeHtml(d.billToName)}</strong>,</p>
                <p style="color:#475569;">Please find your invoice details below.</p>
                ${rowsTable([
                    row('Invoice #', d.number),
                    row('Booking Ref', inv.booking_number),
                    row('From', d.pickup),
                    row('To', d.dropoff),
                    row('Pickup', d.outboundWhen),
                    // Only present on a return booking; dropped entirely otherwise.
                    row('Return', d.returnWhen),
                    row('Service', serviceLabel(inv.service_type)),
                    ...d.tripDetails.map((t) => row(t.label, t.value)),
                    row('Status', d.statusLabel),
                    row('Payment method', d.paymentMethod),
                    row('Payment due', d.settled ? '' : d.dueOn),
                ].join(''))}
                <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-top:16px;text-align:center;">
                    <p style="color:#94a3b8;margin:0;font-size:0.8rem;">${escapeHtml((d.settled ? 'Amount paid' : headline?.label ?? 'Total').toUpperCase())}</p>
                    <p style="color:#0f172a;font-size:1.8rem;font-weight:800;margin:8px 0;">${escapeHtml(headline?.value ?? '')}</p>
                </div>
                ${d.totalRows.length > 2 ? `<table style="width:100%;border-collapse:collapse;margin-top:14px;">${d.totalRows.map((r) => `
                    <tr><td style="padding:6px 4px;color:${r.kind === 'total' ? '#0f172a' : '#94a3b8'};font-size:13px;font-weight:${r.kind === 'total' ? 700 : 400};">${escapeHtml(r.label)}</td>
                    <td style="padding:6px 4px;text-align:right;color:${r.kind === 'total' ? '#0f172a' : '#475569'};font-size:13px;font-weight:${r.kind === 'total' || r.kind === 'balance' ? 700 : 400};">${escapeHtml(r.value)}</td></tr>`).join('')}</table>` : ''}
                ${d.notes.map((n) => noteBlock(n.label, n.text, n.tone === 'accent' ? '#fbf6ec' : '#f8fafc', n.tone === 'accent' ? '#b8945b' : '#94a3b8', n.tone === 'accent' ? '#8a6a35' : '#64748b')).join('')}
                <p style="margin-top:20px;text-align:center;"><a href="${SITE}/admin/invoices/${encodeURIComponent(String(inv.invoice_db_id || inv.id || ''))}" style="${btnStyle}">View Invoice</a></p>
                <p style="color:#94a3b8;font-size:0.8rem;margin-top:16px;">${escapeHtml(d.footerNote)} For any queries about this invoice, reply to this email or contact us on WhatsApp.</p>
            </div></div>`;
            const invoiceTo = recipient(inv.customer_email);
            if (!invoiceTo) return NextResponse.json({ error: NO_EMAIL }, { status: 422 });
            const { data: r, error: e } = await sendMail(invoiceTo, subject, html);
            await logEmail(supabase, inv.booking_id || bookingId || null, type, invoiceTo, subject, r?.id || null, e ? 'failed' : 'sent', e?.message, from);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        return NextResponse.json({ success: true, results });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error('Email error:', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
