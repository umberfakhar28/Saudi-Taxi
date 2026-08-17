import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { DESTINATION_DETAILS } from "./destinationData";
import { allHotels } from "./hotelData";

export const BASE_URL = "https://gulftripservice.com";

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  /** hreflang -> absolute URL, including "x-default" where applicable. */
  alternates?: Record<string, string>;
}

/**
 * Real last-modified date for a route.
 *
 * Originally this read the page.tsx file's filesystem mtime, which sounds
 * reasonable but is actually a poor signal for SEO: mtime gets reset by
 * `git clone`, `git checkout`, CI checkouts, and every fresh deploy —
 * none of which mean the page's actual content changed. Two pages last
 * genuinely edited months apart would report near-identical timestamps
 * just because they were checked out in the same deploy.
 *
 * Using the file's last Git commit date instead is a real, stable signal
 * of when the content actually changed. This runs at build time (this
 * sitemap has no runtime dynamic dependencies, so Next.js renders it
 * statically), where `.git` is guaranteed to be present — not at request
 * time in a deployed serverless function, where it usually isn't.
 */
function lastMod(routePath: string): Date {
  const relFile = path.join("src", "app", routePath, "page.tsx").replace(/\\/g, "/");
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", relFile], {
      cwd: process.cwd(),
      encoding: "utf8",
    }).trim();
    if (iso) return new Date(iso);
  } catch {
    // git not available (or file has no commit history yet) — fall through
  }
  try {
    return fs.statSync(path.join(process.cwd(), "src", "app", routePath, "page.tsx")).mtime;
  } catch {
    return new Date("2026-01-01");
  }
}

