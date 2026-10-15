import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import type { SupabaseClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/utils/supabase/admin';
import { displayDate, displayDateTime, displayTime } from '@/lib/datetime';
import { formatMoney } from '@/lib/currency';
import { serviceLabel } from '@/lib/serviceLabels';
import { resolveSender } from '@/lib/emailSender';
import { requireAdmin } from '@/utils/supabase/requireAdmin';
import { sendPushToAdmins } from '@/lib/webpush';
import { SITE_CONFIG } from '@/lib/seo';
import { TRUSTPILOT_REVIEW_URL, trustpilotBcc } from '@/lib/trustpilot';
import { guardPublicRequest } from '@/lib/antiSpam';
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from '@/lib/contact';

/**
 * Writes the row the Admin Portal's realtime subscription and notification
 * bell read (NotificationProvider.tsx), and best-effort pushes it to any
 * subscribed browser. Called from this route rather than a DB trigger
 * because this is already the one trusted server-side code path that runs
 * at the exact moment a customer submits a booking or enquiry — adding a
 * trigger/webhook would duplicate that for no benefit (Admin Portal audit
 * §3, §11).
 */
async function createNotification(
    supabase: ReturnType<typeof createAdminClient>,
    type: 'new_booking' | 'new_enquiry',
    b: Record<string, unknown>,
    title: string
) {
    try {
        const { data } = await supabase
            .from('notifications')
            .insert({
                type,
                booking_id: (b.id as string) || null,
                title,
                summary: `${b.pickup_location ?? ''} → ${b.dropoff_location ?? ''}`.trim(),
                customer_name: b.customer_name ?? null,
                pickup_location: b.pickup_location ?? null,
                dropoff_location: b.dropoff_location ?? null,
                travel_date: b.travel_date ?? null,
                travel_time: b.travel_time ?? null,
                passengers_count: b.passengers_count ?? null,
                service_type: b.service_type ?? null,
            })
            .select('id')
            .single();

        await sendPushToAdmins({
            title,
            body: `${b.customer_name ?? 'A customer'} — ${b.pickup_location ?? ''} → ${b.dropoff_location ?? ''}`,
            url: b.id ? `/admin/bookings?view=${b.id}` : '/admin/bookings',
        });

        return data?.id ?? null;
    } catch {
        // The notifications/push_subscriptions tables may not exist yet if
        // supabase/sql/001_notifications_and_push.sql hasn't been run —
        // never let that block the actual email send.
        return null;
    }
}

// RESEND_API_KEY is read here, in a server-only route handler. It has no
// NEXT_PUBLIC_ prefix, so Next.js never inlines it into the client bundle.
const resend = new Resend(process.env.RESEND_API_KEY);

// The sender identity lives in src/lib/emailSender.ts and is resolved per
// request inside POST(), so a misconfiguration surfaces as a clear error
// instead of silently falling back to Resend's sandbox address.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'umberfakhar10@gmail.com';
/**
 * Base URL for links inside outgoing emails ("View in Admin Panel", "View
 * Invoice").
 *
 * This previously read `process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'`.
 * Whenever that variable was unset on the host — or copied over from
 * .env.local, where localhost is correct — real booking notification emails
 * shipped with admin buttons pointing at localhost, which is unreachable for
 * whoever opens the email. Confirmed happening in production.
 *
 * NEXT_PUBLIC_SITE_URL still wins so a staging/preview deploy can point at
 * itself, but a localhost value is now ignored in production rather than
 * silently breaking every admin link, and the canonical domain is taken from
 * SITE_CONFIG so there's one source of truth rather than a fourth hardcoded
 * copy of it.
 */
function resolveEmailBaseUrl(): string {
    const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '');
    const isLocal = !!configured && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(configured);

    if (!configured) return SITE_CONFIG.baseUrl;

    if (isLocal && process.env.NODE_ENV === 'production') {
        console.warn(
            '[EMAIL_LINKS] NEXT_PUBLIC_SITE_URL is set to a localhost address in production — ' +
            `using ${SITE_CONFIG.baseUrl} for email links instead. Set NEXT_PUBLIC_SITE_URL to the live domain and redeploy.`
        );
        return SITE_CONFIG.baseUrl;
    }

    return configured;
}

const SITE = resolveEmailBaseUrl();

