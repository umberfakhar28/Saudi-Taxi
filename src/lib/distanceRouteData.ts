/**
 * Distance / Route Guide page family (/distance/[route]).
 *
 * Distinct in intent from RouteData (routeData.ts, powers the "-taxi-service"
 * pages) — those are commercial/booking-first pages; this family answers the
 * research-stage question ("how far is X from Y, how long does it take")
 * before pivoting to the private-transfer option. Kept as a separate data
 * file and template (DistancePage.tsx) rather than reusing RoutePage.tsx, so
 * neither page family has to carry fields/sections that don't belong to it.
 *
 * Each entry is genuinely unique content — no field here is a find/replace
 * of city names into a shared sentence template. New routes are added by
 * appending another entry to `distanceRoutes` and a thin page.tsx that reads
 * it; nothing else needs to change (sitemapData.ts derives its entries from
 * this map's keys automatically).
 */

export interface DistanceRouteData {
  slug: string;
  origin: string;
  destination: string;
  /** CityData slug for the origin, where a /services/[slug] page exists. */
  originCitySlug?: string;
  /** CityData slug for the destination, where a /services/[slug] page exists. */
  destinationCitySlug?: string;
  /** Real hub-page hrefs from airportRoutesData.ts — only set where that
   * endpoint's city actually has its own airport page. */
  originAirportHref?: string;
  destinationAirportHref?: string;

  eyebrow: string;
  h1: string;
  intro: string;
  breadcrumbLabel: string;

  /** Road (driving) distance — always a range, never a single invented
   * figure, per the ground rule against presenting estimates as exact facts. */
  roadDistance: string;
  /** Straight-line ("as the crow flies") distance — optional context only,
   * shown alongside road distance to explain why the two numbers differ. */
  straightLineDistance?: string;
  driveTime: string;
  routeType: string;

  overviewParagraphs: string[];
  /** Genuine, verifiable geographic/road characteristics of this specific
   * corridor — not generic filler that would read the same on any route. */
  routeCharacteristics: string[];
  /** Real factors that actually change this route's travel time. */
  factorsAffectingTime: string[];

  travelOptions: { title: string; description: string }[];
  /** Reuses the site's already-established service claims (see
   * RoutePage.tsx's includedItemsFor) — nothing new asserted here. */
  transferBenefits: string[];

  journeyPlanning: { title: string; note: string }[];
  bestTimeToTravel: string[];

  faqs: { q: string; a: string }[];

  /** Slugs of other distanceRoutes entries this page should link to. Only
   * rendered for slugs that actually resolve (see DistancePage.tsx) — a
   * forward reference to a route not yet built is safe and becomes live
   * automatically once that page ships, same pattern as RouteData.reverseSlug. */
  relatedDistanceSlugs: string[];
  /** Existing, live pages elsewhere on the site — taxi-service routes,
   * fleet, quote, etc. Every href here must already resolve; never a
   * planned/future page. */
  relatedServiceLinks: { href: string; label: string }[];

  ctaText: string;
  heroImage?: string;
  heroImageAlt?: string;
  /** Only set when this content has genuinely just been authored/reviewed —
   * never a fabricated freshness signal. */
  lastReviewed?: string;
}

