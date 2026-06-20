import { MetadataRoute } from "next";

const BASE_URL = "https://gulftripservice.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/our-services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/fleet`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faqs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/our-gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/book-online`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/quote`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const airportTransferPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/airport-transfers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/jeddah-airport-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/riyadh-airport-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/madina-airport-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/abha-airport-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dammam-airport-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/taif-airport-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/airport-transfer-for-umrah`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/umrah-taxi-services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/umrah-transport-package`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/hotel-transfers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/private-taxi`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/corporate-transportation-services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/wedding-transportation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/school-buses-services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/educational-tours-transport`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  const borderCrossingPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/border-crossing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/saudi-arabia-to-bahrain-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/saudi-arabia-to-qatar-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/saudi-arabia-to-uae-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/saudi-arabia-to-jordan-land-transfer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const cityTourPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/jeddah-city-tour-services-in-saudi-arabia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${BASE_URL}/jeddah-to-makkah-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${BASE_URL}/makkah-to-madinah-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${BASE_URL}/taif-ziyarat-taxi-service`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${BASE_URL}/ziyarat-services-in-saudi-arabia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${BASE_URL}/reliable-alula-tour-taxi-service-in-saudi-arabia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.78,
    },
  ];

  const cityPages: MetadataRoute.Sitemap = [
    "riyadh","jeddah","makkah","madinah","dammam","khobar",
    "jubail","taif","abha","yanbu","alula","neom","tabuk",
  ].map((city) => ({ url: `${BASE_URL}/services/${city}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.80 }));

  const guidePages: MetadataRoute.Sitemap = [
    "king-khalid-airport","king-abdulaziz-airport","umrah-transportation",
    "hajj-transportation","business-travel","family-travel",
  ].map((slug) => ({ url: `${BASE_URL}/guides/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 }));

  const blogPages: MetadataRoute.Sitemap = [
    "airport-transfer-tips","private-vs-rental-car","umrah-travel-planning",
    "top-attractions-riyadh","jeddah-hidden-gems","alula-complete-guide",
    "benefits-private-airport-transfer","hajj-transport-guide",
    "family-saudi-destinations","vip-transport-saudi",
    "riyadh-to-jeddah-travel","safe-travel-tips-saudi",
  ].map((slug) => ({ url: `${BASE_URL}/blog/${slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.70 }));

  return [
    ...staticPages,
    ...airportTransferPages,
    ...servicePages,
    ...borderCrossingPages,
    ...cityTourPages,
    // Long-form content articles
    { url: `${BASE_URL}/jeddah-to-makkah-guide`,    lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${BASE_URL}/jeddah-airport-taxi-guide`,  lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${BASE_URL}/makkah-to-madinah-guide`,    lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${BASE_URL}/makkah-umrah-taxi-guide`,    lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${BASE_URL}/madinah-umrah-taxi-guide`,   lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${BASE_URL}/riyadh-to-dammam-guide`,     lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.70 },
    // Blog
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.80 },
    ...blogPages,
    // City pages
    ...cityPages,
    // Guide pages
    ...guidePages,
  ];
}
