import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { resolveSender } from '@/lib/emailSender';
import { requireAdmin } from '@/utils/supabase/requireAdmin';
import { trustpilotBcc } from '@/lib/trustpilot';
import { sendEmail, logEmail } from '@/lib/emailKit';
import { completedEmail, invoiceEmail, quoteEmail } from '@/lib/adminEmails';
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

/** Largest invoice PDF accepted for attaching, as base64 (~4 MB of PDF). */
const MAX_ATTACHMENT_B64 = 5_500_000;

/**
 * The invoice PDF the admin's browser built (lib/invoiceAttachment — the
 * same generator as Download PDF), checked before it is attached: it must be
 * base64 that decodes to a PDF, of sane size, with a plain file name.
 * Anything else is ignored and the email goes without it.
 */
function pdfAttachment(input: unknown): { filename: string; content: string } | null {
    if (!input || typeof input !== 'object') return null;
    const { filename, content } = input as { filename?: unknown; content?: unknown };
    if (typeof content !== 'string' || typeof filename !== 'string') return null;
    if (content.length < 100 || content.length > MAX_ATTACHMENT_B64 || !/^[A-Za-z0-9+/=\s]+$/.test(content.slice(0, 2000))) return null;
    if (!Buffer.from(content.slice(0, 12), 'base64').toString('latin1').startsWith('%PDF')) return null;
    const safe = filename.replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+/, '').slice(0, 120) || 'Invoice.pdf';
    return { filename: /\.pdf$/i.test(safe) ? safe : `${safe}.pdf`, content: content.replace(/\s+/g, '') };
}

export async function POST(req: Request) {
    const supabase = createAdminClient();

    try {
        const payload = await req.json();
        const { type, bookingData, bookingId, quoteData, invoiceData } = payload;
        const attachment = pdfAttachment(payload.attachment);

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
        const sendMail = async (to: string, subject: string, html: string, bcc?: string, attachments?: { filename: string; content: string }[]) => {
            // Retries a transient failure twice before giving up (emailKit).
            const r = await sendEmail({ from, replyTo, to, subject, html, bcc, attachments });
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

            // Items 9, 10: lib/adminEmails.completedEmail.
            const { subject, html } = completedEmail(b, !!attachment);
            // Blind-copied to the Trustpilot invite address so Trustpilot
            // sends its own invitation to this customer as well.
            const completedTo = recipient(b.customer_email);
            if (!completedTo) return NextResponse.json({ error: NO_EMAIL }, { status: 422 });
            const { data: r, error: e } = await sendMail(completedTo, subject, html, trustpilotBcc() ?? undefined, attachment ? [attachment] : undefined);
            await logEmail(supabase, b.id || bookingId, type, completedTo, subject, r?.id || null, e ? 'failed' : 'sent', e?.message, from);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        // ─── QUOTE SENT ────────────────────────────────────────────────
        if (type === 'quote_sent') {
            if (!quoteData) return NextResponse.json({ error: 'quoteData is required' }, { status: 400 });
            const q = quoteData;
            // Item 7: lib/adminEmails.quoteEmail (full quote in the WhatsApp message).
            const { subject, html } = quoteEmail(q);
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
            // Items 13, 14, 18: lib/adminEmails.invoiceEmail — status badge on the
            // name line, no admin link, PDF attached.
            const { subject, html } = invoiceEmail(inv, !!attachment);
            const invoiceTo = recipient(inv.customer_email);
            if (!invoiceTo) return NextResponse.json({ error: NO_EMAIL }, { status: 422 });
            const { data: r, error: e } = await sendMail(invoiceTo, subject, html, undefined, attachment ? [attachment] : undefined);
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