export const distanceRoutes: Record<string, DistanceRouteData> = {
  "abha-to-madinah": {
    slug: "abha-to-madinah",
    origin: "Abha",
    destination: "Madinah",
    originCitySlug: "abha",
    destinationCitySlug: "madinah",
    originAirportHref: "/abha-airport-taxi-service",
    destinationAirportHref: "/madina-airport-taxi-service",

    eyebrow: "Distance & Travel Guide",
    h1: "Abha to Madinah Distance & Travel Guide",
    intro:
      "How far Abha is from Madinah, how long the drive actually takes, and the realistic ways to cover this long north–south corridor — from self-driving to a private chauffeur transfer.",
    breadcrumbLabel: "Abha to Madinah",

    roadDistance: "approximately 980–1,060 km by road",
    straightLineDistance: "roughly 700–750 km measured directly (straight-line)",
    driveTime: "approximately 11–12.5 hours of continuous driving",
    routeType: "Domestic route within Saudi Arabia — no border crossing",

    overviewParagraphs: [
      "Abha sits at roughly 2,200 metres in the Asir mountains, in Saudi Arabia's southwest — Madinah lies far to the north, in the western Hejaz region. There's no direct short cut between the two: any journey starts with a descent out of the highlands before joining the main north–south highway network for the long run up the western side of the country.",
      "The gap between road distance and straight-line distance is unusually wide on this corridor — around 300 km wider than the direct distance — because the route has to work around mountainous terrain near Abha before it can straighten out onto flatter highway further north. That's normal for a journey that starts in the Asir highlands; it isn't a sign of an inefficient route.",
      "Because of the distance involved, this is realistically a full-day journey by road. Most travelers either commit to one long driving day with planned stops, split it across two days, or cover the distance by air and arrange ground transport at each end instead.",
    ],
    routeCharacteristics: [
      "Starts with a mountain descent out of the Asir highlands around Abha before joining the main highway network heading north.",
      "The middle section of the journey runs through the western interior, broadly parallel to the coast rather than along it.",
      "This is one of the longest domestic city-to-city corridors in the kingdom — noticeably longer than the well-traveled Jeddah–Makkah–Madinah routes further north.",
      "No international border crossing is involved — this is entirely a domestic Saudi Arabia journey.",
    ],
    factorsAffectingTime: [
      "Mountain roads on the initial descent from Abha are slower than open highway and factor into the total time beyond pure highway-speed driving.",
      "Rest stops for meals, prayer, and fuel meaningfully extend an 11–12.5 hour drive — most travelers should plan for a longer total journey time than the pure driving estimate.",
      "Traffic density increases noticeably on the approach to Madinah during Umrah season and the weeks around Ramadan and Hajj.",
      "Time of departure matters on a drive this long — starting early avoids finishing the mountain descent or the final approach into Madinah after dark.",
    ],

    travelOptions: [
      {
        title: "Private Taxi / Chauffeur Transfer",
        description:
          "A private vehicle covers the full distance in one continuous, door-to-door trip, with the driver handling navigation, rest-stop timing, and the mountain descent out of Abha — the most direct option if you'd rather not drive the distance yourself.",
      },
      {
        title: "Self-Driving",
        description:
          "Realistic for confident long-distance drivers, but an 11–12.5 hour drive on unfamiliar mountain and highway roads is a genuinely demanding single-day undertaking — most self-drivers on this corridor plan an overnight stop partway rather than attempting it in one continuous run.",
      },
      {
        title: "Domestic Flight",
        description:
          "Given the distance, a short domestic flight between Abha and Madinah is a realistic alternative worth knowing about — it removes the long drive entirely, at the cost of needing separate ground transport at each end.",
      },
    ],
    transferBenefits: [
      "Door-to-door pickup — no need to transfer between vehicles or arrange separate transport at either end",
      "A private vehicle for your group only, not a shared ride",
      "Professional, licensed driver who handles the mountain descent and the long highway stretch",
      "Flexible departure time, so you can start early and avoid finishing either leg of the journey after dark",
      "Luggage space suited to a full-day journey, not just a short city transfer",
      "Rest stops planned around your group rather than a fixed schedule",
      "Suitable for families and small groups traveling together, including Umrah pilgrims connecting on to Madinah",
    ],

    journeyPlanning: [
      { title: "Plan for a Full Day", note: "Between the 11–12.5 hour driving estimate and realistic rest stops, treat this as a full-day journey rather than something to fit around other plans." },
      { title: "Luggage & Packing", note: "A journey this long is more comfortable with luggage that's easy to access mid-trip — keep water, snacks, and any medication within reach rather than packed away." },
      { title: "Families & Elderly Passengers", note: "Build in extra rest stops beyond the minimum — a long mountain-to-highway drive is more tiring for young children and elderly travelers than the driving-time estimate alone suggests." },
      { title: "Departure Timing", note: "An early-morning start is generally more comfortable than a late-day departure, since it avoids finishing either the mountain descent or the Madinah approach after dark." },
      { title: "Seasonal Timing", note: "If your trip lines up with Ramadan, Hajj, or peak Umrah season, expect busier roads and more traffic on the Madinah approach specifically." },
    ],
    bestTimeToTravel: [
      "Cooler early-morning hours are generally easier for the mountain descent out of Abha than the heat of midday.",
      "Traffic on the approach into Madinah is consistently busier during Ramadan and the weeks around Hajj — if your schedule is flexible, traveling outside those periods tends to mean a smoother final stretch.",
      "Outside of those peak religious travel periods, this route doesn't have a strongly seasonal traffic pattern — road conditions matter more than the time of year for a journey this long.",
    ],

    faqs: [
      { q: "How far is Abha from Madinah?", a: "By road, approximately 980–1,060 km. The straight-line distance is shorter, at roughly 700–750 km — the difference comes from having to route around the Asir highlands rather than travel in a straight line." },
      { q: "How long does it take to drive from Abha to Madinah?", a: "Around 11–12.5 hours of continuous driving. In practice, most journeys take longer once you add meal, prayer, and fuel stops — treat it as a full-day trip." },
      { q: "What is the best way to travel from Abha to Madinah?", a: "For a direct, door-to-door journey without driving it yourself, a private taxi or chauffeur transfer is the most straightforward option. Confident long-distance drivers can self-drive, and a domestic flight is a realistic alternative if you'd rather skip the drive entirely." },
      { q: "Can I book a private taxi from Abha to Madinah?", a: "Yes — Gulf Trip Service arranges private transfers for this route. Get in touch for a quote based on your travel date and group size." },
      { q: "Is Abha to Madinah suitable for a family road trip?", a: "It can be, with realistic planning — build in extra rest stops beyond the minimum, especially with young children or elderly passengers, since it's a genuinely long single-day journey." },
      { q: "Is the route domestic or international?", a: "Entirely domestic — the whole journey stays within Saudi Arabia with no border crossing involved." },
      { q: "Does travel time vary by traffic or season?", a: "Yes. The driving-time estimate is based on typical road conditions — expect the approach into Madinah specifically to be busier during Ramadan and peak Umrah/Hajj periods." },
      { q: "Can I request a private vehicle for a larger group or extra luggage?", a: "Yes — vehicle options range from a private sedan up to larger vehicles suited to groups and additional luggage. Share your group size when requesting a quote." },
    ],

    relatedDistanceSlugs: [],
    relatedServiceLinks: [
      { href: "/makkah-to-madinah-taxi-service", label: "Makkah to Madinah taxi service" },
      { href: "/umrah-taxi-services", label: "Umrah taxi services" },
      { href: "/private-taxi", label: "Private taxi service" },
    ],

    ctaText: "Get a Private Transfer Quote for Abha to Madinah",
    heroImage: "/destinations/abha-asir-mountains-view.webp",
    heroImageAlt: "The Asir mountains near Abha, starting point of the Abha to Madinah route",
    lastReviewed: "2026-08-26",
  },
};

export const allDistanceRoutes: DistanceRouteData[] = Object.values(distanceRoutes);
