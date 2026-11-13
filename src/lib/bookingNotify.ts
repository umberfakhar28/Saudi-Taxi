/**
 * Everything that happens after a booking or destination enquiry is saved:
 * the admin alert, the customer's "we received it" email, the admin email,
 * and the later customer emails that read the same booking row (confirmed,
 * day-before reminder).
 *
 * ── Why this runs on the server ──
 * These emails used to be a third request made by the customer's browser
 * after the booking was saved. A closed tab or a dropped connection at that
 * moment meant the booking sat in the database with no email, no admin
 * notification and no push — nobody knew it existed. /api/bookings/create
 * now calls notifyNewBooking itself, after responding, so the customer's
 * browser no longer has any part in it.
 *
 * ── Order, and why ──
 *  1. Admin notification + push. First, and independent of email: a Resend
 *     outage used to mean no alert at all, because the notification was only
 *     written after the admin email succeeded.
 *  2. Customer email, with retries, within the spam limits.
 *  3. Admin email, with retries, stating whether step 2 reached the customer
 *     — and an extra push when it did not, so a mistyped address is noticed.
 *
 * Server-only.
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import { resolveSender } from '@/lib/emailSender';
import { bookingRef } from '@/lib/bookingRef';
import { displayDate, displayDateTime, displayTime } from '@/lib/datetime';
import { DESTINATION_ENQUIRY_SERVICE } from '@/lib/bookingValidation';
import {
    ADMIN_EMAIL, SITE, asLocale, baseStyle, btnStyle, buildBookingRows, cardStyle, createNotification,
    customerSendAllowed, escapeHtml, headerStyle, logEmail, pushAdmins, row, rowsTable, sendEmail,
    whatsappBlock, type EmailLocale,
} from '@/lib/emailKit';

type Row = Record<string, unknown>;

export type CustomerEmailOutcome =
    | { status: 'sent'; to: string }
    | { status: 'skipped' | 'failed'; reason: string };

/**
 * Recovers the email-only fields from the stored notes.
 *
 *  · Book Online stores "Luggage: 2 bag(s) | Return: … | customer's note";
 *    luggage and the return leg get rows of their own again.
 *  · A destination enquiry stores "Destination: Dubai, UAE | …"; the
 *    destination names the email. Its notes are left whole.
 */
export function withDisplayFields(row: Row): Row {
    const notes = typeof row.special_notes === 'string' ? row.special_notes : '';
    const parts = notes ? notes.split(' | ') : [];

    if (row.service_type === DESTINATION_ENQUIRY_SERVICE) {
        const first = parts[0] ?? '';
        return { ...row, destination_name: first.startsWith('Destination: ') ? first.slice('Destination: '.length) : null };
    }

    let luggage: string | null = null;
    let returnTrip: string | null = null;
    if ((parts[0] ?? '').startsWith('Luggage: ')) {
        luggage = (parts.shift() ?? '').slice('Luggage: '.length).replace(/ bag\(s\)$/, '');
    }
    if ((parts[0] ?? '').startsWith('Return: ')) {
        returnTrip = (parts.shift() ?? '').slice('Return: '.length);
    }
    return { ...row, luggage_count: luggage, return_trip: returnTrip, special_notes: parts.join(' | ') || null };
}

const isEnquiry = (b: Row) => b.service_type === DESTINATION_ENQUIRY_SERVICE;
const refOf = (b: Row) => (b.booking_number as string) || bookingRef(b.id as string | null | undefined);
const recipientOf = (b: Row): string | null => {
    const addr = typeof b.customer_email === 'string' ? b.customer_email.trim() : '';
    return addr || null;
};
const adminLink = (b: Row) => `${SITE}/admin/bookings${b.id ? `?view=${encodeURIComponent(String(b.id))}` : ''}`;

/** Wraps a card; Arabic emails read right to left. */
function layout(inner: string, locale: EmailLocale): string {
    const dir = locale === 'ar' ? ' dir="rtl" lang="ar"' : '';
    return `<div style="${baseStyle}"${dir}><div style="${cardStyle}">${inner}</div></div>`;
}
const banner = (text: string, color = '#fbbf24') =>
    `<div style="${headerStyle}"><p style="color:${color};font-weight:700;font-size:1.1rem;margin:0;">${text}</p></div>`;
const para = (html: string) => `<p style="color:#475569;">${html}</p>`;
const muted = (html: string) => `<p style="color:#94a3b8;font-size:0.85rem;margin-top:16px;">${html}</p>`;

/* ───────────────────────── Customer templates ───────────────────────── */

