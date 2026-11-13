/**
 * Shared building blocks for every email this site sends: the Resend client,
 * the admin address, the HTML layout pieces, the send log, the admin
 * notification, and a send with automatic retry.
 *
 * Moved out of /api/emails/send so the booking route, the contact route, the
 * trip-reminder job and the admin email route all send the same way — a
 * route file can only export its HTTP handlers.
 *
 * Server-only: reads RESEND_API_KEY and ADMIN_EMAIL.
 */
import { Resend } from 'resend';
import type { SupabaseClient } from '@supabase/supabase-js';
import { displayDate, displayTime } from '@/lib/datetime';
import { formatMoney } from '@/lib/currency';
import { serviceLabel } from '@/lib/serviceLabels';
import { SERVICE_LABELS_AR } from '@/lib/i18n';
import { sendPushToAdmins } from '@/lib/webpush';
import { SITE_CONFIG } from '@/lib/seo';
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from '@/lib/contact';

export type EmailLocale = 'en' | 'ar';

/** 'ar' for an Arabic booking or message, 'en' for anything else. */
export function asLocale(value: unknown): EmailLocale {
    return value === 'ar' ? 'ar' : 'en';
}

/**
 * Writes the row the Admin Portal's realtime subscription and notification
 * bell read (NotificationProvider.tsx), and best-effort pushes it to any
 * subscribed browser. Called from this route rather than a DB trigger
 * because this is already the one trusted server-side code path that runs
 * at the exact moment a customer submits a booking or enquiry — adding a
 * trigger/webhook would duplicate that for no benefit (Admin Portal audit
 * §3, §11).
 */
