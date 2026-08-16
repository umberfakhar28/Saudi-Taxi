import type { BorderData } from "@/components/BorderPage";

/**
 * Border / Cross-Border page family — country-level journey data (Phase 10).
 * Covers the 4 existing pages: Saudi Arabia to Bahrain, Qatar, UAE, Jordan.
 * Content is ported from each page's original hand-written copy and
 * restructured into BorderData, with visa/entry-requirement language always
 * reframed as guidance to verify rather than a stated rule (this business
 * has no immigration authority and requirements change over time), and two
 * overstated operational claims removed from the original copy: "assistance
 * with customs and immigration procedures" (UAE) and "vehicle border
 * insurance included" (Bahrain) — neither is a transportation service this
 * business can genuinely guarantee.
 */

export const saudiToBahrain: BorderData = {
  slug: "saudi-arabia-to-bahrain-taxi-service",
  title: "Saudi Arabia to Bahrain Taxi",
  h1: "Saudi Arabia to Bahrain — Private Taxi & Cross-Border Transfer",
  breadcrumbLabel: "Bahrain",
  intro: "Premium land transfer service across the King Fahd Causeway, with pickup from Riyadh, Khobar, Jubail, Dammam city, or anywhere else in Saudi Arabia.",

  originCountry: "Saudi Arabia",
  destinationCountry: "Bahrain",
  destinationCountrySlug: "bahrain",
  borderCrossingName: "King Fahd Causeway",

  overviewTitle: "King Fahd Causeway Transfers From Any City",
  overviewParagraphs: [
    "The King Fahd Causeway is the primary land link between the Eastern Province of Saudi Arabia and the Island Kingdom of Bahrain. Wherever your journey starts — Riyadh, Khobar, Jubail, Dammam city, or another Saudi city — our professional taxi service picks you up and takes you all the way to the causeway.",
    "Our drivers are familiar with the causeway's layout, peak-hour patterns and typical processing points, so the drive itself is as smooth as we can make it. We offer a range of vehicles from sedans to spacious SUVs and vans, suited to solo travelers, families and groups.",
    "Flying into King Fahd International Airport first? Our Dammam Airport to Bahrain transfer is built specifically for that route, with meet-and-greet pickup and flight tracking.",
  ],

  quickFacts: [
    { label: "Border Crossing", value: "King Fahd Causeway" },
    { label: "Causeway Length", value: "~25 km" },
    { label: "Typical Duration", value: "1–2 hrs (traffic-dependent)" },
    { label: "Common Departure", value: "Dammam, Khobar, Riyadh" },
  ],

  audience: [
    { icon: "👨‍👩‍👧‍👦", title: "Families & Visitors", description: "Weekend and holiday trips across the causeway to Manama and Bahrain's beaches and resorts." },
    { icon: "💼", title: "Business Travelers", description: "Meetings and conferences in Manama's financial district, reached directly from Eastern Province offices." },
    { icon: "🚗", title: "GCC Nationals", description: "Frequent, familiar cross-border trips using GCC ID rather than a full visa process." },
  ],

  included: [
    "Private vehicle, exclusively for your group",
    "Professional driver experienced with the King Fahd Causeway",
    "Door-to-door pickup from your home, hotel or office in Saudi Arabia",
    "Luggage assistance",
    "24/7 WhatsApp support throughout the journey",
  ],

  process: [
    { title: "Book Your Journey", description: "Share your pickup location in Saudi Arabia and your Bahrain destination." },
    { title: "Confirm Trip Details", description: "We confirm your vehicle, driver and pickup time." },
    { title: "Prepare Your Documents", description: "Passport and any required visa or GCC ID, checked and ready before departure." },
    { title: "Cross the Causeway", description: "Your driver handles the drive and the causeway crossing itself, door to door." },
  ],

  cityLinks: [
    { href: "/services/riyadh", label: "Riyadh" },
    { href: "/services/khobar", label: "Al Khobar" },
    { href: "/services/jubail", label: "Jubail" },
    { href: "/services/dammam", label: "Dammam" },
  ],
  airportLinks: [
    { href: "/dammam-airport-taxi-service", label: "Dammam Airport (DMM)" },
  ],
  routeLinks: [
    { href: "/dammam-airport-to-bahrain-taxi-service", label: "Dammam Airport → Bahrain" },
    { href: "/riyadh-to-bahrain-taxi-service", label: "Riyadh → Bahrain" },
    { href: "/bahrain-to-riyadh-taxi-service", label: "Bahrain → Riyadh" },
    { href: "/bahrain-to-dammam-taxi-service", label: "Bahrain → Dammam" },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },
  specificHotelLinks: [
    { href: "/hotels/riyadh/the-ritz-carlton-riyadh", label: "The Ritz-Carlton, Riyadh" },
  ],

  travelPreparation: [
    { title: "Passport Validity", note: "Most travelers need a passport valid for at least 6 months from the travel date — confirm the current requirement before you go." },
    { title: "Visa or GCC ID", note: "GCC nationals typically cross with a national ID; other nationalities should confirm current Bahrain visa-on-arrival or eVisa eligibility with an official source." },
    { title: "Causeway Timing", note: "The causeway can see heavier queues on Thursday and Friday evenings and around public holidays — build in extra time if traveling then." },
  ],

  faqs: [
    { q: "Do I need a visa to cross into Bahrain?", a: "It depends on your nationality — many travelers can get a Bahrain eVisa or visa-on-arrival, and GCC nationals typically cross with a national ID. Requirements can change, so confirm current eligibility with an official Bahraini source before you travel." },
    { q: "Can you pick me up from anywhere in the Eastern Province?", a: "Yes — Dammam, Khobar, Jubail and Dhahran are all regular pickup points, and we also cover Riyadh and other Saudi cities for the full journey to the causeway." },
    { q: "Do I stay in the same vehicle the whole way to Bahrain?", a: "Private taxis registered in Saudi Arabia don't cross into Bahraini territory. We take you to the Saudi exit point on the causeway; for onward travel into Manama, we can coordinate a licensed Bahrain-side driver in advance if requested." },
    { q: "How long does the crossing usually take?", a: "Typically 1–2 hours depending on traffic and processing time at the crossing itself — Thursday and Friday evenings tend to be busiest." },
  ],

  reviews: [
    { name: "Yousef T.", origin: "Business Traveler, Khobar–Manama", text: "Regular trips across the causeway for work — driver knows the crossing well and the handover on the Bahrain side was smooth." },
    { name: "Reem A.", origin: "Family Weekend Trip, Riyadh", text: "Long drive from Riyadh but comfortable, and the driver had everything ready for the causeway crossing." },
  ],

  relatedServices: [
    { href: "/private-taxi", label: "Private Taxi" },
    { href: "/corporate-transportation-services", label: "Corporate Transportation" },
  ],

  ctaText: "Book Your Bahrain Transfer Today",
};

