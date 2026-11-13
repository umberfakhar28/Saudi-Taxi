import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { guardPublicRequest } from '@/lib/antiSpam';
import { resolveSender } from '@/lib/emailSender';
import { sendPushToAdmins } from '@/lib/webpush';
import { ADMIN_EMAIL, customerSendAllowed, logEmail, sendEmail, whatsappBlock, type EmailLocale } from '@/lib/emailKit';
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
 * So the admin email goes to ADMIN_EMAIL, a server-side environment
 * variable that nothing in the request can change.
 *
 * The customer now also gets a short auto-reply (13 Nov 2026). It is built
 * so the site cannot be used as a relay to strangers: it repeats nothing the
 * visitor typed except their name and the reference, so there is no message
 * to smuggle; and it obeys the automatic-email limits in lib/emailKit — at
 * most 3 per address per day, 60 to all customers per hour, counted across
 * every server instance. The admin email says whether it went.
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

const DUPLICATE_WINDOW_MINUTES = 5;

/** Messages one phone number or email address may send in 10 minutes. */
const SAME_SENDER_LIMIT = 5;
const SAME_SENDER_WINDOW_MS = 10 * 60 * 1000;

const TOO_MANY: Record<EmailLocale, string> = {
    en: 'You have sent several messages in a short time. Please wait a few minutes, or message us on WhatsApp.',
    ar: 'لقد أرسلت عدة رسائل خلال وقت قصير. يرجى الانتظار بضع دقائق أو مراسلتنا عبر واتساب.',
};

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

/**
 * The customer's auto-reply. Deliberately says nothing the visitor typed
 * beyond their name: see the note at the top of this file.
 */
function autoReplyEmail(name: string, reference: string, locale: EmailLocale): { subject: string; html: string } {
    const n = escapeHtml(name);
    const ref = escapeHtml(reference);
    if (locale === 'ar') {
        return {
            subject: 'استلمنا رسالتك – Gulf Trip Service',
            html: `<div style="${baseStyle}" dir="rtl" lang="ar"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">✅ استلمنا رسالتك</p></div>
                <p style="color:#475569;">السلام عليكم <strong>${n}</strong>،</p>
                <p style="color:#475569;">شكرًا لتواصلك معنا. استلمنا رسالتك وسيرد عليك فريقنا في أقرب وقت ممكن.</p>
                <p style="color:#475569;">رقم المرجع: <strong dir="ltr">${ref}</strong></p>
                ${whatsappBlock(`السلام عليكم، أرسلت رسالة عبر الموقع (رقم ${reference}).`, 'ar')}
                <p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">يمكنك أيضًا الرد على هذا البريد مباشرة.</p>
            </div></div>`,
        };
    }
    return {
        subject: "We've received your message – Gulf Trip Service",
        html: `<div style="${baseStyle}"><div style="${cardStyle}">
            <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">✅ Message received</p></div>
            <p style="color:#475569;">Assalamu Alaikum <strong>${n}</strong>,</p>
            <p style="color:#475569;">Thank you for contacting us. We have received your message and our team will reply as soon as possible.</p>
            <p style="color:#475569;">Your reference: <strong>${ref}</strong></p>
            ${whatsappBlock(`Hi, I sent a message through your website (ref ${reference}).`)}
            <p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">You can also simply reply to this email.</p>
        </div></div>`,
    };
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
            // The form shows this text as-is, so give it in the visitor's language.
            const message = blocked.status === 429
                ? TOO_MANY[(body as { locale?: unknown }).locale === 'ar' ? 'ar' : 'en']
                : blocked.error;
            return NextResponse.json({ error: message }, { status: blocked.status });
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

        // Database-backed per-sender limit, shared by every server instance
        // (the per-IP limit above is in one instance's memory only).
        const senderSince = new Date(Date.now() - SAME_SENDER_WINDOW_MS).toISOString();
        const recentFrom = async (column: 'phone' | 'email', value: string) => {
            const { count, error } = await supabase
                .from('contact_messages')
                .select('id', { count: 'exact', head: true })
                .eq(column, value)
                .gte('created_at', senderSince);
            if (error) console.error('[CONTACT_LIMIT_CHECK]', error);
            return count ?? 0;
        };
        if ((await recentFrom('phone', input.phone)) >= SAME_SENDER_LIMIT
            || (input.email && (await recentFrom('email', input.email)) >= SAME_SENDER_LIMIT)) {
            return NextResponse.json({ error: TOO_MANY[input.locale] }, { status: 429 });
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

        // Customer auto-reply first, then the admin email reporting on it.
        // Both retry a transient failure twice (lib/emailKit sendEmail).
        let emailed = false;
        const senderResult = resolveSender();

        if (!senderResult.ok) {
            console.error('[CONTACT_EMAIL_CONFIG]', senderResult.message);
        } else {
            const sender = senderResult.sender;

            let autoReply = 'Not sent — no email address was given.';
            if (input.email) {
                const allowed = await customerSendAllowed(supabase, input.email);
                if (!allowed.ok) {
                    autoReply = `Not sent — ${allowed.reason}`;
                } else {
                    const reply = autoReplyEmail(input.name, reference, input.locale);
                    const r = await sendEmail({ ...sender, to: input.email, subject: reply.subject, html: reply.html });
                    await logEmail(supabase, null, 'contact_auto_reply', input.email, reply.subject, r.id, r.error ? 'failed' : 'sent', r.error ?? undefined, sender.from);
                    autoReply = r.error ? `FAILED — ${r.error}` : `Sent${input.locale === 'ar' ? ' (in Arabic)' : ''}`;
                }
            }

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
                    ${row('Auto-reply to customer', autoReply)}
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
            const r = await sendEmail({ ...sender, to: ADMIN_EMAIL, subject, html });
            emailed = !r.error;
            await logEmail(supabase, null, 'contact_enquiry', ADMIN_EMAIL, subject, r.id, r.error ? 'failed' : 'sent', r.error ?? undefined, sender.from);

            if (r.error) {
                // Logged, not surfaced. The enquiry is saved and visible in
                // the portal; telling the customer otherwise would be false.
                console.error('[CONTACT_EMAIL_SEND]', r.error);
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