/* ─────────────────────────────────────────────────────────────────────────
   Shared HTML email layout — table-based, not flexbox.
   The old version built each row as a flex <div> (`display:flex;
   justify-content:space-between`). Outlook's rendering engine (Word) and
   several mobile mail clients don't support flexbox at all, so the label
   and value collapsed onto one line with no visible gap — e.g.
   "CustomerTest" instead of "Customer: Test". Tables are the one layout
   primitive that reliably renders the same way across every mail client,
   so every row below is a real <table><tr><td> — label cell, value cell,
   consistent padding, a hairline separator between rows.
   ───────────────────────────────────────────────────────────────────────── */
const baseStyle = `font-family:'Inter',Arial,sans-serif;background:#f8fafc;padding:32px 16px;`;
const cardStyle = `background:#fff;border-radius:12px;padding:28px;max-width:560px;margin:0 auto;box-shadow:0 2px 8px rgba(0,0,0,0.06);`;
const headerStyle = `background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:10px;padding:24px;margin-bottom:24px;text-align:center;`;
const btnStyle = `display:inline-block;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;padding:12px 28px;text-decoration:none;border-radius:8px;font-weight:700;font-size:0.9rem;`;

/** One label/value row inside the details table. Skips cleanly if value is empty. */
function row(label: string, value: unknown): string {
    if (value === null || value === undefined || value === '') return '';
    return `
        <tr>
            <td style="padding:11px 4px;border-bottom:1px solid #f1f5f9;color:#94a3b8;font-size:13px;width:38%;vertical-align:top;">${label}</td>
            <td style="padding:11px 4px;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(String(value))}</td>
        </tr>`;
}

