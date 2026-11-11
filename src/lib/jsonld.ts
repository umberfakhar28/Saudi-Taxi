/**
 * JSON-LD Structured Data Schemas
 * Gulf Trip Service — gulftripservice.com
 *
 * All schemas follow Schema.org spec. Inline via <script type="application/ld+json">
 * in each page's <head> using Next.js Script or dangerouslySetInnerHTML.
 */

import { PHONE_E164, EMAIL as CONTACT_EMAIL } from "./contact";

const BASE_URL = "https://gulftripservice.com";
const BRAND    = "Gulf Trip Service";
const PHONE    = PHONE_E164;
const EMAIL    = CONTACT_EMAIL;
// City-level only — no verified street address exists in the codebase, and the
// footer's public-facing NAP is city-level ("Makkah, Saudi Arabia"), so we match
// that rather than fabricate a street. (Previously this said "Jeddah" with a made
// -up street, which conflicted with the footer's Makkah claim — real NAP bug.)
const ADDRESS  = {
  "@type":           "PostalAddress",
  addressLocality:   "Makkah",
  addressRegion:     "Makkah Province",
  addressCountry:    "SA",
};

/* ─────────────────────────────────────────────────────────────
   1. LocalBusiness + TaxiService (site-wide, injected in layout)
   ───────────────────────────────────────────────────────────── */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TaxiService"],
    "@id": `${BASE_URL}/#organization`,
    name: BRAND,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    image: `${BASE_URL}/og/default.jpg`,
    description:
      "Premium taxi and chauffeur services across Saudi Arabia — Makkah, Madinah, Jeddah, airport transfers, Umrah transport, intercity routes, and GCC cross-border transfers to Bahrain and Qatar.",
    telephone: PHONE,
    email: EMAIL,
    address: ADDRESS,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 21.3891,
      longitude: 39.8579,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    currenciesAccepted: "SAR",
    // Only what the business actually takes. Apple Pay and STC Pay were listed
    // here and are not offered; no specific card network is named, because the
    // card/payment-link option is not a gateway integration that commits to one.
    paymentAccepted: "Cash, Bank Transfer, Card, Payment Link",
    areaServed: [
      { "@type": "City", name: "Makkah" },
      { "@type": "City", name: "Madinah" },
      { "@type": "City", name: "Jeddah" },
      { "@type": "City", name: "Riyadh" },
      { "@type": "City", name: "Dammam" },
      { "@type": "City", name: "Taif" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "Bahrain" },
      { "@type": "Country", name: "Qatar" },
      // Each of these has live pages selling transfers there: the Kuwait
      // and Khafji routes, Riyadh/Dammam to Dubai and Abu Dhabi, and the
      // Muscat destination page. They were missing, so the markup said the
      // business served less than the site does.
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Oman" },
    ],
    sameAs: [
      "https://www.facebook.com/gulftripservice",
      "https://www.instagram.com/gulftripservice",
    ],
  };
}

/* ─────────────────────────────────────────────────────────────
   1b. WebSite (site-wide, injected in layout)
   ───────────────────────────────────────────────────────────── */
/**
 * Tells search engines the site's name, which Google uses for the site-name
 * line above each result. Points at the LocalBusiness above as publisher
 * rather than declaring a second Organization: LocalBusiness already is
 * one, and two would just be two descriptions of the same business.
 *
 * No SearchAction: the site has no search results page, and Google retired
 * the sitelinks search box it was for.
 */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: BRAND,
    url: BASE_URL,
    inLanguage: ["en", "ar"],
    publisher: { "@id": `${BASE_URL}/#organization` },
  };
}

/* ─────────────────────────────────────────────────────────────
   2. Service schema (for individual service pages)
   ───────────────────────────────────────────────────────────── */
export function serviceSchema({
  name,
  description,
  url,
  areaServed,
  offers,
  image,
  airportsServed,
}: {
  name: string;
  description: string;
  url: string;
  areaServed: string[];
  /** Airports served as well as the cities, as schema.org Airport (a Place). */
  airportsServed?: { name: string; iataCode: string }[];
  /** One Offer per vehicle with a confirmed fare. Must be the same figures
   * the page shows; unpriced vehicles are left out, not given a guess. */
  offers?: { name: string; price: number; priceCurrency: string }[];
  /** Root-relative path of the page's main image. */
  image?: string;
}) {
  return {
    ...(offers && offers.length > 0 && {
      offers: offers.map((o) => ({
        "@type": "Offer",
        name: o.name,
        price: String(o.price),
        priceCurrency: o.priceCurrency,
        url: `${BASE_URL}${url}`,
        availability: "https://schema.org/InStock",
      })),
    }),
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "TaxiService",
    provider: {
      "@type": "LocalBusiness",
      name: BRAND,
      url: BASE_URL,
    },
    name,
    description,
    ...(image && { image: `${BASE_URL}${image}` }),
    url: `${BASE_URL}${url}`,
    areaServed: [
      ...areaServed.map((city) => ({ "@type": "City", name: city })),
      ...(airportsServed ?? []).map((a) => ({ "@type": "Airport", name: a.name, iataCode: a.iataCode })),
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${BASE_URL}/book-online`,
      servicePhone: PHONE,
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   3. FAQPage schema
   ───────────────────────────────────────────────────────────── */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

/* ─────────────────────────────────────────────────────────────
   4. BlogPosting schema (blog posts)
   ───────────────────────────────────────────────────────────── */
export function blogPostingSchema({
  headline,
  description,
  url,
  datePublished,
  image,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url: `${BASE_URL}${url}`,
    image: image ? `${BASE_URL}${image}` : `${BASE_URL}/og/default.jpg`,
    ...(datePublished && { datePublished }),
    author: {
      "@type": "Organization",
      name: BRAND,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   5. BreadcrumbList schema
   ───────────────────────────────────────────────────────────── */
/** VideoObject for a clip hosted on this site. Paths are root-relative. */
export function videoSchema(v: {
  name: string;
  description: string;
  contentUrl: string;
  thumbnailUrl: string;
  /** ISO 8601 date, e.g. 2026-11-11. */
  uploadDate: string;
  /** ISO 8601 duration, e.g. PT46S. */
  duration: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    contentUrl: `${BASE_URL}${v.contentUrl}`,
    thumbnailUrl: `${BASE_URL}${v.thumbnailUrl}`,
    uploadDate: v.uploadDate,
    duration: v.duration,
  };
}

export function breadcrumbSchema(
  crumbs: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ name, path }, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name,
      item: `${BASE_URL}${path}`,
    })),
  };
}

/* ─────────────────────────────────────────────────────────────
   Helper: serialise one or many schemas into a single <script> tag
   Usage:  <script ...>{jsonLd([schemaA, schemaB])}</script>
   ───────────────────────────────────────────────────────────── */
export function jsonLd(schema: object | object[]): string {
  const payload = Array.isArray(schema)
    ? { "@context": "https://schema.org", "@graph": schema }
    : schema;
  return JSON.stringify(payload);
}
