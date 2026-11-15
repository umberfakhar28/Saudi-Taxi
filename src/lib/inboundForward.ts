/**
 * Forwards email received at @gulftripservice.com to the owner's inbox
 * (admin item 20, option B — chosen 14 Nov 2026; reworked 15 Nov 2026).
 *
 * The domain's MX record points at Resend's inbound service, which stores
 * every message sent to info@ / booking@ but delivers it nowhere. Resend
 * calls /api/emails/inbound for each one (webhook event `email.received`),
 * and this sends a copy to ADMIN_EMAIL that reads like the original:
 *   · From:      "Ahmed Ali via Gulf Trip Service" <forwarding@gulftripservice.com>
 *                — the inbox shows who wrote, while the message is still sent
 *                from our verified domain (sending as the customer's own
 *                address would fail SPF/DKIM/DMARC and land in spam). Not
 *                info@: see forwardingAddress().
 *   · Reply-To:  the customer (their own Reply-To if they set one, else
 *                their From), with their name — so pressing Reply in Gmail
 *                addresses the customer, not info@.
 *   · Subject:   the original, untouched (no "Fwd:", no tags).
 *   · Body:      the original HTML and text parts, under a one-line
 *                "From: name <email>" fallback in case a mail app hides
 *                Reply-To. Attachments and inline images are passed on by
 *                URL — Resend fetches them itself.
 *   · Threading: In-Reply-To / References carry the original Message-ID
 *                (and its own thread), so a reply sent from Gmail lands in
 *                the customer's existing conversation, and follow-ups group
 *                together in Gmail.
 *   · Each received email is forwarded once: the email_logs row records the
 *     received id as a [#tag] (in the log only, not in the sent subject), and
 *     a retried webhook finds that row.
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
const logTag = (id: string) => `[#${shortId(id)}]`;

/**
 * The address forwards are sent FROM: forwarding@ on our sending domain, not
 * info@. info@ is set up in the owner's Gmail as a "Send mail as" address,
 * and Gmail treats mail from one of your own addresses as sent by you: it
 * ignores Reply-To, so Reply addressed info@ instead of the customer. A
 * domain address Gmail does not own avoids that. INBOUND_FORWARD_FROM
 * overrides it (an address on the verified domain).
 */
export function forwardingAddress(sendingAddress: string): string {
    const configured = process.env.INBOUND_FORWARD_FROM?.trim();
    if (configured && looksLikeAddress(configured)) return configured;
    const domain = sendingAddress.split('@')[1] || 'gulftripservice.com';
    return `forwarding@${domain}`;
}

/** "Ahmed Ali <ahmed@x.com>" → { name: 'Ahmed Ali', address: 'ahmed@x.com' } */
export function parseAddress(value: string): { name: string; address: string } {
    // The address is the LAST <…>, so a name like `Sara <K> Smith` still parses.
    const v = (value || '').trim();
    const i = v.lastIndexOf('<');
    if (i >= 0 && v.endsWith('>')) {
        return { name: v.slice(0, i).trim().replace(/^"(.*)"$/, '$1').trim(), address: v.slice(i + 1, -1).trim() };
    }
    return { name: '', address: v };
}

const looksLikeAddress = (a: string) => /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(a);

/** A display name made safe for a quoted RFC 5322 phrase: no line breaks,
 *  quotes, angle brackets or backslashes, and not absurdly long. */
