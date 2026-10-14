import type { Metadata } from "next";

export const SITE_CONFIG = {
  baseUrl: "https://gulftripservice.com",
  siteName: "Gulf Trip Service",
  defaultTitle: "Taxi Service in Saudi Arabia | Umrah, Airport & GCC Transfers",
  defaultDescription:
    "Premium taxi service across Saudi Arabia — Makkah, Jeddah, Madinah, Riyadh, Dammam — plus GCC cross-border transfers to Bahrain and Qatar. Book today.",
  locale: "en_US",
  defaultOgImage: "/og/default.jpg",
} as const;

/**
 * Every page title is composed here as "<primary keyword> | Gulf Trip Service"
 * and set via `title: { absolute }` so the root layout's `template` (which
 * also appends "| Gulf Trip Service") is bypassed instead of stacking a
 * second brand suffix on top. Callers should pass ONLY the primary-keyword
 * portion — do not include the brand name in `title`.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  noindex,
  ogImage,
  ogImageAlt,
  hreflangPath,
}: {
  title: string;
  description: string;
  path: string;
  /** @deprecated no longer emitted — meta keywords is an obsolete SEO signal */
  keywords?: string[];
  noindex?: boolean;
  /** Absolute-from-root path, e.g. "/images/city-riyadh.jpg". Falls back to the branded default. */
  ogImage?: string;
  ogImageAlt?: string;
  /** Path (without locale prefix) used to build hreflang alternates when an Arabic version exists at /ar<hreflangPath>. */
  hreflangPath?: string;
}): Metadata {
  const url = `${SITE_CONFIG.baseUrl}${path}`;
  const brandSuffix = ` | ${SITE_CONFIG.siteName}`;
  // The old check was `title.endsWith(brandSuffix)`, an exact match on
  // " | Gulf Trip Service". 22 titles ended with the shorter " | Gulf Trip"
  // instead, so they failed that test and had a second brand appended —
  // rendering e.g. "Riyadh to Qatar Taxi & Cross-Border Transfer | Gulf Trip
  // | Gulf Trip Service" at 80 characters, past Google's display limit.
  //
  // Stripping any trailing brand variant before appending fixes all of them
  // centrally, keeps every title's keywords and wording untouched, and makes
  // the documented "pass only the primary-keyword portion" contract above
  // self-enforcing rather than something each caller has to get right.
  //
  // Anchored to the literal brand, so titles that merely END in the word
  // "Gulf" are left alone — e.g. "Distance & Travel Time Guides | Saudi
  // Arabia & Gulf Routes" and "Shortest Airport Transfer in the Gulf".
  const base = title.replace(/\s*\|\s*Gulf Trip(?:\s+Service)?\s*$/i, "").trim();
  // Guard against a title that is nothing but the brand collapsing to "".
  const titleBase = base.length > 0 ? base : title.trim();
  const fullTitle = `${titleBase}${brandSuffix}`;
  const image = `${SITE_CONFIG.baseUrl}${ogImage ?? SITE_CONFIG.defaultOgImage}`;
  const imageAlt = ogImageAlt ?? `${SITE_CONFIG.siteName} — ${titleBase}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: url,
      ...(hreflangPath && {
        languages: {
          en: `${SITE_CONFIG.baseUrl}${hreflangPath}`,
          ar: `${SITE_CONFIG.baseUrl}/ar${hreflangPath === "/" ? "" : hreflangPath}`,
          "x-default": `${SITE_CONFIG.baseUrl}${hreflangPath}`,
        },
      }),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.siteName,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    ...(noindex && { robots: { index: false, follow: true } }),
  };
}
