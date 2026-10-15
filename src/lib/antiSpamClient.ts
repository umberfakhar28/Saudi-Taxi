import { TURNSTILE_SITE_KEY } from '@/components/TurnstileWidget';

/**
 * Browser half of the spam protection: trade the Turnstile token for the
 * short-lived pass the submission endpoints expect, then put that pass on
 * every request belonging to the same submission.
 *
 * Returns ok:true with pass:null when Turnstile isn't configured, so a form
 * behaves exactly as it did before the keys existed.
 */
export const SPAM_PASS_HEADER = 'x-gts-pass';

export interface SpamPassResult {
    ok: boolean;
    pass: string | null;
    message?: string;
}

export async function getSpamPass(token: string, honeypot: string): Promise<SpamPassResult> {
    if (!TURNSTILE_SITE_KEY) return { ok: true, pass: null };

    if (!token) {
        return {
            ok: false,
            pass: null,
            message: 'Please complete the verification check and try again.',
        };
    }

    try {
        const res = await fetch('/api/antispam/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, website: honeypot }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
            return { ok: false, pass: null, message: json.error || 'Verification failed. Please try again.' };
        }
        return { ok: true, pass: json.pass ?? null };
    } catch {
        return { ok: false, pass: null, message: 'Could not reach the verification service. Please try again.' };
    }
}

/** Request headers for a submission, carrying the pass when there is one. */
export function submissionHeaders(pass: string | null): Record<string, string> {
    return { 'Content-Type': 'application/json', ...(pass ? { [SPAM_PASS_HEADER]: pass } : {}) };
}

/** Shared styling for the hidden field only a bot will fill. */
export const honeypotFieldProps = {
    type: 'text' as const,
    name: 'website',
    tabIndex: -1,
    autoComplete: 'off',
    'aria-hidden': true,
    style: {
        position: 'absolute' as const,
        left: '-9999px',
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: 'none' as const,
    },
};