/** "We received your booking / enquiry" — the automatic customer email. */
export function receivedEmail(raw: Row): { type: string; subject: string; html: string } {
    const b = withDisplayFields(raw);
    const name = escapeHtml(b.customer_name);

    if (isEnquiry(b)) {
        // Destination pages are English-only, so this one is too.
        const dest = String(b.destination_name || 'Trip');
        return {
            type: 'destination_enquiry',
            subject: `We've Received Your ${dest} Enquiry – For a faster reply, message us on WhatsApp`,
            html: layout(`${banner('✅ Request Received!')}
                ${para(`Assalamu Alaikum <strong>${name}</strong>,`)}
                ${para(`Thank you for your ${escapeHtml(dest)} travel enquiry. Our travel team will review your request and get back to you shortly.`)}
                ${whatsappBlock(`Hi, I have just sent a ${dest} travel enquiry.`)}
                ${muted('You can also simply reply to this email.')}`, 'en'),
        };
    }

    const locale = asLocale(b.locale);
    const ref = refOf(b);
    const when = escapeHtml(displayDateTime(b.travel_date as string | null | undefined, b.travel_time as string | null | undefined));
    const rows = buildBookingRows(b, locale, false);
    // Arabic sentence: no English "at" between date and time.
    const whenAr = escapeHtml([displayDate(b.travel_date as string | null | undefined, ''), displayTime(b.travel_time as string | null | undefined, '')].filter(Boolean).join('، '));

    if (locale === 'ar') {
        return {
            type: 'new_booking',
            subject: 'تم استلام طلب الحجز – للرد الأسرع راسلنا عبر واتساب',
            html: layout(`${banner('✅ تم استلام طلبك!')}
                ${para(`السلام عليكم <strong>${name}</strong>،`)}
                ${para(`استلمنا طلب الحجز الخاص بك بتاريخ <strong dir="ltr">${whenAr}</strong>. سيتواصل معك فريقنا في أقرب وقت لتأكيد السعر النهائي.`)}
                ${ref ? para(`رقم الحجز الخاص بك هو <strong dir="ltr">${escapeHtml(ref)}</strong> — يرجى ذكره عند التواصل معنا.`) : ''}
                ${rows}
                ${whatsappBlock(`السلام عليكم، أرسلت للتو طلب حجز${ref ? ` (رقم ${ref})` : ''} من ${b.pickup_location ?? ''} إلى ${b.dropoff_location ?? ''}.`, 'ar')}
                ${muted('يمكنك أيضًا الرد على هذا البريد مباشرة.')}`, 'ar'),
        };
    }

    return {
        type: 'new_booking',
        subject: 'Booking Request Received – For a faster reply, message us on WhatsApp',
        html: layout(`${banner('✅ Booking Received!')}
            ${para(`Assalamu Alaikum <strong>${name}</strong>,`)}
            ${para(`We received your booking request for <strong>${when}</strong>. Our team will get back to you as soon as possible to confirm your final quote.`)}
            ${ref ? para(`Your booking reference is <strong>${escapeHtml(ref)}</strong> — please quote it when you contact us.`) : ''}
            ${rows}
            ${whatsappBlock(`Hi, I have just submitted a booking request${ref ? ` (ref ${ref})` : ''} from ${b.pickup_location ?? ''} to ${b.dropoff_location ?? ''}.`)}
            ${muted('You can also simply reply to this email.')}`, 'en'),
    };
}

/** "Your booking is confirmed" — sent by an admin. */
export function confirmedEmail(raw: Row): { subject: string; html: string } {
    const b = withDisplayFields(raw);
    const locale = asLocale(b.locale);
    const name = escapeHtml(b.customer_name);
    const ref = refOf(b);
    if (locale === 'ar') {
        return {
            subject: 'تم تأكيد حجزك – Gulf Trip Service',
            html: layout(`${banner('🎉 تم تأكيد الحجز!', '#10b981')}
                ${para(`السلام عليكم <strong>${name}</strong>،`)}
                ${para('يسعدنا إبلاغك بأنه <strong>تم تأكيد</strong> حجزك. هذه تفاصيل رحلتك:')}
                ${buildBookingRows(b, 'ar')}
                ${whatsappBlock(`السلام عليكم، بخصوص حجزي المؤكد${ref ? ` (رقم ${ref})` : ''} من ${b.pickup_location ?? ''} إلى ${b.dropoff_location ?? ''}.`, 'ar')}
                ${muted('ستصلك رسالة تذكير بالبريد الإلكتروني قبل موعد رحلتك بيوم. شكرًا لاختيارك Gulf Trip Service.')}`, 'ar'),
        };
    }
    return {
        subject: 'Your Booking is Confirmed – Gulf Trip Service',
        html: layout(`${banner('🎉 Booking Confirmed!', '#10b981')}
            ${para(`Assalamu Alaikum <strong>${name}</strong>,`)}
            ${para('Great news! Your booking has been <strong>confirmed</strong>. Here are your trip details:')}
            ${buildBookingRows(b)}
            ${whatsappBlock(`Hi, about my confirmed booking${ref ? ` (ref ${ref})` : ''} from ${b.pickup_location ?? ''} to ${b.dropoff_location ?? ''}.`)}
            ${muted("You'll receive a reminder email the day before your trip. Thank you for choosing Gulf Trip Service.")}`, 'en'),
    };
}