export function cleanDisplayName(name: string): string {
    return (name || '')
        .replace(/[\r\n\t]+/g, ' ')
        .replace(/["<>\\]/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim()
        .slice(0, 64)
        .trim();
}

/** `"Name" <address>`, or the bare address when there is no name. */
export function formatAddress(name: string, address: string): string {
    const n = cleanDisplayName(name);
    return n ? `"${n}" <${address}>` : address;
}

/**
 * The forward's From: the customer's name (or address, when they sent none)
 * "via Gulf Trip Service", on our own sending address.
 */
export function forwardFrom(sender: { name: string; address: string }, ourAddress: string): string {
    const who = cleanDisplayName(sender.name) || sender.address;
    return formatAddress(`${who} via Gulf Trip Service`, ourAddress);
}

/** Every <message-id> token in a header value, in order. */
function messageIds(value: string | null | undefined): string[] {
    return (value || '').match(/<[^<>\s]+@[^<>\s]+>/g) ?? [];
}

/** Case-insensitive header lookup; Resend lowercases names, but be safe. */
function header(headers: Record<string, string> | null | undefined, name: string): string {
    if (!headers) return '';
    const key = Object.keys(headers).find((k) => k.toLowerCase() === name);
    const v = key ? headers[key] : '';
    return Array.isArray(v) ? v.join(' ') : String(v ?? '');
}

/**
 * Threading headers for the forward. References is the original thread plus
 * the original message itself; In-Reply-To points at the original. A reply
 * sent from Gmail copies these, so it threads with what the customer sent.
 * Empty when the original carried no usable Message-ID.
 */
export function threadingHeaders(
    messageId: string | null | undefined,
    headers: Record<string, string> | null | undefined,
): Record<string, string> {
    const own = messageIds(messageId || header(headers, 'message-id'))[0];
    if (!own) return {};
    const chain = [...messageIds(header(headers, 'references')), ...messageIds(header(headers, 'in-reply-to')), own];
    const refs = [...new Set(chain)].slice(-20); // keep the header a sane length
    return { 'In-Reply-To': own, References: refs.join(' ') };
}

/** Crude HTML → text, only for when the original had no text part. */
function htmlToText(html: string): string {
    return html
        .replace(/<(style|script|head)[\s\S]*?<\/\1>/gi, '')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/(p|div|tr|h[1-6]|li)>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

async function alreadyForwarded(supabase: SupabaseClient, emailId: string): Promise<boolean> {
    try {
        const { count } = await supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .eq('email_type', 'inbound_forward')
            .eq('status', 'sent')
            .like('subject', `%${logTag(emailId)}`);
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
    const ourAddress = forwardingAddress(parseAddress(sender.sender.from).address);

    const { data: email, error } = await resend.emails.receiving.get(emailId);
    if (error || !email) return { status: 'failed', reason: error?.message ?? 'Received email not found.' };

    const from = parseAddress(email.from);
    // Mail from our own domain is the site talking to itself (a bounce, a
    // test, an auto-reply); forwarding it could start a loop.
    if (/@(?:[\w-]+\.)*gulftripservice\.com$/i.test(from.address)) {
        return { status: 'skipped', reason: 'Sent from our own domain.' };
    }

    // The customer's own Reply-To wins (that is where they asked replies to
    // go); otherwise their From. Either way with a name where we have one.
    // An unusable Reply-To falls back to From rather than failing the send.
    const theirReplyTo = email.reply_to?.length ? parseAddress(email.reply_to[0]) : null;
    const replyTo = theirReplyTo && looksLikeAddress(theirReplyTo.address)
        ? formatAddress(theirReplyTo.name || (theirReplyTo.address === from.address ? from.name : ''), theirReplyTo.address)
        : formatAddress(from.name, from.address);

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

    const who = from.name ? `${from.name} <${from.address}>` : from.address;
    const to = (email.to ?? []).join(', ');
    const subject = email.subject?.trim() || '(no subject)';
    const skippedNote = skippedAttachments
        ? `${skippedAttachments} large attachment(s) were not forwarded — open the email in Resend → Emails → Receiving.`
        : '';

    // The fallback line sits above the original, small and plain, so the
    // message still reads as the customer's own.
    const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#5A6569;border-bottom:1px solid #E4DFD2;padding:0 0 8px;margin:0 0 14px;">
From: <strong style="color:#1C2528;">${escapeHtml(who)}</strong>${to ? ` &nbsp;·&nbsp; to ${escapeHtml(to)}` : ''}${email.cc?.length ? ` &nbsp;·&nbsp; cc ${escapeHtml(email.cc.join(', '))}` : ''}${skippedNote ? `<br>${escapeHtml(skippedNote)}` : ''}
</div>
${email.html || `<pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(email.text ?? '')}</pre>`}`;
    const originalText = email.text || (email.html ? htmlToText(email.html) : '');
    const text = [`From: ${who}${to ? ` · to ${to}` : ''}`, skippedNote, '', originalText].filter((l, i) => l || i === 2).join('\n');

    const result = await sendEmail({
        from: forwardFrom(from, ourAddress),
        replyTo,
        to: ADMIN_EMAIL,
        subject,
        html,
        text,
        headers: threadingHeaders(email.message_id, email.headers),
        attachments,
    });
    // The log keeps the [#tag] that makes a retried webhook a no-op; the
    // email itself goes out under the customer's own subject.
    const logSubject = `${subject} — from ${from.address} ${logTag(emailId)}`;
    await logEmail(supabase, null, 'inbound_forward', ADMIN_EMAIL, logSubject, result.id, result.error ? 'failed' : 'sent', result.error ?? undefined, sender.sender.from);
    return result.error ? { status: 'failed', reason: result.error } : { status: 'forwarded', id: result.id };
}
