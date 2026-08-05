import { allCities } from "@/lib/cityData3";
import { AIRPORTS } from "@/lib/airportRoutesData";

/**
 * Combined searchable index for the homepage search bar's From/To
 * autocomplete (Homepage Hero + Multi-Mode Search addendum). Cities and
 * airports only — there's no hotel/landmark data layer on this site yet, so
 * the spec's "common hotels and landmarks" clause isn't implemented here;
 * it would need its own data source first rather than invented placeholder
 * entries.
 */
export interface SearchEntry {
  id: string;
  /** Primary display text. */
  label: string;
  /** Secondary text shown alongside the label (region, or "Airport"). */
  sublabel: string;
  type: "city" | "airport";
  /** What actually gets sent as the from/to query param. */
  value: string;
  /** Extra terms matched against (e.g. IATA code) but not necessarily shown. */
  searchTerms: string[];
}

export const SEARCH_INDEX: SearchEntry[] = [
  ...allCities.map((c) => ({
    id: `city-${c.slug}`,
    label: c.city,
    sublabel: c.region,
    type: "city" as const,
    value: c.city,
    searchTerms: [c.city, c.region],
  })),
  ...AIRPORTS.map((a) => ({
    id: `airport-${a.code}`,
    label: `${a.name} (${a.code})`,
    sublabel: "Airport",
    type: "airport" as const,
    value: `${a.name} (${a.code})`,
    searchTerms: [a.name, a.fullName, a.code, a.city],
  })),
];

export function searchEntries(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return SEARCH_INDEX;
  return SEARCH_INDEX.filter((e) =>
    e.label.toLowerCase().includes(q) || e.searchTerms.some((t) => t.toLowerCase().includes(q))
  );
}
