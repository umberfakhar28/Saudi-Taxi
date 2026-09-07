/**
 * Building wa.me links to CUSTOMERS from the admin portal.
 *
 * Note the direction: src/lib/contact.ts holds the business's own number,
 * which customers message. This module is the opposite — the admin messaging
 * a customer on the number that customer supplied when booking.
 *
 * Customer phone numbers arrive from a free-text field, so they show up as
 * "0501234567", "+966 50 123 4567", "00966501234567" and worse. wa.me needs
 * bare international digits, so anything we cannot confidently resolve
 * returns null and the calling UI hides the action rather than opening a
 * broken chat.
 */

import { displayDate, displayTime } from './datetime';
import { formatMoney } from './currency';

/**
 * Country dialling codes for the markets served, longest first so that a
 * number already carrying its code is matched before the local-format rules.
 */
const GCC_DIALLING_CODES = ['966', '971', '965', '973', '974', '968', '92'];

/** A local number beginning with 0 is assumed to be Saudi — the primary market. */
const DEFAULT_DIALLING_CODE = '966';

/**
 * Normalises a stored phone number to bare international digits, or null if
 * it cannot be trusted (too short, empty, obviously not a phone number).
 */
export function toWhatsAppNumber(raw?: string | null): string | null {
    if (!raw) return null;

    let digits = String(raw).replace(/\D/g, '');
    if (!digits) return null;

    // 00 is the international access prefix used across the Gulf.
    if (digits.startsWith('00')) digits = digits.slice(2);

    // Already carries a known country code and is a plausible length.
    for (const code of GCC_DIALLING_CODES) {
        if (digits.startsWith(code) && digits.length >= code.length + 8) return digits;
    }

    // National format: a single leading zero, then the subscriber number.
    if (digits.startsWith('0')) {
        const national = digits.replace(/^0+/, '');
        if (national.length >= 8) return `${DEFAULT_DIALLING_CODE}${national}`;
        return null;
    }

    // A bare subscriber number with no country code at all.
    if (digits.length >= 8 && digits.length <= 10) return `${DEFAULT_DIALLING_CODE}${digits}`;

    // Long enough to already be international even if the code is unlisted.
    if (digits.length >= 11) return digits;

    return null;
}

/** True when this record can actually be messaged. */
export function canWhatsApp(phone?: string | null): boolean {
    return toWhatsAppNumber(phone) !== null;
}

/** wa.me deep link with the message pre-filled, or null if unreachable. */
export function waLinkTo(phone?: string | null, message?: string): string | null {
    const number = toWhatsAppNumber(phone);
    if (!number) return null;
    const text = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/${number}${text}`;
}

interface BookingLike {
    booking_number?: string | null;
    id?: string | null;
    customer_name?: string | null;
    pickup_location?: string | null;
    dropoff_location?: string | null;
    travel_date?: string | null;
    travel_time?: string | null;
    quote_amount?: number | string | null;
    currency?: string | null;
    status?: string | null;
}

/**
 * The default message an admin sends about a booking. Deliberately plain and
 * factual — it states only what is actually on the record, and the admin can
 * edit every word before it is sent.
 */
export function bookingMessage(b: BookingLike): string {
    const reference = b.booking_number || (b.id ? b.id.slice(0, 8).toUpperCase() : '');
    const lines: string[] = [];

    lines.push(`Hello${b.customer_name ? ` ${b.customer_name}` : ''}, this is Gulf Trip Service.`);
    lines.push('');
    if (reference) lines.push(`Booking reference: ${reference}`);
    if (b.pickup_location) lines.push(`Pickup: ${b.pickup_location}`);
    if (b.dropoff_location) lines.push(`Drop-off: ${b.dropoff_location}`);

    const when = [displayDate(b.travel_date, ''), displayTime(b.travel_time, '')]
        .filter(Boolean)
        .join(' at ');
    if (when) lines.push(`Date & time: ${when}`);

    if (b.quote_amount) lines.push(`Quoted fare: ${formatMoney(b.quote_amount, b.currency)}`);

    lines.push('');
    lines.push('Please let us know if you need to change anything.');

    return lines.join('\n');
}

/** Convenience: link + default message for a booking, or null if unreachable. */
export function waBookingLink(phone: string | null | undefined, b: BookingLike): string | null {
    return waLinkTo(phone, bookingMessage(b));
}
