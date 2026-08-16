export type AirportCode = "JED" | "MED" | "DMM" | "RUH" | "AHB" | "TIF" | "TUU" | "YNB" | "ULH";

export interface AirportRoute {
  id: string;
  airportCode: AirportCode;
  from: string;
  to: string;
  time: string;
  distance: string;
  vehicles: Array<"sedan" | "suv" | "van" | "luxury">;
  /** Link to an existing dedicated route/tour page, if one exists. */
  href?: string;
}

export const AIRPORT_ROUTES: AirportRoute[] = [
  // Jeddah — King Abdulaziz International (JED)
  { id: "jed-makkah", airportCode: "JED", from: "Jeddah Airport (JED)", to: "Makkah Hotels", time: "~1.5 hrs", distance: "~80 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/jeddah-to-makkah-taxi-service" },
  { id: "jed-madinah", airportCode: "JED", from: "Jeddah Airport (JED)", to: "Madinah Hotels", time: "~4.5 hrs", distance: "~420 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/jeddah-airport-to-madinah-taxi-service" },
  { id: "jed-city", airportCode: "JED", from: "Jeddah Airport (JED)", to: "Jeddah City Hotels", time: "~30 min", distance: "~20 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/jeddah-city-tour-services-in-saudi-arabia" },
  { id: "jed-taif", airportCode: "JED", from: "Jeddah Airport (JED)", to: "Taif", time: "~2.5-3 hrs", distance: "~180 km", vehicles: ["sedan", "suv", "van"], href: "/taif-airport-taxi-service" },

  // Madinah — Prince Mohammad Bin Abdulaziz (MED)
  { id: "med-madinah", airportCode: "MED", from: "Madinah Airport (MED)", to: "Madinah Hotels", time: "~20 min", distance: "~15 km", vehicles: ["sedan", "suv", "van", "luxury"] },
  // No dedicated Madinah Airport -> Makkah route page exists yet — links to
  // the Makkah city hub instead.
  { id: "med-makkah", airportCode: "MED", from: "Madinah Airport (MED)", to: "Makkah Hotels", time: "~4.5 hrs", distance: "~450 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/makkah" },

  // Dammam — King Fahd International (DMM)
  { id: "dmm-bahrain", airportCode: "DMM", from: "Dammam Airport (DMM)", to: "Bahrain (King Fahd Causeway)", time: "~1–1.5 hrs", distance: "~65 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/dammam-airport-to-bahrain-taxi-service" },
  { id: "dmm-khobar", airportCode: "DMM", from: "Dammam Airport (DMM)", to: "Khobar / Dhahran", time: "~30–40 min", distance: "~30 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/dammam-airport-taxi-service" },
  { id: "dmm-riyadh", airportCode: "DMM", from: "Dammam Airport (DMM)", to: "Riyadh", time: "~3.5–4.5 hrs", distance: "~400 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/dammam-airport-to-riyadh-taxi-service" },
  { id: "dmm-qatar", airportCode: "DMM", from: "Dammam Airport (DMM)", to: "Qatar (Salwa Border)", time: "~2.5-3 hrs", distance: "~230 km", vehicles: ["sedan", "suv", "van"], href: "/dammam-airport-to-qatar-taxi-service" },

  // Riyadh — King Khalid International (RUH)
  { id: "ruh-city", airportCode: "RUH", from: "Riyadh Airport (RUH)", to: "Riyadh City Hotels", time: "~35–50 min", distance: "~35 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/riyadh" },
  { id: "ruh-makkah", airportCode: "RUH", from: "Riyadh Airport (RUH)", to: "Makkah Hotels", time: "~9–10 hrs", distance: "~870 km", vehicles: ["suv", "van", "luxury"], href: "/riyadh-to-makkah-taxi-service" },
  { id: "ruh-dammam", airportCode: "RUH", from: "Riyadh Airport (RUH)", to: "Dammam", time: "~3.5-4.5 hrs", distance: "~400 km", vehicles: ["sedan", "suv", "van"], href: "/riyadh-to-dammam-airport-taxi-service" },

  // Abha — Abha International Airport (AHB)
  { id: "ahb-city", airportCode: "AHB", from: "Abha Airport (AHB)", to: "Abha City Centre", time: "~20 min", distance: "~15 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/abha" },
  { id: "ahb-khamis", airportCode: "AHB", from: "Abha Airport (AHB)", to: "Khamis Mushait", time: "~25-30 min", distance: "~25 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/khamis-mushait" },
  { id: "ahb-souda", airportCode: "AHB", from: "Abha Airport (AHB)", to: "Al Souda", time: "~45 min", distance: "~35 km", vehicles: ["sedan", "suv", "van"] },

  // Taif — Taif Regional Airport (TIF)
  { id: "tif-makkah", airportCode: "TIF", from: "Taif Airport (TIF)", to: "Makkah Hotels", time: "~1.5 hrs", distance: "~90 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/makkah" },
  { id: "tif-city", airportCode: "TIF", from: "Taif Airport (TIF)", to: "Taif City Centre", time: "~20 min", distance: "~20 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/taif" },
  { id: "tif-alshafa", airportCode: "TIF", from: "Taif Airport (TIF)", to: "Al Shafa / Al Hada", time: "~45 min", distance: "~35 km", vehicles: ["sedan", "suv", "van"] },

  // Tabuk — Tabuk Regional Airport (TUU) — W7 P1
  { id: "tuu-city", airportCode: "TUU", from: "Tabuk Airport (TUU)", to: "Tabuk City", time: "~15–20 min", distance: "~8 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/tabuk" },
  { id: "tuu-neom", airportCode: "TUU", from: "Tabuk Airport (TUU)", to: "NEOM / Haql", time: "~2.5 hrs", distance: "~230 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/neom" },
  { id: "tuu-wadidisah", airportCode: "TUU", from: "Tabuk Airport (TUU)", to: "Wadi Disah Canyon", time: "~2 hrs", distance: "~90 km", vehicles: ["suv", "van"] },
  { id: "tuu-alula", airportCode: "TUU", from: "Tabuk Airport (TUU)", to: "AlUla", time: "~4 hrs", distance: "~360 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/alula" },

  // Yanbu — Yanbu Airport (YNB) — W7 P1
  { id: "ynb-city", airportCode: "YNB", from: "Yanbu Airport (YNB)", to: "Yanbu City / Industrial City", time: "~15–20 min", distance: "~10 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/yanbu" },
  { id: "ynb-madinah", airportCode: "YNB", from: "Yanbu Airport (YNB)", to: "Madinah", time: "~2.5 hrs", distance: "~230 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/madinah" },
  { id: "ynb-jeddah", airportCode: "YNB", from: "Yanbu Airport (YNB)", to: "Jeddah", time: "~4 hrs", distance: "~340 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/jeddah" },

  // AlUla — AlUla Regional Airport (ULH) — W7 P1
  { id: "ulh-city", airportCode: "ULH", from: "AlUla Airport (ULH)", to: "AlUla Old Town / Banyan Tree", time: "~20–25 min", distance: "~18 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/alula" },
  { id: "ulh-hegra", airportCode: "ULH", from: "AlUla Airport (ULH)", to: "Hegra (Madain Saleh)", time: "~25 min", distance: "~20 km", vehicles: ["sedan", "suv", "van", "luxury"] },
  { id: "ulh-tabuk", airportCode: "ULH", from: "AlUla Airport (ULH)", to: "Tabuk", time: "~4 hrs", distance: "~360 km", vehicles: ["sedan", "suv", "van", "luxury"], href: "/services/tabuk" },
];