function escapeHtml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function rowsTable(rowsHtml: string): string {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rowsHtml}</table>`;
}

/**
 * A highlighted note in a customer email — the team's message, or the
 * customer's own trip requirements echoed back. Empty notes render nothing.
 * Line breaks the author typed are kept.
 */
function noteBlock(label: string, text: string | null | undefined, tint: string, accent: string, labelColor: string): string {
    const body = String(text ?? '').trim();
    if (!body) return '';
    const html = escapeHtml(body).replace(/\r?\n/g, '<br>');
    return `<div style="background:${tint};border-left:4px solid ${accent};border-radius:8px;padding:14px 16px;margin-top:16px;">
        <p style="color:${labelColor};margin:0 0 6px;font-size:0.72rem;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;">${escapeHtml(label)}</p>
        <p style="color:#0f172a;margin:0;font-size:0.95rem;font-weight:600;line-height:1.55;">${html}</p>
    </div>`;
}

/**
 * The WhatsApp route to a reply, for emails a customer receives.
 *
 * Email replies land in an inbox someone has to open; WhatsApp is where
 * this business actually answers fastest, so the customer is given the
 * link and the number in plain text — the number matters because some
 * mail clients strip or warn on buttons, and it can be dialled or saved
 * by hand.
 *
 * The message is pre-filled with the booking reference so the customer
 * does not have to explain which trip they mean.
 */
function whatsappBlock(prefill: string): string {
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;
    return `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px;margin-top:20px;text-align:center;">
        <p style="color:#166534;font-weight:800;margin:0 0 6px;font-size:1rem;">Need a faster reply?</p>
        <p style="color:#475569;margin:0 0 16px;font-size:0.9rem;">Message us on WhatsApp and we will answer you there.</p>
        <a href="${href}" style="display:inline-block;background:#25c766;color:#ffffff;padding:12px 28px;text-decoration:none;border-radius:8px;font-weight:700;font-size:0.95rem;">💬 Chat with us on WhatsApp</a>
        <p style="color:#64748b;margin:14px 0 0;font-size:0.85rem;">Or save our number: <strong style="color:#0f172a;">${escapeHtml(PHONE_DISPLAY)}</strong></p>
    </div>`;
}

/** A one-line WhatsApp prompt for the top of an email. */
function whatsappStrip(prefill: string): string {
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;
    return `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;margin-bottom:20px;text-align:center;">
        <p style="color:#166534;margin:0 0 10px;font-size:0.92rem;font-weight:700;">For a quick reply, message us on WhatsApp</p>
        <a href="${href}" style="display:inline-block;background:#25c766;color:#ffffff;padding:10px 22px;text-decoration:none;border-radius:8px;font-weight:700;font-size:0.9rem;">💬 Chat about this quote</a>
        <p style="color:#64748b;margin:10px 0 0;font-size:0.8rem;">${escapeHtml(PHONE_DISPLAY)}</p>
    </div>`;
}

/** Booking/enquiry detail rows shared by every booking-shaped email. */
function buildBookingRows(b: Record<string, unknown>): string {
    return rowsTable([
        row('Customer', b.customer_name),
        row('Phone', b.customer_phone),
        row('Email', b.customer_email),
        row('From', b.pickup_location),
        row('To', b.dropoff_location),
        row('Service', serviceLabel(b.service_type as string | null | undefined)),
        row('Vehicle', b.car_type),
        row('Date', displayDate(b.travel_date as string | null | undefined, '')),
        // travel_time arrives as "04:00:00" from the bookings `time` column
        // and "04:00" from the notifications text column; both were printed
        // raw, so 4am and 4pm were indistinguishable in the customer's
        // confirmation and the admin's alert.
        row('Time', displayTime(b.travel_time as string | null | undefined, '')),
        row('Passengers', b.passengers_count),
        // Present on new booking requests only — luggage and the return leg
        // have no booking columns, so the form passes them alongside.
        row('Luggage', b.luggage_count !== undefined && b.luggage_count !== null && b.luggage_count !== '' ? `${b.luggage_count} bag(s)` : ''),
        row('Return Trip', b.return_trip),
        row('Quote Amount', b.quote_amount ? formatMoney(b.quote_amount as number, b.currency as string | null | undefined) : ''),
        row('Notes', b.special_notes),
    ].join(''));
}

async function logEmail(supabase: SupabaseClient, bookingId: string | null, type: string, to: string, subject: string, resendId: string | null, status: 'sent' | 'failed', error?: string, fromAddress?: string) {
    const base = {
        booking_id: bookingId, email_type: type, recipient_email: to,
        subject, status, resend_id: resendId, error_message: error || null,
        sent_at: new Date().toISOString(),
    };

    // Recording the sender makes the log self-sufficient: it previously
    // showed who an email went TO but not what it went out AS, so the
    // sandbox-sender fault could only be diagnosed through the Resend API.
    //
    // from_address arrives with supabase/sql/003. If that migration has not
    // been run yet, the insert is rejected for the unknown column — and
    // because supabase-js returns errors rather than throwing, the row would
    // simply vanish and logging would stop silently. Retry without the
    // column so the log keeps working either side of the migration.
    const { error: withSender } = await supabase
        .from('email_logs')
        .insert({ ...base, from_address: fromAddress ?? null });

    if (withSender && /from_address/i.test(withSender.message ?? '')) {
        console.warn(
            '[EMAIL_LOG] email_logs.from_address is missing — run supabase/sql/003_email_log_and_rls_hardening.sql. ' +
            'Logging the send without its sender for now.'
        );
        const { error: fallback } = await supabase.from('email_logs').insert(base);
        if (fallback) console.error('[EMAIL_LOG] Could not write the send log', fallback);
    } else if (withSender) {
        console.error('[EMAIL_LOG] Could not write the send log', withSender);
    }
}

const SUPPORTED_TYPES = ['new_booking', 'booking_confirmed', 'booking_completed', 'quote_sent', 'destination_enquiry', 'invoice'] as const;

// `new_booking` and `destination_enquiry` are triggered by unauthenticated
// customers right after they submit a public form (BookOnlineClient.tsx,
// DestinationEnquiryForm.tsx) — those two must stay callable without a
// session. The other four are admin-only actions (confirm/complete a
// booking, send a quote, send an invoice) that previously had no auth
// check at all and accepted arbitrary client-supplied data, so anyone
// could POST here directly and send spoofed emails from this business's
// Resend account (Admin Portal audit §15).
const ADMIN_ONLY_TYPES = ['booking_confirmed', 'booking_completed', 'quote_sent', 'invoice'] as const;

export async function POST(req: Request) {
    const supabase = createAdminClient();

    try {
        const payload = await req.json();
        const { type, bookingData, bookingId, quoteData, invoiceData } = payload;

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

        if ((ADMIN_ONLY_TYPES as readonly string[]).includes(type)) {
            const admin = await requireAdmin();
            if (!admin) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
        } else {
            // The two customer-triggered types are the ones a bot can reach,
            // and each one sends two real emails from this business's Resend
            // account. Honeypot, per-IP ceiling and the Turnstile pass apply
            // here; skipped while TURNSTILE_SECRET_KEY is unset.
            const blocked = guardPublicRequest(req, payload, { bucket: 'email', limit: 10 });
            if (blocked) {
                return NextResponse.json({ error: blocked.error }, { status: blocked.status });
            }
        }

        // Fetch booking from DB if only ID provided
        let b = bookingData;
        if (!b && bookingId) {
            const { data } = await supabase.from('bookings').select('*').eq('id', bookingId).single();
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
        const sendMail = (to: string, subject: string, html: string, bcc?: string) =>
            resend.emails.send({ from, replyTo, to, subject, html, ...(bcc ? { bcc } : {}) });

        const results: Array<Record<string, unknown>> = [];

        // ─── NEW BOOKING ───────────────────────────────────────────────
        if (type === 'new_booking') {
            if (!b) return NextResponse.json({ error: 'bookingData or a resolvable bookingId is required' }, { status: 400 });

            const subject = `New Booking Request — ${b.customer_name}`;
            const adminHtml = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">📩 New Booking Request</p></div>
                ${buildBookingRows(b)}
                <p style="margin-top:20px;text-align:center;"><a href="${SITE}/admin/bookings${b.id ? `?view=${b.id}` : ''}" style="${btnStyle}">View in Admin Panel</a></p>
            </div></div>`;
            const { data: r1, error: e1 } = await sendMail(ADMIN_EMAIL, subject, adminHtml);
            await logEmail(supabase, b.id || bookingId, type, ADMIN_EMAIL, subject, r1?.id || null, e1 ? 'failed' : 'sent', e1?.message, from);
            if (e1) return NextResponse.json({ error: `Admin notification failed: ${e1.message}` }, { status: 502 });
            await createNotification(supabase, 'new_booking', b, `New Booking — ${b.customer_name}`);

            const bookingRef = (b.booking_number as string) || (b.id ? String(b.id).slice(0, 8).toUpperCase() : '');
            const custSubject = `Booking Request Received – For a faster reply, message us on WhatsApp`;
            const custHtml = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">✅ Booking Received!</p></div>
                <p style="color:#475569;">Assalamu Alaikum <strong>${escapeHtml(b.customer_name)}</strong>,</p>
                <p style="color:#475569;">We received your booking request for <strong>${escapeHtml(displayDateTime(b.travel_date as string | null | undefined, b.travel_time as string | null | undefined))}</strong>. Our team will review the details and contact you within 30 minutes to confirm your final quote.</p>
                ${buildBookingRows(b)}
                ${whatsappBlock(`Hi, I have just submitted a booking request${bookingRef ? ` (ref ${bookingRef})` : ''} from ${b.pickup_location ?? ''} to ${b.dropoff_location ?? ''}.`)}
                <p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">You can also simply reply to this email.</p>
            </div></div>`;
            const { data: r2, error: e2 } = await sendMail(b.customer_email, custSubject, custHtml);
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, custSubject, r2?.id || null, e2 ? 'failed' : 'sent', e2?.message, from);
            if (e2) return NextResponse.json({ error: `Customer confirmation failed: ${e2.message}`, results: [{ admin: r1?.id }] }, { status: 502 });

            results.push({ admin: r1?.id, customer: r2?.id });
        }

        // ─── BOOKING CONFIRMED ─────────────────────────────────────────
        if (type === 'booking_confirmed') {
            if (!b) return NextResponse.json({ error: 'bookingData or a resolvable bookingId is required' }, { status: 400 });

            const subject = `Your Booking is Confirmed – Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#10b981;font-weight:700;font-size:1.1rem;margin:0;">🎉 Booking Confirmed!</p></div>
                <p style="color:#475569;">Assalamu Alaikum <strong>${escapeHtml(b.customer_name)}</strong>,</p>
                <p style="color:#475569;">Great news! Your booking has been <strong>confirmed</strong>. Here are your trip details:</p>
                ${buildBookingRows(b)}
                ${whatsappBlock(`Hi, about my confirmed booking${b.booking_number ? ` (ref ${b.booking_number})` : ''} from ${b.pickup_location ?? ''} to ${b.dropoff_location ?? ''}.`)}
                <p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">You'll receive a reminder 24 hours before your trip. Thank you for choosing Gulf Trip Service.</p>
            </div></div>`;
            const { data: r, error: e } = await sendMail(b.customer_email, subject, html);
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, subject, r?.id || null, e ? 'failed' : 'sent', e?.message, from);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        // ─── BOOKING COMPLETED ─────────────────────────────────────────
        if (type === 'booking_completed') {
            if (!b) return NextResponse.json({ error: 'bookingData or a resolvable bookingId is required' }, { status: 400 });

            const subject = `Trip Completed – Thank You! | Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">🚗 Trip Completed</p></div>
                <p style="color:#475569;">Dear <strong>${escapeHtml(b.customer_name)}</strong>,</p>
                <p style="color:#475569;">Thank you for travelling with Gulf Trip Service! We hope you had a great experience. An invoice has been generated for your records.</p>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:20px;margin-top:20px;text-align:center;">
                    <p style="color:#0f172a;font-weight:700;margin:0 0 6px;font-size:1rem;">How did we do?</p>
                    <p style="color:#475569;margin:0 0 16px;font-size:0.9rem;">Your review helps other travellers choose with confidence — it takes a minute.</p>
                    <a href="${TRUSTPILOT_REVIEW_URL}" style="${btnStyle}">⭐ Leave a review on Trustpilot</a>
                </div>
                <p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">Book your next trip at any time.</p>
            </div></div>`;
            // Blind-copied to the Trustpilot invite address so Trustpilot
            // sends its own invitation to this customer as well.
            const { data: r, error: e } = await sendMail(b.customer_email, subject, html, trustpilotBcc() ?? undefined);
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, subject, r?.id || null, e ? 'failed' : 'sent', e?.message, from);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        // ─── QUOTE SENT ────────────────────────────────────────────────
        if (type === 'quote_sent') {
            if (!quoteData) return NextResponse.json({ error: 'quoteData is required' }, { status: 400 });
            const q = quoteData;
            const finalAmount = q.admin_override_amount ?? q.total_amount;
            const subject = `Your Price Quote – Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">📋 Price Quote</p></div>
                ${whatsappStrip(`Hi, about the quote you sent me${q.pickup_location ? ` for ${q.pickup_location}` : ''}${q.dropoff_location ? ` to ${q.dropoff_location}` : ''}.`)}
                <p style="color:#475569;">Dear <strong>${escapeHtml(q.customer_name)}</strong>,</p>
                <p style="color:#475569;">Here is your price estimate for your requested trip:</p>
                ${rowsTable([
                    row('From', q.pickup_location),
                    row('To', q.dropoff_location),
                    row('Vehicle', q.vehicle_type),
                    row('Distance', q.distance_km ? `${q.distance_km} km` : ''),
                    row('Date', displayDate(q.travel_date as string | null | undefined, 'TBD')),
                    row('Time', displayTime(q.travel_time as string | null | undefined, 'TBD')),
                ].join(''))}
                <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-top:16px;text-align:center;">
                    <p style="color:#94a3b8;margin:0;font-size:0.8rem;">QUOTED PRICE</p>
                    <p style="color:#0f172a;font-size:1.8rem;font-weight:800;margin:8px 0 0;">${formatMoney(Number(finalAmount ?? 0), q.currency as string | null | undefined)}</p>
                </div>
                ${noteBlock('A note from our team', q.admin_note as string | null | undefined, '#fbf6ec', '#b8945b', '#8a6a35')}
                ${noteBlock('Your trip requirements', q.notes as string | null | undefined, '#f8fafc', '#94a3b8', '#64748b')}
                <p style="color:#94a3b8;font-size:0.8rem;margin-top:16px;">To accept this quote, reply to this email or message us on WhatsApp.</p>
            </div></div>`;
            const { data: r, error: e } = await sendMail(q.customer_email, subject, html);
            await logEmail(supabase, null, type, q.customer_email, subject, r?.id || null, e ? 'failed' : 'sent', e?.message, from);
            if (e) return NextResponse.json({ error: e.message }, { status: 502 });
            results.push({ id: r?.id });
        }

        // ─── DESTINATION ENQUIRY ───────────────────────────────────────
        // Fired from DestinationEnquiryForm.tsx (Popular Destinations
        // pages) — same admin+customer email pair as `new_booking`, but a
        // destination-specific subject line, since a Riyadh/Dubai/Doha
        // enquiry is a browsing lead rather than a firm booking request.
        if (type === 'destination_enquiry') {
            if (!b) return NextResponse.json({ error: 'bookingData or a resolvable bookingId is required' }, { status: 400 });

            const destLabel = b.destination_name || 'Trip';
            const subject = `New ${destLabel} Travel Enquiry`;
            const adminHtml = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">📍 New Destination Enquiry</p></div>
                ${rowsTable(row('Destination', destLabel))}
                ${buildBookingRows(b)}
                <p style="margin-top:20px;text-align:center;"><a href="${SITE}/admin/bookings${b.id ? `?view=${b.id}` : ''}" style="${btnStyle}">View in Admin Panel</a></p>
            </div></div>`;
            const { data: r1, error: e1 } = await sendMail(ADMIN_EMAIL, subject, adminHtml);
            await logEmail(supabase, b.id || bookingId, type, ADMIN_EMAIL, subject, r1?.id || null, e1 ? 'failed' : 'sent', e1?.message, from);
            if (e1) return NextResponse.json({ error: `Admin notification failed: ${e1.message}` }, { status: 502 });
            await createNotification(supabase, 'new_enquiry', b, `New ${destLabel} Enquiry — ${b.customer_name}`);

            const custSubject = `We've Received Your ${destLabel} Enquiry – For a faster reply, message us on WhatsApp`;
            const custHtml = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">✅ Request Received!</p></div>
                <p style="color:#475569;">Assalamu Alaikum <strong>${escapeHtml(b.customer_name)}</strong>,</p>
                <p style="color:#475569;">Thank you for your ${escapeHtml(destLabel)} travel enquiry. Our travel team will review your request and get back to you shortly.</p>
                ${whatsappBlock(`Hi, I have just sent a ${destLabel} travel enquiry.`)}
                <p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">You can also simply reply to this email.</p>
            </div></div>`;
            const { data: r2, error: e2 } = await sendMail(b.customer_email, custSubject, custHtml);
            await logEmail(supabase, b.id || bookingId, type, b.customer_email, custSubject, r2?.id || null, e2 ? 'failed' : 'sent', e2?.message, from);
            if (e2) return NextResponse.json({ error: `Customer confirmation failed: ${e2.message}`, results: [{ admin: r1?.id }] }, { status: 502 });

            results.push({ admin: r1?.id, customer: r2?.id });
        }

        // ─── INVOICE ───────────────────────────────────────────────────
        // Previously called from the Bookings page's invoice modal with no
        // matching handler at all — the request "succeeded" and emailed
        // nothing (Admin Portal audit §9). Real handler, real invoice line
        // item + total, sent to the invoice's own customer_email.
        if (type === 'invoice') {
            if (!invoiceData) return NextResponse.json({ error: 'invoiceData is required' }, { status: 400 });
            const inv = invoiceData;
            const subject = `Invoice ${inv.invoice_number} – Gulf Trip Service`;
            const html = `<div style="${baseStyle}"><div style="${cardStyle}">
                <div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">🧾 Invoice ${escapeHtml(String(inv.invoice_number))}</p></div>
                <p style="color:#475569;">Dear <strong>${escapeHtml(inv.customer_name)}</strong>,</p>
                <p style="color:#475569;">Please find your invoice details below.</p>
                ${rowsTable([
                    row('Invoice #', inv.invoice_number),
                    row('From', inv.pickup_location),
                    row('To', inv.dropoff_location),
                    row('Service', serviceLabel(inv.service_type)),
                    row('Date', displayDate(inv.travel_date as string | null | undefined, '')),
                    // The booking and quote emails above already showed a Time
                    // row; the invoice email was the one format that did not.
                    row('Time', displayTime(inv.travel_time as string | null | undefined, '')),
                    row('Status', inv.status ? String(inv.status).replace('_', ' ').toUpperCase() : ''),
                ].join(''))}
                <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-top:16px;text-align:center;">
                    <p style="color:#94a3b8;margin:0;font-size:0.8rem;">TOTAL AMOUNT</p>
                    <p style="color:#0f172a;font-size:1.8rem;font-weight:800;margin:8px 0;">${formatMoney(Number(inv.total_amount ?? 0), inv.currency as string | null | undefined)}</p>
                </div>
                <p style="margin-top:20px;text-align:center;"><a href="${SITE}/admin/invoices/${inv.invoice_db_id || inv.id || ''}" style="${btnStyle}">View Invoice</a></p>
                <p style="color:#94a3b8;font-size:0.8rem;margin-top:16px;">For any queries about this invoice, reply to this email or contact us on WhatsApp.</p>
            </div></div>`;
            const { data: r, error: e } = await sendMail(inv.customer_email, subject, html);
            await logEmail(supabase, inv.booking_id || bookingId || null, type, inv.customer_email, subject, r?.id || null, e ? 'failed' : 'sent', e?.message, from);
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
