/**
 * "Trending / Popular Destinations" data layer — Gulf-wide, distinct from
 * cityData1/2/3.ts (Saudi-only, powers the existing /services/[slug] pages,
 * which this system deliberately does NOT duplicate or rebuild).
 *
 * Two shapes:
 * - `DESTINATIONS`: every place in the brief (27 total) — enough to render
 *   a card/listing row and to link somewhere real. For the 7 Saudi cities
 *   that already have a strong, working page, `href` points at the
 *   existing `/services/[slug]` page (reused, not duplicated — see the
 *   Popular Destinations brief §13/§1). For the other 20, `href` points at
 *   a new `/destinations/[slug]` page powered by `DESTINATION_DETAILS`.
 * - `DESTINATION_DETAILS`: the full page content (hero, why-visit,
 *   attractions, transfer info, internal links, related destinations) for
 *   those 20 new pages only.
 *
 * Images: real destination photography is reused where it already exists
 * in the project (public/cities, public/hero-slider). Places with no
 * matching photo yet fall back to GULF_PLACEHOLDER_IMAGE (a real Gulf
 * highway/chauffeur photo, not a broken image or empty gradient) — swap
 * `image`/`heroImage` for the real photo once provided; nothing else needs
 * to change.
 */

export type CountrySlug = "saudi-arabia" | "uae" | "qatar" | "bahrain" | "oman" | "kuwait";

