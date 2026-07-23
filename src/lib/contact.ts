/**
 * Single source of truth for phone/WhatsApp contact details.
 * Every file that links to tel:/wa.me or displays the number should import
 * from here instead of hardcoding digits — see CONFIG.md.
 *
 * Real business number as of 2026-07-24: +923268869669.
 */

export const WHATSAPP_NUMBER = "923268869669"; // digits only, no +, for wa.me links
export const PHONE_E164 = "+923268869669"; // for tel: links
export const PHONE_DISPLAY = "+92 326 8869669"; // for on-screen display
export const EMAIL = "info@gulftripservice.com";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const TEL_URL = `tel:${PHONE_E164}`;

/** Build a wa.me link with a URL-encoded pre-filled message. */
export function waLink(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
