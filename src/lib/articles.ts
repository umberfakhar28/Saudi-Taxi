/**
 * Blog posts and travel guides: the shared types for ArticlePage, plus one
 * registry of every live post. The registry feeds the /blog and /guides
 * indexes, the "Related guides" cards at the end of each post, and the
 * related-reading list on posts still rendered by BlogPost.
 *
 * Plan and query map: docs/seo/content/content-audit.md (20 Nov 2026).
 */

/* ───────────────────────── Topics ───────────────────────── */

export type ArticleTopic = "bahrain" | "family" | "airports" | "umrah" | "driver" | "destinations";

export type ArticleIcon =
  | "car" | "users" | "plane" | "flag" | "map" | "clock" | "route" | "shield" | "sun"
  | "mountain" | "waves" | "moon" | "luggage" | "baby" | "briefcase" | "train" | "bus"
  | "star" | "check" | "calendar" | "info" | "building" | "wallet" | "hotel";

export const TOPICS: Record<ArticleTopic, { label: string; blurb: string; icon: ArticleIcon }> = {
  bahrain: { label: "Bahrain & cross-border", blurb: "The King Fahd Causeway, commuting, and the land borders to Kuwait, Qatar and the UAE.", icon: "flag" },
  family: { label: "Family trips", blurb: "Where to go with children and grandparents, and how to move between cities.", icon: "users" },
  airports: { label: "Airports", blurb: "Terminals, pickup points and late arrivals at Riyadh, Jeddah and regional airports.", icon: "plane" },
  umrah: { label: "Umrah & Hajj", blurb: "Planning the trip and moving between Jeddah, Makkah and Madinah.", icon: "moon" },
  driver: { label: "Car with driver", blurb: "Rental, taxi or a car with a driver, business travel and long road trips.", icon: "car" },
  destinations: { label: "Riyadh, Jeddah & beyond", blurb: "City guides, the Red Sea coast and AlUla.", icon: "map" },
};

export const TOPIC_ORDER: ArticleTopic[] = ["bahrain", "family", "airports", "umrah", "driver", "destinations"];

/* ───────────────────────── Registry ───────────────────────── */

export interface ArticleImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ArticleSummary {
  path: string;
  kind: "blog" | "guide";
  topic: ArticleTopic;
  /** Card title: short, matches the H1's meaning. */
  title: string;
  excerpt: string;
  /** ISO date of the last real content update. */
  updated?: string;
  cover?: ArticleImage;
  /** Shown first on its index. */
  featured?: boolean;
}

const CAUSEWAY_D2B: ArticleImage = {
  src: "/images/routes/dammam-to-bahrain/dammam-to-bahrain-taxi-king-fahd-causeway-1280.webp",
  alt: "Private car on the King Fahd Causeway between Saudi Arabia and Bahrain",
  width: 1280,
  height: 720,
};
const CAUSEWAY_BORDER: ArticleImage = {
  src: "/images/king-fahd-causeway-saudi-bahrain-border-crossing.webp",
  alt: "The King Fahd Causeway border crossing between Bahrain and Saudi Arabia",
  width: 1000,
  height: 713,
};
const CHAUFFEUR_LUGGAGE: ArticleImage = {
  src: "/images/private-chauffeur-luggage-assistance-saudi-arabia.webp",
  alt: "Driver loading luggage into a private car in Saudi Arabia",
  width: 1600,
  height: 900,
};
const KUWAIT_ROAD: ArticleImage = {
  src: "/images/routes/riyadh-to-kuwait/riyadh-to-kuwait-taxi-by-road-1280.webp",
  alt: "Private car on the road from Saudi Arabia to Kuwait",
  width: 1280,
  height: 720,
};

export const COVERS = { CAUSEWAY_D2B, CAUSEWAY_BORDER, CHAUFFEUR_LUGGAGE, KUWAIT_ROAD };

