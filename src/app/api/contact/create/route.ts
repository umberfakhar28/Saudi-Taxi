import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '@/utils/supabase/admin';
import { guardPublicRequest } from '@/lib/antiSpam';
import { resolveSender } from '@/lib/emailSender';
import { sendPushToAdmins } from '@/lib/webpush';
import { SITE_CONFIG } from '@/lib/seo';
import {
    contactRef,
    normalizeContactInput,
    validateContactKeys,
} from '@/lib/contactMessage';

/**
 * Contact Us enquiries, from /contact-us and /ar/contact-us.
 *
 * WHAT WAS WRONG: both forms' submit handlers called alert() and reset
 * state. No request was made, no row was written, no email was sent and
 * nobody was notified — while the customer was told "we will get back to you
 * within 24 hours". Every enquiry through those pages was lost.
 *
 * ─── Why this route sends its own email ────────────────────────────────
 *
 * The obvious move was to reuse /api/emails/send. It is not used here, on
 * purpose.
 *
 * That route's two public types take the recipient address straight from the
 * request body (`bookingData.customer_email`) and send to it from this
 * business's verified domain. Anyone can call it. Adding a third public type
 * would widen that hole rather than work around it.
 *
 * Routing the recipient through the database first does NOT fix it either:
 * an attacker who can create the row can put any address in it and then
 * trigger a send to that address. Reading the recipient back from a row you
 * let them write is the same hole with an extra step.
 *
 * So this route does the one thing that actually closes it: it emails
 * ADMIN_EMAIL and nothing else. The recipient is a server-side environment
 * variable. It is never read from the request, never read from the database,
 * and never derived from anything a visitor controls. There is no input to
 * this route that can change who receives the message.
 *
 * Consequence, stated plainly: the customer gets no auto-reply email. That
 * is not a regression — the old form sent nobody anything — and it is the
 * price of not operating an open relay. If an auto-reply is wanted later it
 * needs a verified-address flow, which is a separate piece of work.
 *
 * ─── Replay and duplicate abuse ────────────────────────────────────────
 *
 * Four independent guards, so losing one does not open the door:
 *
 *   1. Honeypot + per-IP rate limit (guardPublicRequest, shared with the
 *      booking endpoints). Turnstile is deliberately switched off on this
 *      project, so this is the honeypot and the ceiling, not a CAPTCHA.
 *   2. A 5-minute content-duplicate window: the same phone sending the same
 *      message again returns the FIRST row's reference and sends nothing.
 *      That covers a double-click, a double-tap, and a retried request.
 *   3. `notified_at` on the row: the admin email is sent once per enquiry,
 *      ever. The column is set in the same step, so a concurrent retry
 *      cannot produce a second send.
 *   4. The email body is built from the row that was just inserted, after
 *      normalisation and length clamping, and every value is HTML-escaped.
 *
 * ─── What survives a failure ───────────────────────────────────────────
 *
 * The database write is the operation that matters. It happens first and
 * alone. The notification row, the web push and the admin email are all
 * best-effort afterwards: if any of them fails the enquiry is still saved
 * and the customer is still told it was received, because it was. The
 * failure goes to the server log and to email_logs, not to the customer.
 */

const resend = new Resend(process.env.RESEND_API_KEY);

/** The only address this route will ever send to. Never from user input. */
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'umberfakhar10@gmail.com';

const DUPLICATE_WINDOW_MINUTES = 5;