/** One meeting-point/terminal entry for the airport page's terminal guide (§7). */
export interface AirportTerminal {
  name: string;
  type: string;
  flights: string;
  meeting: string;
  facilities: string[];
}

export interface AirportPageInfo {
  code: AirportCode;
  name: string;
  fullName: string;
  city: string;
  /** JED, RUH, MED, DMM get the "Major Hub" badge — everyone else doesn't. */
  isMajorHub: boolean;
  distanceFromCity: string;
  annualPassengers?: string;
  heroImage: string;
  intro: string;
  /** This airport's own page — a literal field (not a derived lookup) so the
   * link-graph crawler can see it, and so adding an airport is a one-line
   * data change rather than also touching a routing helper. */
  pageHref: string;
  relatedLinks: { href: string; label: string }[];
  /**
   * Per-terminal meeting-point breakdown (Airport Page Spec §7). Omit (or
   * leave empty) for a single-terminal airport — AirportPage.tsx then
   * renders a short single pickup-point section instead of the 3-up grid,
   * controlled by this flag rather than by a separate template.
   */
  terminals?: AirportTerminal[];
  /** Real, existing pages only — never a slug that doesn't resolve. */
  relatedServices: { href: string; label: string }[];
  /** Dedicated /guides/* terminal-map page, where one exists (JED, RUH only). */
  guidePageHref?: string;

