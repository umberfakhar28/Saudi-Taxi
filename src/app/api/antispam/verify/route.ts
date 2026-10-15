import { NextResponse } from 'next/server';
import { clientIp, honeypotTripped, issuePass, rateLimited, turnstileConfigured, verifyTurnstileToken } from '@/lib/antiSpam';

/**
 * Redeems a Turnstile token once and returns a short-lived signed pass for
 * the public submission endpoints (see src/lib/antiSpam.ts for why the pass
 * exists rather than re-checking the token on every call).
 *
 * Public by necessity — it is the gate itself — so it carries its own
 * honeypot and rate limit.
 */
export async function POST(req: Request) {
    let body: unknown = null;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
    }

    if (honeypotTripped(body)) {
        return NextResponse.json({ error: 'Request rejected.' }, { status: 400 });
    }

    if (rateLimited(`verify:${clientIp(req)}`, 20, 10 * 60 * 1000)) {
        return NextResponse.json({ error: 'Too many attempts. Please wait a few minutes and try again.' }, { status: 429 });
    }

    if (!turnstileConfigured()) {
        // Nothing to verify against yet — the endpoints fail open to match.
        return NextResponse.json({ pass: null, configured: false });
    }

    const token = typeof (body as { token?: unknown })?.token === 'string' ? (body as { token: string }).token : '';
    const failure = await verifyTurnstileToken(token, clientIp(req));
    if (failure) {
        console.warn('[ANTISPAM] Turnstile rejected a submission:', failure);
        return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 403 });
    }

    return NextResponse.json({ pass: issuePass(), configured: true });
}
