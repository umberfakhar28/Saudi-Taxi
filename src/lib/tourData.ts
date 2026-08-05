/**
 * Day-tour data layer (Homepage Hero + Multi-Mode Search addendum to
 * Execution Brief v3). Previously these 3 tours only existed as a hardcoded
 * link array inside config/navigation.ts's "Day Tours" column — this file
 * makes them a real data source so the search bar's Day Trips mode (and any
 * future consumer) reads live entries instead of a second hardcoded list
 * that would drift the moment a new tour page ships (W7 P2 adds 3 more:
 * Riyadh City Tour, Diriyah & Edge of the World, Abha/Al Soudah Tour).
 */
export interface TourData {
  slug: string;
  /** Short label for nav/search UI — not the page's full <h1>. */
  label: string;
  href: string;
  city: string;
}

export const TOURS: TourData[] = [
  { slug: "jeddah-city-tour", label: "Jeddah City Tour", href: "/jeddah-city-tour-services-in-saudi-arabia", city: "Jeddah" },
  { slug: "alula-tour", label: "AlUla Tour", href: "/reliable-alula-tour-taxi-service-in-saudi-arabia", city: "AlUla" },
  { slug: "taif-ziyarat-tour", label: "Taif Ziyarat Tour", href: "/taif-ziyarat-taxi-service", city: "Taif" },
];
