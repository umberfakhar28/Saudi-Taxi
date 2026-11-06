/**
 * The customer-facing booking reference.
 *
 * `bookings.id` is a uuid, which is unusable over the phone, so the
 * confirmation emails already showed `String(id).slice(0, 8).toUpperCase()`
 * — the uuid's first segment. Nothing displayed it on screen, though, so a
 * customer who gave no email address left with no reference at all.
 *
 * This keeps that existing 8-character convention and only prefixes it, so
 * the reference stays derived from the real row rather than generated
 * alongside it: no new column, no sequence, no migration, and nothing that
 * can drift out of step with the database.
 *
 * Looking one up: the hex part is a prefix of the uuid, and the admin
 * bookings list already filters with a substring match on the id, so
 * pasting the eight characters into that search finds the row.
 *
 * Collision: 8 hex characters is 4.3 billion values, and the reference is
 * for a human to quote, never a key — the uuid remains the identity.
 */
export const BOOKING_REF_PREFIX = 'GTS-';

/** `GTS-A1B2C3D4` from a booking uuid. Empty string for a missing id, so
 *  callers can treat "no reference" as falsy rather than printing "GTS-". */
export function bookingRef(id: unknown): string {
    const raw = typeof id === 'string' ? id : id == null ? '' : String(id);
    const hex = raw.replace(/-/g, '').slice(0, 8).toUpperCase();
    return hex ? `${BOOKING_REF_PREFIX}${hex}` : '';
}