export async function createNotification(
    supabase: SupabaseClient,
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
export const resend = new Resend(process.env.RESEND_API_KEY);

// The sender identity lives in src/lib/emailSender.ts and is resolved per
// request inside POST(), so a misconfiguration surfaces as a clear error
// instead of silently falling back to Resend's sandbox address.
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'umberfakhar10@gmail.com';
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

export const SITE = resolveEmailBaseUrl();

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
export const baseStyle = `font-family:'Inter',Arial,sans-serif;background:#f8fafc;padding:32px 16px;`;
export const cardStyle = `background:#fff;border-radius:12px;padding:28px;max-width:560px;margin:0 auto;box-shadow:0 2px 8px rgba(0,0,0,0.06);`;
export const headerStyle = `background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:10px;padding:24px;margin-bottom:24px;text-align:center;`;
export const btnStyle = `display:inline-block;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#0f172a;padding:12px 28px;text-decoration:none;border-radius:8px;font-weight:700;font-size:0.9rem;`;

/** One label/value row inside the details table. Skips cleanly if value is empty. */
/**
 * One label/value row. `ltr` keeps numbers, dates, phone numbers and
 * addresses in reading order inside a right-to-left (Arabic) email, where
 * the bidi algorithm would otherwise print "20 Dec 2026" as "Dec 2026 20".
 */
export function row(label: string, value: unknown, ltr = false): string {
    if (value === null || value === undefined || value === '') return '';
    if (ltr) {
        return `
        <tr>
            <td style="padding:11px 4px;border-bottom:1px solid #f1f5f9;color:#94a3b8;font-size:13px;width:38%;vertical-align:top;">${label}</td>
            <td style="padding:11px 4px;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:14px;font-weight:600;vertical-align:top;"><span dir="ltr" style="unicode-bidi:embed;">${escapeHtml(String(value))}</span></td>
        </tr>`;
    }
    return `
        <tr>
            <td style="padding:11px 4px;border-bottom:1px solid #f1f5f9;color:#94a3b8;font-size:13px;width:38%;vertical-align:top;">${label}</td>
            <td style="padding:11px 4px;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(String(value))}</td>
        </tr>`;
}

export function escapeHtml(s: unknown): string {
    return String(s ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function rowsTable(rowsHtml: string): string {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rowsHtml}</table>`;
}

/**
 * A highlighted note in a customer email — the team's message, or the
 * customer's own trip requirements echoed back. Empty notes render nothing.
 * Line breaks the author typed are kept.
 */
export function noteBlock(label: string, text: string | null | undefined, tint: string, accent: string, labelColor: string): string {
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
export function whatsappBlock(prefill: string, locale: EmailLocale = 'en'): string {
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;
    const t = locale === 'ar'
        ? { title: 'تحتاج إلى رد أسرع؟', body: 'راسلنا عبر واتساب وسنرد عليك هناك.', button: '💬 تواصل معنا عبر واتساب', save: 'أو احفظ رقمنا:' }
        : { title: 'Need a faster reply?', body: 'Message us on WhatsApp and we will answer you there.', button: '💬 Chat with us on WhatsApp', save: 'Or save our number:' };
    return `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px;margin-top:20px;text-align:center;">
        <p style="color:#166534;font-weight:800;margin:0 0 6px;font-size:1rem;">${t.title}</p>
        <p style="color:#475569;margin:0 0 16px;font-size:0.9rem;">${t.body}</p>
        <a href="${href}" style="display:inline-block;background:#25c766;color:#ffffff;padding:12px 28px;text-decoration:none;border-radius:8px;font-weight:700;font-size:0.95rem;">${t.button}</a>
        <p style="color:#64748b;margin:14px 0 0;font-size:0.85rem;">${t.save} <strong style="color:#0f172a;" dir="ltr">${escapeHtml(PHONE_DISPLAY)}</strong></p>
    </div>`;
}

/** A one-line WhatsApp prompt for the top of an email. */
export function whatsappStrip(prefill: string): string {
    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;
    return `<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 18px;margin-bottom:20px;text-align:center;">
        <p style="color:#166534;margin:0 0 10px;font-size:0.92rem;font-weight:700;">For a quick reply, message us on WhatsApp</p>
        <a href="${href}" style="display:inline-block;background:#25c766;color:#ffffff;padding:10px 22px;text-decoration:none;border-radius:8px;font-weight:700;font-size:0.9rem;">💬 Chat about this quote</a>
        <p style="color:#64748b;margin:10px 0 0;font-size:0.8rem;">${escapeHtml(PHONE_DISPLAY)}</p>
    </div>`;
}

const ROW_LABELS: Record<EmailLocale, Record<string, string>> = {
    en: {
        customer: 'Customer', phone: 'Phone', email: 'Email', from: 'From', to: 'To', service: 'Service',
        vehicle: 'Vehicle', date: 'Date', time: 'Time', passengers: 'Passengers', luggage: 'Luggage',
        returnTrip: 'Return Trip', quote: 'Quote Amount', notes: 'Notes', bags: 'bag(s)',
    },
    ar: {
        customer: 'العميل', phone: 'الجوال', email: 'البريد الإلكتروني', from: 'من', to: 'إلى', service: 'الخدمة',
        vehicle: 'السيارة', date: 'التاريخ', time: 'الوقت', passengers: 'عدد الركاب', luggage: 'الأمتعة',
        returnTrip: 'رحلة العودة', quote: 'مبلغ العرض', notes: 'ملاحظات', bags: 'حقيبة',
    },
};

/**
 * Booking/enquiry detail rows shared by every booking-shaped email.
 *
 * `includeNotes: false` drops the customer's free-text note. Customer copies
 * of automatic emails leave it out: the customer knows what they wrote, and
 * an automatic email that echoes arbitrary text to whatever address was
 * typed in is exactly what a spammer looks for. The admin copy keeps it.
 */
export function buildBookingRows(b: Record<string, unknown>, locale: EmailLocale = 'en', includeNotes = true): string {
    const L = ROW_LABELS[locale];
    const ltr = locale === 'ar';
    const service = b.service_type as string | null | undefined;
    const luggage = b.luggage_count;
    return rowsTable([
        row(L.customer, b.customer_name),
        row(L.phone, b.customer_phone, ltr),
        row(L.email, b.customer_email, ltr),
        row(L.from, b.pickup_location),
        row(L.to, b.dropoff_location),
        row(L.service, locale === 'ar' && service && SERVICE_LABELS_AR[service] ? SERVICE_LABELS_AR[service] : serviceLabel(service)),
        row(L.vehicle, b.car_type),
        row(L.date, displayDate(b.travel_date as string | null | undefined, ''), ltr),
        // travel_time arrives as "04:00:00" from the bookings `time` column
        // and "04:00" from the notifications text column; both were printed
        // raw, so 4am and 4pm were indistinguishable.
        row(L.time, displayTime(b.travel_time as string | null | undefined, ''), ltr),
        row(L.passengers, b.passengers_count),
        // Luggage and the return leg have no booking columns; they are
        // recovered from the stored notes (see bookingNotify.withDisplayFields).
        row(L.luggage, luggage !== undefined && luggage !== null && luggage !== '' ? `${luggage} ${L.bags}` : ''),
        row(L.returnTrip, b.return_trip, ltr),
        row(L.quote, b.quote_amount ? formatMoney(b.quote_amount as number, b.currency as string | null | undefined) : '', ltr),
        includeNotes ? row(L.notes, b.special_notes) : '',
    ].join(''));
}

export async function logEmail(supabase: SupabaseClient, bookingId: string | null, type: string, to: string, subject: string, resendId: string | null, status: 'sent' | 'failed', error?: string, fromAddress?: string) {
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

/* ───────────────────────── Sending with retry ───────────────────────── */

export interface SendParams {
    from: string;
    replyTo: string;
    to: string;
    subject: string;
    html: string;
    bcc?: string;
}

export interface SendOutcome {
    id: string | null;
    error: string | null;
}

/** Resend errors worth another attempt: rate limits, server errors, network. */
function isTransient(error: { message?: string; name?: string; statusCode?: number | null }): boolean {
    const code = error.statusCode ?? 0;
    if (code === 429 || code >= 500) return true;
    if (code >= 400) return false;
    return !/validation|invalid|missing|restricted|not_found|forbidden|unauthori/i.test(`${error.name ?? ''} ${error.message ?? ''}`);
}

/**
 * Sends one email, retrying a transient failure twice (after 1 s, then 3 s).
 * A permanent failure — a malformed or refused address — is returned at once,
 * since sending it again cannot help. Never throws.
 */
export async function sendEmail(params: SendParams, attempts = 3): Promise<SendOutcome> {
    let last: SendOutcome = { id: null, error: 'Not sent' };
    for (let i = 0; i < attempts; i++) {
        if (i > 0) await new Promise((resolve) => setTimeout(resolve, i === 1 ? 1000 : 3000));
        try {
            const { data, error } = await resend.emails.send({
                from: params.from,
                replyTo: params.replyTo,
                to: params.to,
                subject: params.subject,
                html: params.html,
                ...(params.bcc ? { bcc: params.bcc } : {}),
            });
            if (!error) return { id: data?.id ?? null, error: null };
            last = { id: null, error: error.message };
            if (!isTransient(error as { message?: string; name?: string; statusCode?: number | null })) return last;
        } catch (err) {
            last = { id: null, error: err instanceof Error ? err.message : String(err) };
        }
    }
    return last;
}

/* ───────────────────── Spam limits on customer emails ───────────────────── */

/** Automatic emails a customer receives without anyone at the business acting. */
export const AUTOMATIC_CUSTOMER_EMAILS = ['new_booking', 'destination_enquiry', 'contact_auto_reply'] as const;

const PER_ADDRESS_LIMIT = 3;          // per address, per 24 hours
const PER_ADDRESS_WINDOW_MS = 24 * 60 * 60 * 1000;
const SITE_WIDE_LIMIT = 60;           // all customers together, per hour
const SITE_WIDE_WINDOW_MS = 60 * 60 * 1000;

export type CustomerSendCheck = { ok: true } | { ok: false; reason: string };

/**
 * Whether an automatic email may go to this address now.
 *
 * Every public form can be pointed at someone else's address, and Turnstile
 * is parked, so these limits are what stop the site being used to mail
 * strangers: at most 3 automatic emails per address per day, and at most 60
 * to all customers together per hour. Counted from email_logs, so they hold
 * across every server instance, unlike the in-memory per-IP limit.
 *
 * The booking itself is never refused here — only the automatic email is
 * held back, and the admin email says so.
 */
export async function customerSendAllowed(supabase: SupabaseClient, to: string): Promise<CustomerSendCheck> {
    try {
        const escaped = to.trim().replace(/[\\%_]/g, (c) => `\\${c}`);
        const { count: perAddress } = await supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .ilike('recipient_email', escaped)
            .in('email_type', [...AUTOMATIC_CUSTOMER_EMAILS])
            .eq('status', 'sent')
            .gte('created_at', new Date(Date.now() - PER_ADDRESS_WINDOW_MS).toISOString());
        if ((perAddress ?? 0) >= PER_ADDRESS_LIMIT) {
            return { ok: false, reason: `This address has already received ${PER_ADDRESS_LIMIT} automatic emails in the last 24 hours (spam protection).` };
        }

        const { count: siteWide } = await supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .in('email_type', [...AUTOMATIC_CUSTOMER_EMAILS])
            .neq('recipient_email', ADMIN_EMAIL)
            .eq('status', 'sent')
            .gte('created_at', new Date(Date.now() - SITE_WIDE_WINDOW_MS).toISOString());
        if ((siteWide ?? 0) >= SITE_WIDE_LIMIT) {
            return { ok: false, reason: 'Automatic customer emails are paused: unusually many were sent in the last hour (spam protection).' };
        }
    } catch (err) {
        // The limits protect against abuse; a failed count must not cost a
        // real customer their confirmation. The per-IP limit still applies.
        console.error('[EMAIL_LIMIT_CHECK]', err);
    }
    return { ok: true };
}

/** Push to every subscribed admin browser. Never throws. */
export async function pushAdmins(title: string, body: string, url = '/admin/bookings'): Promise<void> {
    try {
        await sendPushToAdmins({ title, body, url });
    } catch (err) {
        console.error('[ADMIN_PUSH]', err);
    }
}
