import { allCities } from "@/lib/cityData3";
import { allRoutes } from "@/lib/routeData";
import { AIRPORTS } from "@/lib/airportRoutesData";
import { TOURS } from "@/lib/tourData";
import { FEATURED_DESTINATIONS } from "@/lib/destinationData";

/**
 * Single source of truth for header nav curation (Execution Brief v3 W9).
 * Every dropdown below is either a small evergreen list (services, company
 * pages — these don't come from a data layer, so hardcoding them here is
 * correct, not a violation of ground rule 6) or derived live from
 * cityData/routeData/airportRoutesData, so a new W7 page becomes navigable
 * the moment it's added to one of those files — no second list to maintain.
 *
 * Each dropdown renders as a row of labeled columns (Navbar.tsx), so the
 * data here is grouped as `NavGroup[]` — one group per column — rather than
 * a flat link list.
 *
 * `showInNav` on RouteData/CityData defaults to true when omitted (see the
 * field's doc comment in RoutePage.tsx/CityServicePage.tsx) — set it to
 * `false` on an entry to keep a page linkable but out of the header until
 * it's ready to feature.
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}

const serviceLinks = [
  { href: "/our-services", label: "All Services" },
  { href: "/hotel-transfers", label: "Hotel Transfers" },
  { href: "/private-taxi", label: "Private Taxi" },
  { href: "/umrah-transport-package", label: "Umrah Transport" },
  { href: "/ziyarat-services-in-saudi-arabia", label: "Ziyarat Services" },
  { href: "/corporate-transportation-services", label: "Corporate Transportation" },
] satisfies NavLink[];

const tourLinks: NavLink[] = TOURS.map((t) => ({ href: t.href, label: t.label }));

const airportLinks: NavLink[] = [
  ...AIRPORTS.map((a) => ({ href: a.pageHref, label: `${a.name} (${a.code})` })),
  { href: "/airport-transfers", label: "All Airport Transfers" },
];

/** Services dropdown — 3 columns: transport services, airports, day tours. */
export const serviceGroups: NavGroup[] = [
  { label: "Transport Services", items: serviceLinks },
  { label: "Airport Transfers", items: airportLinks },
  { label: "Day Tours", items: tourLinks },
];

/** Locations dropdown — 3 columns, same clustering as /locations' province
 * grouping but recut into commercial buckets: the 5 P1 major cities, the
 * Eastern Province's secondary/industrial cities, and everything else (P2
 * tourism destinations). Derived from allCities so a new W7 city shows up
 * in the right column automatically. */
export const locationGroups: NavGroup[] = [
  {
    label: "Major Cities",
    items: allCities
      .filter((c) => c.priority === 1 && c.showInNav !== false)
      .map((c) => ({ href: `/services/${c.slug}`, label: c.city })),
  },
  {
    label: "Eastern & Industrial",
    items: allCities
      .filter((c) => c.priority === 2 && c.tags.includes("business") && c.showInNav !== false)
      .map((c) => ({ href: `/services/${c.slug}`, label: c.city })),
  },
  {
    label: "Tourism & Resorts",
    items: allCities
      .filter((c) => c.priority === 2 && c.tags.includes("tourism") && c.showInNav !== false)
      .map((c) => ({ href: `/services/${c.slug}`, label: c.city })),
  },
  {
    // Gulf-wide (Popular Destinations system, src/lib/destinationData.ts) —
    // separate from the Saudi-only columns above. Riyadh already appears
    // under Major Cities, so it's excluded here to avoid a duplicate link.
    label: "Gulf Destinations",
    items: [
      ...FEATURED_DESTINATIONS
        .filter((d) => d.country !== "saudi-arabia")
        .map((d) => ({ href: d.href, label: d.name })),
      { href: "/destinations", label: "All Popular Destinations" },
    ],
  },
];

/** Cross Border dropdown — 2 columns: the 4 country hub pages, and the
 * highest-priority specific GCC routes (derived from allRoutes, so a new
 * GCC reciprocal shows up automatically). */
export const crossBorderGroups: NavGroup[] = [
  {
    label: "By Country",
    items: [
      { href: "/border-crossing", label: "All Border Crossings" },
      { href: "/saudi-arabia-to-bahrain-taxi-service", label: "Saudi Arabia → Bahrain" },
      { href: "/saudi-arabia-to-qatar-taxi-service", label: "Saudi Arabia → Qatar" },
      { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia → UAE" },
      { href: "/saudi-arabia-to-jordan-land-transfer", label: "Saudi Arabia → Jordan" },
    ],
  },
  {
    label: "Popular Routes",
    items: [
      ...allRoutes
        .filter((r) => r.isCrossBorder && r.priority === 1 && r.showInNav !== false)
        .slice(0, 5)
        .map((r) => ({ href: `/${r.slug}`, label: `${r.origin} → ${r.destination}` })),
      { href: "/routes", label: "View All Routes" },
    ],
  },
];

/** Company dropdown — single column, no data-layer dependency. */
export const companyGroups: NavGroup[] = [
  {
    label: "Company",
    items: [
      { href: "/about-us", label: "About Us" },
      { href: "/our-gallery", label: "Gallery" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/contact-us", label: "Contact Us" },
    ],
  },
];

/** Flat list of every P1 city — used by Footer.tsx's Locations column, which
 * renders as a single list rather than the Navbar's 3-column layout. */
export const locationLinks: NavLink[] = allCities
  .filter((c) => c.priority === 1 && c.showInNav !== false)
  .map((c) => ({ href: `/services/${c.slug}`, label: c.city }));
