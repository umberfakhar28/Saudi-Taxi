/**
 * The single sending identity for every outgoing transactional email.
 *
 * Why this exists as its own module: the sender used to be one constant with
 * a fallback —
 *
 *     const FROM = process.env.RESEND_FROM_EMAIL || 'Gulf Trip Service <onboarding@resend.dev>';
 *
 * onboarding@resend.dev is Resend's shared sandbox address, which may only
 * deliver to the Resend account owner's own inbox. RESEND_FROM_EMAIL was set
 * to an empty string, and `"" || fallback` yields the fallback because an
 * empty string is falsy — so the variable existed but was inert, and every
 * customer-facing email was rejected with "You can only send testing emails
 * to your own email address". The admin-addressed copies still arrived,
 * because the admin IS the account owner, which is why the failure looked
 * intermittent rather than total.
 *
 * There is deliberately no fallback now. A missing or blank sender is a
 * configuration fault and is reported as one.
 */

import { EMAIL } from './contact';

export interface ResolvedSender {
    /** RFC 5322 sender, e.g. `Gulf Trip Service <info@gulftripservice.com>`. */
    from: string;
    /** Where customer replies land. */
    replyTo: string;
}

export type SenderResolution =
    | { ok: true; sender: ResolvedSender }
    | { ok: false; message: string };

/**
 * Replies go to the business address in src/lib/contact.ts — the same single
 * source of truth the site and the invoice already use, so changing the
 * business email changes it everywhere at once.
 */
export const REPLY_TO_ADDRESS = EMAIL;

/** Resend's shared sandbox sender. Never a valid production sender. */
const SANDBOX_SENDER = 'onboarding@resend.dev';

/**
 * Resolves the sender from the environment, or explains precisely what is
 * wrong. Never throws, so importing this module can never break a build.
 */
export function resolveSender(): SenderResolution {
    const configured = process.env.RESEND_FROM_EMAIL?.trim() ?? '';

    if (!configured) {
        return {
            ok: false,
            message:
                'Email sending is not configured: RESEND_FROM_EMAIL is missing or blank. ' +
                `Set it to "Gulf Trip Service <${EMAIL}>" in the hosting environment and redeploy.`,
        };
    }

    if (configured.toLowerCase().includes(SANDBOX_SENDER)) {
        return {
            ok: false,
            message:
                `RESEND_FROM_EMAIL is set to Resend's sandbox address (${SANDBOX_SENDER}), which can only ` +
                'deliver to the Resend account owner. Set it to an address on the verified ' +
                `gulftripservice.com domain, such as "Gulf Trip Service <${EMAIL}>", and redeploy.`,
        };
    }

    // Accepts both `name@domain` and `Display Name <name@domain>`.
    const address = configured.includes('<')
        ? configured.slice(configured.lastIndexOf('<') + 1, configured.lastIndexOf('>'))
        : configured;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.trim())) {
        return {
            ok: false,
            message:
                `RESEND_FROM_EMAIL ("${configured}") is not a valid sender address. ` +
                `Use the form "Gulf Trip Service <${EMAIL}>".`,
        };
    }

    return { ok: true, sender: { from: configured, replyTo: REPLY_TO_ADDRESS } };
}
