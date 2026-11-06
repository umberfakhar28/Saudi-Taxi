/**
 * Booking field rules, shared by the form and `/api/bookings/create`.
 *
 * The audit found the server checking only that required fields were
 * non-empty: "abc" was an acceptable phone number, yesterday was an
 * acceptable travel date, `service_type` could be any string at all, and
 * free text had no length ceiling. Browser validation alone is not
 * validation — anything can POST to a public endpoint — so every rule here
 * is written once and applied on both sides, and the server is the side
 * that decides.
 *
 * No dependencies: this module is imported by a client component and by a
 * route handler.
 */

import { SERVICE_IDS } from './bookingServices';

/**
 * Saudi Arabia is UTC+3 year-round and observes no daylight saving, so the
 * offset can be a constant rather than a timezone database lookup.
 */
const RIYADH_UTC_OFFSET_MINUTES = 3 * 60;

/**
 * Today's date in Riyadh as `YYYY-MM-DD`.
 *
 * Both sides need the same answer to "is this date in the past?", and
 * neither can use its own local midnight to decide: the browser is in the
 * customer's timezone and the server is in Vercel's (UTC). A customer in
 * Riyadh booking at 01:00 local is at 22:00 UTC the previous day, so a
 * naive UTC comparison would reject today as "past"; a customer in Los
 * Angeles would get the opposite error. Shifting the instant by the Riyadh
 * offset and then reading the UTC calendar date gives the civil date in
 * Riyadh wherever the code runs.
 */
export function riyadhToday(now: Date = new Date()): string {
    const shifted = new Date(now.getTime() + RIYADH_UTC_OFFSET_MINUTES * 60_000);
    return shifted.toISOString().slice(0, 10);
}

/** True when `date` (`YYYY-MM-DD`) falls before today in Riyadh. */
export function isPastDate(date: string, now: Date = new Date()): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false; // shape handled separately
    return date < riyadhToday(now);
}

/** True for a well-formed `YYYY-MM-DD` that is also a real calendar date. */
export function isValidDateShape(date: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
    const [y, m, d] = date.split('-').map(Number);
    if (m < 1 || m > 12 || d < 1 || d > 31) return false;
    const probe = new Date(Date.UTC(y, m - 1, d));
    return probe.getUTCFullYear() === y && probe.getUTCMonth() === m - 1 && probe.getUTCDate() === d;
}

/** Accepts `HH:MM` and `HH:MM:SS` — the form sends the former, the
 *  `bookings.travel_time` column returns the latter. */
export function isValidTimeShape(time: string): boolean {
    return /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(time);
}

/**
 * Phone rules, deliberately permissive about shape and strict only about
 * digit count.
 *
 * Customers are Saudi, GCC and international, and they write numbers as
 * `+966 50 123 4567`, `00966501234567`, `0501234567` and
 * `(050) 123-4567`. Pinning a country-specific pattern would reject real
 * customers, so the only test is the number of digits: E.164 allows at most
 * 15, and nothing shorter than 7 is a dialable number. That rejects the
 * failure the audit actually found — free text like "abc" or a stray "12"
 * reaching the one field the business needs to call back.
 */
export const PHONE_MIN_DIGITS = 7;
export const PHONE_MAX_DIGITS = 15;

/** Digits only, with any leading international prefix left intact. */
export function phoneDigits(phone: string): string {
    return phone.replace(/\D/g, '');
}

export function isValidPhone(phone: string): boolean {
    const raw = phone.trim();
    if (!raw) return false;
    // Reject letters outright: a number with words in it is a typo or a bot,
    // never a dialable value. Punctuation used for grouping stays allowed.
    if (/[A-Za-z]/.test(raw)) return false;
    const digits = phoneDigits(raw);
    return digits.length >= PHONE_MIN_DIGITS && digits.length <= PHONE_MAX_DIGITS;
}

/** Deliberately loose: the only goal is to catch an obvious typo in an
 *  optional field, not to adjudicate RFC 5322. */
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export const PASSENGERS_MIN = 1;
/** The Book Online form's own select offers 1-10. */
export const PASSENGERS_MAX = 10;

