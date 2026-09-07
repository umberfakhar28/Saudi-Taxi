/**
 * Single source of truth for rendering booking dates and times.
 *
 * Two problems this solves, both of which produced wrong output before:
 *
 * 1. AM/PM. `bookings.travel_time` is a Postgres `time` column, so PostgREST
 *    returns "04:00:00"; `notifications.travel_time` is text and holds
 *    "04:00". Both were printed raw in the admin tables, the customer
 *    confirmation email and the admin notification email, so "04:00" was
 *    ambiguous between 4am and 4pm.
 *
 * 2. Date drift. `new Date("2026-09-08")` parses as UTC midnight and then
 *    renders in the viewer's local zone, so any admin west of UTC saw the
 *    previous day. Date-only strings must be parsed as local dates.
 *
 * Everything here is deliberately dependency-free so the same helpers can be
 * imported from client components, server routes and the email templates.
 */

/** Matches "HH:MM", "HH:MM:SS" and "HH:MM:SS+03" / "HH:MM:SS.123456". */
const TIME_RE = /^\s*(\d{1,2}):(\d{2})(?::(\d{2}))?/;

/** Matches a bare calendar date, optionally with a time part after it. */
const DATE_RE = /^\s*(\d{4})-(\d{2})-(\d{2})/;

/**
 * "04:00:00" → "04:00 AM", "15:05" → "03:05 PM".
 * Returns null for null/empty/unparseable input so callers can choose their
 * own placeholder rather than printing "Invalid Date".
 */
export function formatTime12h(value?: string | null): string | null {
    if (value === null || value === undefined) return null;
    const match = TIME_RE.exec(String(value));
    if (!match) return null;

    const hours24 = Number(match[1]);
    const minutes = Number(match[2]);
    if (!Number.isInteger(hours24) || !Number.isInteger(minutes)) return null;
    if (hours24 > 23 || minutes > 59) return null;

    const period = hours24 >= 12 ? 'PM' : 'AM';
    const hours12 = hours24 % 12 || 12;
    return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}

/**
 * Same as formatTime12h but returns `fallback` instead of null, for the many
 * call sites that just need a string to drop into a template.
 */
export function displayTime(value?: string | null, fallback = '—'): string {
    return formatTime12h(value) ?? fallback;
}

/**
 * Turns a date-only string into a Date at LOCAL midnight, so formatting it
 * can never roll back a day. Falls back to the native parser for full
 * timestamps (which carry their own offset and are unambiguous).
 */
export function parseLocalDate(value?: string | null): Date | null {
    if (!value) return null;
    const raw = String(value);
    const match = DATE_RE.exec(raw);
    if (match && raw.trim().length <= 10) {
        const d = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
        return Number.isNaN(d.getTime()) ? null : d;
    }
    const parsed = new Date(raw);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** "2026-09-08" → "08 Sep 2026" (never shifted by timezone). */
export function displayDate(value?: string | null, fallback = '—'): string {
    const d = parseLocalDate(value);
    if (!d) return fallback;
    return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** "2026-09-08" → "Tue, 08 Sep 2026". */
export function displayDateLong(value?: string | null, fallback = '—'): string {
    const d = parseLocalDate(value);
    if (!d) return fallback;
    return `${WEEKDAYS[d.getDay()]}, ${displayDate(value)}`;
}

/**
 * The canonical human-readable "when" for a booking, used in the admin
 * tables, the customer confirmation email and the admin notification email
 * so all three always agree: "08 Sep 2026 at 04:00 AM".
 */
export function displayDateTime(
    date?: string | null,
    time?: string | null,
    fallback = '—'
): string {
    const datePart = parseLocalDate(date) ? displayDate(date) : null;
    const timePart = formatTime12h(time);
    if (datePart && timePart) return `${datePart} at ${timePart}`;
    return datePart ?? timePart ?? fallback;
}

/**
 * Normalises whatever an <input type="time"> or a database `time` column
 * gives us down to "HH:MM:SS" for storage, so the value written back is
 * always valid for a Postgres `time` column regardless of which shape it
 * arrived in. Returns null when there is nothing storable.
 */
export function toStorableTime(value?: string | null): string | null {
    if (value === null || value === undefined) return null;
    const match = TIME_RE.exec(String(value));
    if (!match) return null;
    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    const seconds = match[3] ? Number(match[3]) : 0;
    if (hours > 23 || minutes > 59 || seconds > 59) return null;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Value for an <input type="time">, which only ever accepts "HH:MM".
 * Without this a Postgres "04:00:00" silently fails to populate the field
 * in some browsers, so editing a booking would blank its time.
 */
export function toTimeInputValue(value?: string | null): string {
    const match = value ? TIME_RE.exec(String(value)) : null;
    if (!match) return '';
    return `${String(Number(match[1])).padStart(2, '0')}:${match[2]}`;
}
