import { NextResponse, type NextRequest } from "next/server";
import { REGION_COOKIE, REGION_MAX_AGE, regionForCountry } from "@/lib/consent";

/** Hard stop for a stuck call (docs/perf/perf-report.md, fix F4). */
export const maxDuration = 15;

/**
 * Tells the browser whether this visitor must be asked before analytics
 * (lib/consent): sets gts_region to "eu" or "other" from Vercel's IP-country
 * header. The browser calls this only when the cookie is missing, so it costs
 * about one invocation per visitor per month, instead of the proxy doing the
 * same on every request (docs/perf/perf-report.md, fix F1).
 *
 * Off Vercel (local runs) there is no country header and the visitor counts
 * as "other", i.e. GA loads as it always has.
 *
 * The answer depends on the caller's IP, so it must never be cached by the
 * CDN or shared between visitors.
 */
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const region = regionForCountry(request.headers.get("x-vercel-ip-country"));
  const response = NextResponse.json({ region }, { headers: { "Cache-Control": "private, no-store" } });
  response.cookies.set(REGION_COOKIE, region, {
    path: "/",
    maxAge: REGION_MAX_AGE,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  });
  return response;
}
