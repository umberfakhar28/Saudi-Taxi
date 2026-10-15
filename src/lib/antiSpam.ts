import crypto from 'crypto';

/**
 * Spam protection for the public submission endpoints.
 *
 * Three layers, deliberately independent so losing one doesn't open the door:
 *
 *  1. Cloudflare Turnstile — proves a browser, not a script, filled the form.
 *  2. Honeypot — a field real people never see and never fill.
 *  3. Rate limiting — a ceiling per IP regardless of the above.
 *
 * WHY A "PASS" RATHER THAN THE TURNSTILE TOKEN EVERYWHERE: a Turnstile token
 * can only be redeemed once. One booking submission calls three endpoints
 * (/api/customers/upsert → /api/bookings/create → /api/emails/send), so
 * verifying the same token three times would fail on the second call. The
 * browser instead redeems its token once at /api/antispam/verify and gets a
 * short-lived signed pass, which the three endpoints check. The pass is
 * signed with a key derived from TURNSTILE_SECRET_KEY, so there is no extra
 * secret to configure.
 *
 * FAIL-OPEN BY DESIGN: with TURNSTILE_SECRET_KEY unset, the pass check is
 * skipped entirely and bookings keep working. The honeypot and rate limit
 * still apply, since neither needs a key. That makes this safe to deploy
 * before the Cloudflare keys exist — but it also means a half-configured
 * deployment (site key on the client, secret missing on the server) is
 * protected by two layers, not three.
 */

const PASS_TTL_MS = 15 * 60 * 1000;
const PASS_HEADER = 'x-gts-pass';
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export function turnstileConfigured(): boolean {
    return !!process.env.TURNSTILE_SECRET_KEY?.trim();
}

function signingKey(): string {
    // Derived, not reused directly: the pass signature never exposes the
    // Turnstile secret even if a signed pass is inspected.
    return crypto.createHash('sha256').update(`gts-pass:${process.env.TURNSTILE_SECRET_KEY ?? ''}`).digest('hex');
}

/** Checks a Turnstile token with Cloudflare. Returns null on success, or a reason. */
export async function verifyTurnstileToken(token: string, ip?: string | null): Promise<string | null> {
    const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
    if (!secret) return null; // not configured — nothing to verify against

    if (!token) return 'missing-token';

    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set('remoteip', ip);

    try {
        const res = await fetch(VERIFY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });
        const json = (await res.json()) as { success?: boolean; 'error-codes'?: string[] };
        if (json.success) return null;
        return (json['error-codes'] ?? ['verification-failed']).join(',');
    } catch (err) {
        // Cloudflare unreachable. Refusing every booking because a third
        // party is down would cost more than it protects, so this is logged
        // and allowed through — the honeypot and rate limit still apply.
        console.warn('[ANTISPAM] Turnstile verification could not be reached; allowing the request.', err);
        return null;
    }
}

/** A short-lived signed token the public endpoints accept. */
export function issuePass(): string {
    const exp = Date.now() + PASS_TTL_MS;
    const nonce = crypto.randomBytes(9).toString('base64url');
    const sig = crypto.createHmac('sha256', signingKey()).update(`${exp}.${nonce}`).digest('base64url');
    return `${exp}.${nonce}.${sig}`;
}

function passIsValid(pass: string | null): boolean {
    if (!pass) return false;
    const parts = pass.split('.');
    if (parts.length !== 3) return false;
    const [expRaw, nonce, sig] = parts;
    const exp = Number(expRaw);
    if (!Number.isFinite(exp) || exp < Date.now()) return false;

    const expected = crypto.createHmac('sha256', signingKey()).update(`${expRaw}.${nonce}`).digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/**
 * The guard for a public endpoint. Returns null when the request may proceed,
 * or a message to refuse it with.
 */
export function checkPass(req: Request): string | null {
    if (!turnstileConfigured()) return null; // fail-open until the keys exist
    return passIsValid(req.headers.get(PASS_HEADER)) ? null : 'Verification required. Please reload the page and try again.';
}

/** True when the hidden field a real person never sees came back filled. */
export function honeypotTripped(body: unknown): boolean {
    const value = (body as { website?: unknown } | null)?.website;
    return typeof value === 'string' && value.trim() !== '';
}

export function clientIp(req: Request): string {
    const fwd = req.headers.get('x-forwarded-for');
    return (fwd ? fwd.split(',')[0] : req.headers.get('x-real-ip'))?.trim() || 'unknown';
}

/**
 * Per-IP ceiling, held in the instance's memory.
 *
 * Honest about what this is: serverless instances each keep their own
 * counter and lose it when they shut down, so this is a speed bump against
 * a flood from one address, not a guarantee. It costs nothing and needs no
 * extra service; if volume ever justifies it, move the counter to Postgres
 * or a KV store without changing any call site.
 */
const hits = new Map<string, number[]>();

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);

    if (hits.size > 5000) {
        // Keep the map from growing without bound on a long-lived instance.
        for (const [k, times] of hits) {
            if (times.every((t) => now - t >= windowMs)) hits.delete(k);
        }
    }
    return recent.length > limit;
}

/** The standard guard for the public booking/email endpoints. */
export function guardPublicRequest(
    req: Request,
    body: unknown,
    { limit = 12, windowMs = 10 * 60 * 1000, bucket = 'public' } = {}
): { status: number; error: string } | null {
    if (honeypotTripped(body)) {
        return { status: 400, error: 'Request rejected.' };
    }
    if (rateLimited(`${bucket}:${clientIp(req)}`, limit, windowMs)) {
        return { status: 429, error: 'Too many requests. Please wait a few minutes and try again.' };
    }
    const passError = checkPass(req);
    if (passError) {
        return { status: 403, error: passError };
    }
    return null;
}