/** Day-before reminder for a confirmed trip — sent by the daily job. */
export function reminderEmail(raw: Row): { subject: string; html: string } {
    const b = withDisplayFields(raw);
    const locale = asLocale(b.locale);
    const name = escapeHtml(b.customer_name);
    const ref = refOf(b);
    const date = escapeHtml(displayDate(b.travel_date as string | null | undefined, ''));
    const time = escapeHtml(displayTime(b.travel_time as string | null | undefined, ''));
    if (locale === 'ar') {
        return {
            subject: `تذكير: رحلتك غدًا${time ? ` الساعة ${time}` : ''} – Gulf Trip Service`,
            html: layout(`${banner('🚗 تذكير برحلتك غدًا')}
                ${para(`السلام عليكم <strong>${name}</strong>،`)}
                ${para(`نذكّرك بأن رحلتك المؤكدة موعدها غدًا <strong dir="ltr">${date}${time ? ` ${time}` : ''}</strong>. سيكون السائق في مكان الانطلاق في الموعد المحدد.`)}
                ${buildBookingRows(b, 'ar')}
                ${whatsappBlock(`السلام عليكم، بخصوص رحلتي غدًا${ref ? ` (رقم ${ref})` : ''}.`, 'ar')}
                ${muted('إذا تغيّر أي شيء، راسلنا عبر واتساب أو رد على هذا البريد.')}`, 'ar'),
        };
    }
    return {
        subject: `Reminder: your trip is tomorrow${time ? ` at ${time}` : ''} – Gulf Trip Service`,
        html: layout(`${banner('🚗 Your trip is tomorrow')}
            ${para(`Assalamu Alaikum <strong>${name}</strong>,`)}
            ${para(`A reminder that your confirmed trip is tomorrow, <strong>${date}${time ? ` at ${time}` : ''}</strong>. Your driver will be at the pickup point on time.`)}
            ${buildBookingRows(b)}
            ${whatsappBlock(`Hi, about my trip tomorrow${ref ? ` (ref ${ref})` : ''}.`)}
            ${muted('If anything has changed, message us on WhatsApp or reply to this email.')}`, 'en'),
    };
}

/* ───────────────────────────── Sending ───────────────────────────── */

/**
 * Sends the "we received it" email to the customer and logs it.
 * `force` (an admin pressing Resend) skips the automatic-email limits.
 */
export async function sendReceivedEmail(supabase: SupabaseClient, booking: Row, { force = false } = {}): Promise<CustomerEmailOutcome> {
    const to = recipientOf(booking);
    if (!to) return { status: 'skipped', reason: 'No email address was given.' };

    const sender = resolveSender();
    if (!sender.ok) return { status: 'failed', reason: sender.message };

    if (!force) {
        const allowed = await customerSendAllowed(supabase, to);
        if (!allowed.ok) return { status: 'skipped', reason: allowed.reason };
    }

    const { type, subject, html } = receivedEmail(booking);
    const result = await sendEmail({ ...sender.sender, to, subject, html });
    await logEmail(supabase, (booking.id as string) ?? null, type, to, subject, result.id, result.error ? 'failed' : 'sent', result.error ?? undefined, sender.sender.from);
    return result.error ? { status: 'failed', reason: result.error } : { status: 'sent', to };
}