/**
 * `/api/bookings/create` serves two forms, not one.
 *
 * Book Online posts one of the nine BOOKING_SERVICES. The destination
 * enquiry form (src/components/DestinationEnquiryForm.tsx) posts
 * `destination-enquiry` and allows up to 50 passengers for group and agency
 * requests, so a validator that knew only about the booking form's nine ids
 * and its 1-10 range would silently start rejecting every destination
 * enquiry. Both callers are accounted for here deliberately.
 *
 * `destination-enquiry` is not in BOOKING_SERVICES because it is not an
 * option in the booking form's service picker — only a stored value.
 */
export const DESTINATION_ENQUIRY_SERVICE = 'destination-enquiry';
export const PASSENGERS_MAX_ENQUIRY = 50;

/** Every `service_type` this endpoint will store. */
export const ACCEPTED_SERVICE_TYPES: ReadonlySet<string> = new Set([
    ...SERVICE_IDS,
    DESTINATION_ENQUIRY_SERVICE,
]);

/** Length ceilings for the free-text columns. Generous for a human, but
 *  bounded, so a script cannot push unbounded strings into the table. */
export const MAX_LENGTHS = {
    name: 120,
    email: 160,
    phone: 40,
    location: 200,
    notes: 2000,
    vehicle: 80,
} as const;

export interface BookingValidationInput {
    service_type?: unknown;
    customer_name?: unknown;
    customer_email?: unknown;
    customer_phone?: unknown;
    pickup_location?: unknown;
    dropoff_location?: unknown;
    travel_date?: unknown;
    travel_time?: unknown;
    passengers_count?: unknown;
    special_notes?: unknown;
    car_type?: unknown;
}

/**
 * Server-side gate. Returns a stable error *code* rather than a sentence:
 * the Arabic booking page used to surface the API's English strings
 * verbatim, so the wording now lives in i18n.ts on the client and this
 * endpoint only says which rule failed.
 */
export function validateBookingPayload(body: BookingValidationInput, now: Date = new Date()): string | null {
    const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

    const serviceType = str(body.service_type);
    if (!ACCEPTED_SERVICE_TYPES.has(serviceType)) return 'invalid_service';
    const maxPassengers = serviceType === DESTINATION_ENQUIRY_SERVICE
        ? PASSENGERS_MAX_ENQUIRY
        : PASSENGERS_MAX;

    const name = str(body.customer_name);
    if (!name) return 'name_required';
    if (name.length > MAX_LENGTHS.name) return 'name_too_long';

    const phone = str(body.customer_phone);
    if (!phone) return 'phone_required';
    if (phone.length > MAX_LENGTHS.phone || !isValidPhone(phone)) return 'phone_invalid';

    const email = str(body.customer_email);
    if (email && (email.length > MAX_LENGTHS.email || !isValidEmail(email))) return 'email_invalid';

    const pickup = str(body.pickup_location);
    if (!pickup) return 'pickup_required';
    if (pickup.length > MAX_LENGTHS.location) return 'pickup_too_long';

    const dropoff = str(body.dropoff_location);
    if (!dropoff) return 'dropoff_required';
    if (dropoff.length > MAX_LENGTHS.location) return 'dropoff_too_long';

    const date = str(body.travel_date);
    if (!date) return 'date_required';
    if (!isValidDateShape(date)) return 'date_invalid';
    if (isPastDate(date, now)) return 'date_past';

    const time = str(body.travel_time);
    if (!time) return 'time_required';
    if (!isValidTimeShape(time)) return 'time_invalid';

    const passengers = Number(body.passengers_count);
    if (!Number.isInteger(passengers) || passengers < PASSENGERS_MIN || passengers > maxPassengers) {
        return 'passengers_invalid';
    }

    if (str(body.special_notes).length > MAX_LENGTHS.notes) return 'notes_too_long';
    if (str(body.car_type).length > MAX_LENGTHS.vehicle) return 'vehicle_invalid';

    return null;
}