export const saudiToQatar: BorderData = {
  slug: "saudi-arabia-to-qatar-taxi-service",
  title: "Saudi Arabia to Qatar Taxi",
  h1: "Saudi Arabia to Qatar — Chauffeur & Car Transfer Service",
  breadcrumbLabel: "Qatar",
  intro: "Safe and comfortable land transfers via the Salwa border, with pickup from Riyadh, Dammam, Al-Ahsa, or any other Saudi city — direct to Doha.",

  originCountry: "Saudi Arabia",
  destinationCountry: "Qatar",
  destinationCountrySlug: "qatar",
  borderCrossingName: "Salwa / Abu Samra Border",

  overviewTitle: "Salwa Border Crossing Transfers From Any City",
  overviewParagraphs: [
    "The Salwa border is the key land crossing between Saudi Arabia and the State of Qatar. Wherever your journey starts — Riyadh, Dammam, Al-Ahsa, or another Saudi city — our professional taxi service provides a direct connection all the way to Doha.",
    "Whether you're heading to Doha for a business meeting, a sporting event, or to visit family, our drivers handle the drive and the crossing itself so you can relax during the journey.",
    "Flying into Dammam Airport first? Our Dammam Airport to Qatar transfer is built specifically for that route, with meet-and-greet pickup and flight tracking.",
  ],

  quickFacts: [
    { label: "Border Crossing", value: "Salwa / Abu Samra" },
    { label: "Distance", value: "~100 km from Hofuf, ~580 km from Riyadh" },
    { label: "Typical Duration", value: "2.5–3 hrs from the Eastern Province" },
    { label: "Common Departure", value: "Dammam, Riyadh, Al-Ahsa" },
  ],

  audience: [
    { icon: "💼", title: "Business Travelers", description: "Meetings, conferences and trade events in Doha's West Bay and Lusail districts." },
    { icon: "🏟️", title: "Event Travelers", description: "Sporting events and major conferences drawing GCC visitors to Qatar." },
    { icon: "👨‍👩‍👧‍👦", title: "Family Visits", description: "Trips to see relatives or friends based in Doha and around Qatar." },
  ],

  included: [
    "Private vehicle, exclusively for your group",
    "Professional driver experienced with the Salwa crossing",
    "Door-to-door pickup from your home, hotel or office in Saudi Arabia",
    "Luggage assistance",
    "24/7 WhatsApp support throughout the journey",
  ],

  process: [
    { title: "Book Your Journey", description: "Share your pickup location in Saudi Arabia and your Qatar destination." },
    { title: "Confirm Trip Details", description: "We confirm your vehicle, driver and pickup time." },
    { title: "Prepare Your Documents", description: "Passport and any required Hayya Card, visa or GCC ID, checked and ready before departure." },
    { title: "Cross the Border", description: "Your driver handles the drive and the Salwa crossing itself, door to door." },
  ],

  cityLinks: [
    { href: "/services/riyadh", label: "Riyadh" },
    { href: "/services/dammam", label: "Dammam" },
    { href: "/services/al-ahsa", label: "Al-Ahsa" },
  ],
  airportLinks: [
    { href: "/dammam-airport-taxi-service", label: "Dammam Airport (DMM)" },
  ],
  routeLinks: [
    { href: "/dammam-airport-to-qatar-taxi-service", label: "Dammam Airport → Qatar" },
    { href: "/riyadh-to-qatar-taxi-service", label: "Riyadh → Qatar" },
    { href: "/qatar-to-riyadh-taxi-service", label: "Qatar → Riyadh" },
    { href: "/qatar-to-dammam-taxi-service", label: "Qatar → Dammam" },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },
  specificHotelLinks: [
    { href: "/hotels/riyadh/the-ritz-carlton-riyadh", label: "The Ritz-Carlton, Riyadh" },
  ],

  travelPreparation: [
    { title: "Passport Validity", note: "Most travelers need a passport valid for at least 6 months from the travel date — confirm the current requirement before you go." },
    { title: "Hayya Card, Visa or GCC ID", note: "Entry requirements differ by nationality — Qatar's Hayya platform, a visa, or a GCC national ID may apply. Confirm current eligibility with an official Qatari source before traveling." },
    { title: "Flight Connections", note: "If continuing on to Hamad International Airport, share your flight details in advance so timing can be planned around it." },
  ],

  faqs: [
    { q: "Do I need a Hayya Card or visa to enter Qatar?", a: "It depends on your nationality — a Hayya Card, a Qatar visa, or a GCC national ID may apply. Requirements can change, so confirm current eligibility with an official Qatari source before you travel." },
    { q: "Can you pick me up from Al-Ahsa or another Eastern Province city?", a: "Yes — Al-Ahsa, Dammam, Khobar and Riyadh are all regular pickup points for the journey to the Salwa border." },
    { q: "Do I need to change vehicles at the border?", a: "Saudi-registered private taxis don't cross into Qatari territory. We take you to the Saudi exit point at Salwa; onward travel into Doha can be coordinated with a licensed Qatar-side driver if arranged in advance." },
    { q: "How long does the trip to Doha usually take?", a: "From the Eastern Province, typically 2.5–3 hours to the border plus crossing time; from Riyadh, allow for a considerably longer drive." },
  ],

  reviews: [
    { name: "Abdulrahman S.", origin: "Business Traveler, Riyadh–Doha", text: "Long drive but the car was comfortable and the driver kept us on schedule for our Salwa crossing." },
    { name: "Noura F.", origin: "Event Trip, Dammam–Doha", text: "Booked for a conference in Doha — smooth handover at the border and on time for our meeting." },
  ],

  relatedServices: [
    { href: "/private-taxi", label: "Private Taxi" },
    { href: "/corporate-transportation-services", label: "Corporate Transportation" },
  ],

  ctaText: "Experience a Smooth Ride to Qatar",
};