export const ARTICLES: ArticleSummary[] = [
  // Bahrain & cross-border
  { path: "/blog/bahrain-to-dammam-travel-options", kind: "blog", topic: "bahrain", featured: true, updated: "2026-11-20", cover: CAUSEWAY_D2B,
    title: "Bahrain to Dammam: taxi, Uber, bus or private car?",
    excerpt: "Which ways of travelling actually cross the causeway end to end, from the Dammam train station to Janabiya, and what each one suits." },
  { path: "/guides/bahrain-saudi-commuter-guide", kind: "guide", topic: "bahrain", featured: true, updated: "2026-11-20", cover: CAUSEWAY_BORDER,
    title: "Commuting between Bahrain and Saudi Arabia",
    excerpt: "Crossing the causeway every week: the quiet and busy hours, documents, the Riyadh bus, and standing arrangements." },
  { path: "/guides/saudi-arabia-to-kuwait-by-road", kind: "guide", topic: "bahrain", updated: "2026-11-19", cover: KUWAIT_ROAD,
    title: "Saudi Arabia to Kuwait by road",
    excerpt: "Routes from Riyadh, Dammam and Khafji, the Al Khafji–Al Nuwaiseeb border, documents and travel time." },

  // Family trips
  { path: "/blog/family-saudi-destinations", kind: "blog", topic: "family", featured: true, updated: "2026-11-20",
    title: "Best Saudi destinations for a family trip",
    excerpt: "Where to go first, trips with grandparents, beach and resort stays, a 5-day itinerary and moving between cities." },
  { path: "/blog/abha-vs-taif-summer-family-trip", kind: "blog", topic: "family", featured: true, updated: "2026-11-20",
    title: "Abha vs Taif for a summer family trip",
    excerpt: "Two cool mountain cities compared for families, with a 3-day Abha plan and a 2-day Taif plan." },

  // Airports
  { path: "/guides/king-khalid-airport", kind: "guide", topic: "airports", featured: true, updated: "2026-11-20",
    title: "Riyadh airport (RUH): terminals and pickups",
    excerpt: "The five terminals, where your driver waits, late-night arrivals and getting into Riyadh." },
  { path: "/guides/king-abdulaziz-airport", kind: "guide", topic: "airports", featured: true, updated: "2026-11-20",
    title: "Jeddah airport (JED): terminals and the Hajj Terminal",
    excerpt: "Terminal 1, the new Terminal 4 and the Hajj and Umrah halls, and the drive to Makkah and Madinah." },
  { path: "/guides/regional-airport-transfer-guide", kind: "guide", topic: "airports",
    title: "Regional airport transfers in Saudi Arabia",
    excerpt: "Smaller airports such as Abha, Taif, Tabuk and Yanbu, and getting on from each." },
  { path: "/blog/airport-transfer-tips", kind: "blog", topic: "airports",
    title: "Airport transfer tips for Saudi Arabia",
    excerpt: "Small things that make a Saudi airport arrival go smoothly." },
  { path: "/blog/benefits-private-airport-transfer", kind: "blog", topic: "airports",
    title: "Why book a private airport transfer",
    excerpt: "Flight tracking, a fixed price and a driver waiting at arrivals." },

  // Umrah & Hajj
  { path: "/guides/umrah-transportation", kind: "guide", topic: "umrah",
    title: "Umrah transportation guide",
    excerpt: "Moving between Jeddah, Makkah and Madinah: roads, the train and private transfers." },
  { path: "/blog/umrah-travel-planning", kind: "blog", topic: "umrah",
    title: "Umrah travel planning checklist",
    excerpt: "Visas, hotels, transport and packing, step by step." },
  { path: "/guides/hajj-transportation", kind: "guide", topic: "umrah",
    title: "Hajj transportation guide",
    excerpt: "How transport works around the Hajj days, and what pilgrims arrange themselves." },

  // Car with driver
  { path: "/guides/rent-a-car-vs-private-driver", kind: "guide", topic: "driver", featured: true, updated: "2026-11-20", cover: CHAUFFEUR_LUGGAGE,
    title: "Rent a car, take a taxi, or book a car with driver?",
    excerpt: "Self-drive rental, taxi and ride-hailing, and a car with a driver compared, with hourly and daily options." },
  { path: "/guides/business-travel", kind: "guide", topic: "driver",
    title: "Business travel transport in Saudi Arabia",
    excerpt: "Meetings, airport days and corporate accounts in Riyadh, Jeddah and the Eastern Province." },
  { path: "/guides/long-distance-private-transfers", kind: "guide", topic: "driver",
    title: "Long-distance private transfers",
    excerpt: "What a multi-hour road trip between Saudi cities involves." },
  { path: "/blog/vip-transport-saudi", kind: "blog", topic: "driver",
    title: "VIP and executive transport in Saudi Arabia",
    excerpt: "Executive cars and dedicated drivers for VIP arrivals." },
  { path: "/blog/safe-travel-tips-saudi", kind: "blog", topic: "driver",
    title: "Safe travel tips for first-time visitors",
    excerpt: "Getting around safely and respecting local customs." },

  // Riyadh, Jeddah & beyond
  { path: "/guides/red-sea-coast-travel", kind: "guide", topic: "destinations", featured: true, updated: "2026-11-20",
    title: "Travelling Saudi Arabia's Red Sea coast",
    excerpt: "Yanbu, Umluj, Al Wajh and the Red Sea Project: airports, the coast road, and luxury trips via AlUla." },
  { path: "/blog/riyadh-to-jeddah-travel", kind: "blog", topic: "destinations",
    title: "Riyadh to Jeddah: travel options compared",
    excerpt: "Fly, drive, the bus or a private car between the two biggest cities." },
  { path: "/blog/top-attractions-riyadh", kind: "blog", topic: "destinations",
    title: "Top attractions in Riyadh",
    excerpt: "Diriyah, Boulevard and the city's best sights." },
  { path: "/blog/jeddah-hidden-gems", kind: "blog", topic: "destinations",
    title: "Hidden gems in Jeddah",
    excerpt: "Al-Balad, the Corniche and the places most visitors miss." },
  { path: "/blog/alula-complete-guide", kind: "blog", topic: "destinations",
    title: "AlUla travel guide",
    excerpt: "Hegra, Elephant Rock and planning a trip to AlUla." },
];