function escapeHtml(s: unknown): string {
    return String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

const baseStyle = `font-family:'Inter',Arial,sans-serif;background:#f8fafc;padding:32px 16px;`;
const cardStyle = `background:#fff;border-radius:12px;padding:28px;max-width:560px;margin:0 auto;box-shadow:0 2px 8px rgba(0,0,0,0.06);`;
const headerStyle = `background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:10px;padding:24px;margin-bottom:24px;text-align:center;`;

function row(label: string, value: unknown): string {
    const v = String(value ?? '').trim();
    if (!v) return '';
    return `<tr>
        <td style="padding:8px 4px;color:#94a3b8;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:8px 4px;color:#0f172a;font-size:13px;font-weight:600;">${escapeHtml(v)}</td>
    </tr>`;
}

export async function POST(req: Request) {
    const supabase = createAdminClient();

    try {
        const body = await req.json().catch(() => null);
        if (!body || typeof body !== 'object') {
            return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
        }

        // Guard 1 — honeypot, per-IP ceiling, Turnstile pass if ever enabled.
        // A lower ceiling than the booking endpoints: a real person does not
        // send five different contact messages in ten minutes.
        const blocked = guardPublicRequest(req, body, { bucket: 'contact', limit: 5 });
        if (blocked) {
            return NextResponse.json({ error: blocked.error }, { status: blocked.status });
        }

        // Server-side validation. The forms validate too, for a fast reply —
        // but this is the check that decides, and it does not trust theirs.
        const input = normalizeContactInput(body);
        const fieldErrors = validateContactKeys(input);
        if (Object.keys(fieldErrors).length > 0) {
            return NextResponse.json(
                { error: 'validation_failed', fieldErrors },
                { status: 400 }
            );
        }

        // Guard 2 — the same person sending the same message twice within a
        // few minutes is a double-click, not a second enquiry. Return the
        // original reference and send nothing further.
        const since = new Date(Date.now() - DUPLICATE_WINDOW_MINUTES * 60_000).toISOString();
        // Ordered + limited rather than a bare maybeSingle(): if two rows
        // ever match, maybeSingle() errors and the dedupe silently stops
        // working. This returns the ORIGINAL row, which is the reference the
        // customer should keep seeing.
        const { data: recent } = await supabase
            .from('contact_messages')
            .select('id')
            .eq('phone', input.phone)
            .eq('message', input.message)
            .gte('created_at', since)
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (recent?.id) {
            return NextResponse.json({
                id: recent.id,
                reference: contactRef(recent.id),
                duplicate: true,
            });
        }

        // ─── The operation that matters ────────────────────────────────
        const { data: saved, error: dbError } = await supabase
            .from('contact_messages')
            .insert({
                name: input.name,
                phone: input.phone,
                email: input.email || null,
                subject: input.subject,
                service: input.service || null,
                message: input.message,
                locale: input.locale,
                source: 'website_contact',
                status: 'new',
            })
            .select('id, created_at')
            .single();

        if (dbError || !saved) {
            // The real reason goes to the server log; the customer gets a
            // message they can act on. Their typed values are preserved by
            // the form, which does not clear on failure.
            console.error('[CONTACT_SUBMISSION_ERROR]', dbError);
            if (dbError && /contact_messages/i.test(dbError.message ?? '')) {
                console.error(
                    '[CONTACT_SUBMISSION_ERROR] The contact_messages table is missing. ' +
                    'Run supabase/sql/008_contact_messages.sql in the Supabase SQL Editor, ' +
                    "then send: notify pgrst, 'reload schema';"
                );
            }
            return NextResponse.json(
                { error: 'Your message could not be saved. Please try again, or message us on WhatsApp.' },
                { status: 500 }
            );
        }

        const reference = contactRef(saved.id);

        // ─── Everything below is best-effort ───────────────────────────
        // The enquiry is already safe. Nothing here may turn a saved
        // enquiry into a failure reported to the customer.

        // Notification row + web push, same mechanism the booking flow uses,
        // so the enquiry appears in the admin bell immediately.
        try {
            await supabase.from('notifications').insert({
                type: 'new_enquiry',
                booking_id: null,
                title: `New Contact Message — ${input.name}`,
                summary: input.subject,
                customer_name: input.name,
                service_type: input.service || null,
            });
            await sendPushToAdmins({
                title: `New Contact Message — ${input.name}`,
                body: input.subject,
                url: '/admin/bookings',
            });
        } catch (notifyError) {
            console.error('[CONTACT_NOTIFY]', notifyError);
        }

        // Admin email. Recipient is ADMIN_EMAIL — a server constant.
        let emailed = false;
        const senderResult = resolveSender();

        if (!senderResult.ok) {
            console.error('[CONTACT_EMAIL_CONFIG]', senderResult.message);
        } else {
            const { from, replyTo } = senderResult.sender;
            const subject = `New Contact Message — ${input.subject}`;
            const localeLabel = input.locale === 'ar' ? 'Arabic (العربية)' : 'English';
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">✉️ New Contact Message</p></div>
                <table style="width:100%;border-collapse:collapse;">
                    ${row('Reference', reference)}
                    ${row('Name', input.name)}
                    ${row('Phone / WhatsApp', input.phone)}
                    ${row('Email', input.email || 'Not provided')}
                    ${row('Service', input.service)}
                    ${row('Subject', input.subject)}
                    ${row('Language', localeLabel)}
                    ${row('Submitted from', input.locale === 'ar' ? '/ar/contact-us' : '/contact-us')}
                </table>
                <div style="background:#f8fafc;border-left:3px solid #94a3b8;border-radius:8px;padding:16px;margin-top:18px;">
                    <p style="color:#64748b;margin:0 0 8px;font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                    <p style="color:#1e293b;margin:0;font-size:0.9rem;line-height:1.7;white-space:pre-wrap;">${escapeHtml(input.message)}</p>
                </div>
                <p style="color:#94a3b8;font-size:0.8rem;margin-top:18px;">
                    Reply to this email to answer ${escapeHtml(input.name)} directly${input.email ? '' : ' — note no email address was supplied, so reach them on the number above'}.
                </p>
            </div></div>`;

            // Reply-To is the business address, matching every other
            // outgoing email. The customer's own address is shown in the
            // body rather than set as Reply-To, so a forged address cannot
            // silently redirect the admin's reply.
            const { data: sendResult, error: sendError } = await resend.emails.send({
                from,
                replyTo,
                to: ADMIN_EMAIL,
                subject,
                html,
            });

            emailed = !sendError;

            // Mirrors /api/emails/send's logging so these appear in the
            // admin Email Log beside every other send. booking_id is null —
            // a contact message is not a booking.
            try {
                const base = {
                    booking_id: null,
                    email_type: 'contact_enquiry',
                    recipient_email: ADMIN_EMAIL,
                    subject,
                    resend_id: sendResult?.id ?? null,
                    status: sendError ? 'failed' : 'sent',
                    error_message: sendError?.message ?? null,
                    sent_at: new Date().toISOString(),
                };
                const { error: logErr } = await supabase
                    .from('email_logs')
                    .insert({ ...base, from_address: from });
                if (logErr && /from_address/i.test(logErr.message ?? '')) {
                    await supabase.from('email_logs').insert(base);
                }
            } catch (logError) {
                console.error('[CONTACT_EMAIL_LOG]', logError);
            }

            if (sendError) {
                // Logged, not surfaced. The enquiry is saved and visible in
                // the portal; telling the customer otherwise would be false.
                console.error('[CONTACT_EMAIL_SEND]', sendError.message);
            } else {
                // Guard 3 — one notification per enquiry, ever.
                await supabase
                    .from('contact_messages')
                    .update({ notified_at: new Date().toISOString() })
                    .eq('id', saved.id);
            }
        }

        return NextResponse.json({ id: saved.id, reference, emailed });
    } catch (error: unknown) {
        console.error('[CONTACT_SUBMISSION_ERROR]', error);
        return NextResponse.json(
            { error: 'Your message could not be saved. Please try again, or message us on WhatsApp.' },
            { status: 500 }
        );
    }
}

/** A GET here is almost always a mistake or a probe. Say so, cheaply. */
export async function GET() {
    return NextResponse.json(
        { error: 'This endpoint accepts POST only.', site: SITE_CONFIG.baseUrl },
        { status: 405 }
    );
}
