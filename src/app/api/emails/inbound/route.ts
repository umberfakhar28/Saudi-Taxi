import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { requireAdmin } from '@/utils/supabase/requireAdmin';
import { resend } from '@/lib/emailKit';
import { forwardReceivedEmail } from '@/lib/inboundForward';

/**
 * Email received at @gulftripservice.com → the owner's inbox (item 20, B).
 *
 * POST — Resend's webhook for `email.received`. The request is verified
 *   against RESEND_WEBHOOK_SECRET (the "Signing secret" Resend shows for
 *   the webhook); anything unsigned or wrongly signed is refused. A failed
 *   forward answers 500 so Resend retries it later; the forward itself is
 *   idempotent (lib/inboundForward).
 *
 * GET ?backfill=1 — signed-in admins only. Forwards emails that arrived
 *   before the webhook existed, a batch at a time (Resend allows about two
 *   API calls a second). Open it in the browser and reload until it says
 *   nothing is left.
 */
export const maxDuration = 60;

export async function POST(req: Request) {
    const secret = process.env.RESEND_WEBHOOK_SECRET?.trim();
    if (!secret) {
        console.error('[INBOUND] RESEND_WEBHOOK_SECRET is not set — cannot verify the webhook.');
        return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
    }

    const payload = await req.text();
    let event: { type?: string; data?: { email_id?: string } };
    try {
        event = resend.webhooks.verify({
            payload,
            headers: {
                id: req.headers.get('svix-id') ?? '',
                timestamp: req.headers.get('svix-timestamp') ?? '',
                signature: req.headers.get('svix-signature') ?? '',
            },
            webhookSecret: secret,
        }) as typeof event;
    } catch {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    if (event.type !== 'email.received') return NextResponse.json({ ignored: event.type ?? 'unknown' });

    const outcome = await forwardReceivedEmail(createAdminClient(), event.data?.email_id ?? '');
    if (outcome.status === 'failed') {
        console.error('[INBOUND] forward failed:', outcome.reason);
        return NextResponse.json({ error: outcome.reason }, { status: 500 });
    }
    return NextResponse.json(outcome);
}

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(req: Request) {
    const url = new URL(req.url);
    if (url.searchParams.get('backfill') !== '1') {
        return NextResponse.json({ ok: true, hint: 'POST is the Resend webhook. Admins: add ?backfill=1 to forward emails received before it was set up.' });
    }
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: 'Sign in to the admin panel first, then open this link again.' }, { status: 401 });

    const supabase = createAdminClient();
    const batch = Math.min(Math.max(parseInt(url.searchParams.get('batch') || '8', 10) || 8, 1), 15);
    const started = Date.now();
    const results: { id: string; status: string; reason?: string }[] = [];
    let after: string | undefined;
    let forwarded = 0;
    let more = true;

    // Oldest first would need the whole list; Resend lists newest first, so
    // walk every page and forward whatever has not been forwarded yet,
    // stopping after `batch` real forwards or ~45 seconds.
    while (more && forwarded < batch && Date.now() - started < 45_000) {
        const { data, error } = await resend.emails.receiving.list({ limit: 50, ...(after ? { after } : {}) });
        if (error || !data) return NextResponse.json({ error: error?.message ?? 'Could not list received emails', results }, { status: 502 });
        for (const e of data.data) {
            if (forwarded >= batch || Date.now() - started > 45_000) { more = true; break; }
            const r = await forwardReceivedEmail(supabase, e.id);
            if (r.status === 'forwarded') { forwarded++; await pause(1200); }
            if (r.status !== 'skipped' || r.reason !== 'Already forwarded.') {
                results.push({ id: e.id, status: r.status, ...(r.status !== 'forwarded' ? { reason: r.reason } : {}) });
            }
        }
        more = data.has_more;
        after = data.data.at(-1)?.id;
        if (!after) more = false;
    }

    const done = !more && forwarded < batch;
    return NextResponse.json({
        forwarded,
        done,
        message: done
            ? `Finished: ${forwarded} forwarded in this run. Everything received so far has now been sent to your inbox.`
            : `${forwarded} forwarded. Reload this page to forward the next batch.`,
        results,
    });
}
