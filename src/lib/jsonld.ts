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
    paymentAccepted: "Cash, Credit Card, Apple Pay, STC Pay",
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
    ],
    sameAs: [
      "https://www.facebook.com/gulftripservice",
      "https://www.instagram.com/gulftripservice",
    ],
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
}: {
  name: string;
  description: string;
  url: string;
  areaServed: string[];
}) {
  return {
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
    url: `${BASE_URL}${url}`,
    areaServed: areaServed.map((city) => ({ "@type": "City", name: city })),
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