/** Admin email for a new booking or enquiry, carrying the customer-email result. */
function adminNewBookingEmail(b: Row, customer: CustomerEmailOutcome): { type: string; subject: string; html: string } {
    const enquiry = isEnquiry(b);
    const name = String(b.customer_name ?? '');
    const ref = refOf(b);
    const status = customer.status === 'sent'
        ? `<p style="color:#166534;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 14px;margin:0 0 16px;font-size:0.9rem;">✅ Confirmation emailed to the customer${asLocale(b.locale) === 'ar' && !enquiry ? ' (in Arabic)' : ''}.</p>`
        : `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 14px;margin:0 0 16px;">
            <p style="color:#991b1b;font-weight:700;margin:0 0 4px;">⚠️ The customer did not receive a confirmation email</p>
            <p style="color:#7f1d1d;margin:0;font-size:0.9rem;">${escapeHtml(customer.reason.trim().replace(/[.!]?$/, '.'))} Reach them on WhatsApp${b.customer_phone ? ` on <strong dir="ltr">${escapeHtml(b.customer_phone)}</strong>` : ''}, or resend it from the booking's Actions menu.</p>
        </div>`;
    const flag = customer.status === 'sent' ? '' : ' ⚠️ customer not emailed';

    if (enquiry) {
        const dest = String(b.destination_name || 'Trip');
        return {
            type: 'destination_enquiry',
            subject: `New ${dest} Travel Enquiry — ${name}${flag}`,
            html: layout(`${banner('📍 New Destination Enquiry')}
                ${status}
                ${rowsTable(row('Destination', dest))}
                ${buildBookingRows(b)}
                <p style="margin-top:20px;text-align:center;"><a href="${adminLink(b)}" style="${btnStyle}">View in Admin Panel</a></p>`, 'en'),
        };
    }
    return {
        type: 'new_booking',
        subject: `New Booking Request — ${name}${flag}`,
        html: layout(`<div style="${headerStyle}"><p style="color:#fbbf24;font-weight:700;font-size:1.1rem;margin:0;">📩 New Booking Request</p>${ref ? `<p style="color:#e2e8f0;margin:6px 0 0;font-size:0.85rem;">Ref ${escapeHtml(ref)}${asLocale(b.locale) === 'ar' ? ' · booked in Arabic' : ''}</p>` : ''}</div>
            ${status}
            ${buildBookingRows(b)}
            <p style="margin-top:20px;text-align:center;"><a href="${adminLink(b)}" style="${btnStyle}">View in Admin Panel</a></p>`, 'en'),
    };
}

/**
 * Everything that follows a saved booking or destination enquiry. Called by
 * /api/bookings/create after it has responded. Never throws.
 */
export async function notifyNewBooking(supabase: SupabaseClient, booking: Row): Promise<void> {
    const b = withDisplayFields(booking);
    const enquiry = isEnquiry(b);
    const name = String(b.customer_name ?? 'A customer');

    // 1. The admin alert, before and regardless of any email.
    await createNotification(
        supabase,
        enquiry ? 'new_enquiry' : 'new_booking',
        b,
        enquiry ? `New ${b.destination_name || 'Trip'} Enquiry — ${name}` : `New Booking — ${name}`,
    );

    // 2. The customer's copy.
    let customer: CustomerEmailOutcome;
    try {
        customer = await sendReceivedEmail(supabase, booking);
    } catch (err) {
        customer = { status: 'failed', reason: err instanceof Error ? err.message : String(err) };
    }

    // 3. The admin email, saying whether step 2 worked.
    const sender = resolveSender();
    if (!sender.ok) {
        console.error('[BOOKING_NOTIFY] Email is not configured:', sender.message);
        await pushAdmins(`Email not configured — ${name}`, 'Booking saved, but no emails were sent. Check RESEND_FROM_EMAIL.', adminLink(b).replace(SITE, ''));
        return;
    }
    const admin = adminNewBookingEmail(b, customer);
    const result = await sendEmail({ ...sender.sender, to: ADMIN_EMAIL, subject: admin.subject, html: admin.html });
    await logEmail(supabase, (b.id as string) ?? null, admin.type, ADMIN_EMAIL, admin.subject, result.id, result.error ? 'failed' : 'sent', result.error ?? undefined, sender.sender.from);
    if (result.error) console.error('[BOOKING_NOTIFY] Admin email failed after retries:', result.error);

    // A failed (not merely skipped-for-no-address) customer email gets its own
    // push, so a mistyped address is chased the same day.
    if (customer.status === 'failed') {
        await pushAdmins(`Customer email failed — ${name}`, customer.reason.slice(0, 120), adminLink(b).replace(SITE, ''));
    }
}

/** Sends the day-before reminder for one confirmed booking and logs it. */
export async function sendReminderEmail(supabase: SupabaseClient, booking: Row): Promise<CustomerEmailOutcome> {
    const to = recipientOf(booking);
    if (!to) return { status: 'skipped', reason: 'No email address on file.' };
    const sender = resolveSender();
    if (!sender.ok) return { status: 'failed', reason: sender.message };
    const { subject, html } = reminderEmail(booking);
    const result = await sendEmail({ ...sender.sender, to, subject, html });
    await logEmail(supabase, (booking.id as string) ?? null, 'booking_reminder', to, subject, result.id, result.error ? 'failed' : 'sent', result.error ?? undefined, sender.sender.from);
    return result.error ? { status: 'failed', reason: result.error } : { status: 'sent', to };
}
