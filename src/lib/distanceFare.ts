/**
 * Starting fares for the distance pages, read from the route pages' own
 * price data so a distance page can never quote a different number.
 *
 * A route's fare can live in three places, depending on its template:
 * `pricing` (one figure), `landing.prices` (designed layout, per vehicle)
 * or `fareTable` (per vehicle). The lowest confirmed amount is the
 * "from" fare. Routes with none return null and the page says
 * "Quote on WhatsApp".
 */
import { allRoutes } from "./routeData";
import { formatRoutePrice, type RouteCurrency } from "./routePricing";
import type { DistanceRouteData } from "./distanceRouteData";
import { generatePageMetadata } from "./seo";

export interface Fare {
  amount: number;
  currency: RouteCurrency;
  /** "1,250 SAR" */
  en: string;
  /** "1,250 ريال" */
  ar: string;
}

const AR_CURRENCY: Record<RouteCurrency, string> = { SAR: "ريال", KWD: "دينار كويتي", AED: "درهم" };

export function routeFare(routeSlug: string): Fare | null {
  const r = allRoutes.find((x) => x.slug === routeSlug);
  if (!r) return null;
  const candidates: { amount: number; currency: RouteCurrency }[] = [];
  if (r.pricing?.amount != null) candidates.push({ amount: r.pricing.amount, currency: r.pricing.currency });
  if (r.landing) {
    for (const v of r.landing.prices.groups.flatMap((g) => g.vehicles)) {
      if (v.amount != null) candidates.push({ amount: v.amount, currency: r.landing.prices.currency });
    }
  }
  if (r.fareTable) {
    for (const row of r.fareTable.rows) if (row.amount != null) candidates.push({ amount: row.amount, currency: r.fareTable.currency });
  }
  if (!candidates.length) return null;
  const min = candidates.reduce((a, b) => (b.amount < a.amount ? b : a));
  return {
    ...min,
    en: formatRoutePrice(min.amount, min.currency),
    ar: `${min.amount.toLocaleString("en-US")} ${AR_CURRENCY[min.currency]}`,
  };
}

export const distanceFare = (d: DistanceRouteData): Fare | null => (d.fareRoute ? routeFare(d.fareRoute) : null);

/** Fill {{fare}}, {{fareAr}} and {{fare:<route-slug>}} in a piece of copy. */
export function fillFare(text: string, d: DistanceRouteData): string {
  const own = distanceFare(d);
  return text
    .replace(/\{\{fare:([a-z0-9-]+)\}\}/g, (_, slug: string) => routeFare(slug)?.en ?? "quote on WhatsApp")
    .replace(/\{\{fareAr\}\}/g, own?.ar ?? "")
    .replace(/\{\{fare\}\}/g, own?.en ?? "");
}

/** Page metadata for a distance page: the record's own title and meta,
 *  with the fare filled in. Titles are written to fit 60 characters, so
 *  the brand suffix is left off. */
export function distanceMetadata(d: DistanceRouteData) {
  return generatePageMetadata({
    title: fillFare(d.title, d),
    brandSuffix: false,
    description: fillFare(d.meta, d),
    path: `/distance/${d.slug}`,
    ogImage: `/images/distance/${d.destination.toLowerCase().replace(/ /g, "-")}.webp`,
    ogImageAlt: `${d.origin} to ${d.destination} by road`,
  });
}