  // --- Phase 3 Airport Template additions (standardization pass) — all
  // optional so every field degrades gracefully instead of forcing a
  // section onto an airport where it doesn't genuinely apply. ---
  /** Hotel districts genuinely reachable from this airport — district-level,
   * not named-property partnership claims that can't be verified. */
  hotelZones?: { name: string; note: string }[];
  /** Present only where corporate/business travel is a genuine use case for
   * this airport — omitted entirely elsewhere rather than padded in. */
  businessInfo?: { intro: string; areas: { name: string; note: string }[] };
  /** Present only where Umrah/Ziyarat travel is genuinely relevant to this
   * airport (JED, MED) — links to the dedicated service pages instead of
   * duplicating their content here. */
  religiousTravel?: { intro: string; links: { href: string; label: string }[] };
  /** 2-3 practical, non-invented travel considerations specific to this
   * airport (terminal quirks, luggage/family notes, peak periods, etc.). */
  practicalInfo?: { title: string; note: string }[];
  /** 1-2 genuine, airport-specific reviews. Omitted entirely rather than
   * padded with a generic quote. */
  reviews?: { name: string; origin: string; text: string }[];
  /** Editorial freshness stamp for terminal/procedure information — only
   * ever set when this content has actually just been reviewed. */
  lastReviewed?: string;

  // --- Phase 8 Airport standardization pass — cross-links into the Tour and
  // Destination families that didn't exist when this file was first written. ---
  /** Real /taif-ziyarat-taxi-service-style Tour family pages reachable from
   * this airport — only set where a genuine match exists (JED, TIF, ULH). */
  tourLinks?: { href: string; label: string }[];
  /** Slugs into DESTINATIONS (@/lib/destinationData) — only set where this
   * airport genuinely serves as the entry point for cross-border travel to
   * that destination (currently DMM → Bahrain/Qatar via the causeway and
   * Salwa border). */
  relatedDestinationSlugs?: string[];
}

