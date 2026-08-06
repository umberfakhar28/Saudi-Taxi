import { buildSitemapEntries, type SitemapEntry } from "@/lib/sitemapData";

/**
 * Hand-built XML sitemap, replacing the old special-file `sitemap.ts`
 * convention. Reason: Next.js's `MetadataRoute.Sitemap` renders the XML
 * itself with no formatting control — every element crammed onto
 * unindented single lines. Search engines don't care about whitespace,
 * but a sitemap is also the first thing a human opens to sanity-check SEO
 * work, and a wall of unindented tags reads as broken even when it's
 * technically valid. This route builds the same data
 * (src/lib/sitemapData.ts) into properly indented XML instead.
 *
 * No dynamic runtime dependencies (no headers/cookies/request data), so
 * Next.js still renders this once at build time and serves it statically —
 * same caching behavior as the old sitemap.ts, just formatted.
 */

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderUrl(entry: SitemapEntry): string {
  const lines = [
    "  <url>",
    `    <loc>${escapeXml(entry.url)}</loc>`,
  ];
  if (entry.alternates) {
    for (const [hreflang, href] of Object.entries(entry.alternates)) {
      lines.push(`    <xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}" />`);
    }
  }
  lines.push(
    `    <lastmod>${entry.lastModified.toISOString()}</lastmod>`,
    `    <changefreq>${entry.changeFrequency}</changefreq>`,
    `    <priority>${entry.priority.toFixed(2).replace(/\.?0+$/, "") || "0"}</priority>`,
    "  </url>",
  );
  return lines.join("\n");
}

export function GET() {
  const entries = buildSitemapEntries();
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries.map(renderUrl),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