export const articleByPath = (path: string) => ARTICLES.find((a) => a.path === path);

/* ───────────────────────── Page data ───────────────────────── */

/** Inline text: **bold** and [anchor](/path) are supported. */
export type RichText = string;

export type ArticleBlock =
  | { type: "p"; text: RichText }
  | { type: "list"; items: RichText[]; ordered?: boolean }
  | { type: "table"; head: string[]; rows: RichText[][]; caption?: string; highlightRow?: number; note?: RichText }
  | { type: "timeline"; items: { when: string; title: string; body: RichText }[] }
  | { type: "cards"; items: { icon?: ArticleIcon; tag?: string; title: string; body: RichText; href?: string; linkLabel?: string }[] }
  | { type: "callout"; tone: "tip" | "warn" | "info"; title?: string; text: RichText }
  | { type: "cta"; heading?: string; body?: string }
  | { type: "image"; image: ArticleImage; caption?: string }
  | { type: "subhead"; text: string; id?: string };

export interface ArticleSection {
  id: string;
  heading: string;
  /** Shorter label for the table of contents. */
  toc?: string;
  blocks: ArticleBlock[];
}

export interface ArticleData {
  path: string;
  kind: "blog" | "guide";
  topic: ArticleTopic;
  h1: string;
  /** Answer-first opening paragraph under the H1. */
  lead: RichText;
  /** Plain description for schema (usually the meta description). */
  description: string;
  published: string;
  updated: string;
  cover?: ArticleImage;
  /** 1200×630 image for schema and social cards. */
  ogImage?: string;
  quickAnswer: {
    stats: { icon: ArticleIcon; label: string; value: string }[];
    points: RichText[];
  };
  cta: {
    /** e.g. "Book a private car from Dammam to Bahrain" */
    heading: string;
    body: string;
    waMessage: string;
    bookHref: string;
    /** Sent with click events, e.g. "Dammam-Bahrain". */
    route?: string;
  };
  sections: ArticleSection[];
  faqs: { q: string; a: string }[];
  routes: { href: string; title: string; body: string; icon?: ArticleIcon }[];
  /** Paths of related posts from the registry. */
  related: string[];
  /** Short note on where figures come from, shown under the article. */
  sourcesNote?: RichText;
}
