import type { TourPageData } from "@/components/TourPage";

/**
 * Tour / Ziyarat / Religious Travel page family — full-page content data
 * layer (Phase 6). Covers the 3 existing pages: Taif Ziyarat, Jeddah City
 * Tour, AlUla Tour.
 *
 * Deliberately a separate file/name from `@/lib/tourData` — that file
 * already exists as the lightweight Day Tours nav/search registry (`TOURS`,
 * `TourData`) consumed by BookOnlineClient/HeroSearchBar/navigation.ts.
 * This file is unrelated: full page content, not a nav index.
 *
 * Content below is ported from each page's original hand-written copy
 * (attractions, packages, seasons, tips), restructured into TourPageData,
 * with two corrections carried over from audit: (1) "included" lists never
 * claim site entrance tickets/permits as included — these pages sell
 * private transportation, not guided-tour packages, so tour options list
 * stops covered, not tickets bundled; (2) an unsupported "one of the safest
 * destinations in the world" superlative on the AlUla FAQ has been softened
 * to a verifiable claim.
 */

export const taifZiyarat: TourPageData = {
  slug: "taif-ziyarat-taxi-service",
  title: "Taif Ziyarat Tour",
  h1: "Taif Ziyarat Tour with Private Driver",
  breadcrumbLabel: "Taif Ziyarat Tour",
  intro: "Journey to the City of Roses — Taif. Visit rose farms, mountain retreats and historic landmarks with our professional taxi service from Makkah and Jeddah.",

  citySlug: "taif",
  city: "Taif",

  overviewTitle: "Taif — The City of Roses & Mountain Air",
  overviewParagraphs: [
    "Located 1,800 meters above sea level in the Hejaz mountains, Taif is one of Saudi Arabia's most beloved cities. Known as the \"City of Roses,\" Taif produces the world's finest Damask rose water and oud — fragrances used in Islamic tradition for centuries. The city also holds historical significance connected to the early years of Islam. Our taxi service makes a journey to Taif from Makkah or Jeddah comfortable, safe and memorable.",
    "Because Taif sits well above sea level, its climate is noticeably cooler than Makkah or Jeddah year-round, which is a large part of its appeal as a day-trip or overnight destination for residents and pilgrims alike.",
  ],

  quickFacts: [
    { label: "Departs From", value: "Makkah or Jeddah" },
    { label: "Typical Duration", value: "8 hours – 2 days" },
    { label: "Elevation", value: "~1,800m — cooler climate" },
    { label: "Vehicles", value: "Sedan / SUV / Van" },
  ],

  audience: [
    { icon: "🕌", title: "Pilgrims & Umrah Visitors", description: "A respectful, unhurried day trip from Makkah for those wanting to see Taif's historic and natural sites." },
    { icon: "👨‍👩‍👧‍👦", title: "Families", description: "Cooler mountain air, parks and the zoo make Taif a comfortable family day out away from the coastal heat." },
    { icon: "🌹", title: "Rose Season Visitors", description: "Travelers timing their trip to see the rose harvest and Taif's famous rose-water production up close." },
  ],

  included: [
    "Private vehicle, exclusively for your group",
    "Professional driver familiar with the Makkah/Jeddah–Taif mountain road",
    "Flexible stops along the way — nothing fixed or rushed",
    "Return transfer back to Makkah or Jeddah",
    "24/7 availability and WhatsApp support",
  ],

  tourOptions: [
    {
      icon: "🌹",
      title: "Taif Day Trip",
      duration: "8–10 hours",
      note: "From Makkah",
      stops: ["Rose farms", "Shubra Palace Museum", "Souq Al-Tuffah", "Al-Hada Mountain", "Lunch stop"],
    },
    {
      icon: "🌿",
      title: "Taif Ziyarat & Tour",
      duration: "Full day",
      note: "From Makkah or Jeddah",
      stops: ["Masjid Addas", "Al-Shafa mountains", "Rose farms", "Al-Hada Chairlift", "Taif Zoo", "Souq Al-Tuffah"],
      popular: true,
    },
    {
      icon: "⭐",
      title: "Taif 2-Day Getaway",
      duration: "2 days",
      note: "From Makkah or Jeddah",
      stops: ["All day-trip sites", "Sunset mountain drive", "Al-Rudaf Park", "Overnight stay (traveler-arranged)"],
    },
  ],

  destinations: [
    { icon: "🌹", name: "Al-Gaith Rose Farm", description: "Taif is famous for its Damask roses — the source of the world's finest rose water and oud. Tour the rose farms during bloom season (March–May)." },
    { icon: "🏔️", name: "Al-Shafa & Al-Hada Mountain", description: "Mountain villages perched around 2,000m above sea level, offering cool temperatures and panoramic views above Makkah." },
    { icon: "🚡", name: "Al-Hada Chairlift", description: "Aerial views of the Al-Hada valley and surrounding mountains from one of Saudi Arabia's best-known cable cars." },
    { icon: "🦁", name: "Taif Zoo", description: "One of the larger zoos in Saudi Arabia, home to a wide range of species." },
    { icon: "🕌", name: "Masjid Addas (Mosque of Addas)", description: "A historic mosque commemorating the Prophet's ﷺ stop in Taif, where a young Christian slave named Addas offered him a bunch of grapes." },
    { icon: "🏰", name: "Shubra Palace Museum", description: "An Italianate palace turned museum, once the residence of King Abdulaziz bin Saud. Explore royal history and Saudi heritage." },
    { icon: "🛍️", name: "Taif Souq Al-Tuffah", description: "The Apple Market of Taif, where you can find fresh produce, honey, rose water, oud perfumes and local handicrafts." },
    { icon: "🌺", name: "Al-Rudaf Park", description: "A public park in a lush valley, popular for family picnics and enjoying Taif's mountain climate." },
  ],
  itineraryNote: "The exact order of stops may vary depending on traffic, site access, operating hours and your own preferences — your driver will work with you to fit in as much as time allows.",

  religiousNote: "Taif holds a place in Islamic history connected to the early years of the Prophet Muhammad's ﷺ mission, and Masjid Addas commemorates one episode from that period. We describe this respectfully and factually as historical background to the area — our drivers are transportation professionals, not religious scholars, and cannot provide religious guidance or rulings.",

  pickupInfo: "Hotel or apartment pickup anywhere in Makkah or Jeddah, coordinated in advance via WhatsApp or phone.",
  dropoffInfo: "Return drop-off at your Makkah or Jeddah hotel, or an alternative address if arranged ahead of time.",
  familyGroupNote: "Vans are available for larger families or groups traveling together, with room for luggage and mountain-trip essentials.",

  seasons: [
    { season: "March – May", highlight: "Rose Season 🌹", description: "The most popular time to visit — rose farms are in bloom, producing the well-known Taif rose water." },
    { season: "June – September", highlight: "Cool Summer ☀️", description: "While much of the Kingdom is hot, Taif's mountain altitude keeps temperatures noticeably milder." },
    { season: "October – February", highlight: "Cool Winter 🍃", description: "Good hiking and outdoor weather, with cooler mountain air and clearer skies." },
  ],

  reviews: [
    { name: "Abdullah R.", origin: "Umrah Visitor, Makkah", text: "A relaxed day out of the heat. Our driver knew the mountain road well and didn't rush us at any stop." },
    { name: "Sara M.", origin: "Family Trip, Jeddah", text: "The kids loved the chairlift and the zoo, and the drive up into the mountains was an experience on its own." },
  ],

  faqs: [
    { q: "How far is Taif from Makkah and Jeddah?", a: "Taif is around 90 km (roughly 1.5–2 hours by road) from Makkah, and around 170 km (about 2.5–3 hours) from Jeddah, depending on traffic on the mountain road." },
    { q: "Is the mountain road to Taif safe?", a: "The road is a well-maintained, commonly used route with a number of switchbacks as it climbs into the mountains. Our drivers are experienced with this specific road." },
    { q: "Can I visit Taif as a day trip from Makkah?", a: "Yes — a day trip from Makkah is the most common way to see Taif's main sites and return the same evening. An overnight stay is also possible if you'd prefer a more relaxed pace." },
    { q: "Do you provide a tour guide, or just transportation?", a: "We provide a private vehicle and driver. Our drivers know the area and the route well, but they are not licensed tour guides — any guided commentary is informal, not a substitute for an official guide." },
  ],

  practicalInfo: [
    { title: "Dress & Weather", note: "Taif is noticeably cooler than Makkah or Jeddah, especially in the evenings and in winter — bring a light jacket." },
    { title: "Best Time of Day to Travel", note: "Weekday mornings tend to have lighter traffic on the mountain road than Thursday/Friday evenings." },
  ],

  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },

  relatedServices: [
    { href: "/ziyarat-services-in-saudi-arabia", label: "Ziyarat Services" },
    { href: "/private-taxi", label: "Private Taxi" },
    { href: "/umrah-taxi-services", label: "Umrah Taxi Services" },
  ],

  ctaText: "Book Your Taif Ziyarat Tour Today",
};