export interface Country {
  slug: CountrySlug;
  name: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { slug: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦" },
  { slug: "uae", name: "UAE", flag: "🇦🇪" },
  { slug: "qatar", name: "Qatar", flag: "🇶🇦" },
  { slug: "bahrain", name: "Bahrain", flag: "🇧🇭" },
  { slug: "oman", name: "Oman", flag: "🇴🇲" },
  { slug: "kuwait", name: "Kuwait", flag: "🇰🇼" },
];

export function countryFor(slug: CountrySlug): Country {
  return COUNTRIES.find((c) => c.slug === slug)!;
}

/** A real, on-brand Gulf highway/chauffeur photo — used as the fallback for
 * any destination whose own photo hasn't been supplied yet (see file header). */
export const GULF_PLACEHOLDER_IMAGE = "/hero-slider/gulf-cross-border-chauffeur-service.webp";

export interface DestinationSummary {
  slug: string;
  name: string;
  country: CountrySlug;
  /** Card/listing thumbnail. */
  image: string;
  imageAlt: string;
  /** One SEO-friendly sentence for the listing page. */
  blurb: string;
  /** Final link target — an existing /services/[slug] page for the 7 Saudi
   * cities, or /destinations/[slug] for the 20 new ones. */
  href: string;
  /** True image pending — the 3 of the 6 featured cards without a real
   * photo yet (Doha, Muscat, Kuwait City); flagged so it's easy to find
   * once real photos are supplied. */
  imagePending?: boolean;
  /** One of the 6 homepage-featured destinations. */
  featured?: boolean;
}

export interface DestinationDetail {
  slug: string;
  name: string;
  country: CountrySlug;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroImage: string;
  heroImageAlt: string;
  imagePending?: boolean;
  intro: string;
  whyVisit: string;
  attractions: { name: string; description: string }[];
  airportInfo: string;
  cityTransferInfo: string;
  chauffeurInfo: string;
  /** Only ever real, existing hrefs — see file header. */
  internalLinks: { href: string; label: string }[];
  /** Slugs into DESTINATIONS (any country). */
  relatedSlugs: string[];
}

// ═══════════════════════════════════════════════════════════════════════
// SUMMARIES — all 27 destinations from the brief
// ═══════════════════════════════════════════════════════════════════════

export const DESTINATIONS: DestinationSummary[] = [
  // ---- Saudi Arabia — existing /services pages, reused not duplicated ----
  {
    slug: "riyadh", name: "Riyadh", country: "saudi-arabia",
    image: "/destinations/riyadh-skyline-night.webp",
    imageAlt: "Riyadh skyline at blue hour with the Kingdom Centre Tower — private chauffeur and taxi service in Saudi Arabia's capital",
    blurb: "Saudi Arabia's capital — Kingdom Centre, Diriyah, and a fixed-rate chauffeur network across every district.",
    href: "/services/riyadh", featured: true,
  },
  {
    slug: "jeddah", name: "Jeddah", country: "saudi-arabia",
    image: "/destinations/jeddah-corniche-skyline.webp",
    imageAlt: "Jeddah Corniche waterfront with the King Fahd Fountain at sunset — premium private transfer service on Saudi Arabia's Red Sea coast",
    blurb: "The Red Sea gateway to Makkah — Corniche, Al-Balad, and 24/7 airport meet-and-greet.",
    href: "/services/jeddah",
  },
  {
    slug: "alula", name: "AlUla", country: "saudi-arabia",
    image: GULF_PLACEHOLDER_IMAGE, imagePending: true,
    imageAlt: "Private chauffeur vehicle for AlUla desert and heritage site transfers in Saudi Arabia",
    blurb: "Hegra's sandstone tombs and Elephant Rock — private touring transport through Saudi Arabia's desert heritage capital.",
    href: "/services/alula",
  },
  {
    slug: "dammam", name: "Dammam", country: "saudi-arabia",
    image: "/destinations/dammam-eastern-province-skyline.webp",
    imageAlt: "Dammam Eastern Province skyline — private taxi and airport transfer service near King Fahd International Airport",
    blurb: "The Eastern Province's business hub — King Fahd International Airport and the gateway to Bahrain and Qatar.",
    href: "/services/dammam",
  },
  {
    slug: "khobar", name: "Al Khobar", country: "saudi-arabia",
    image: "/destinations/dammam-eastern-province-skyline.webp",
    imageAlt: "Eastern Province waterfront near Al Khobar — private chauffeur service in the Dammam metropolitan area",
    blurb: "The Eastern Province's Corniche city — business travel and easy connections across the Dammam–Khobar–Dhahran tri-city area.",
    href: "/services/khobar",
  },
  {
    slug: "taif", name: "Taif", country: "saudi-arabia",
    image: "/destinations/taif-mountain-city-view.webp",
    imageAlt: "Taif mountain city view in the Sarawat range — private transfer service to Saudi Arabia's rose-growing highlands",
    blurb: "A cool mountain retreat above Makkah — rose farms, Al Hada's viewpoints, and a popular Ziyarat stop.",
    href: "/services/taif",
  },
  {
    slug: "abha", name: "Abha", country: "saudi-arabia",
    image: "/destinations/abha-asir-mountains-view.webp",
    imageAlt: "Abha and the Asir mountains — private taxi service in Saudi Arabia's highland tourism region",
    blurb: "The Asir highlands' green, misty capital — cable cars, mountain villages, and a cooler climate year-round.",
    href: "/services/abha",
  },

  // ---- UAE ----
  {
    slug: "dubai", name: "Dubai", country: "uae",
    image: "/destinations/dubai-skyline-burj-khalifa.webp",
    imageAlt: "Dubai skyline at sunset with the Burj Khalifa — premium private chauffeur and transfer service",
    blurb: "Burj Khalifa, Downtown Dubai, and a private chauffeur network built for luxury cross-border travel.",
    href: "/destinations/dubai", featured: true,
  },
  {
    slug: "abu-dhabi", name: "Abu Dhabi", country: "uae",
    image: "/destinations/dubai-skyline-burj-khalifa.webp", imagePending: true,
    imageAlt: "Dubai skyline photo standing in for Abu Dhabi, UAE capital, pending a dedicated photo — private chauffeur service",
    blurb: "The UAE's capital — Sheikh Zayed Grand Mosque, Yas Island, and calm, dignified private transfers.",
    href: "/destinations/abu-dhabi",
  },
  {
    slug: "sharjah", name: "Sharjah", country: "uae",
    image: "/destinations/dubai-skyline-burj-khalifa.webp", imagePending: true,
    imageAlt: "Dubai skyline photo standing in for Sharjah, UAE, pending a dedicated photo — private chauffeur service",
    blurb: "The UAE's cultural capital — heritage souks, museums, and a quieter, more traditional side of the Emirates.",
    href: "/destinations/sharjah",
  },
  {
    slug: "ras-al-khaimah", name: "Ras Al Khaimah", country: "uae",
    image: "/destinations/dubai-skyline-burj-khalifa.webp", imagePending: true,
    imageAlt: "Dubai skyline photo standing in for Ras Al Khaimah, UAE, pending a dedicated photo — private chauffeur service",
    blurb: "Mountains meet the Gulf coast — Jebel Jais adventure tourism and a laid-back northern Emirate.",
    href: "/destinations/ras-al-khaimah",
  },

  // ---- Qatar ----
  {
    slug: "doha", name: "Doha", country: "qatar",
    image: "/destinations/doha-corniche-skyline.webp",
    imageAlt: "Doha Corniche skyline at dusk, Qatar — premium private chauffeur and transfer service",
    blurb: "Qatar's futuristic capital — Corniche skyline views, Souq Waqif, and a private chauffeur network at Hamad International.",
    href: "/destinations/doha", featured: true,
  },
  {
    slug: "the-pearl-qatar", name: "The Pearl", country: "qatar",
    image: "/destinations/doha-corniche-skyline.webp", imagePending: true,
    imageAlt: "Doha skyline photo standing in for The Pearl-Qatar, pending a dedicated photo — private chauffeur service",
    blurb: "Doha's man-made luxury island — marina promenades, designer boutiques, and waterfront dining.",
    href: "/destinations/the-pearl-qatar",
  },
  {
    slug: "lusail", name: "Lusail", country: "qatar",
    image: "/destinations/doha-corniche-skyline.webp", imagePending: true,
    imageAlt: "Doha skyline photo standing in for Lusail, Qatar, pending a dedicated photo — private chauffeur service",
    blurb: "Qatar's purpose-built new city — Lusail Stadium, Marina District, and Doha's fastest-growing skyline.",
    href: "/destinations/lusail",
  },
  {
    slug: "al-wakrah", name: "Al Wakrah", country: "qatar",
    image: "/destinations/doha-corniche-skyline.webp", imagePending: true,
    imageAlt: "Doha skyline photo standing in for Al Wakrah, Qatar, pending a dedicated photo — private chauffeur service",
    blurb: "A historic fishing town south of Doha — restored souq, corniche, and a slower coastal pace.",
    href: "/destinations/al-wakrah",
  },

  // ---- Bahrain ----
  {
    slug: "manama", name: "Manama", country: "bahrain",
    image: "/destinations/manama-skyline-world-trade-center.webp",
    imageAlt: "Manama skyline at sunset with the Bahrain World Trade Center — premium private chauffeur and transfer service",
    blurb: "Bahrain's capital, reached over the King Fahd Causeway — the World Trade Center skyline and a compact, walkable souq.",
    href: "/destinations/manama", featured: true,
  },
  {
    slug: "muharraq", name: "Muharraq", country: "bahrain",
    image: "/destinations/manama-skyline-world-trade-center.webp", imagePending: true,
    imageAlt: "Manama skyline photo standing in for Muharraq, Bahrain, pending a dedicated photo — private chauffeur service",
    blurb: "Bahrain's original capital — restored pearling-era houses and the Sheikh Ebrahim bin Mohammed Cultural Centre.",
    href: "/destinations/muharraq",
  },
  {
    slug: "amwaj-islands", name: "Amwaj Islands", country: "bahrain",
    image: "/destinations/manama-skyline-world-trade-center.webp", imagePending: true,
    imageAlt: "Manama skyline photo standing in for Amwaj Islands, Bahrain, pending a dedicated photo — private chauffeur service",
    blurb: "Man-made islands off Muharraq — private beaches, marinas, and Bahrain's most relaxed resort address.",
    href: "/destinations/amwaj-islands",
  },
  {
    slug: "zallaq", name: "Zallaq", country: "bahrain",
    image: "/destinations/manama-skyline-world-trade-center.webp", imagePending: true,
    imageAlt: "Manama skyline photo standing in for Zallaq, Bahrain, pending a dedicated photo — private chauffeur service",
    blurb: "Bahrain's southern beach coast — resort hotels, Bahrain International Circuit, and quiet Gulf shoreline.",
    href: "/destinations/zallaq",
  },

  // ---- Oman ----
  {
    slug: "muscat", name: "Muscat", country: "oman",
    image: "/destinations/muscat-mutrah-corniche.webp",
    imageAlt: "Muscat's Mutrah Corniche at dusk with the Hajar Mountains behind — premium private chauffeur and transfer service",
    blurb: "Oman's whitewashed coastal capital — Sultan Qaboos Grand Mosque, forts, and dramatic Hajar Mountain backdrops.",
    href: "/destinations/muscat", featured: true,
  },
  {
    slug: "salalah", name: "Salalah", country: "oman",
    image: "/destinations/muscat-mutrah-corniche.webp", imagePending: true,
    imageAlt: "Muscat corniche photo standing in for Salalah, Oman, pending a dedicated photo — private chauffeur service",
    blurb: "Southern Oman's monsoon-green retreat — Khareef season waterfalls and frankincense country.",
    href: "/destinations/salalah",
  },
  {
    slug: "nizwa", name: "Nizwa", country: "oman",
    image: "/destinations/muscat-mutrah-corniche.webp", imagePending: true,
    imageAlt: "Muscat corniche photo standing in for Nizwa, Oman, pending a dedicated photo — private chauffeur service",
    blurb: "Oman's ancient interior capital — a round fort, a famous Friday livestock souq, and mountain oases.",
    href: "/destinations/nizwa",
  },
  {
    slug: "sur", name: "Sur", country: "oman",
    image: "/destinations/muscat-mutrah-corniche.webp", imagePending: true,
    imageAlt: "Muscat corniche photo standing in for Sur, Oman, pending a dedicated photo — private chauffeur service",
    blurb: "A traditional dhow-building town on Oman's east coast — turtle beaches and a working maritime harbour.",
    href: "/destinations/sur",
  },

  // ---- Kuwait ----
  {
    slug: "kuwait-city", name: "Kuwait City", country: "kuwait",
    image: "/destinations/kuwait-city-towers-skyline.webp",
    imageAlt: "Kuwait Towers and the Kuwait City skyline at sunset — premium private chauffeur and transfer service",
    blurb: "Kuwait's compact Gulf capital — the iconic Kuwait Towers and a skyline built on decades of oil-era ambition.",
    href: "/destinations/kuwait-city", featured: true,
  },
  {
    slug: "salmiya", name: "Salmiya", country: "kuwait",
    image: "/destinations/kuwait-city-towers-skyline.webp", imagePending: true,
    imageAlt: "Kuwait City skyline photo standing in for Salmiya, Kuwait, pending a dedicated photo — private chauffeur service",
    blurb: "Kuwait's liveliest district — the Gulf Road corniche, malls, and the country's densest dining scene.",
    href: "/destinations/salmiya",
  },
  {
    slug: "al-shaheed-park", name: "Al Shaheed Park", country: "kuwait",
    image: "/destinations/kuwait-city-towers-skyline.webp", imagePending: true,
    imageAlt: "Kuwait City skyline photo standing in for Al Shaheed Park, Kuwait, pending a dedicated photo — private chauffeur service",
    blurb: "One of the Gulf's largest urban parks — museums, gardens, and green space in the heart of Kuwait City.",
    href: "/destinations/al-shaheed-park",
  },
  {
    slug: "failaka-island", name: "Failaka Island", country: "kuwait",
    image: "/destinations/kuwait-city-towers-skyline.webp", imagePending: true,
    imageAlt: "Kuwait City skyline photo standing in for Failaka Island, Kuwait, pending a dedicated photo — private chauffeur service",
    blurb: "A Gulf island with 4,000 years of history — Bronze Age ruins and a slow-paced day trip from Kuwait City.",
    href: "/destinations/failaka-island",
  },
];

export function getDestination(slug: string): DestinationSummary | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

export function destinationsByCountry(country: CountrySlug): DestinationSummary[] {
  return DESTINATIONS.filter((d) => d.country === country);
}

export const FEATURED_DESTINATIONS: DestinationSummary[] = DESTINATIONS.filter((d) => d.featured);

// ═══════════════════════════════════════════════════════════════════════
// DETAILS — full page content for the 20 new /destinations/[slug] pages
// ═══════════════════════════════════════════════════════════════════════

export const DESTINATION_DETAILS: Record<string, DestinationDetail> = {
  // ------------------------------------------------------------ UAE ------
  dubai: {
    slug: "dubai", name: "Dubai", country: "uae",
    seoTitle: "Dubai Private Taxi & Chauffeur Service | Gulf Trip Service",
    metaDescription: "Private taxi, airport transfer and chauffeur service in Dubai, UAE. Luxury transportation from Dubai International Airport (DXA) to Downtown, Marina, and beyond — book with Gulf Trip Service.",
    h1: "Private Taxi & Chauffeur Service in Dubai",
    heroImage: "/destinations/dubai-skyline-burj-khalifa.webp",
    heroImageAlt: "Dubai skyline at sunset with the Burj Khalifa — premium private chauffeur and transfer service",
    intro: "Dubai is the Gulf's best-known skyline — Burj Khalifa, Downtown, and the Marina draw business travelers, transit passengers, and holidaymakers through Dubai International Airport (DXB) and Al Maktoum International (DWC) year-round. Gulf Trip Service arranges private, fixed-rate transfers into and around the city, and cross-border transport linking Dubai to Saudi Arabia's Eastern Province and Riyadh.",
    whyVisit: "Dubai combines the world's tallest building, its largest shopping mall, and a coastline of man-made islands with one of the region's most efficient road networks. It's also the natural stopover between Saudi Arabia and the wider Gulf and South Asia — many travelers combine a Dubai leg with an onward or preceding trip to Riyadh, Dammam, or Doha.",
    attractions: [
      { name: "Burj Khalifa & Downtown Dubai", description: "The world's tallest building, alongside the Dubai Fountain and Dubai Mall — the city's single busiest visitor district." },
      { name: "Dubai Marina & JBR", description: "A dense waterfront of towers, promenades, and beach access — Dubai's most photographed skyline after Downtown." },
      { name: "Dubai Creek & Al Fahidi", description: "The historic trading heart of the city — abra boat crossings, the gold and spice souks, and the restored Al Fahidi heritage quarter." },
      { name: "Palm Jumeirah", description: "The iconic palm-shaped island, home to resort hotels, Atlantis, and The Pointe waterfront." },
    ],
    airportInfo: "We meet arrivals at both Dubai International Airport (DXB) and Al Maktoum International Airport (DWC) with real-time flight tracking, so a delayed landing never means a missed pickup. Drivers wait at arrivals with a name board and help with luggage straight to the car.",
    cityTransferInfo: "Dubai's districts — Downtown, Marina, Business Bay, Deira, Jumeirah — are spread across a large road network best covered by a private car rather than stitching together public transport. We run point-to-point transfers between hotels, business meetings, and attractions on a fixed rate agreed before you travel.",
    chauffeurInfo: "For business travel or a full day of sightseeing, an hourly chauffeur keeps the same driver and vehicle on call rather than booking separate one-way trips — useful for meeting-to-meeting corporate days or a Downtown-to-Marina-to-Creek sightseeing itinerary.",
    internalLinks: [
      { href: "/riyadh-to-dubai-taxi-service", label: "Riyadh to Dubai taxi service" },
      { href: "/dubai-to-riyadh-taxi-service", label: "Dubai to Riyadh taxi service" },
      { href: "/dammam-to-dubai-taxi-service", label: "Dammam to Dubai taxi service" },
      { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia to UAE cross-border transfer" },
      { href: "/airport-transfers", label: "All airport transfer services" },
      { href: "/border-crossing", label: "GCC border crossing routes" },
    ],
    relatedSlugs: ["abu-dhabi", "sharjah", "ras-al-khaimah", "doha", "manama", "riyadh"],
  },
  "abu-dhabi": {
    slug: "abu-dhabi", name: "Abu Dhabi", country: "uae",
    seoTitle: "Abu Dhabi Private Taxi & Airport Transfer | Gulf Trip Service",
    metaDescription: "Private taxi and airport transfer service in Abu Dhabi, UAE capital. Chauffeur transport to Sheikh Zayed Grand Mosque, Yas Island, and across the Emirate — book with Gulf Trip Service.",
    h1: "Private Taxi & Airport Transfer in Abu Dhabi",
    heroImage: "/destinations/dubai-skyline-burj-khalifa.webp", imagePending: true,
    heroImageAlt: "Dubai skyline photo standing in for Abu Dhabi, UAE, pending a dedicated photo — private chauffeur service",
    intro: "Abu Dhabi is the UAE's capital and political centre — a more spread-out, formal city than Dubai, built around government, culture, and Yas Island's entertainment district. Gulf Trip Service runs private transfers between Abu Dhabi International Airport (AUH), the city's landmarks, and connections onward to Dammam and the Saudi border.",
    whyVisit: "Abu Dhabi's landmarks sit apart from each other across a wide corniche city — the Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, and Yas Island's theme parks are each a real drive apart, making a private driver the practical way to see more than one in a day without losing hours to logistics.",
    attractions: [
      { name: "Sheikh Zayed Grand Mosque", description: "One of the world's largest mosques and Abu Dhabi's defining landmark — open to non-Muslim visitors outside prayer times." },
      { name: "Louvre Abu Dhabi", description: "The Louvre's Gulf outpost on Saadiyat Island, housed under a striking latticed dome." },
      { name: "Yas Island", description: "Abu Dhabi's entertainment hub — Ferrari World, Yas Waterworld, and the Yas Marina Circuit F1 track." },
      { name: "Corniche Beach & Qasr Al Watan", description: "The city's palm-lined waterfront promenade and the ornate Presidential Palace, open to the public." },
    ],
    airportInfo: "We track arriving flights into Abu Dhabi International Airport (AUH) and hold pickup for delays — meet-and-greet at arrivals with a name board, straight to a private vehicle for the drive into the city or onward to Dubai.",
    cityTransferInfo: "Abu Dhabi's sights are more widely spaced than Dubai's — the Grand Mosque, Louvre, and Yas Island can each be 20–40 minutes apart — so we run fixed-rate point-to-point transfers between hotels and attractions rather than a single walkable circuit.",
    chauffeurInfo: "An hourly chauffeur is the practical way to combine the Grand Mosque, Corniche, and Yas Island into one day without renting a car or waiting on ride-hailing availability during peak hours.",
    internalLinks: [
      { href: "/dammam-to-abu-dhabi-taxi-service", label: "Dammam to Abu Dhabi taxi service" },
      { href: "/abu-dhabi-to-dammam-taxi-service", label: "Abu Dhabi to Dammam taxi service" },
      { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia to UAE cross-border transfer" },
      { href: "/riyadh-to-dubai-taxi-service", label: "Riyadh to Dubai taxi service" },
      { href: "/airport-transfers", label: "All airport transfer services" },
    ],
    relatedSlugs: ["dubai", "sharjah", "ras-al-khaimah", "doha", "dammam"],
  },
  sharjah: {
    slug: "sharjah", name: "Sharjah", country: "uae",
    seoTitle: "Sharjah Private Taxi & Chauffeur Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service in Sharjah, UAE — heritage souks, museums, and connections to Dubai and Saudi Arabia. Book with Gulf Trip Service.",
    h1: "Private Taxi & Chauffeur Service in Sharjah",
    heroImage: "/destinations/dubai-skyline-burj-khalifa.webp", imagePending: true,
    heroImageAlt: "Dubai skyline photo standing in for Sharjah, UAE, pending a dedicated photo — private chauffeur service",
    intro: "Sharjah is the UAE's designated cultural capital — a more traditional, museum-dense neighbor to Dubai, with its own airport (SHJ) and a restored heritage district along the Khalid Lagoon. Gulf Trip Service runs private transfers in and around Sharjah, with easy onward connections into Dubai.",
    whyVisit: "Sharjah keeps a quieter, more conservative character than its neighbors, with one of the region's highest concentrations of museums and heritage sites packed into a compact old town — a different, slower side of the UAE than Dubai's skyline.",
    attractions: [
      { name: "Sharjah Heritage Area", description: "A restored old-town quarter of wind-tower houses, souks, and courtyard museums along the Khalid Lagoon." },
      { name: "Sharjah Museum of Islamic Civilization", description: "One of the region's leading Islamic art and science museums, housed in a converted waterfront souk building." },
      { name: "Al Noor Island & Mosque", description: "A landscaped island with a butterfly house and views of the striking Al Noor Mosque across the lagoon." },
      { name: "Blue Souq (Central Market)", description: "Sharjah's twin-towered traditional market — textiles, carpets, and gold under distinctive blue-tiled arches." },
    ],
    airportInfo: "Sharjah International Airport (SHJ) is a common budget-carrier gateway to the UAE — we meet arrivals there directly, as well as running transfers from Dubai International (DXB) for travelers who land in Dubai but are staying in Sharjah.",
    cityTransferInfo: "Sharjah's heritage district is walkable once you're there, but getting between the airport, hotels, and the old town — or over to Dubai — is a private-car trip most visitors prefer to prearrange rather than negotiate on arrival.",
    chauffeurInfo: "An hourly chauffeur suits a half-day museum circuit through the Heritage Area, or a combined Sharjah-and-Dubai day for visitors based in either Emirate.",
    internalLinks: [
      { href: "/riyadh-to-dubai-taxi-service", label: "Riyadh to Dubai taxi service" },
      { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia to UAE cross-border transfer" },
      { href: "/airport-transfers", label: "All airport transfer services" },
      { href: "/border-crossing", label: "GCC border crossing routes" },
    ],
    relatedSlugs: ["dubai", "abu-dhabi", "ras-al-khaimah", "manama"],
  },
  "ras-al-khaimah": {
    slug: "ras-al-khaimah", name: "Ras Al Khaimah", country: "uae",
    seoTitle: "Ras Al Khaimah Private Taxi & Transfer Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service in Ras Al Khaimah, UAE — Jebel Jais, beach resorts, and connections to Dubai. Book with Gulf Trip Service.",
    h1: "Private Taxi & Transfer Service in Ras Al Khaimah",
    heroImage: "/destinations/dubai-skyline-burj-khalifa.webp", imagePending: true,
    heroImageAlt: "Dubai skyline photo standing in for Ras Al Khaimah, UAE, pending a dedicated photo — private chauffeur service",
    intro: "Ras Al Khaimah is the UAE's northernmost Emirate — a mix of Jebel Jais mountain adventure tourism and quiet Gulf-coast resorts, about an hour north of Dubai. Gulf Trip Service arranges private transfers from Dubai and RAK's own airport into the Emirate's resorts and mountain attractions.",
    whyVisit: "RAK offers a genuinely different Gulf landscape — the Hajar Mountains rise directly behind the coastline, home to the world's longest zipline at Jebel Jais, while the beaches below stay noticeably quieter than Dubai's.",
    attractions: [
      { name: "Jebel Jais", description: "The UAE's highest peak, home to Jebel Jais Flight — the world's longest zipline — and a scenic mountain road." },
      { name: "Al Marjan Island", description: "A man-made coastal peninsula lined with resort hotels and a growing beach-club scene." },
      { name: "Dhayah Fort", description: "A hilltop fort with panoramic views over RAK's lagoons and mountains — the site of the UAE's last stand against British forces in 1819." },
      { name: "Old Ras Al Khaimah (RAK Town)", description: "The Emirate's original town centre, with a national museum housed in a former royal fort." },
    ],
    airportInfo: "We meet arrivals at Ras Al Khaimah International Airport (RKT) directly, and also run transfers from Dubai International (DXB) for travelers connecting on to RAK's resorts.",
    cityTransferInfo: "RAK's attractions are spread between the coast and the mountains, roughly 45 minutes apart — a private transfer is the practical way to combine a beach stay with a Jebel Jais day trip.",
    chauffeurInfo: "An hourly chauffeur works well for a mountain-road day trip up to Jebel Jais and back, where a private driver familiar with the route beats a one-way taxi with no return arranged.",
    internalLinks: [
      { href: "/riyadh-to-dubai-taxi-service", label: "Riyadh to Dubai taxi service" },
      { href: "/saudi-arabia-to-uae-taxi-service", label: "Saudi Arabia to UAE cross-border transfer" },
      { href: "/airport-transfers", label: "All airport transfer services" },
    ],
    relatedSlugs: ["dubai", "sharjah", "abu-dhabi"],
  },

  // ----------------------------------------------------------- Qatar -----
  doha: {
    slug: "doha", name: "Doha", country: "qatar",
    seoTitle: "Doha Private Taxi & Chauffeur Service | Gulf Trip Service",
    metaDescription: "Private taxi, airport transfer and chauffeur service in Doha, Qatar. Transport from Hamad International Airport to the Corniche, Souq Waqif, and across the city — book with Gulf Trip Service.",
    h1: "Private Taxi & Chauffeur Service in Doha",
    heroImage: "/destinations/doha-corniche-skyline.webp",
    heroImageAlt: "Doha Corniche skyline at dusk, Qatar — premium private chauffeur and transfer service",
    intro: "Doha is Qatar's capital and the country's only major city — a sweeping Corniche skyline built up rapidly around the World Cup era, with Hamad International Airport as one of the Gulf's busiest transit hubs. Gulf Trip Service runs private transfers within Doha and cross-border transport connecting Qatar to Saudi Arabia via the Salwa border.",
    whyVisit: "Doha packs an unusually dense skyline, a restored traditional souq, and some of the region's best museum architecture into a compact, walkable Corniche loop — making it easy to see a great deal in a short stay, whether you're transiting through Hamad or staying for several days.",
    attractions: [
      { name: "Museum of Islamic Art", description: "I.M. Pei's landmark building on its own promontory, housing one of the world's finest Islamic art collections." },
      { name: "Souq Waqif", description: "Doha's restored traditional market — spice stalls, falconry shops, and some of the city's best evening dining." },
      { name: "The Corniche", description: "A 7km waterfront promenade curving around Doha Bay, with the West Bay skyline as its backdrop." },
      { name: "Katara Cultural Village", description: "An arts and heritage district by the beach, with an amphitheatre, galleries, and a public beach." },
    ],
    airportInfo: "We meet arrivals at Hamad International Airport (DOH) with flight tracking and a name-board pickup — useful both for visitors staying in Doha and for travelers connecting onward toward Saudi Arabia by road.",
    cityTransferInfo: "Doha's main sights sit along or near the Corniche, but the city itself sprawls well beyond it — we run fixed-rate transfers between hotels, West Bay business districts, and the Corniche attractions.",
    chauffeurInfo: "An hourly chauffeur suits a Museum of Islamic Art–Souq Waqif–Katara day, or a full day of business meetings across West Bay's towers without losing time to parking and traffic.",
    internalLinks: [
      { href: "/riyadh-to-qatar-taxi-service", label: "Riyadh to Qatar taxi service" },
      { href: "/qatar-to-riyadh-taxi-service", label: "Qatar to Riyadh taxi service" },
      { href: "/dammam-airport-to-qatar-taxi-service", label: "Dammam Airport to Qatar taxi service" },
      { href: "/saudi-arabia-to-qatar-taxi-service", label: "Saudi Arabia to Qatar cross-border transfer" },
      { href: "/airport-transfers", label: "All airport transfer services" },
      { href: "/border-crossing", label: "GCC border crossing routes" },
    ],
    relatedSlugs: ["the-pearl-qatar", "lusail", "al-wakrah", "manama", "dammam"],
  },
  "the-pearl-qatar": {
    slug: "the-pearl-qatar", name: "The Pearl", country: "qatar",
    seoTitle: "The Pearl-Qatar Private Chauffeur & Transfer Service | Gulf Trip Service",
    metaDescription: "Private chauffeur and taxi transfer service to The Pearl-Qatar, Doha's luxury man-made island. Book with Gulf Trip Service.",
    h1: "Private Chauffeur Service to The Pearl-Qatar",
    heroImage: "/destinations/doha-corniche-skyline.webp", imagePending: true,
    heroImageAlt: "Doha skyline photo standing in for The Pearl-Qatar, pending a dedicated photo — private chauffeur service",
    intro: "The Pearl-Qatar is Doha's flagship man-made island — a marina district of designer boutiques, waterfront dining, and residential towers built out into the Gulf. Gulf Trip Service runs private transfers between The Pearl, Hamad International Airport, and the rest of Doha.",
    whyVisit: "The Pearl offers a Mediterranean-styled marina promenade unlike anywhere else in Doha — Porto Arabia's yacht-lined waterfront, Qanat Quartier's canal district, and a concentration of high-end shopping and dining in one walkable island loop.",
    attractions: [
      { name: "Porto Arabia", description: "The Pearl's main marina promenade — superyachts, waterfront cafés, and the island's best-known skyline view." },
      { name: "Qanat Quartier", description: "A Venetian-styled canal district with colourful facades and gondola-style boat rides." },
      { name: "Medina Centrale", description: "A pedestrian shopping and dining quarter styled after a traditional Mediterranean medina." },
    ],
    airportInfo: "The Pearl sits roughly 20–25 minutes from Hamad International Airport (DOH) — we meet arrivals there and transfer directly to the island's residences and hotels.",
    cityTransferInfo: "The Pearl connects to the rest of Doha by a single causeway road, making a private transfer the practical way in and out rather than relying on street-hailed taxis from the mainland.",
    chauffeurInfo: "An hourly chauffeur suits evenings that combine The Pearl's marina dining with a stop at West Bay or Katara — keeping the same driver on call rather than booking separate one-way trips.",
    internalLinks: [
      { href: "/riyadh-to-qatar-taxi-service", label: "Riyadh to Qatar taxi service" },
      { href: "/saudi-arabia-to-qatar-taxi-service", label: "Saudi Arabia to Qatar cross-border transfer" },
      { href: "/airport-transfers", label: "All airport transfer services" },
    ],
    relatedSlugs: ["doha", "lusail", "al-wakrah"],
  },
  lusail: {
    slug: "lusail", name: "Lusail", country: "qatar",
    seoTitle: "Lusail Private Taxi & Chauffeur Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service to Lusail, Qatar's purpose-built new city — Lusail Stadium and the Marina District. Book with Gulf Trip Service.",
    h1: "Private Taxi & Chauffeur Service in Lusail",
    heroImage: "/destinations/doha-corniche-skyline.webp", imagePending: true,
    heroImageAlt: "Doha skyline photo standing in for Lusail, Qatar, pending a dedicated photo — private chauffeur service",
    intro: "Lusail is Qatar's newest city — a master-planned district north of Doha built around Lusail Stadium (host of the 2022 World Cup final) and a growing Marina District skyline. Gulf Trip Service runs private transfers between Lusail, Hamad International Airport, and central Doha.",
    whyVisit: "Lusail represents Qatar's next chapter — wide boulevards, a light-rail system, and a stadium district still drawing major sporting and entertainment events well after the World Cup.",
    attractions: [
      { name: "Lusail Stadium", description: "The 2022 World Cup final venue and one of the region's largest stadiums, now hosting major sporting and cultural events." },
      { name: "Lusail Marina District", description: "A new waterfront promenade of towers and marina berths, Qatar's fastest-growing skyline." },
      { name: "Qetaifan Island North", description: "A resort island off Lusail's coast with a waterpark and beach clubs." },
    ],
    airportInfo: "Lusail sits roughly 30–35 minutes from Hamad International Airport (DOH), depending on event traffic around the stadium — we track flights and build in extra buffer time on major event days.",
    cityTransferInfo: "Lusail's wide, newly built road network is straightforward for a private transfer, though stadium event nights bring heavy congestion — we plan around published event schedules where possible.",
    chauffeurInfo: "An hourly chauffeur is useful on event days, when a driver who can adjust pickup timing and routing around stadium closures beats a single fixed one-way trip.",
    internalLinks: [
      { href: "/riyadh-to-qatar-taxi-service", label: "Riyadh to Qatar taxi service" },
      { href: "/saudi-arabia-to-qatar-taxi-service", label: "Saudi Arabia to Qatar cross-border transfer" },
      { href: "/airport-transfers", label: "All airport transfer services" },
    ],
    relatedSlugs: ["doha", "the-pearl-qatar", "al-wakrah"],
  },
  "al-wakrah": {
    slug: "al-wakrah", name: "Al Wakrah", country: "qatar",
    seoTitle: "Al Wakrah Private Taxi & Transfer Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service to Al Wakrah, Qatar — restored souq and corniche south of Doha. Book with Gulf Trip Service.",
    h1: "Private Taxi & Transfer Service in Al Wakrah",
    heroImage: "/destinations/doha-corniche-skyline.webp", imagePending: true,
    heroImageAlt: "Doha skyline photo standing in for Al Wakrah, Qatar, pending a dedicated photo — private chauffeur service",
    intro: "Al Wakrah is a historic fishing and pearling town roughly 20km south of Doha, now home to a restored heritage souq, a quiet corniche, and Al Janoub Stadium. Gulf Trip Service runs private transfers between Al Wakrah, Doha, and Hamad International Airport.",
    whyVisit: "Al Wakrah keeps a slower, more local pace than central Doha — its restored souq and corniche give a sense of Qatar's fishing-village past alongside modern stadium infrastructure from the World Cup era.",
    attractions: [
      { name: "Souq Al Wakra", description: "A restored heritage market of coral-stone buildings, now home to cafés, galleries, and boutique hotels." },
      { name: "Al Wakrah Corniche", description: "A quiet waterfront promenade popular with local families, well away from Doha's crowds." },
      { name: "Al Janoub Stadium", description: "A 2022 World Cup venue with a distinctive dhow-inspired roof design." },
    ],
    airportInfo: "Al Wakrah is one of the closer Qatari towns to Hamad International Airport (DOH) — typically 15–20 minutes — making it a convenient stop for early arrivals or late departures.",
    cityTransferInfo: "A private transfer connects Al Wakrah directly to Doha's Corniche and West Bay districts, useful for visitors staying in Al Wakrah's hotels but working or dining in central Doha.",
    chauffeurInfo: "An hourly chauffeur suits a half-day combining the Souq Al Wakra heritage quarter with a stop in central Doha.",
    internalLinks: [
      { href: "/riyadh-to-qatar-taxi-service", label: "Riyadh to Qatar taxi service" },
      { href: "/saudi-arabia-to-qatar-taxi-service", label: "Saudi Arabia to Qatar cross-border transfer" },
      { href: "/airport-transfers", label: "All airport transfer services" },
    ],
    relatedSlugs: ["doha", "the-pearl-qatar", "lusail"],
  },

  // ---------------------------------------------------------- Bahrain ----
  manama: {
    slug: "manama", name: "Manama", country: "bahrain",
    seoTitle: "Manama Private Taxi & Chauffeur Service | Gulf Trip Service",
    metaDescription: "Private taxi, airport transfer and chauffeur service in Manama, Bahrain. Transport from Bahrain International Airport and over the King Fahd Causeway — book with Gulf Trip Service.",
    h1: "Private Taxi & Chauffeur Service in Manama",
    heroImage: "/destinations/manama-skyline-world-trade-center.webp",
    heroImageAlt: "Manama skyline at sunset with the Bahrain World Trade Center — premium private chauffeur and transfer service",
    intro: "Manama is Bahrain's capital, connected to Saudi Arabia's Eastern Province by the 25km King Fahd Causeway — one of the Gulf's most-crossed land borders. Gulf Trip Service runs causeway transfers from Dammam and Riyadh directly into Manama, plus private transport around the city.",
    whyVisit: "Manama is compact enough to see a great deal in a short visit — the World Trade Center's wind-turbine towers, the restored Bab Al Bahrain souq, and a causeway crossing that makes it one of the easiest GCC capitals to reach overland from Saudi Arabia.",
    attractions: [
      { name: "Bahrain World Trade Center", description: "Twin sail-shaped towers connected by wind turbines — Manama's defining skyline landmark." },
      { name: "Bab Al Bahrain & Manama Souq", description: "The historic gateway to Manama's old market district — gold, spices, and textiles in a compact old-town grid." },
      { name: "Bahrain National Museum", description: "The country's leading museum, covering 4,000+ years of Bahraini history along the Manama waterfront." },
      { name: "Qal'at al-Bahrain (Bahrain Fort)", description: "A UNESCO World Heritage archaeological site just outside Manama, the ancient capital of the Dilmun civilization." },
    ],
    airportInfo: "We meet arrivals at Bahrain International Airport (BAH), and also run direct King Fahd Causeway transfers from Dammam's King Fahd International Airport for travelers arriving in Saudi Arabia and continuing overland to Bahrain.",
    cityTransferInfo: "Manama's compact grid is easy to cover with a private transfer between the souq, World Trade Center district, and waterfront hotels — most visitors combine several sights in a single half-day loop.",
    chauffeurInfo: "An hourly chauffeur works well for a Manama-plus-Bahrain-Fort day, or for causeway travelers who want the same driver for both the border crossing and city sightseeing.",
    internalLinks: [
      { href: "/riyadh-to-bahrain-taxi-service", label: "Riyadh to Bahrain taxi service" },
      { href: "/bahrain-to-riyadh-taxi-service", label: "Bahrain to Riyadh taxi service" },
      { href: "/bahrain-to-dammam-taxi-service", label: "Bahrain to Dammam taxi service" },
      { href: "/dammam-airport-to-bahrain-taxi-service", label: "Dammam Airport to Bahrain taxi service" },
      { href: "/saudi-arabia-to-bahrain-taxi-service", label: "Saudi Arabia to Bahrain cross-border transfer" },
      { href: "/border-crossing", label: "GCC border crossing routes" },
    ],
    relatedSlugs: ["muharraq", "amwaj-islands", "zallaq", "doha", "dammam"],
  },
  muharraq: {
    slug: "muharraq", name: "Muharraq", country: "bahrain",
    seoTitle: "Muharraq Private Taxi & Transfer Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service to Muharraq, Bahrain's historic former capital and heritage district. Book with Gulf Trip Service.",
    h1: "Private Taxi & Transfer Service in Muharraq",
    heroImage: "/destinations/manama-skyline-world-trade-center.webp", imagePending: true,
    heroImageAlt: "Manama skyline photo standing in for Muharraq, Bahrain, pending a dedicated photo — private chauffeur service",
    intro: "Muharraq was Bahrain's capital before Manama, and today holds the country's best-preserved pearling-era heritage district — a UNESCO-listed trail of restored coral-stone houses just across the causeway from Manama and next to Bahrain International Airport. Gulf Trip Service runs private transfers to Muharraq from the airport and from Saudi Arabia via the causeway.",
    whyVisit: "Muharraq's Pearling Path is one of the Gulf's most complete heritage walks — merchant houses, a working souk, and the seafront where Bahrain's pearl-diving fleets once departed, all within a compact old town.",
    attractions: [
      { name: "Bahrain Pearling Trail", description: "A UNESCO World Heritage path through restored 19th-century pearl merchant houses and the old seafront." },
      { name: "Sheikh Ebrahim bin Mohammed Al Khalifa Centre", description: "A restored heritage house turned cultural centre, hosting talks, exhibitions, and a well-known café." },
      { name: "Muharraq Souq", description: "A quieter, more traditional market than Manama's, still used by local residents day to day." },
    ],
    airportInfo: "Muharraq is home to Bahrain International Airport (BAH) itself — arrivals staying in Muharraq have one of the shortest airport transfers anywhere in the Gulf, and we also run direct transfers here from Saudi Arabia via the causeway.",
    cityTransferInfo: "Muharraq sits directly across a short bridge from Manama, so a private transfer easily combines both — the Pearling Trail on one side, the World Trade Center and souq on the other.",
    chauffeurInfo: "An hourly chauffeur suits a Pearling Trail walking tour paired with a Manama city stop in the same booking.",
    internalLinks: [
      { href: "/riyadh-to-bahrain-taxi-service", label: "Riyadh to Bahrain taxi service" },
      { href: "/dammam-airport-to-bahrain-taxi-service", label: "Dammam Airport to Bahrain taxi service" },
      { href: "/saudi-arabia-to-bahrain-taxi-service", label: "Saudi Arabia to Bahrain cross-border transfer" },
      { href: "/border-crossing", label: "GCC border crossing routes" },
    ],
    relatedSlugs: ["manama", "amwaj-islands", "zallaq"],
  },
  "amwaj-islands": {
    slug: "amwaj-islands", name: "Amwaj Islands", country: "bahrain",
    seoTitle: "Amwaj Islands Private Chauffeur & Transfer Service | Gulf Trip Service",
    metaDescription: "Private chauffeur and taxi transfer service to Amwaj Islands, Bahrain's man-made resort archipelago. Book with Gulf Trip Service.",
    h1: "Private Chauffeur Service to Amwaj Islands",
    heroImage: "/destinations/manama-skyline-world-trade-center.webp", imagePending: true,
    heroImageAlt: "Manama skyline photo standing in for Amwaj Islands, Bahrain, pending a dedicated photo — private chauffeur service",
    intro: "Amwaj Islands is a cluster of man-made islands off Muharraq's coast — private beaches, marinas, and Bahrain's most resort-style residential and hotel district. Gulf Trip Service runs private transfers to Amwaj from Bahrain International Airport and from Saudi Arabia via the causeway.",
    whyVisit: "Amwaj offers a resort pace unlike central Manama — private beach clubs, marina dining, and a noticeably quieter, more residential Gulf-island feel just 15 minutes from the airport.",
    attractions: [
      { name: "Amwaj Marina", description: "A yacht-lined marina promenade with waterfront cafés and restaurants." },
      { name: "Dana Mall & Reef Island", description: "Amwaj's main retail hub, connected to the neighbouring Reef Island resort district." },
      { name: "Private beach clubs", description: "Several resort-style beach clubs open to day visitors, a rarity in a Gulf capital area." },
    ],
    airportInfo: "Amwaj is one of the closest resort districts to Bahrain International Airport (BAH) — typically 10–15 minutes — a convenient first or last stop for airport arrivals and departures.",
    cityTransferInfo: "A private transfer connects Amwaj directly into Manama for those splitting a stay between beach time and the city's heritage sights.",
    chauffeurInfo: "An hourly chauffeur suits an evening that moves between an Amwaj beach club and Manama dining without needing to book two separate one-way trips.",
    internalLinks: [
      { href: "/dammam-airport-to-bahrain-taxi-service", label: "Dammam Airport to Bahrain taxi service" },
      { href: "/saudi-arabia-to-bahrain-taxi-service", label: "Saudi Arabia to Bahrain cross-border transfer" },
      { href: "/border-crossing", label: "GCC border crossing routes" },
    ],
    relatedSlugs: ["manama", "muharraq", "zallaq"],
  },
  zallaq: {
    slug: "zallaq", name: "Zallaq", country: "bahrain",
    seoTitle: "Zallaq Private Taxi & Transfer Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service to Zallaq, Bahrain's southern beach resort coast. Book with Gulf Trip Service.",
    h1: "Private Taxi & Transfer Service in Zallaq",
    heroImage: "/destinations/manama-skyline-world-trade-center.webp", imagePending: true,
    heroImageAlt: "Manama skyline photo standing in for Zallaq, Bahrain, pending a dedicated photo — private chauffeur service",
    intro: "Zallaq is Bahrain's southern beach coast — resort hotels, the Bahrain International Circuit, and some of the country's quietest Gulf shoreline, roughly 30 minutes from Manama. Gulf Trip Service runs private transfers to Zallaq from the airport and from Saudi Arabia via the causeway.",
    whyVisit: "Zallaq is where Bahrain slows down — resort beaches with far less crowding than the capital, and the country's Formula 1 circuit drawing motorsport visitors each race season.",
    attractions: [
      { name: "Bahrain International Circuit", description: "Host of the Bahrain Grand Prix and a year-round motorsport and karting venue." },
      { name: "Zallaq beach resorts", description: "A stretch of resort hotels with private beach access, quieter than Manama or Amwaj." },
      { name: "Al Jazayer Beach", description: "One of Bahrain's most popular public beaches, known for its shallow, calm waters." },
    ],
    airportInfo: "Zallaq sits roughly 30–35 minutes from Bahrain International Airport (BAH) — further out than Manama or Muharraq, so we build the extra distance into pickup timing, especially around race weekends.",
    cityTransferInfo: "A private transfer is the practical way to reach Zallaq's resorts and the circuit, both set apart from Manama's compact centre along the southern coast road.",
    chauffeurInfo: "An hourly chauffeur is especially useful on Grand Prix weekends, when circuit traffic and road closures make timing unpredictable for a single fixed transfer.",
    internalLinks: [
      { href: "/riyadh-to-bahrain-taxi-service", label: "Riyadh to Bahrain taxi service" },
      { href: "/dammam-airport-to-bahrain-taxi-service", label: "Dammam Airport to Bahrain taxi service" },
      { href: "/saudi-arabia-to-bahrain-taxi-service", label: "Saudi Arabia to Bahrain cross-border transfer" },
    ],
    relatedSlugs: ["manama", "muharraq", "amwaj-islands"],
  },

  // ------------------------------------------------------------ Oman -----
  muscat: {
    slug: "muscat", name: "Muscat", country: "oman",
    seoTitle: "Muscat Private Taxi & Chauffeur Service | Gulf Trip Service",
    metaDescription: "Private taxi, airport transfer and chauffeur service in Muscat, Oman. Transport from Muscat International Airport to the Grand Mosque, Old Muscat, and the Corniche — book with Gulf Trip Service.",
    h1: "Private Taxi & Chauffeur Service in Muscat",
    heroImage: "/destinations/muscat-mutrah-corniche.webp",
    heroImageAlt: "Muscat's Mutrah Corniche at dusk with the Hajar Mountains behind — premium private chauffeur and transfer service",
    intro: "Muscat is Oman's whitewashed coastal capital — low-rise, sand-coloured architecture squeezed between the Gulf of Oman and the Hajar Mountains. Gulf Trip Service runs private airport transfers and city transport across Muscat's long, coastal-hugging layout.",
    whyVisit: "Muscat keeps a deliberately low skyline and a strict architectural code — no building towers over the mosques and forts — giving it a calmer, more traditional feel than most Gulf capitals, with dramatic mountain backdrops throughout the city.",
    attractions: [
      { name: "Sultan Qaboos Grand Mosque", description: "Oman's largest mosque, with one of the world's biggest hand-woven carpets and a striking crystal chandelier — open to non-Muslim visitors mornings." },
      { name: "Old Muscat & Al Alam Palace", description: "The historic walled quarter, flanked by two Portuguese-era forts and the Sultan's ceremonial palace." },
      { name: "Mutrah Corniche & Souq", description: "A curving harbour promenade backed by mountains, leading into one of the Gulf's oldest working souks." },
      { name: "Royal Opera House Muscat", description: "A striking performance venue and a symbol of Muscat's more understated approach to grand architecture." },
    ],
    airportInfo: "We meet arrivals at Muscat International Airport (MCT) with real-time flight tracking and a name-board pickup, straight to a private vehicle for the drive into the city.",
    cityTransferInfo: "Muscat stretches roughly 50km along the coast in a thin ribbon, so districts that look close on a map — Old Muscat, Mutrah, and the newer Qurum/Al Mouj areas — are each a real drive apart, best covered by a private transfer.",
    chauffeurInfo: "An hourly chauffeur suits a full-day circuit through the Grand Mosque, Old Muscat, and Mutrah Souq, or business travel between Muscat's spread-out commercial districts.",
    internalLinks: [
      { href: "/border-crossing", label: "GCC border crossing routes" },
      { href: "/airport-transfers", label: "All airport transfer services" },
      { href: "/routes", label: "All intercity and cross-border routes" },
    ],
    relatedSlugs: ["salalah", "nizwa", "sur", "dubai"],
  },
  salalah: {
    slug: "salalah", name: "Salalah", country: "oman",
    seoTitle: "Salalah Private Taxi & Transfer Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service in Salalah, southern Oman — Khareef season, frankincense country, and coastal transfers. Book with Gulf Trip Service.",
    h1: "Private Taxi & Transfer Service in Salalah",
    heroImage: "/destinations/muscat-mutrah-corniche.webp", imagePending: true,
    heroImageAlt: "Muscat corniche photo standing in for Salalah, Oman, pending a dedicated photo — private chauffeur service",
    intro: "Salalah is southern Oman's monsoon-green retreat — during the Khareef season (roughly June to September) the surrounding hills turn lush and misty, unlike almost anywhere else in the Gulf. Gulf Trip Service runs private airport transfers and touring transport around Salalah.",
    whyVisit: "Salalah is the historic centre of the frankincense trade and one of the only places in the Gulf where seasonal monsoon rains create waterfalls, fog, and green hillsides — drawing GCC visitors escaping the summer heat elsewhere.",
    attractions: [
      { name: "Al Baleed Archaeological Park", description: "A UNESCO World Heritage site and the ruins of a historic frankincense-trading port city." },
      { name: "Wadi Darbat", description: "A seasonal waterfall and lake valley, at its most dramatic during Khareef season." },
      { name: "Frankincense Land Museum", description: "A museum tracing Salalah's ancient role in the frankincense trade, next to the Al Baleed ruins." },
      { name: "Al Husn Souq", description: "Salalah's traditional market, known for frankincense, perfumes, and local handicrafts." },
    ],
    airportInfo: "We meet arrivals at Salalah Airport (SLL), which sees a sharp seasonal surge of GCC visitors during Khareef — booking a pre-arranged transfer avoids the taxi shortages that can happen during peak monsoon weeks.",
    cityTransferInfo: "Salalah's attractions — the coast, Wadi Darbat, and the old town — are spread across the wider region rather than one walkable centre, making a private driver the practical way to see the highlights.",
    chauffeurInfo: "An hourly chauffeur is especially useful during Khareef season for a Wadi Darbat and coastal waterfalls day trip, when routes and conditions change with the weather.",
    internalLinks: [
      { href: "/border-crossing", label: "GCC border crossing routes" },
      { href: "/airport-transfers", label: "All airport transfer services" },
    ],
    relatedSlugs: ["muscat", "nizwa", "sur"],
  },
  nizwa: {
    slug: "nizwa", name: "Nizwa", country: "oman",
    seoTitle: "Nizwa Private Taxi & Transfer Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service in Nizwa, Oman's historic interior capital — fort, souq, and mountain oases. Book with Gulf Trip Service.",
    h1: "Private Taxi & Transfer Service in Nizwa",
    heroImage: "/destinations/muscat-mutrah-corniche.webp", imagePending: true,
    heroImageAlt: "Muscat corniche photo standing in for Nizwa, Oman, pending a dedicated photo — private chauffeur service",
    intro: "Nizwa was Oman's capital in the 6th and 7th centuries and remains its cultural heart — a round fort, a famous Friday livestock souq, and the gateway to the Hajar Mountains' terraced oasis villages. Gulf Trip Service runs private transfers between Muscat and Nizwa, and touring transport around the interior.",
    whyVisit: "Nizwa offers the most complete traditional-Oman experience within easy reach of Muscat — a working fort and souq, date-palm oases, and mountain villages like Misfat Al Abriyeen, all roughly 90 minutes from the capital.",
    attractions: [
      { name: "Nizwa Fort", description: "A 17th-century circular fort with a commanding tower — one of Oman's most-visited historic sites." },
      { name: "Nizwa Souq", description: "A traditional market famous for its Friday livestock auction, silver jewellery, and Omani khanjar daggers." },
      { name: "Jabal Akhdar (Green Mountain)", description: "A high-altitude plateau of terraced orchards and villages, accessible from Nizwa with a 4x4 or private driver." },
      { name: "Misfat Al Abriyeen", description: "A preserved mud-brick mountain village with ancient falaj irrigation channels still in use." },
    ],
    airportInfo: "Nizwa has no commercial airport — travelers typically fly into Muscat International (MCT) and continue by road, roughly 90 minutes, which we run as a direct private transfer.",
    cityTransferInfo: "Nizwa's fort and souq sit close together in the old town, but the surrounding mountain villages and Jabal Akhdar require a private vehicle and, in places, a 4x4.",
    chauffeurInfo: "An hourly chauffeur or full-day charter suits a Muscat–Nizwa–Jabal Akhdar loop, combining the fort and souq with a mountain-village excursion in one trip.",
    internalLinks: [
      { href: "/border-crossing", label: "GCC border crossing routes" },
      { href: "/airport-transfers", label: "All airport transfer services" },
    ],
    relatedSlugs: ["muscat", "salalah", "sur"],
  },
  sur: {
    slug: "sur", name: "Sur", country: "oman",
    seoTitle: "Sur Private Taxi & Transfer Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service in Sur, Oman's traditional dhow-building coastal town. Book with Gulf Trip Service.",
    h1: "Private Taxi & Transfer Service in Sur",
    heroImage: "/destinations/muscat-mutrah-corniche.webp", imagePending: true,
    heroImageAlt: "Muscat corniche photo standing in for Sur, Oman, pending a dedicated photo — private chauffeur service",
    intro: "Sur is a traditional dhow-building town on Oman's east coast, roughly three hours from Muscat — one of the last places in the Gulf where wooden trading ships are still built by hand. Gulf Trip Service runs private transfers and day-trip touring transport from Muscat to Sur.",
    whyVisit: "Sur combines a working maritime heritage — dhow shipyards still active on the waterfront — with nearby turtle-nesting beaches at Ras Al Jinz, making it one of Oman's most rewarding coastal day trips or overnight stops.",
    attractions: [
      { name: "Sur Dhow Shipyard", description: "A working boatyard where craftsmen still build traditional wooden dhows by hand, open to visitors." },
      { name: "Ras Al Jinz Turtle Reserve", description: "A protected beach roughly 40 minutes from Sur where green turtles nest — one of Oman's best-known wildlife sites." },
      { name: "Sur Lighthouse & Corniche", description: "A photogenic white lighthouse marking the harbour entrance, with a walkable waterfront promenade." },
      { name: "Bimmah Sinkhole", description: "A striking turquoise sinkhole roughly halfway between Muscat and Sur, a popular stop on the drive." },
    ],
    airportInfo: "Sur has no commercial airport — travelers fly into Muscat International (MCT) and continue by road, roughly 3 hours, which we run as a direct private transfer or full-day charter.",
    cityTransferInfo: "Sur's dhow shipyard and Corniche are walkable within the town, but Ras Al Jinz and the Bimmah Sinkhole require a private vehicle along the coastal road.",
    chauffeurInfo: "A full-day charter suits the Muscat–Sur drive with stops at Bimmah Sinkhole and Ras Al Jinz built in, rather than a single point-to-point transfer.",
    internalLinks: [
      { href: "/border-crossing", label: "GCC border crossing routes" },
      { href: "/airport-transfers", label: "All airport transfer services" },
    ],
    relatedSlugs: ["muscat", "nizwa", "salalah"],
  },

  // ----------------------------------------------------------- Kuwait ----
  "kuwait-city": {
    slug: "kuwait-city", name: "Kuwait City", country: "kuwait",
    seoTitle: "Kuwait City Private Taxi & Chauffeur Service | Gulf Trip Service",
    metaDescription: "Private taxi, airport transfer and chauffeur service in Kuwait City. Transport from Kuwait International Airport to the Kuwait Towers, Gulf Road, and across the city — book with Gulf Trip Service.",
    h1: "Private Taxi & Chauffeur Service in Kuwait City",
    heroImage: "/destinations/kuwait-city-towers-skyline.webp",
    heroImageAlt: "Kuwait Towers and the Kuwait City skyline at sunset — premium private chauffeur and transfer service",
    intro: "Kuwait City is Kuwait's compact Gulf capital, built along a curving Gulf Road corniche and defined by the iconic Kuwait Towers. Gulf Trip Service runs private airport transfers within the city and cross-border transport connecting Kuwait to Saudi Arabia's Eastern Province.",
    whyVisit: "Kuwait City packs a dense downtown, a long waterfront corniche, and some of the Gulf's most distinctive 1970s–80s architecture into a city that's easy to navigate by private car, with road links directly across the border into Saudi Arabia.",
    attractions: [
      { name: "Kuwait Towers", description: "The country's most recognisable landmark — three water towers on the Gulf Road corniche, with an observation deck and revolving restaurant." },
      { name: "Grand Mosque (Kuwait)", description: "The largest mosque in Kuwait, with one of the region's largest hand-woven carpets." },
      { name: "Souq Al-Mubarakiya", description: "Kuwait City's oldest traditional market — spices, textiles, and some of the city's best local food stalls." },
      { name: "Gulf Road & Kuwait National Museum", description: "The city's long coastal promenade and its main museum, covering Kuwaiti history and traditional pearling culture." },
    ],
    airportInfo: "We meet arrivals at Kuwait International Airport (KWI) with real-time flight tracking and a name-board pickup, straight to a private vehicle for the drive into the city.",
    cityTransferInfo: "Kuwait City's downtown, Gulf Road corniche, and Salmiya district are each a short private-car ride apart — we run fixed-rate transfers between hotels, business districts, and the city's main sights.",
    chauffeurInfo: "An hourly chauffeur suits business travel between Kuwait City's commercial towers, or a sightseeing day combining the Kuwait Towers, Souq Al-Mubarakiya, and the National Museum.",
    internalLinks: [
      { href: "/riyadh-to-kuwait-taxi-service", label: "Riyadh to Kuwait taxi service" },
      { href: "/kuwait-to-riyadh-taxi-service", label: "Kuwait to Riyadh taxi service" },
      { href: "/dammam-to-kuwait-taxi-service", label: "Dammam to Kuwait taxi service" },
      { href: "/kuwait-to-dammam-taxi-service", label: "Kuwait to Dammam taxi service" },
      { href: "/khafji-to-kuwait-taxi-service", label: "Khafji to Kuwait taxi service" },
      { href: "/border-crossing", label: "GCC border crossing routes" },
    ],
    relatedSlugs: ["salmiya", "al-shaheed-park", "failaka-island", "dammam", "manama"],
  },
  salmiya: {
    slug: "salmiya", name: "Salmiya", country: "kuwait",
    seoTitle: "Salmiya Private Taxi & Transfer Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service in Salmiya, Kuwait's liveliest district — Gulf Road corniche and dining. Book with Gulf Trip Service.",
    h1: "Private Taxi & Transfer Service in Salmiya",
    heroImage: "/destinations/kuwait-city-towers-skyline.webp", imagePending: true,
    heroImageAlt: "Kuwait City skyline photo standing in for Salmiya, Kuwait, pending a dedicated photo — private chauffeur service",
    intro: "Salmiya is Kuwait's liveliest residential and commercial district — a dense stretch of Gulf Road corniche, malls, and the country's busiest dining scene, just south of Kuwait City. Gulf Trip Service runs private transfers between Salmiya, Kuwait International Airport, and the rest of the city.",
    whyVisit: "Salmiya is where much of Kuwait's day-to-day social life happens — a long walkable corniche, dense shopping, and a concentration of restaurants and cafés that draws both residents and visitors.",
    attractions: [
      { name: "Salmiya Corniche", description: "A long Gulf Road waterfront walk, one of the most popular evening spots in the Kuwait City area." },
      { name: "Marina Mall & The Scientific Center", description: "A waterfront mall next to Kuwait's aquarium and science museum, both popular family attractions." },
      { name: "Salmiya dining district", description: "One of the densest concentrations of restaurants and cafés in the country, spanning cuisines from across the Gulf and beyond." },
    ],
    airportInfo: "Salmiya sits roughly 20–25 minutes from Kuwait International Airport (KWI) — we track arriving flights and transfer directly to Salmiya's hotels and residences.",
    cityTransferInfo: "A private transfer connects Salmiya directly into downtown Kuwait City, useful for visitors staying in Salmiya's hotels but working or sightseeing in the city centre.",
    chauffeurInfo: "An hourly chauffeur suits an evening moving between Salmiya's corniche dining and downtown Kuwait City sights.",
    internalLinks: [
      { href: "/riyadh-to-kuwait-taxi-service", label: "Riyadh to Kuwait taxi service" },
      { href: "/dammam-to-kuwait-taxi-service", label: "Dammam to Kuwait taxi service" },
      { href: "/border-crossing", label: "GCC border crossing routes" },
    ],
    relatedSlugs: ["kuwait-city", "al-shaheed-park", "failaka-island"],
  },
  "al-shaheed-park": {
    slug: "al-shaheed-park", name: "Al Shaheed Park", country: "kuwait",
    seoTitle: "Al Shaheed Park Private Taxi & Transfer Service | Gulf Trip Service",
    metaDescription: "Private taxi and chauffeur transfer service to Al Shaheed Park, one of the Gulf's largest urban parks in Kuwait City. Book with Gulf Trip Service.",
    h1: "Private Taxi & Transfer Service to Al Shaheed Park",
    heroImage: "/destinations/kuwait-city-towers-skyline.webp", imagePending: true,
    heroImageAlt: "Kuwait City skyline photo standing in for Al Shaheed Park, Kuwait, pending a dedicated photo — private chauffeur service",
    intro: "Al Shaheed Park is one of the Gulf's largest urban parks — landscaped gardens, museums, and green space built along Kuwait City's old fortress wall line. Gulf Trip Service runs private transfers to Al Shaheed Park from Kuwait International Airport and across the city.",
    whyVisit: "Al Shaheed Park gives central Kuwait City a rare stretch of open green space, with two museums built into the park itself and views over the surrounding downtown skyline.",
    attractions: [
      { name: "Kuwait National Memorial Museum", description: "A museum within the park documenting the 1990 Iraqi invasion and Kuwait's liberation, with an immersive multimedia presentation." },
      { name: "Al Shaheed Park gardens", description: "Landscaped gardens, walking paths, and water features spanning both sides of Kuwait City's Al-Soor Street." },
      { name: "Half Moon Gallery", description: "A crescent-shaped exhibition space within the park hosting rotating art and heritage displays." },
    ],
    airportInfo: "Al Shaheed Park sits in central Kuwait City, roughly 20 minutes from Kuwait International Airport (KWI) — we transfer arriving visitors directly there or to nearby hotels.",
    cityTransferInfo: "The park sits close to Kuwait City's downtown core, easily combined with a Souq Al-Mubarakiya or Kuwait Towers stop in the same private transfer.",
    chauffeurInfo: "An hourly chauffeur suits a downtown Kuwait City circuit that includes Al Shaheed Park alongside the Kuwait Towers and the old souq.",
    internalLinks: [
      { href: "/riyadh-to-kuwait-taxi-service", label: "Riyadh to Kuwait taxi service" },
      { href: "/kuwait-to-riyadh-taxi-service", label: "Kuwait to Riyadh taxi service" },
      { href: "/border-crossing", label: "GCC border crossing routes" },
    ],
    relatedSlugs: ["kuwait-city", "salmiya", "failaka-island"],
  },
  "failaka-island": {
    slug: "failaka-island", name: "Failaka Island", country: "kuwait",
    seoTitle: "Failaka Island Private Transfer Service | Gulf Trip Service",
    metaDescription: "Private taxi and ferry-terminal transfer service to Failaka Island, Kuwait's historic Gulf island with 4,000 years of history. Book with Gulf Trip Service.",
    h1: "Private Transfer Service to Failaka Island",
    heroImage: "/destinations/kuwait-city-towers-skyline.webp", imagePending: true,
    heroImageAlt: "Kuwait City skyline photo standing in for Failaka Island, Kuwait, pending a dedicated photo — private chauffeur service",
    intro: "Failaka Island sits in Kuwait Bay, roughly 20km from Kuwait City, with archaeological sites tracing 4,000 years of Gulf history back to the Bronze Age Dilmun civilization and later Greek settlement. Gulf Trip Service runs private transfers to Kuwait City's ferry terminal for onward crossings to Failaka.",
    whyVisit: "Failaka offers a slower-paced day trip from Kuwait City — Bronze Age and Hellenistic ruins, abandoned pre-1990 village houses left as they were, and a quiet island atmosphere a short ferry ride from the mainland.",
    attractions: [
      { name: "Al Qurainiya archaeological site", description: "Bronze Age Dilmun-era ruins and the remains of a Greek temple, among the Gulf's most significant ancient sites." },
      { name: "Failaka's abandoned villages", description: "Homes left largely untouched since residents evacuated during the 1990 invasion, now a striking open-air time capsule." },
      { name: "Failaka beaches", description: "Quiet, undeveloped shoreline offering a contrast to Kuwait City's built-up corniche." },
    ],
    airportInfo: "There is no airport on Failaka — visitors fly into Kuwait International Airport (KWI), and we transfer arrivals to Kuwait City's ferry terminal for the crossing to the island.",
    cityTransferInfo: "We handle the Kuwait City side of a Failaka day trip — airport or hotel to ferry terminal, and back — with the island itself explored on foot or by local transport once you arrive.",
    chauffeurInfo: "A pre-arranged transfer to the ferry terminal ensures you don't miss a sailing time, particularly useful for visitors combining Failaka with other Kuwait City sightseeing in the same day.",
    internalLinks: [
      { href: "/riyadh-to-kuwait-taxi-service", label: "Riyadh to Kuwait taxi service" },
      { href: "/dammam-to-kuwait-taxi-service", label: "Dammam to Kuwait taxi service" },
      { href: "/border-crossing", label: "GCC border crossing routes" },
    ],
    relatedSlugs: ["kuwait-city", "salmiya", "al-shaheed-park"],
  },
};

export function getDestinationDetail(slug: string): DestinationDetail | undefined {
  return DESTINATION_DETAILS[slug];
}
