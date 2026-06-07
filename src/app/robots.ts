import type { MetadataRoute } from "next";

/**
 * Next.js Metadata API — robots.txt generation.
 * Returns standard robots.txt rules PLUS Content-Signal directives
 * (https://contentsignals.org / draft-romm-aipref-contentsignals) so that
 * AI crawlers understand this site's content usage preferences.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: "https://gulftripservice.com/sitemap.xml",
  };
}