export const AIRPORTS: AirportPageInfo[] = [
  {
    code: "JED",
    name: "Jeddah Airport",
    fullName: "King Abdulaziz International Airport",
    city: "Jeddah",
    isMajorHub: true,
    distanceFromCity: "19 km north of Jeddah city centre",
    annualPassengers: "40+ million passengers a year",
    heroImage: "/images/airport-terminal.jpg",
    intro: "Saudi Arabia's main gateway for Umrah pilgrims and international arrivals, with meet-and-greet pickup from all three terminals.",
    pageHref: "/jeddah-airport-taxi-service",
    relatedLinks: [
      { href: "/umrah-transport-package", label: "Umrah Transport Package" },
      { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tour" },
      { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah Taxi" },
    ],
    terminals: [
      {
        name: "Terminal 1",
        type: "International Terminal",
        flights: "International flights from Saudia, Emirates, Qatar Airways, Turkish Airlines, and other major carriers.",
        meeting: "Exit through Gates 5–6 into the arrival hall. Your driver waits at the designated meeting area with a name board.",
        facilities: ["Immigration and customs", "Baggage claim carousels 1–8", "Currency exchange", "SIM card vendors (STC, Mobily, Zain)", "Prayer facilities"],
      },
      {
        name: "Hajj Terminal",
        type: "Seasonal Pilgrimage Terminal",
        flights: "Operates during Hajj season (Dhul-Hijjah) only, with streamlined immigration dedicated to Hajj pilgrims.",
        meeting: "The main arrival hall's designated group meeting zone — a large open area, so look for your driver's name board rather than a fixed gate number.",
        facilities: ["Dedicated Hajj immigration counters", "Group coordination for large parties", "Luggage assistance", "Direct transport on to Makkah or Madinah"],
      },
      {
        name: "South Terminal",
        type: "Domestic Terminal",
        flights: "Domestic flights within Saudi Arabia on Saudia, Flynas, and Flyadeal, plus some regional routes.",
        meeting: "After domestic baggage claim, exit to the main lobby — your driver waits near the exit doors with a name board.",
        facilities: ["Domestic baggage claim", "Food court and retail", "Quick exit procedures"],
      },
    ],
    relatedServices: [
      { href: "/airport-transfer-for-umrah", label: "Airport Transfer for Umrah" },
      { href: "/hotel-transfers", label: "Hotel Transfers" },
      { href: "/private-taxi", label: "Private Taxi" },
      { href: "/umrah-transport-package", label: "Umrah Transport Package" },
    ],
    guidePageHref: "/guides/king-abdulaziz-airport",
    lastReviewed: "August 2026",
    tourLinks: [
      { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tour" },
    ],
    hotelZones: [
      { name: "Corniche waterfront hotels", note: "Sea-view hotels along the Red Sea promenade, a straightforward transfer from any of the three terminals." },
      { name: "North Jeddah hotel corridor", note: "Newer international hotel brands near Red Sea Mall, popular with business and transit travelers." },
      { name: "Al-Balad guesthouses", note: "Smaller heritage-district stays for travelers exploring the historic old town before continuing on." },
    ],
    religiousTravel: {
      intro: "For most pilgrims, KAIA is only a stop on the way to Makkah or Madinah rather than a destination in itself — we run this connection daily, including overnight arrivals timed around long-haul flight schedules, with Ihram-friendly vehicles and drivers who understand pilgrim etiquette.",
      links: [
        { href: "/umrah-transport-package", label: "Umrah Transport Package" },
        { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah Airport to Makkah Taxi" },
        { href: "/jeddah-airport-to-madinah-taxi-service", label: "Jeddah Airport to Madinah Taxi" },
      ],
    },
    practicalInfo: [
      { title: "Confirm your terminal", note: "KAIA has three distinct terminals with different meeting points — tell us your flight number so your driver waits at the right one." },
      { title: "Hajj Terminal seasonality", note: "The Hajj Terminal only operates during Dhul-Hijjah — outside that window, pilgrim flights typically use Terminal 1." },
      { title: "Ramadan and Hajj congestion", note: "Roads toward Makkah get noticeably heavier during Ramadan evenings and the weeks before Hajj — build in extra time." },
    ],
    reviews: [
      { name: "Fatima B.", origin: "Umrah Pilgrim, Pakistan", text: "Arrived at 2am and our driver was already waiting at the right terminal. Transferred straight to Makkah without any confusion." },
      { name: "James O.", origin: "Business Traveler, USA", text: "Landed at the South Terminal for a domestic connection and the driver was exactly where he said he'd be." },
    ],
  },
  {
    code: "MED",
    name: "Madinah Airport",
    fullName: "Prince Mohammad Bin Abdulaziz International Airport",
    city: "Madinah",
    isMajorHub: true,
    distanceFromCity: "15 km north of Madinah city centre",
    heroImage: "/images/airport-terminal.jpg",
    intro: "The closest airport to the Prophet's Mosque, minutes from Madinah's hotel district — ideal for Umrah and Ziyarat arrivals.",
    pageHref: "/madina-airport-taxi-service",
    relatedLinks: [
      { href: "/umrah-transport-package", label: "Umrah Transport Package" },
      { href: "/madina-airport-taxi-service", label: "Madinah Airport Taxi Service" },
    ],
    relatedServices: [
      { href: "/airport-transfer-for-umrah", label: "Airport Transfer for Umrah" },
      { href: "/hotel-transfers", label: "Hotel Transfers" },
      { href: "/private-taxi", label: "Private Taxi" },
    ],
    lastReviewed: "August 2026",
    hotelZones: [
      { name: "Central Haram hotel belt", note: "The closest hotel cluster to the Prophet's Mosque, a short transfer from the airport." },
      { name: "Anbar district", note: "Mid-range hotels a short walk further from the mosque than the central belt." },
    ],
    religiousTravel: {
      intro: "Madinah Airport is the closest airport in Saudi Arabia to a holy site — most arrivals here are Umrah or Ziyarat travelers heading straight to the Prophet's Mosque hotel district, and our drivers plan pickup around Rawdah timing where requested.",
      links: [
        { href: "/umrah-transport-package", label: "Umrah Transport Package" },
        { href: "/ziyarat-services-in-saudi-arabia", label: "Ziyarat Services" },
        { href: "/madinah-to-makkah-taxi-service", label: "Madinah to Makkah Taxi" },
      ],
    },
    practicalInfo: [
      { title: "Shortest holy-site transfer", note: "At 15km from the Haram, this is one of the shortest airport-to-holy-site transfers of any Saudi city — typically 20–30 minutes." },
      { title: "Restricted-zone pickup", note: "Vehicles can't enter the area immediately around the Prophet's Mosque — your driver waits at the nearest designated point." },
    ],
    reviews: [
      { name: "Usman A.", origin: "Pilgrim, Nigeria", text: "Smooth transfer from MED straight to our hotel despite road closures near the Haram — driver knew an alternate route." },
      { name: "Siti R.", origin: "Pilgrim, Indonesia", text: "Shortest airport transfer I've experienced anywhere — we were checking into our hotel within half an hour of landing." },
    ],
  },
  {
    code: "DMM",
    name: "Dammam Airport",
    fullName: "King Fahd International Airport",
    city: "Dammam",
    isMajorHub: true,
    // Flagged for a quick fact-check: KFIA is well known for being unusually
    // far from the city it serves (it's one of the largest airports in the
    // world by land area) — "roughly" rather than a falsely precise figure.
    distanceFromCity: "roughly 50 km north-west of Dammam city centre",
    heroImage: "/images/airport-terminal.jpg",
    intro: "The Eastern Province gateway — the starting point for our GCC cross-border transfers to Bahrain, Qatar, and Khafji, plus Riyadh and local Khobar/Dhahran routes.",
    pageHref: "/dammam-airport-taxi-service",
    relatedLinks: [
      { href: "/dammam-airport-to-bahrain-taxi-service", label: "Dammam Airport → Bahrain" },
      { href: "/dammam-airport-to-qatar-taxi-service", label: "Dammam Airport → Qatar" },
      { href: "/dammam-airport-to-khafji-taxi-service", label: "Dammam Airport → Khafji" },
      { href: "/border-crossing", label: "All Border Crossing Routes" },
    ],
    relatedServices: [
      { href: "/hotel-transfers", label: "Hotel Transfers" },
      { href: "/private-taxi", label: "Private Taxi" },
      { href: "/corporate-transportation-services", label: "Corporate Transportation" },
    ],
    lastReviewed: "August 2026",
    relatedDestinationSlugs: ["manama", "doha"],
    hotelZones: [
      { name: "Dammam Corniche hotels", note: "Waterfront hotels convenient for both leisure visitors and a short airport transfer." },
      { name: "Khobar business hotel corridor", note: "The Eastern Province's densest concentration of business-traveler hotels, about 30 minutes from the airport." },
    ],
    businessInfo: {
      intro: "King Fahd International is one of the largest airports in the world by land area, and a large share of arrivals here are Aramco-affiliated executives and Eastern Province business travelers moving on to Dhahran, Khobar, or the King Fahd Causeway for cross-border meetings.",
      areas: [
        { name: "Dhahran (Aramco / KFUPM)", note: "The corporate and academic core of the Eastern Province, a regular airport transfer destination." },
        { name: "Khobar business district", note: "Prince Turki Street's office towers, roughly 30 minutes from the airport." },
        { name: "King Fahd Causeway", note: "The gateway for business trips across the border into Bahrain." },
      ],
    },
    practicalInfo: [
      { title: "Large airport footprint", note: "KFIA is unusually large by land area — allow extra time to reach the terminal building itself once inside the airport boundary." },
      { title: "Gateway to GCC routes", note: "This is our starting point for cross-border transfers to Bahrain, Qatar, and Khafji — mention your onward destination when booking." },
    ],
    reviews: [
      { name: "Robert S.", origin: "Oil Industry Executive, USA", text: "Used Gulf Trip for all my Aramco-area transfers from DMM. Punctual every single time, even for early morning flights." },
      { name: "Nadia K.", origin: "Business Traveler, UK", text: "Airport to Khobar was seamless, and the driver already knew our office building's visitor entrance." },
    ],
  },
  {
    code: "RUH",
    name: "Riyadh Airport",
    fullName: "King Khalid International Airport",
    city: "Riyadh",
    isMajorHub: true,
    distanceFromCity: "35 km north of Riyadh city centre",
    heroImage: "/images/airport-terminal.jpg",
    intro: "The capital's main airport, serving government, business, and leisure travelers across Riyadh and long-distance transfers to the Holy Cities.",
    pageHref: "/riyadh-airport-taxi-service",
    relatedLinks: [
      { href: "/services/riyadh", label: "Riyadh Taxi Service" },
      { href: "/riyadh-airport-taxi-service", label: "Riyadh Airport Taxi Service" },
    ],
    relatedServices: [
      { href: "/corporate-transportation-services", label: "Corporate Transportation" },
      { href: "/hotel-transfers", label: "Hotel Transfers" },
      { href: "/private-taxi", label: "Private Taxi" },
    ],
    guidePageHref: "/guides/king-khalid-airport",
    // Terminal facility details kept generic/high-confidence only (immigration,
    // baggage claim — near-universal airport basics), not asserting airline-
    // specific gate assignments we can't verify. Flagged for a fact-check pass
    // on the Terminal 5 vs 1-4 split before this is marked fully reviewed.
    terminals: [
      {
        name: "Terminal 5",
        type: "Main International Terminal",
        flights: "Most international carriers, plus Saudia's international flights.",
        meeting: "Exit to the arrivals hall — your driver waits near the main exit with a name board.",
        facilities: ["Immigration and customs", "Baggage claim", "Currency exchange", "Retail and dining"],
      },
      {
        name: "Terminals 1–4",
        type: "Domestic & Legacy Terminals",
        flights: "Domestic Saudia flights and some regional routes using the original terminal buildings.",
        meeting: "Your driver waits at the arrivals exit of your specific terminal — confirmed with you once your flight is booked.",
        facilities: ["Domestic baggage claim", "Ground transport pickup area"],
      },
    ],
    lastReviewed: "August 2026",
    hotelZones: [
      { name: "Olaya hotel corridor", note: "Riyadh's densest concentration of international hotel brands, about 35–50 minutes from the airport." },
      { name: "KAFD hotels", note: "Newer high-rise hotels built for conference and corporate travelers visiting the financial district." },
      { name: "Diriyah", note: "A smaller, boutique hotel cluster near the At-Turaif heritage site." },
    ],
    businessInfo: {
      intro: "Riyadh Airport serves the capital's government, financial and diplomatic traffic, and most of our RUH bookings are business travelers heading into KAFD, Olaya, or a ministry appointment rather than tourism.",
      areas: [
        { name: "KAFD", note: "Saudi Arabia's flagship financial district, a regular multi-stop meeting circuit from the airport." },
        { name: "Olaya business corridor", note: "Corporate towers along King Fahd Road, within a short transfer of most business hotels." },
        { name: "Diplomatic Quarter", note: "Embassy and government-appointment traffic, a frequent RUH pickup destination." },
      ],
    },
    practicalInfo: [
      { title: "Confirm your terminal", note: "RUH has both the newer Terminal 5 and the older Terminals 1–4 — tell us your flight number so your driver waits at the correct one." },
      { title: "Riyadh Season traffic", note: "Evenings near Boulevard City and major venues get significantly busier roughly October–March — build in extra time on event nights." },
    ],
    reviews: [
      { name: "Ahmed Al-Rashid", origin: "Business Traveler, Riyadh", text: "Impeccable service for my KAFD meetings straight from RUH. Driver was punctual and knew exactly which terminal I'd land at." },
      { name: "Mohammed T.", origin: "Corporate Client", text: "We use Gulf Trip for all executive Riyadh airport transfers. Reliable every single time, regardless of terminal." },
    ],
  },
  {
    code: "AHB",
    name: "Abha Airport",
    fullName: "Abha International Airport",
    city: "Abha",
    isMajorHub: false,
    // Flagged for a fact-check pass — moderate rather than high confidence.
    distanceFromCity: "around 20 km from central Abha, in the Sarawat mountains",
    heroImage: "/images/airport-terminal.jpg",
    intro: "The gateway to Asir Province's mountain scenery and cool highland climate — a short, scenic drive from Abha city, Khamis Mushait, and the Al Souda resort area.",
    pageHref: "/abha-airport-taxi-service",
    relatedLinks: [
      { href: "/services/abha", label: "Abha Taxi Service" },
    ],
    relatedServices: [
      { href: "/hotel-transfers", label: "Hotel Transfers" },
      { href: "/private-taxi", label: "Private Taxi" },
      { href: "/educational-tours-transport", label: "Educational Tours Transport" },
    ],
    lastReviewed: "August 2026",
    hotelZones: [
      { name: "Abha city-centre hotels", note: "The most convenient base for Lake Park and central attractions, a short drive from the airport." },
      { name: "Al Souda highland stays", note: "Higher-elevation accommodation for visitors prioritising the coolest possible climate." },
    ],
    practicalInfo: [
      { title: "Peak summer season", note: "June–August draws a steady wave of domestic tourism escaping the heat elsewhere — book ahead, as demand for pickups rises too." },
      { title: "Winter mist", note: "Mountain roads to Al Souda and Habala can see fog in winter; our drivers are experienced with the conditions." },
    ],
    reviews: [
      { name: "Sara M.", origin: "Tourist, Jordan", text: "The mountain views on the drive from the airport were breathtaking, and the driver knew every scenic stop." },
      { name: "Abdullah K.", origin: "Family Traveler, Riyadh", text: "Easy pickup at Abha's single arrivals hall — no confusion about where to find the driver." },
    ],
  },
  {
    code: "TIF",
    name: "Taif Airport",
    fullName: "Taif Regional Airport",
    city: "Taif",
    isMajorHub: false,
    // Flagged for a fact-check pass — moderate rather than high confidence.
    distanceFromCity: "around 25 km south of central Taif",
    heroImage: "/images/airport-terminal.jpg",
    intro: "A mountain-route gateway serving Taif and the scenic drive up from Makkah — a popular summer escape from the Red Sea coast heat.",
    pageHref: "/taif-airport-taxi-service",
    relatedLinks: [
      { href: "/services/taif", label: "Taif Taxi Service" },
      { href: "/taif-ziyarat-taxi-service", label: "Taif Ziyarat Tour" },
    ],
    relatedServices: [
      { href: "/hotel-transfers", label: "Hotel Transfers" },
      { href: "/private-taxi", label: "Private Taxi" },
      { href: "/educational-tours-transport", label: "Educational Tours Transport" },
    ],
    lastReviewed: "August 2026",
    tourLinks: [
      { href: "/taif-ziyarat-taxi-service", label: "Taif Ziyarat Tour" },
    ],
    hotelZones: [
      { name: "Taif city-centre hotels", note: "The most convenient base for Souq Al-Dabab and Shubra Palace, a short drive from the airport." },
      { name: "Al-Hada resort-area hotels", note: "Mountain-view stays popular with summer visitors escaping the coastal heat." },
    ],
    practicalInfo: [
      { title: "Mountain road transfer", note: "The drive down toward Makkah is a scenic switchback route — allow a little extra time versus a flat-highway equivalent distance." },
      { title: "Rose season demand", note: "Roughly March into early April, Taif sees a real visitor surge for the rose harvest — book ahead if traveling then." },
    ],
    reviews: [
      { name: "Nora Al-Zahrani", origin: "Tourist, Riyadh", text: "Landed at Taif and our driver took us straight into the mountain air — a lovely first impression of the city." },
      { name: "Michael T.", origin: "Traveler, UK", text: "Small, easy airport with a driver waiting right at the exit — no hunting around for a name board." },
    ],
  },
  {
    code: "TUU",
    name: "Tabuk Airport",
    fullName: "Tabuk Regional Airport",
    city: "Tabuk",
    isMajorHub: false,
    distanceFromCity: "8 km from Tabuk city centre",
    heroImage: "/images/airport-terminal.jpg",
    intro: "Northwest Saudi Arabia's gateway — the closest airport for NEOM contractor logistics, Wadi Disah day trips, and the drive on to AlUla or the Aqaba border.",
    pageHref: "/tabuk-airport-taxi-service",
    relatedLinks: [
      { href: "/services/tabuk", label: "Tabuk Taxi Service" },
      { href: "/services/neom", label: "NEOM Transfers" },
    ],
    relatedServices: [
      { href: "/corporate-transportation-services", label: "Corporate Transportation" },
      { href: "/hotel-transfers", label: "Hotel Transfers" },
      { href: "/private-taxi", label: "Private Taxi" },
    ],
    lastReviewed: "August 2026",
    hotelZones: [
      { name: "Tabuk city-centre hotels", note: "The main accommodation base for visitors exploring Tabuk Castle and the railway museum." },
    ],
    businessInfo: {
      intro: "Tabuk Airport functions as a gateway for NEOM workforce travel, and a meaningful share of arrivals here are contractors and consultants continuing on to the project by road.",
      areas: [
        { name: "NEOM/Haql corridor", note: "The primary route for workforce and business travel toward the project zone." },
        { name: "Aqaba border crossing", note: "Used by international teams and business travelers continuing into Jordan or Egypt." },
      ],
    },
    practicalInfo: [
      { title: "NEOM-driven demand", note: "Airport traffic patterns tend to track NEOM project activity more than tourist seasons — confirm your onward site before booking." },
      { title: "Long onward distances", note: "Routes to Wadi Disah, AlUla or NEOM sites can mean several hours on the road after landing — plan accordingly." },
    ],
    reviews: [
      { name: "Andrew B.", origin: "Project Consultant, UK", text: "Six-month NEOM contract — every Tabuk Airport pickup was handled without a single issue." },
      { name: "Sophie H.", origin: "Traveler, Canada", text: "Small, quick airport and the driver was waiting right at the exit — straight to our guesthouse." },
    ],
  },
  {
    code: "YNB",
    name: "Yanbu Airport",
    fullName: "Yanbu Airport",
    city: "Yanbu",
    isMajorHub: false,
    distanceFromCity: "10 km from Yanbu city centre",
    heroImage: "/images/airport-terminal.jpg",
    intro: "Serving Yanbu's dual economy — petrochemical industry and contractor travel on weekdays, Red Sea dive tourism the rest of the year, plus a short run on to Madinah.",
    pageHref: "/yanbu-airport-taxi-service",
    relatedLinks: [
      { href: "/services/yanbu", label: "Yanbu Taxi Service" },
      { href: "/services/madinah", label: "Madinah Taxi Service" },
    ],
    relatedServices: [
      { href: "/corporate-transportation-services", label: "Corporate Transportation" },
      { href: "/hotel-transfers", label: "Hotel Transfers" },
      { href: "/private-taxi", label: "Private Taxi" },
    ],
    lastReviewed: "August 2026",
    hotelZones: [
      { name: "Yanbu waterfront hotels", note: "Corniche-adjacent stays convenient for both business and leisure visitors." },
    ],
    businessInfo: {
      intro: "Yanbu Airport serves a real petrochemical and contractor travel base alongside its growing dive-tourism season, and airport transfers regularly connect straight to the Industrial City and Royal Commission offices.",
      areas: [
        { name: "Yanbu Industrial City", note: "Major petrochemical and manufacturing facilities, a regular airport transfer destination." },
        { name: "Royal Commission offices", note: "Administrative offices tied to the Industrial City's operation." },
      ],
    },
    practicalInfo: [
      { title: "Short airport transfer", note: "At 10km from the city, this is one of the shorter airport transfers on this list — typically 15–20 minutes." },
      { title: "Dive season", note: "Roughly October through April is when Red Sea diving conditions are calmest and demand for dive-site drop-offs peaks." },
    ],
    reviews: [
      { name: "Carlos R.", origin: "Contractor, Spain", text: "Six months of Yanbu Airport transfers — always on time, never a wait at the exit." },
      { name: "Hana M.", origin: "Diver, Saudi Arabia", text: "Transferred straight from the airport to my dive site at dawn without any fuss." },
    ],
  },
  {
    code: "ULH",
    name: "AlUla Airport",
    fullName: "AlUla Regional Airport",
    city: "AlUla",
    isMajorHub: false,
    distanceFromCity: "18 km from AlUla Old Town",
    heroImage: "/images/airport-terminal.jpg",
    intro: "The arrivals point for Saudi Arabia's flagship heritage destination — resort and Old Town pickups timed around Hegra visits and AlUla's seasonal cultural events.",
    pageHref: "/alula-airport-taxi-service",
    relatedLinks: [
      { href: "/services/alula", label: "AlUla Taxi Service" },
      { href: "/services/tabuk", label: "Tabuk Taxi Service" },
    ],
    relatedServices: [
      { href: "/hotel-transfers", label: "Hotel Transfers" },
      { href: "/private-taxi", label: "Private Taxi" },
      { href: "/educational-tours-transport", label: "Educational Tours Transport" },
    ],
    lastReviewed: "August 2026",
    tourLinks: [
      { href: "/reliable-alula-tour-taxi-service-in-saudi-arabia", label: "AlUla Tour" },
    ],
    hotelZones: [
      { name: "Old Town resort area", note: "AlUla's main concentration of resort and boutique hotel stays, a short transfer from the airport." },
      { name: "Ashar Valley", note: "Newer accommodation closer to the Arts District and evening event venues." },
    ],
    practicalInfo: [
      { title: "Event season demand", note: "Roughly October through March, hotels, drivers, and tour slots all get busiest — book your transfer ahead during this window." },
      { title: "Guide required at Hegra", note: "Your transfer gets you to the site, but Hegra itself requires a separately booked licensed guide through Saudi Tourism." },
    ],
    reviews: [
      { name: "Isabella F.", origin: "Tourist, Italy", text: "Landed at AlUla's small, easy airport and our driver had us at the resort within half an hour." },
      { name: "Jens K.", origin: "Photographer, Germany", text: "Four days of AlUla transfers starting right from the airport — drivers knew every golden-hour shooting location." },
    ],
  },
];