export const jeddahCityTour: TourPageData = {
  slug: "jeddah-city-tour-services-in-saudi-arabia",
  title: "Jeddah City Tour",
  h1: "Jeddah City Tour by Private Car — Half & Full Day",
  breadcrumbLabel: "Jeddah City Tour",
  intro: "Discover the Pearl of the Red Sea — explore Jeddah's UNESCO heritage, coastline and culture with a private vehicle and driver, on your own schedule.",

  citySlug: "jeddah",
  city: "Jeddah",

  overviewTitle: "Discover Jeddah",
  overviewParagraphs: [
    "Jeddah — the gateway city of Saudi Arabia — blends centuries of history with modern coastal life. From the narrow alleys of UNESCO-listed Al-Balad to the Red Sea Corniche, the city has a wide range of sights within a fairly compact area. Our city tours take you between the main landmarks in a comfortable private vehicle with a knowledgeable local driver, at a pace that suits you.",
  ],

  quickFacts: [
    { label: "Duration", value: "Half day (5 hrs) or full day" },
    { label: "Coverage", value: "Al-Balad, Corniche & Red Sea coast" },
    { label: "Vehicles", value: "Sedan / SUV / Van" },
    { label: "Languages", value: "Arabic & English-speaking drivers" },
  ],

  audience: [
    { icon: "✈️", title: "Stopover & Layover Travelers", description: "A half-day tour that fits neatly into a longer transit stop or a day before/after a flight." },
    { icon: "🕌", title: "Umrah & Ziyarat Travelers", description: "A stop in Jeddah before or after Makkah/Madinah to see the historic old city and coastline." },
    { icon: "👨‍👩‍👧‍👦", title: "Families & Groups", description: "Flexible stops and van options make it easy to plan a day around younger children or larger groups." },
  ],

  included: [
    "Private vehicle, exclusively for your group",
    "Professional, local driver",
    "Flexible half-day or full-day booking",
    "Choice of sedan through to van for larger groups",
    "24/7 availability and WhatsApp support",
  ],

  tourOptions: [
    {
      icon: "🌆",
      title: "Jeddah Half Day Tour",
      duration: "5 hours",
      stops: ["Al-Balad Old Town", "Jeddah Corniche", "Al-Rahma Floating Mosque", "King Fahd Fountain"],
    },
    {
      icon: "🌃",
      title: "Jeddah Full Day Tour",
      duration: "10 hours",
      stops: ["Al-Balad Old Town", "Jeddah Corniche", "Al-Rahma Floating Mosque", "Al-Shallal Theme Park", "Fakieh Aquarium", "Jeddah Regional Museum", "Souq Al-Alawi"],
      popular: true,
    },
    {
      icon: "🌊",
      title: "Jeddah + Red Sea Coast",
      duration: "Full day",
      stops: ["All half-day sites", "Red Sea coastline stop", "Sunset Corniche walk", "Night city view"],
    },
  ],

  destinations: [
    { icon: "🏛️", name: "Al-Balad Historic District", description: "A UNESCO World Heritage Site — centuries-old coral buildings, traditional souqs and historic merchant houses." },
    { icon: "🌊", name: "Jeddah Corniche", description: "A long coastal promenade along the Red Sea, with parks, cafes and the iconic King Fahd Fountain nearby." },
    { icon: "🕌", name: "Al-Rahma Floating Mosque", description: "A mosque built out over the Red Sea that appears to float — one of Jeddah's most photographed landmarks." },
    { icon: "🛍️", name: "Souq Al-Alawi", description: "A traditional market in the heart of Al-Balad, selling spices, perfumes, gold, fabrics and souvenirs." },
    { icon: "🏛️", name: "Jeddah Regional Museum", description: "Artifacts, manuscripts and archaeological exhibits covering the region's long history." },
    { icon: "🎡", name: "Al-Shallal Theme Park", description: "A waterfront entertainment complex with rides, an ice rink, restaurants and Red Sea views." },
    { icon: "🐬", name: "Fakieh Aquarium", description: "A marine attraction featuring Red Sea fish and other marine life." },
    { icon: "⛲", name: "King Fahd Fountain", description: "One of the tallest fountains of its kind, visible along much of the Corniche — especially striking after dark." },
  ],
  itineraryNote: "The order of stops may vary depending on traffic, site opening hours and your own pace — your driver will work with you to plan the most sensible route on the day.",

  pickupInfo: "Hotel, airport or apartment pickup anywhere in Jeddah, coordinated in advance via WhatsApp or phone.",
  dropoffInfo: "Return drop-off at your Jeddah hotel, the airport, or an alternative address if arranged ahead of time.",
  familyGroupNote: "Vans are available for families or groups who'd rather travel together in one vehicle.",

  seasons: [
    { season: "October – April", highlight: "Best Season 🌤️", description: "The most comfortable months for walking around Al-Balad and the Corniche." },
    { season: "June – September", highlight: "Hot & Humid ☀️", description: "Outdoor walking is best done in the early morning or evening; midday heat and humidity are significant." },
  ],

  reviews: [
    { name: "Omar T.", origin: "Business Traveler, Jeddah", text: "Had a half-day layover and the driver planned the route well — saw Al-Balad and the Corniche without feeling rushed." },
    { name: "Huda A.", origin: "Family Visitor", text: "Comfortable van, and the driver was happy to stop extra at the Corniche for photos with the kids." },
  ],

  faqs: [
    { q: "How much of Jeddah can I see in a half-day tour?", a: "A half-day (around 5 hours) typically covers Al-Balad, the Corniche, the Floating Mosque and King Fahd Fountain — the most central and easily reached sites." },
    { q: "Do you provide a guide, or just the vehicle and driver?", a: "We provide a private vehicle and an experienced local driver. Drivers can point out landmarks along the way, but they are not licensed tour guides." },
    { q: "Is Al-Balad walkable, or do we stay in the car?", a: "Al-Balad's old town is best explored on foot — your driver will park nearby and wait while you walk through the historic district at your own pace." },
    { q: "What should I wear for a Jeddah city tour?", a: "Modest, comfortable clothing is recommended, particularly around Al-Balad and near mosques. Light layers work well given Jeddah's coastal climate." },
  ],

  practicalInfo: [
    { title: "Best Time to Visit", note: "October to April offers the most comfortable weather. Outdoor stops in summer (June–September) are best kept short and scheduled around the midday heat." },
    { title: "Currency", note: "Saudi Riyal. Most places accept cards, but cash is useful in the traditional souqs." },
    { title: "Language", note: "Arabic is the official language. English is widely understood in hotels and tourist areas, and our drivers speak both." },
  ],

  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },

  relatedServices: [
    { href: "/private-taxi", label: "Private Taxi" },
    { href: "/airport-transfer-for-umrah", label: "Airport Transfer for Umrah" },
    { href: "/wedding-transportation", label: "Wedding Transportation" },
  ],

  ctaText: "Ready to Explore Jeddah?",
};

