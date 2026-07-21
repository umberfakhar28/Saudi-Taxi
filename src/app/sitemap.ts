import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://gulftripservice.com";

/**
 * Real last-modified date for a route, taken from its page.tsx mtime,
 * so the sitemap doesn't lie to crawlers by claiming every page changed
 * on every build. Falls back to a fixed date if the file can't be read.
 */
function lastMod(routePath: string): Date {
  const filePath = path.join(process.cwd(), "src", "app", routePath, "page.tsx");
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date("2026-01-01");
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: lastMod(""),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages: { en: BASE_URL, ar: `${BASE_URL}/ar` } },
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
      alternates: { languages: { en: `${BASE_URL}/contact-us`, ar: `${BASE_URL}/ar/contact-us` } },
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
  ];

  const airportTransferPages: MetadataRoute.Sitemap = [
    { slug: "/airport-transfers", priority: 0.85 },
    { slug: "/jeddah-airport-taxi-service", priority: 0.85 },
    { slug: "/riyadh-airport-taxi-service", priority: 0.85 },
    { slug: "/madina-airport-taxi-service", priority: 0.8 },
    { slug: "/abha-airport-taxi-service", priority: 0.8 },
    { slug: "/dammam-airport-taxi-service", priority: 0.8 },
    { slug: "/taif-airport-taxi-service", priority: 0.8 },
    { slug: "/airport-transfer-for-umrah", priority: 0.8 },
  ].map(({ slug, priority }) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const servicePages: MetadataRoute.Sitemap = [
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

  const borderCrossingPages: MetadataRoute.Sitemap = [
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
      alternates: { languages: { en: `${BASE_URL}${slug}`, ar: `${BASE_URL}/ar${slug}` } },
    }),
  }));

  const crossBorderRoutePages: MetadataRoute.Sitemap = [
    { slug: "/dammam-airport-to-bahrain-taxi-service", priority: 0.8 },
    { slug: "/dammam-airport-to-khafji-taxi-service", priority: 0.75 },
    { slug: "/dammam-airport-to-qatar-taxi-service", priority: 0.8 },
    { slug: "/dammam-airport-to-riyadh-taxi-service", priority: 0.78 },
    { slug: "/bahrain-to-dammam-taxi-service", priority: 0.8 },
    { slug: "/qatar-to-riyadh-taxi-service", priority: 0.78 },
    { slug: "/khafji-to-kuwait-taxi-service", priority: 0.75 },
    { slug: "/riyadh-to-bahrain-taxi-service", priority: 0.78 },
    { slug: "/dammam-to-kuwait-taxi-service", priority: 0.75 },
  ].map(({ slug, priority }) => {
    const hasArabic = slug === "/dammam-airport-to-bahrain-taxi-service" || slug === "/dammam-airport-to-qatar-taxi-service";
    return {
      url: `${BASE_URL}${slug}`,
      lastModified: lastMod(slug),
      changeFrequency: "monthly" as const,
      priority,
      ...(hasArabic && {
        alternates: { languages: { en: `${BASE_URL}${slug}`, ar: `${BASE_URL}/ar${slug}` } },
      }),
    };
  });

  const arPages: MetadataRoute.Sitemap = [
    { slug: "/ar", enSlug: "/", priority: 0.95 },
    { slug: "/ar/border-crossing", enSlug: "/border-crossing", priority: 0.75 },
    { slug: "/ar/dammam-airport-to-bahrain-taxi-service", enSlug: "/dammam-airport-to-bahrain-taxi-service", priority: 0.75 },
    { slug: "/ar/dammam-airport-to-qatar-taxi-service", enSlug: "/dammam-airport-to-qatar-taxi-service", priority: 0.75 },
    { slug: "/ar/contact-us", enSlug: "/contact-us", priority: 0.7 },
  ].map(({ slug, enSlug, priority }) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly" as const,
    priority,
    alternates: { languages: { en: `${BASE_URL}${enSlug}`, ar: `${BASE_URL}${slug}` } },
  }));

  const cityTourPages: MetadataRoute.Sitemap = [
    { slug: "/jeddah-city-tour-services-in-saudi-arabia", priority: 0.78 },
    { slug: "/jeddah-to-makkah-taxi-service", priority: 0.78 },
    { slug: "/makkah-to-madinah-taxi-service", priority: 0.78 },
    { slug: "/taif-ziyarat-taxi-service", priority: 0.78 },
    { slug: "/ziyarat-services-in-saudi-arabia", priority: 0.78 },
    { slug: "/reliable-alula-tour-taxi-service-in-saudi-arabia", priority: 0.78 },
  ].map(({ slug, priority }) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const longFormGuideSlugs = [
    "/jeddah-to-makkah-guide",
    "/jeddah-airport-taxi-guide",
    "/makkah-to-madinah-guide",
    "/makkah-umrah-taxi-guide",
    "/madinah-umrah-taxi-guide",
  ];
  const longFormGuides: MetadataRoute.Sitemap = longFormGuideSlugs.map((slug) => ({
    url: `${BASE_URL}${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  longFormGuides.push({
    url: `${BASE_URL}/riyadh-to-dammam-guide`,
    lastModified: lastMod("/riyadh-to-dammam-guide"),
    changeFrequency: "monthly" as const,
    priority: 0.70,
  });

  const cityPages: MetadataRoute.Sitemap = [
    "riyadh", "jeddah", "makkah", "madinah", "dammam", "khobar",
    "jubail", "taif", "abha", "yanbu", "alula", "neom", "tabuk",
  ].map((city) => ({
    url: `${BASE_URL}/services/${city}`,
    lastModified: lastMod(`/services/${city}`),
    changeFrequency: "monthly" as const,
    priority: 0.80,
  }));

  const guidePages: MetadataRoute.Sitemap = [
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
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: lastMod(`/blog/${slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.70,
  }));

  return [
    ...staticPages,
    ...airportTransferPages,
    ...servicePages,
    ...borderCrossingPages,
    ...crossBorderRoutePages,
    ...cityTourPages,
    ...longFormGuides,
    { url: `${BASE_URL}/blog`, lastModified: lastMod("/blog"), changeFrequency: "weekly" as const, priority: 0.80 },
    ...blogPages,
    ...cityPages,
    ...guidePages,
    ...arPages,
  ];
}