export const saudiToUae: BorderData = {
  slug: "saudi-arabia-to-uae-taxi-service",
  title: "Saudi Arabia to UAE Taxi",
  h1: "Saudi Arabia to UAE — Executive Car Transfer Service",
  breadcrumbLabel: "UAE",
  intro: "Premium door-to-door taxi service to Dubai and Abu Dhabi. Safe, comfortable, and efficient overland travel across the Al Batha border.",

  originCountry: "Saudi Arabia",
  destinationCountry: "UAE",
  destinationCountrySlug: "uae",
  borderCrossingName: "Al Batha / Ghuwaifat Border",

  overviewTitle: "Saudi to UAE Land Transfers",
  overviewParagraphs: [
    "Connecting two of the GCC's largest economies, our Saudi to UAE land transport service is a popular choice for business travelers and families alike. We provide direct transfers via the Al Batha / Ghuwaifat border crossing, from Saudi Arabia to Dubai or Abu Dhabi.",
    "This is a long overland journey — typically the better part of a day depending on your starting city — so we use vehicles built for long-distance comfort and plan the route with rest stops in mind.",
  ],

  quickFacts: [
    { label: "Border Crossing", value: "Al Batha (KSA) / Ghuwaifat (UAE)" },
    { label: "Distance", value: "~330 km from the Riyadh direction" },
    { label: "Typical Duration", value: "Full-day drive, depending on origin" },
    { label: "Common Departure", value: "Riyadh, Dammam" },
  ],

  audience: [
    { icon: "💼", title: "Business Travelers", description: "Meetings across Dubai and Abu Dhabi's commercial districts, reached directly from Saudi Arabia." },
    { icon: "👨‍👩‍👧‍👦", title: "Families", description: "Overland trips to Dubai or Abu Dhabi as an alternative to flying, with a private vehicle for the whole group." },
    { icon: "🚗", title: "GCC Nationals", description: "Familiar cross-border travel using GCC ID, without a full visa process." },
  ],

  included: [
    "Private vehicle, exclusively for your group",
    "Professional driver experienced with the Al Batha / Ghuwaifat crossing",
    "Modern fleet of sedans, SUVs and large vans for long-distance comfort",
    "Door-to-door service, hotel or airport at either end",
    "24/7 WhatsApp support throughout the journey",
  ],

  process: [
    { title: "Book Your Journey", description: "Share your pickup location in Saudi Arabia and your Dubai or Abu Dhabi destination." },
    { title: "Confirm Trip Details", description: "We confirm your vehicle, driver and departure time — book at least 72 hours ahead where possible." },
    { title: "Prepare Your Documents", description: "Passport and any required UAE visa or GCC ID, checked and ready before departure." },
    { title: "Cross the Border", description: "Your driver handles the long drive and the Al Batha / Ghuwaifat crossing itself." },
  ],

  cityLinks: [
    { href: "/services/riyadh", label: "Riyadh" },
    { href: "/services/dammam", label: "Dammam" },
  ],
  routeLinks: [
    { href: "/riyadh-to-dubai-taxi-service", label: "Riyadh → Dubai" },
    { href: "/dubai-to-riyadh-taxi-service", label: "Dubai → Riyadh" },
    { href: "/dammam-to-dubai-taxi-service", label: "Dammam → Dubai" },
    { href: "/dubai-to-dammam-taxi-service", label: "Dubai → Dammam" },
    { href: "/dammam-to-abu-dhabi-taxi-service", label: "Dammam → Abu Dhabi" },
    { href: "/abu-dhabi-to-dammam-taxi-service", label: "Abu Dhabi → Dammam" },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },
  specificHotelLinks: [
    { href: "/hotels/riyadh/the-ritz-carlton-riyadh", label: "The Ritz-Carlton, Riyadh" },
  ],

  travelPreparation: [
    { title: "Passport Validity", note: "Most travelers need a passport valid for at least 6 months from the travel date — confirm the current requirement before you go." },
    { title: "Visa or GCC ID", note: "GCC nationals typically cross with a national ID; other nationalities should confirm current UAE visa requirements with an official source before traveling." },
    { title: "Book Ahead", note: "Given the length of this journey, we recommend booking at least 72 hours in advance so the right vehicle and driver can be arranged." },
  ],

  faqs: [
    { q: "Do I need a visa to enter the UAE?", a: "GCC nationals typically cross with a national ID; other nationalities should confirm current UAE visa requirements with an official source, as rules vary by nationality and can change." },
    { q: "How long does the drive from Riyadh or Dammam to the UAE take?", a: "This is a long overland journey — typically the better part of a day including the border crossing, depending on your starting city and traffic." },
    { q: "Can you take me all the way to my hotel in Dubai or Abu Dhabi?", a: "Saudi-registered private taxis don't cross into UAE territory. We take you to the Saudi exit point at Al Batha; onward travel into Dubai or Abu Dhabi can be coordinated with a licensed UAE-side driver if arranged in advance." },
    { q: "How far in advance should I book?", a: "We recommend at least 72 hours given the length of the journey and the vehicle preparation involved." },
  ],

  reviews: [
    { name: "Khalid M.", origin: "Business Traveler, Riyadh–Dubai", text: "Long drive but the driver paced it well with rest stops, and the handover at the border was straightforward." },
    { name: "Aisha R.", origin: "Family Trip, Dammam–Abu Dhabi", text: "Comfortable SUV for the whole family on a long journey — driver was well prepared for the crossing." },
  ],

  relatedServices: [
    { href: "/private-taxi", label: "Private Taxi" },
    { href: "/corporate-transportation-services", label: "Corporate Transportation" },
  ],

  ctaText: "Plan Your Trip to Dubai or Abu Dhabi",
};