export const aluTour: TourPageData = {
  slug: "reliable-alula-tour-taxi-service-in-saudi-arabia",
  title: "AlUla Tour",
  h1: "AlUla Private Day Tour & Chauffeur Service",
  breadcrumbLabel: "AlUla Tour",
  intro: "Explore the ancient wonders of AlUla — Hegra, Elephant Rock, and thousands of years of history — with a reliable private taxi and tour service.",

  citySlug: "alula",
  city: "AlUla",

  overviewTitle: "AlUla — Arabia's Ancient Wonder",
  overviewParagraphs: [
    "In the northwest of Saudi Arabia, AlUla is one of the country's most striking destinations. It is home to the Kingdom's first UNESCO World Heritage Site, Hegra — a site with more than 100 Nabataean tombs carved into sandstone mountains. Alongside Hegra, AlUla offers the iconic Elephant Rock, ancient inscriptions, a centuries-old old town, and dramatic desert landscapes.",
    "Our private taxi and tour service takes you from your hotel or the airport directly to AlUla's main sites, with a driver who knows the area and a flexible pace built around your schedule.",
  ],

  quickFacts: [
    { label: "Departs From", value: "Madinah or Jeddah" },
    { label: "Typical Duration", value: "1–3 days" },
    { label: "Best Season", value: "October – March" },
    { label: "Vehicles", value: "Sedan / SUV / Van" },
  ],

  audience: [
    { icon: "🏛️", title: "History & Heritage Travelers", description: "Visitors drawn specifically to Hegra, Dadan and AlUla's Nabataean-era sites." },
    { icon: "📸", title: "Photography Enthusiasts", description: "AlUla's rock formations and desert light make it a popular stop for photographers." },
    { icon: "👨‍👩‍👧‍👦", title: "Families & Groups", description: "Multi-day options and larger vehicles suit families wanting to see AlUla at an unhurried pace." },
  ],

  included: [
    "Private vehicle, exclusively for your group",
    "Professional driver for the full duration booked",
    "Airport or hotel pickup and drop-off",
    "Flexible stops between AlUla's main sites",
    "24/7 availability and WhatsApp support",
  ],

  tourOptions: [
    {
      icon: "✈️",
      title: "Day Trip from Jeddah",
      duration: "1 day",
      note: "By air — flight not included; ground transport in AlUla is.",
      stops: ["Hegra area", "Elephant Rock", "Old Town AlUla"],
    },
    {
      icon: "🏜️",
      title: "2-Day AlUla Explorer",
      duration: "2 days",
      note: "Private vehicle and driver for 2 days",
      stops: ["Hegra area", "Dadan", "Elephant Rock", "Jabal Ikmah", "Old Town AlUla", "AlUla Oasis", "AlUla Museum"],
      popular: true,
    },
    {
      icon: "⭐",
      title: "3-Day Complete AlUla",
      duration: "3 days",
      note: "Private vehicle and dedicated driver",
      stops: ["All 2-day sites", "Sunrise desert drive", "Nabataean Trail area", "Sunset photo stop"],
    },
  ],

  destinations: [
    { icon: "🏛️", name: "Hegra (Al-Hijr / Madain Saleh)", description: "Saudi Arabia's first UNESCO World Heritage Site — Nabataean tombs carved into sandstone cliffs, dating back around 2,000 years." },
    { icon: "🐘", name: "Elephant Rock (Jabal AlFil)", description: "A striking natural rock formation resembling an elephant — one of AlUla's most photographed landmarks." },
    { icon: "📜", name: "Jabal Ikmah", description: "An open-air site with hundreds of ancient inscriptions carved into the cliffs in several ancient scripts." },
    { icon: "🏙️", name: "Old Town AlUla", description: "An abandoned mud-brick old town with a maze of historic houses and a historic mosque." },
    { icon: "🌄", name: "Dadan (Dedan)", description: "The ancient capital of the Lihyanite and Dadanite kingdoms, with carved lions and royal tombs." },
    { icon: "🌿", name: "AlUla Oasis", description: "A palm oasis running through the sandstone landscape." },
    { icon: "⛏️", name: "AlUla Museum", description: "Exhibits covering the area's long human history and archaeological finds." },
  ],
  itineraryNote: "The exact order of stops may vary depending on traffic, site access hours and operating conditions on the day — your driver will plan the most sensible route for your itinerary.",

  pickupInfo: "AlUla Airport, or hotel pickup in AlUla, Madinah or Jeddah depending on your route, coordinated in advance via WhatsApp or phone.",
  dropoffInfo: "Return drop-off at your hotel or the airport, as agreed at the time of booking.",
  familyGroupNote: "Vans are available for larger families or groups traveling together across the multi-day options.",

  seasons: [
    { season: "October – March", highlight: "Peak Season 🌤️", description: "Cooler daytime and evening temperatures make this the most comfortable and popular time to explore AlUla's outdoor sites." },
    { season: "June – August", highlight: "Very Hot ☀️", description: "Daytime temperatures are high; outdoor sightseeing is best limited to early morning or late afternoon." },
  ],

  reviews: [
    { name: "Khalid S.", origin: "Heritage Traveler, Jeddah", text: "Two-day trip was well paced — plenty of time at Hegra without feeling rushed to the next stop." },
    { name: "Noor F.", origin: "Family Trip, Madinah", text: "Driver was flexible when we wanted extra time at Elephant Rock for photos. Comfortable SUV for the whole family." },
  ],

  faqs: [
    { q: "How far is AlUla from Jeddah or Madinah?", a: "AlUla is roughly 1,000 km from Jeddah by road (around 10 hours) or about an hour by flight — flying is recommended for day trips. From Madinah, it's a shorter drive of around 4–5 hours. We handle all ground transportation once you're in AlUla." },
    { q: "Do I need a ticket to enter Hegra?", a: "Yes. Entry to Hegra requires a ticket, booked in advance through the official Saudi heritage ticketing platform. We recommend arranging this before your visit." },
    { q: "What is the best time of year to visit AlUla?", a: "October to March is the most comfortable season, with cooler temperatures and clearer skies. June through August can be very hot for outdoor sightseeing." },
    { q: "Is AlUla a well-set-up destination for visitors?", a: "Yes — AlUla is an established Saudi tourism destination with modern roads, hotels and visitor infrastructure, and it welcomes travelers from around the world." },
  ],

  practicalInfo: [
    { title: "Hegra Tickets", note: "Entry tickets for Hegra are booked separately through the official heritage platform, not included in our transportation booking." },
    { title: "What to Wear", note: "Modest, comfortable clothing and sturdy footwear are recommended for walking around outdoor archaeological sites." },
  ],

  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },

  relatedServices: [
    { href: "/services/madinah", label: "Madinah Taxi Service" },
    { href: "/madina-airport-taxi-service", label: "Madinah Airport Taxi" },
    { href: "/private-taxi", label: "Private Taxi" },
  ],

  ctaText: "Begin Your AlUla Adventure",
};

export const allTourPages: TourPageData[] = [taifZiyarat, jeddahCityTour, aluTour];

export function getTourPage(slug: string): TourPageData | undefined {
  return allTourPages.find((t) => t.slug === slug);
}
