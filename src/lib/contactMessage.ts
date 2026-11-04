/**
 * Validation and shape for a Contact Us enquiry.
 *
 * Lives in its own module because the English form, the Arabic form and the
 * server route must agree on what "valid" means. The client copy is a
 * convenience so the customer sees a problem before a round-trip; the server
 * copy in /api/contact/create is the one that actually decides, and it never
 * trusts the client's answer.
 *
 * Deliberately NOT a booking: a contact message has no pickup, drop-off,
 * date or time, which is exactly why it cannot live in `bookings` (all four
 * of those columns are NOT NULL there). See supabase/sql/008.
 */

export type ContactLocale = 'en' | 'ar';

export interface ContactMessageInput {
    name: string;
    email: string;
    phone: string;
    subject: string;
    service: string;
    message: string;
    locale: ContactLocale;
}

/** Field-keyed errors. An empty object means the submission is valid. */
export type ContactErrors = Partial<Record<keyof ContactMessageInput, string>>;

/** Upper bounds, so a single request cannot post a novel into the table. */
export const LIMITS = {
    name: 120,
    email: 200,
    phone: 40,
    subject: 200,
    service: 80,
    message: 5000,
} as const;

/**
 * Message wording per locale. The server returns a `field` key rather than a
 * sentence, and each form renders its own language — so an Arabic visitor
 * never sees an English validation error.
 */
const MESSAGES: Record<ContactLocale, Record<string, string>> = {
    en: {
        name_required: 'Please enter your name.',
        name_too_long: `Please keep your name under ${LIMITS.name} characters.`,
        phone_required: 'Please enter a phone or WhatsApp number.',
        phone_invalid: 'Please enter a valid phone number, including the country code.',
        email_invalid: 'Please enter a valid email address.',
        email_too_long: 'That email address is too long.',
        subject_required: 'Please enter a subject.',
        subject_too_long: `Please keep the subject under ${LIMITS.subject} characters.`,
        message_required: 'Please tell us how we can help.',
        message_too_short: 'Please give us a little more detail so we can help properly.',
        message_too_long: `Please keep your message under ${LIMITS.message} characters.`,
        fix_fields_below: 'Please check the highlighted fields below.',
        sending: 'Sending…',
        send: 'Send Message',
        success_title: 'Message received',
        success_body: 'Thank you — your message has reached our team and we will get back to you. For a faster reply, message us on WhatsApp.',
        success_reference: 'Your reference',
        send_another: 'Send another message',
    },
    ar: {
        name_required: 'يرجى إدخال اسمك.',
        name_too_long: 'الاسم طويل جداً.',
        phone_required: 'يرجى إدخال رقم هاتف أو واتساب.',
        phone_invalid: 'يرجى إدخال رقم هاتف صحيح مع رمز الدولة.',
        email_invalid: 'يرجى إدخال بريد إلكتروني صحيح.',
        email_too_long: 'البريد الإلكتروني طويل جداً.',
        subject_required: 'يرجى إدخال الموضوع.',
        subject_too_long: 'الموضوع طويل جداً.',
        message_required: 'يرجى إخبارنا كيف يمكننا مساعدتك.',
        message_too_short: 'يرجى إضافة المزيد من التفاصيل حتى نتمكن من مساعدتك.',
        message_too_long: 'الرسالة طويلة جداً.',
        fix_fields_below: 'يرجى مراجعة الحقول المحددة أدناه.',
        sending: 'جارٍ الإرسال…',
        send: 'إرسال الرسالة',
        success_title: 'تم استلام رسالتك',
        success_body: 'شكراً لك — وصلت رسالتك إلى فريقنا وسنعاود التواصل معك. للحصول على رد أسرع، راسلنا عبر واتساب.',
        success_reference: 'رقم المرجع',
        send_another: 'إرسال رسالة أخرى',
    },
};

export function contactMessageText(locale: ContactLocale, key: string): string {
    return MESSAGES[locale]?.[key] ?? MESSAGES.en[key] ?? key;
}

/**
 * Phone check, matched to how `toWhatsAppNumber` in src/lib/whatsapp.ts
 * already treats stored numbers: strip everything that is not a digit and
 * require a plausible subscriber length. Deliberately permissive — this
 * business takes numbers from Saudi Arabia, Kuwait, Bahrain, Qatar, the UAE
 * and beyond, and rejecting a real customer's real number is a far worse
 * outcome than accepting an odd-looking one.
 */
export function isPlausiblePhone(raw: string): boolean {
    const digits = raw.replace(/\D/g, '');
    return digits.length >= 8 && digits.length <= 15;
}

/**
 * Email check. Only applied when an address was actually supplied — the
 * column is nullable and the business reaches most people on WhatsApp.
 */
export function isPlausibleEmail(raw: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

/** Trim every field and clamp it to its limit. */
export function normalizeContactInput(raw: Partial<Record<keyof ContactMessageInput, unknown>>): ContactMessageInput {
    const s = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
    const locale: ContactLocale = raw.locale === 'ar' ? 'ar' : 'en';
    return {
        name: s(raw.name, LIMITS.name),
        email: s(raw.email, LIMITS.email),
        phone: s(raw.phone, LIMITS.phone),
        subject: s(raw.subject, LIMITS.subject),
        service: s(raw.service, LIMITS.service),
        message: s(raw.message, LIMITS.message),
        locale,
    };
}

/**
 * The single source of truth for whether an enquiry may be accepted.
 * Returns `{}` when everything is fine.
 *
 * Returns message KEYS, not sentences, so the caller can render them in the
 * right language. `validateContact(...)` below resolves them for a form.
 */
export function validateContactKeys(input: ContactMessageInput): Partial<Record<keyof ContactMessageInput, string>> {
    const e: Partial<Record<keyof ContactMessageInput, string>> = {};

    if (!input.name) e.name = 'name_required';
    else if (input.name.length > LIMITS.name) e.name = 'name_too_long';

    if (!input.phone) e.phone = 'phone_required';
    else if (!isPlausiblePhone(input.phone)) e.phone = 'phone_invalid';

    // Optional. Only validated when something was typed — an empty email is
    // a normal, accepted enquiry.
    if (input.email) {
        if (input.email.length > LIMITS.email) e.email = 'email_too_long';
        else if (!isPlausibleEmail(input.email)) e.email = 'email_invalid';
    }

    if (!input.subject) e.subject = 'subject_required';
    else if (input.subject.length > LIMITS.subject) e.subject = 'subject_too_long';

    if (!input.message) e.message = 'message_required';
    else if (input.message.length < 5) e.message = 'message_too_short';
    else if (input.message.length > LIMITS.message) e.message = 'message_too_long';

    return e;
}

/** Same checks, resolved into the caller's language. For use in a form. */
export function validateContact(input: ContactMessageInput): ContactErrors {
    const keys = validateContactKeys(input);
    const out: ContactErrors = {};
    for (const [field, key] of Object.entries(keys)) {
        out[field as keyof ContactMessageInput] = contactMessageText(input.locale, key);
    }
    return out;
}

/** A short, human-quotable reference, derived from the row's uuid. */
export function contactRef(id: string | null | undefined): string {
    return id ? `MSG-${String(id).slice(0, 8).toUpperCase()}` : '';
}
