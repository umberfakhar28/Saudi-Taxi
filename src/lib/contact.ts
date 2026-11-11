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

/** The trading name, as it appears on anything the customer is given. */
export const COMPANY_NAME = "Gulf Trip Service";

/**
 * The business location, for invoices and other customer documents.
 *
 * Country-level by the owner's instruction: no verified street address
 * exists anywhere in this codebase, and naming a city on a document that
 * asks for money would be claiming more than we can stand behind. The
 * invoice preview used to hardcode "Jeddah, Saudi Arabia" — the tail of a
 * real NAP bug — and reads from here instead.
 *
 * Deliberately not the same value as lib/jsonld.ts's addressLocality, which
 * stays "Makkah" to match the footer's public NAP for local SEO. A document
 * handed to a customer and a schema.org LocalBusiness are answering
 * different questions, so they are allowed to differ in precision.
 */
export const COMPANY_LOCALITY = "Saudi Arabia";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const TEL_URL = `tel:${PHONE_E164}`;

/** Build a wa.me link with a URL-encoded pre-filled message. */
export function waLink(message: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

/**
 * Pages whose generic WhatsApp buttons (header, floating button, mobile
 * bar, and the page's own hero and how-to-book buttons) send one fixed
 * message, so the team sees the route at a glance. Every other page keeps
 * its existing message. Keyed by pathname.
 */
const PAGE_WHATSAPP_MESSAGES: Record<string, string> = {
  "/riyadh-to-bahrain-taxi-service": "Hi, I want to book Riyadh to Bahrain",
};

export function pageWhatsAppMessage(pathname: string | null | undefined): string | undefined {
  return pathname ? PAGE_WHATSAPP_MESSAGES[pathname] : undefined;
}

/**
 * The transfer-quote WhatsApp message, named route first.
 *
 * Shared by the route pages and the distance pages so a customer who opens
 * WhatsApp from either sends the same message, and the team sees which
 * journey they want without having to ask. The blank "Travel date" and
 * "Passengers" lines are prompts for the customer to fill in.
 *
 * Arabic pages get the message in Arabic. Before this they sent an English
 * sentence with Arabic city names dropped into it, which reads as broken to
 * the customer who is about to send it under their own name.
 */
export function transferQuoteWhatsAppLink(
  origin: string,
  destination: string,
  vehicleName?: string,
  locale: "en" | "ar" = "en",
): string {
  const lines = locale === "ar"
    ? [
        `السلام عليكم، أرغب في عرض سعر لتوصيلة خاصة من ${origin} إلى ${destination}.`,
        vehicleName ? `السيارة: ${vehicleName}` : "",
        "تاريخ السفر: ",
        "عدد الركاب: ",
      ]
    : [
        `Hello Gulf Trip Service, I would like a quote for a private transfer from ${origin} to ${destination}.`,
        vehicleName ? `Vehicle: ${vehicleName}.` : "",
        "Travel date: ",
        "Passengers: ",
      ];
  return waLink(lines.filter(Boolean).join("\n"));
}

/**
 * Default "Note for Customer" pre-filled when an admin raises a quote from
 * an existing booking (/admin/quotes/new?fromBooking=…).
 *
 * Defined here, once, and built from PHONE_DISPLAY so it can never drift
 * out of sync with the number above. The admin can edit or clear it before
 * saving; it is only ever used to seed an empty field, never to overwrite
 * something already written — see the fromBooking effect in
 * admin/quotes/new/page.tsx.
 */
export const QUOTE_CUSTOMER_NOTE =
  `For any further inquiries or a faster response, please contact us via WhatsApp at ${PHONE_DISPLAY}. ` +
  `Thank you for choosing our services; we look forward to serving you.`;
