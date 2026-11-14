/**
 * Forwards email received at @gulftripservice.com to the owner's inbox
 * (admin item 20, option B — chosen 14 Nov 2026).
 *
 * The domain's MX record points at Resend's inbound service, which stores
 * every message sent to info@ / booking@ but delivers it nowhere. Resend
 * calls /api/emails/inbound for each one (webhook event `email.received`),
 * and this sends a copy to ADMIN_EMAIL:
 *   · Reply-To is the customer, so pressing Reply in Gmail answers them
 *     directly. (It goes from the owner's own Gmail address.)
 *   · The original HTML (or text) is kept under a short header block saying
 *     who wrote, to which address, and when.
 *   · Attachments and inline images are passed on by URL — Resend fetches
 *     them itself, so nothing large passes through this function.
 *   · Each received email is forwarded once: the forward is logged with the
 *     received id in its subject, and a retried webhook finds that log.
 * Resend's own built-in forward is not used: it cannot set Reply-To, so a
 * reply from Gmail would go back to info@, into Resend, and round again.
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import { resolveSender } from '@/lib/emailSender';
import { ADMIN_EMAIL, escapeHtml, logEmail, resend, sendEmail } from '@/lib/emailKit';

export type ForwardOutcome =
    | { status: 'forwarded'; id: string | null }
    | { status: 'skipped'; reason: string }
    | { status: 'failed'; reason: string };

/** Total attachment size forwarded; Resend's limit per email is 40 MB. */
const MAX_ATTACHMENTS_BYTES = 30 * 1024 * 1024;

const shortId = (id: string) => id.replace(/-/g, '').slice(0, 10);

/** "Ahmed Ali <ahmed@x.com>" → { name: 'Ahmed Ali', address: 'ahmed@x.com' } */
export function parseAddress(value: string): { name: string; address: string } {
    const m = /^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/.exec(value || '');
    if (m) return { name: m[1].trim(), address: m[2].trim() };
    return { name: '', address: (value || '').trim() };
}

async function alreadyForwarded(supabase: SupabaseClient, emailId: string): Promise<boolean> {
    try {
        const { count } = await supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('email_type', 'inbound_forward')
            .eq('status', 'sent')
            .like('subject', `%[#${shortId(emailId)}]`);
        return (count ?? 0) > 0;
    } catch {
        return false;
    }
}

export async function forwardReceivedEmail(supabase: SupabaseClient, emailId: string): Promise<ForwardOutcome> {
    if (!emailId) return { status: 'skipped', reason: 'No email id.' };
    if (await alreadyForwarded(supabase, emailId)) return { status: 'skipped', reason: 'Already forwarded.' };

    const sender = resolveSender();
    if (!sender.ok) return { status: 'failed', reason: sender.message };

    const { data: email, error } = await resend.emails.receiving.get(emailId);
    if (error || !email) return { status: 'failed', reason: error?.message ?? 'Received email not found.' };

    const from = parseAddress(email.from);
    // Mail from our own domain is the site talking to itself (a bounce, a
    // test, an auto-reply); forwarding it could start a loop.
    if (/@(?:[\w-]+\.)*gulftripservice\.com$/i.test(from.address)) {
        return { status: 'skipped', reason: 'Sent from our own domain.' };
    }
    const replyTo = (email.reply_to && email.reply_to[0]) || from.address;

    // Attachments, passed by URL (Resend downloads them when sending).
    const attachments: { filename: string; path: string; contentId?: string; contentType?: string }[] = [];
    let skippedAttachments = 0;
    if (email.attachments?.length) {
        const { data: list } = await resend.emails.receiving.attachments.list({ emailId });
        let total = 0;
        for (const a of list?.data ?? []) {
            total += a.size || 0;
            if (total > MAX_ATTACHMENTS_BYTES) { skippedAttachments++; continue; }
            attachments.push({
                filename: a.filename || `attachment-${attachments.length + 1}`,
                path: a.download_url,
                contentType: a.content_type,
                ...(a.content_disposition === 'inline' && a.content_id ? { contentId: a.content_id.replace(/^<|>$/g, '') } : {}),
            });
        }
    }

    const to = (email.to ?? []).join(', ');
    const when = new Date(email.created_at).toLocaleString('en-GB', { timeZone: 'Asia/Riyadh', dateStyle: 'medium', timeStyle: 'short' });
    const who = from.name ? `${from.name} <${from.address}>` : from.address;
    const subject = `${email.subject?.trim() || '(no subject)'} — from ${from.name || from.address} [#${shortId(emailId)}]`;

    const original = email.html
        ? email.html
        : `<pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(email.text ?? '')}</pre>`;
    const html = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;">
<tr><td style="background:#F5F2EA;border-left:4px solid #B8945B;border-radius:6px;padding:12px 16px;font-size:13px;line-height:1.6;color:#1C2528;">
<strong style="color:#081827;">Received at ${escapeHtml(to || 'gulftripservice.com')}</strong><br>
From: ${escapeHtml(who)}<br>
Date: ${escapeHtml(when)} (Riyadh)<br>
${email.cc?.length ? `Cc: ${escapeHtml(email.cc.join(', '))}<br>` : ''}
<span style="color:#5A6569;">Press <strong>Reply</strong> to answer ${escapeHtml(from.name || from.address)} directly.${skippedAttachments ? ` ${skippedAttachments} large attachment(s) were not forwarded — open the email in Resend → Emails → Receiving.` : ''}</span>
</td></tr></table>
<div style="height:16px;line-height:16px;">&nbsp;</div>
${original}`;

    const result = await sendEmail({
        from: sender.sender.from,
        replyTo,
        to: ADMIN_EMAIL,
        subject,
        html,
        attachments,
    });
    await logEmail(supabase, null, 'inbound_forward', ADMIN_EMAIL, subject, result.id, result.error ? 'failed' : 'sent', result.error ?? undefined, sender.sender.from);
    return result.error ? { status: 'failed', reason: result.error } : { status: 'forwarded', id: result.id };
}