export const saudiToJordan: BorderData = {
  slug: "saudi-arabia-to-jordan-land-transfer",
  title: "Saudi Arabia to Jordan Taxi",
  h1: "Saudi Arabia to Jordan — Private Car & Chauffeur Transfer",
  breadcrumbLabel: "Jordan",
  intro: "Dependable long-distance taxi service to the Jordan border, popular with Hajj and Umrah pilgrims and families. Expert drivers for a safe overland journey.",

  originCountry: "Saudi Arabia",
  destinationCountry: "Jordan",
  borderCrossingName: "Durra / Halat Ammar Border",

  overviewTitle: "Jordan Border Crossing (Durra / Halat Ammar)",
  overviewParagraphs: [
    "Traveling from Saudi Arabia to Jordan by land is a journey that calls for comfort and reliability, especially for pilgrims and families. Our service connects major Saudi cities including Tabuk, Madinah and Jeddah directly to the Jordanian border crossings at Durra and Halat Ammar.",
    "We use vehicles equipped for long-distance desert travel, and our drivers are familiar with the route north from the Hejaz region toward the border.",
  ],

  quickFacts: [
    { label: "Border Crossing", value: "Durra / Halat Ammar" },
    { label: "Distance", value: "~340 km from Tabuk" },
    { label: "Typical Duration", value: "Full-day drive, depending on origin" },
    { label: "Common Departure", value: "Tabuk, Madinah, Jeddah" },
  ],

  audience: [
    { icon: "🕋", title: "Hajj & Umrah Pilgrims", description: "Overland travel between Jordan and the Hejaz region as part of a wider pilgrimage itinerary." },
    { icon: "👨‍👩‍👧‍👦", title: "Families", description: "Long-distance journeys to Jordan with a private vehicle for the whole group." },
    { icon: "🚗", title: "Long-Distance Travelers", description: "Travelers who prefer a private overland journey over flying between the two countries." },
  ],

  included: [
    "Private, air-conditioned SUV or van suited to long-distance travel",
    "Professional driver familiar with the desert route north to the border",
    "Door-to-door pickup from Tabuk, Madinah, Jeddah or another Saudi city",
    "Luggage assistance",
    "24/7 WhatsApp coordination throughout the journey",
  ],

  process: [
    { title: "Book Your Journey", description: "Share your pickup location in Saudi Arabia and your Jordan destination." },
    { title: "Confirm Trip Details", description: "We confirm your vehicle, driver and departure time." },
    { title: "Prepare Your Documents", description: "Passport and any required Jordanian visa, checked and ready before departure." },
    { title: "Travel North to the Border", description: "Your driver handles the long desert drive and the border crossing itself." },
  ],

  cityLinks: [
    { href: "/services/tabuk", label: "Tabuk" },
    { href: "/services/madinah", label: "Madinah" },
    { href: "/services/jeddah", label: "Jeddah" },
  ],
  airportLinks: [
    { href: "/tabuk-airport-taxi-service", label: "Tabuk Airport (TUU)" },
    { href: "/madina-airport-taxi-service", label: "Madinah Airport (MED)" },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },

  travelPreparation: [
    { title: "Passport Validity", note: "Most travelers need a passport valid for at least 6 months from the travel date — confirm the current requirement before you go." },
    { title: "Jordan Visa", note: "Visa requirements and visa-free eligibility vary by nationality and can change — confirm your current status with an official Jordanian source before traveling." },
    { title: "Border Hours & Timing", note: "Crossing hours can vary — we recommend traveling during daylight for the smoothest processing at the border." },
  ],

  faqs: [
    { q: "Do I need a visa to enter Jordan?", a: "It depends on your nationality — some travelers are eligible for visa-free or visa-on-arrival entry, others need a visa in advance. Confirm your current requirement with an official Jordanian source before you travel, as rules can change." },
    { q: "Which Saudi cities do you serve for this route?", a: "Tabuk, Madinah and Jeddah are our most common pickup points, along with other cities in the Hejaz region — contact us to confirm availability from your specific location." },
    { q: "Is this journey suitable for Hajj or Umrah pilgrims combining a Jordan visit?", a: "Yes — this is a common request. Share your full itinerary when booking so we can plan pickup and timing around your pilgrimage schedule." },
    { q: "How long does the journey to the border take?", a: "From Tabuk, roughly 340 km to the border; from Madinah or Jeddah, allow for a considerably longer full-day drive north." },
  ],

  reviews: [
    { name: "Yasmin H.", origin: "Family Trip, Tabuk–Jordan", text: "Long drive north but the van was comfortable and the driver knew the desert route well." },
  ],

  relatedServices: [
    { href: "/private-taxi", label: "Private Taxi" },
    { href: "/umrah-transport-package", label: "Umrah Transport Package" },
  ],

  ctaText: "Ready to Book Your Journey to Jordan?",
};

export const allBorderJourneys: BorderData[] = [saudiToBahrain, saudiToQatar, saudiToUae, saudiToJordan];

export function getBorderJourney(slug: string): BorderData | undefined {
  return allBorderJourneys.find((b) => b.slug === slug);
}