export function buildSitemapEntries(): SitemapEntry[] {
  const staticPages: SitemapEntry[] = [
    {
      url: BASE_URL,
      lastModified: lastMod(""),
      changeFrequency: "weekly",
      priority: 1.0,
      // Self-referencing entries required for both language variants, plus
      // x-default for users whose language doesn't match either — see
      // https://developers.google.com/search/docs/specialty/international/localized-versions
      alternates: { en: BASE_URL, ar: `${BASE_URL}/ar`, "x-default": BASE_URL },
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: lastMod("/about-us"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: lastMod("/contact-us"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { en: `${BASE_URL}/contact-us`, ar: `${BASE_URL}/ar/contact-us`, "x-default": `${BASE_URL}/contact-us` },
    },
    {
      url: `${BASE_URL}/our-services`,
      lastModified: lastMod("/our-services"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/fleet`,
      lastModified: lastMod("/fleet"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faqs`,
      lastModified: lastMod("/faqs"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/testimonials`,
      lastModified: lastMod("/testimonials"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/our-gallery`,
      lastModified: lastMod("/our-gallery"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/prices`,
      lastModified: lastMod("/prices"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: lastMod("/privacy-policy"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-conditions`,
      lastModified: lastMod("/terms-conditions"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/book-online`,
      lastModified: lastMod("/book-online"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quote`,
      lastModified: lastMod("/quote"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/site-map`,
      lastModified: lastMod("/site-map"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: lastMod("/locations"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/routes`,
      lastModified: lastMod("/routes"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const airportTransferPages: SitemapEntry[] = [
    { slug: "/airport-transfers", priority: 0.85 },
    { slug: "/jeddah-airport-taxi-service", priority: 0.85 },
    { slug: "/riyadh-airport-taxi-service", priority: 0.85 },
    { slug: "/madina-airport-taxi-service", priority: 0.8 },
    { slug: "/abha-airport-taxi-service", priority: 0.8 },
    { slug: "/dammam-airport-taxi-service", priority: 0.8 },
    { slug: "/taif-airport-taxi-service", priority: 0.8 },
    { slug: "/airport-transfer-for-umrah", priority: 0.8 },
    // W7 P1 additions (docs/page-gap-analysis.md — city hub existed, airport page didn't)
    { slug: "/tabuk-airport-taxi-service", priority: 0.75 },
    { slug: "/yanbu-airport-taxi-service", priority: 0.75 },
    { slug: "/alula-airport-taxi-service", priority: 0.78 },
  ].map(({ slug, priority }) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const servicePages: SitemapEntry[] = [
    { slug: "/umrah-taxi-services", priority: 0.85 },
    { slug: "/umrah-transport-package", priority: 0.85 },
    { slug: "/hotel-transfers", priority: 0.8 },
    { slug: "/private-taxi", priority: 0.8 },
    { slug: "/corporate-transportation-services", priority: 0.8 },
    { slug: "/wedding-transportation", priority: 0.75 },
    { slug: "/school-buses-services", priority: 0.75 },
    { slug: "/educational-tours-transport", priority: 0.75 },
  ].map(({ slug, priority }) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const borderCrossingPages: SitemapEntry[] = [
    { slug: "/border-crossing", priority: 0.8 },
    { slug: "/saudi-arabia-to-bahrain-taxi-service", priority: 0.8 },
    { slug: "/saudi-arabia-to-qatar-taxi-service", priority: 0.8 },
    { slug: "/saudi-arabia-to-uae-taxi-service", priority: 0.8 },
    { slug: "/saudi-arabia-to-jordan-land-transfer", priority: 0.8 },
  ].map(({ slug, priority }) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly" as const,
    priority,
    ...(slug === "/border-crossing" && {
      alternates: { en: `${BASE_URL}${slug}`, ar: `${BASE_URL}/ar${slug}`, "x-default": `${BASE_URL}${slug}` },
    }),
  }));

  const crossBorderRoutePages: SitemapEntry[] = [
    { slug: "/dammam-airport-to-bahrain-taxi-service", priority: 0.8 },
    { slug: "/dammam-airport-to-khafji-taxi-service", priority: 0.75 },
    { slug: "/dammam-airport-to-qatar-taxi-service", priority: 0.8 },
    { slug: "/dammam-airport-to-riyadh-taxi-service", priority: 0.78 },
    { slug: "/bahrain-to-dammam-taxi-service", priority: 0.8 },
    { slug: "/qatar-to-riyadh-taxi-service", priority: 0.78 },
    { slug: "/khafji-to-kuwait-taxi-service", priority: 0.75 },
    { slug: "/riyadh-to-bahrain-taxi-service", priority: 0.78 },
    { slug: "/dammam-to-kuwait-taxi-service", priority: 0.75 },
    { slug: "/kuwait-to-dammam-taxi-service", priority: 0.75 },
    { slug: "/kuwait-to-riyadh-taxi-service", priority: 0.75 },
    { slug: "/qatar-to-dammam-taxi-service", priority: 0.78 },
    { slug: "/bahrain-to-riyadh-taxi-service", priority: 0.78 },
    { slug: "/dammam-to-abu-dhabi-taxi-service", priority: 0.72 },
    { slug: "/dammam-to-dubai-taxi-service", priority: 0.72 },
    { slug: "/dubai-to-dammam-taxi-service", priority: 0.72 },
    { slug: "/riyadh-to-dubai-taxi-service", priority: 0.72 },
    { slug: "/dubai-to-riyadh-taxi-service", priority: 0.72 },
    // W7 P1/P1.5 GCC reciprocals (docs/page-gap-analysis.md)
    { slug: "/riyadh-to-qatar-taxi-service", priority: 0.78 },
    { slug: "/khafji-to-dammam-airport-taxi-service", priority: 0.72 },
    { slug: "/kuwait-to-khafji-taxi-service", priority: 0.72 },
    { slug: "/riyadh-to-kuwait-taxi-service", priority: 0.75 },
    { slug: "/abu-dhabi-to-dammam-taxi-service", priority: 0.72 },
  ].map(({ slug, priority }) => {
    const hasArabic = slug === "/dammam-airport-to-bahrain-taxi-service" || slug === "/dammam-airport-to-qatar-taxi-service";
    return {
      url: `${BASE_URL}${slug}`,
      lastModified: lastMod(slug),
      changeFrequency: "monthly" as const,
      priority,
      ...(hasArabic && {
        alternates: { en: `${BASE_URL}${slug}`, ar: `${BASE_URL}/ar${slug}`, "x-default": `${BASE_URL}${slug}` },
      }),
    };
  });

  const arPages: SitemapEntry[] = [
    { slug: "/ar", enSlug: "", priority: 0.95 },
    { slug: "/ar/border-crossing", enSlug: "/border-crossing", priority: 0.75 },
    { slug: "/ar/dammam-airport-to-bahrain-taxi-service", enSlug: "/dammam-airport-to-bahrain-taxi-service", priority: 0.75 },
    { slug: "/ar/dammam-airport-to-qatar-taxi-service", enSlug: "/dammam-airport-to-qatar-taxi-service", priority: 0.75 },
    { slug: "/ar/contact-us", enSlug: "/contact-us", priority: 0.7 },
  ].map(({ slug, enSlug, priority }) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly" as const,
    priority,
    // enSlug is "" for the homepage pair, so this resolves to exactly
    // BASE_URL — no trailing slash — matching the homepage's own
    // self-referencing entry above. It previously didn't (enSlug was "/",
    // producing BASE_URL + "/"), so the sitemap asserted two different
    // canonical spellings of the same homepage URL depending on which
    // entry you read, which is exactly the kind of inconsistency crawlers
    // flag.
    alternates: { en: `${BASE_URL}${enSlug}`, ar: `${BASE_URL}${slug}`, "x-default": `${BASE_URL}${enSlug}` },
  }));

  const cityTourPages: SitemapEntry[] = [
    { slug: "/jeddah-city-tour-services-in-saudi-arabia", priority: 0.78 },
    { slug: "/jeddah-to-makkah-taxi-service", priority: 0.78 },
    { slug: "/makkah-to-madinah-taxi-service", priority: 0.78 },
    { slug: "/taif-ziyarat-taxi-service", priority: 0.78 },
    { slug: "/ziyarat-services-in-saudi-arabia", priority: 0.78 },
    { slug: "/reliable-alula-tour-taxi-service-in-saudi-arabia", priority: 0.78 },
    // W7 P1 reciprocals + new corridors (docs/page-gap-analysis.md)
    { slug: "/makkah-to-jeddah-taxi-service", priority: 0.78 },
    { slug: "/madinah-to-makkah-taxi-service", priority: 0.78 },
    { slug: "/dammam-to-riyadh-taxi-service", priority: 0.78 },
    { slug: "/riyadh-to-dammam-airport-taxi-service", priority: 0.76 },
    { slug: "/jeddah-airport-to-madinah-taxi-service", priority: 0.78 },
    { slug: "/riyadh-to-makkah-taxi-service", priority: 0.75 },
    { slug: "/madinah-to-jeddah-airport-taxi-service", priority: 0.72 },
    { slug: "/makkah-to-riyadh-taxi-service", priority: 0.72 },
  ].map(({ slug, priority }) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const longFormGuideSlugs = [
    "/jeddah-to-makkah-guide",
    // /jeddah-airport-taxi-guide, /makkah-umrah-taxi-guide, and
    // /madinah-umrah-taxi-guide removed: all 301'd under the D2 guide-
    // consolidation (docs/page-inventory.md, W4) — their content now lives
    // on the pages they redirect to, so they're sitemapped there instead.
    "/makkah-to-madinah-guide",
  ];
  const longFormGuides: SitemapEntry[] = longFormGuideSlugs.map((slug) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  longFormGuides.push({
    url: `${BASE_URL}/riyadh-to-dammam-guide`,
    lastModified: lastMod("/riyadh-to-dammam-guide"),
    changeFrequency: "monthly",
    priority: 0.70,
  });

  const cityPages: SitemapEntry[] = [
    "riyadh", "jeddah", "makkah", "madinah", "dammam", "khobar",
    "jubail", "taif", "abha", "yanbu", "alula", "neom", "tabuk",
    // W7 P2 (docs/page-gap-analysis.md)
    "al-ahsa", "dhahran", "khamis-mushait",
  ].map((city) => ({
    url: `${BASE_URL}/services/${city}`,
    lastModified: lastMod(`/services/${city}`),
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }));

  const guidePages: SitemapEntry[] = [
    "king-khalid-airport", "king-abdulaziz-airport", "umrah-transportation",
    "hajj-transportation", "business-travel", "family-travel",
  ].map((slug) => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified: lastMod(`/guides/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogSlugs = [
    "airport-transfer-tips", "private-vs-rental-car", "umrah-travel-planning",
    "top-attractions-riyadh", "jeddah-hidden-gems", "alula-complete-guide",
    "benefits-private-airport-transfer", "hajj-transport-guide",
    "family-saudi-destinations", "vip-transport-saudi",
    "riyadh-to-jeddah-travel", "safe-travel-tips-saudi",
  ];
  const blogPages: SitemapEntry[] = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: lastMod(`/blog/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.70,
  }));

  // "Popular Destinations" — /destinations index + one entry per
  // /destinations/[slug] page (Object.keys(DESTINATION_DETAILS), so a new
  // destination added there shows up here automatically). lastMod points
  // at the shared dynamic-route template file, since these pages don't
  // each have their own page.tsx to read a commit date from.
  const destinationPages: SitemapEntry[] = [
    {
      url: `${BASE_URL}/destinations`,
      lastModified: lastMod("/destinations"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...Object.keys(DESTINATION_DETAILS).map((slug) => ({
      url: `${BASE_URL}/destinations/${slug}`,
      lastModified: lastMod("/destinations/[slug]"),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ];

  // Hotel / Accommodation Transfer pages — one entry per allHotels record
  // (Phase 5's dynamic /hotels/[city]/[hotel] route), so a future hotel
  // added there is sitemapped automatically, same pattern as destinationPages.
  const hotelPages: SitemapEntry[] = allHotels.map((h) => ({
    url: `${BASE_URL}/hotels/${h.citySlug}/${h.slug}`,
    lastModified: lastMod("/hotels/[city]/[hotel]"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...airportTransferPages,
    ...servicePages,
    ...borderCrossingPages,
    ...crossBorderRoutePages,
    ...cityTourPages,
    ...longFormGuides,
    { url: `${BASE_URL}/blog`, lastModified: lastMod("/blog"), changeFrequency: "weekly", priority: 0.80 },
    ...blogPages,
    ...cityPages,
    ...guidePages,
    ...destinationPages,
    ...hotelPages,
    ...arPages,
  ];
}
