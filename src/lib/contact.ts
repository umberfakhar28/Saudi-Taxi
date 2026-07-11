/**
 * Single source of truth for phone/WhatsApp contact details.
 * Every file that links to tel:/wa.me or displays the number should import
 * from here instead of hardcoding digits — see CONFIG.md.
 *
 * Value chosen: the footer's number (966501234567), since it was already the
 * majority value used across the site (~50 of 56 occurrences audited). A
 * second, different number (966123456789) was found hardcoded in 6 files —
 * those were bugs (a stale/incorrect number), not an intentional second
 * line, and have been corrected to this constant.
 *
 * Owner note: replace WHATSAPP_NUMBER / PHONE_E164 below with the real
 * business number when available — every consumer updates automatically.
 */

export const WHATSAPP_NUMBER = "966501234567"; // digits only, no +, for wa.me links
export const PHONE_E164 = "+966501234567"; // for tel: links
export const PHONE_DISPLAY = "+966 50 123 4567"; // for on-screen display
export const EMAIL = "info@gulftripservice.com";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const TEL_URL = `tel:${PHONE_E164}`;

/** Build a wa.me link with a URL-encoded pre-filled message. */
export function waLink(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
