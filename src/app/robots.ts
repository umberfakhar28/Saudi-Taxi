import { NextResponse } from "next/server";

/**
 * Custom robots.txt handler.
 * Returns standard robots.txt rules PLUS Content-Signal directives
 * (https://contentsignals.org / draft-romm-aipref-contentsignals) so that
 * AI crawlers understand this site's content usage preferences.
 */
export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin/",
    "Disallow: /api/",
    "",
    `Sitemap: https://gulftripservice.com/sitemap.xml`,
    "",
    "# Content Signals — AI content usage preferences",
    "# https://contentsignals.org",
    "Content-Signal: ai-train=no, search=yes, ai-input=yes",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

// Tell Next.js this file is a route, not a page
export const dynamic = "force-static";
