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
  },
];
