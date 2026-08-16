import type { ServiceData } from "@/components/CoreServicePage";

/**
 * Core Service family data (Phase 4 standardization pass). Each entry
 * migrates a previously hand-authored, independently-built page onto the
 * shared CoreServicePage.tsx template — porting real existing content
 * (feature lists, FAQs, process steps) rather than rewriting from scratch,
 * and removing every "Check Rates"/price-badge pattern the audit found
 * (ground rule 9 — no pricing anywhere).
 *
 * /airport-transfers and /hotel-transfers are deliberately NOT here — both
 * have genuinely richer bespoke components (BookingWidget, RoutesGrid, a
 * sticky mobile bar, etc.) that migrating onto this generic template would
 * regress, so they're enriched in place instead.
 */

export const privateTaxi: ServiceData = {
  slug: "private-taxi",
  title: "Private Taxi Service",
  h1: "Private Taxi & Chauffeur Service Across Saudi Arabia",
  breadcrumbLabel: "Private Taxi",
  intro: "Your own dedicated vehicle and driver — flexible, comfortable and fully private. Available by the hour or for the full day, in Saudi Arabia's major hubs and beyond.",
  overviewTitle: "One Vehicle, One Driver, Your Schedule",
  overviewParagraphs: [
    "A private taxi means the vehicle is exclusively yours for the duration of your booking — no shared rides, no fixed route, no meter. You set the stops and the pace, whether that's a single cross-town trip or a full day covering several destinations.",
    "This isn't limited to the major hubs — private hire is also available in smaller cities including Abha, Yanbu, Tabuk and NEOM, using the same booking process as Riyadh, Jeddah or Dammam.",
  ],
  quickFacts: [
    { label: "Service Type", value: "Private, exclusive-use" },
    { label: "Booking", value: "Hourly, half-day or full-day" },
    { label: "Pickup", value: "Any address" },
    { label: "Vehicles", value: "Sedan / SUV / Van / Luxury" },
  ],
  benefits: [
    { icon: "🔒", title: "100% Private", description: "Your vehicle is exclusively for you and your group. No shared rides, no strangers." },
    { icon: "🗺️", title: "Flexible Routes", description: "Travel where you want, when you want. We adjust to your schedule and itinerary." },
    { icon: "⏳", title: "Hourly & Full Day", description: "Book by the hour for local trips or by the full day for city tours and long journeys." },
  ],
  audience: [
    { icon: "🛍️", title: "Shoppers & Errands", description: "Malls, souqs and multi-stop shopping trips at your own pace." },
    { icon: "🤝", title: "Business Travelers", description: "Meetings, conferences and corporate events with a driver on call." },
    { icon: "👨‍👩‍👧‍👦", title: "Families", description: "Comfortable, spacious vehicles for family outings and city exploration." },
  ],
  coverage: [
    { slug: "riyadh", city: "Riyadh" },
    { slug: "jeddah", city: "Jeddah" },
    { slug: "dammam", city: "Dammam" },
    { slug: "makkah", city: "Makkah" },
    { slug: "madinah", city: "Madinah" },
    { slug: "abha", city: "Abha" },
    { slug: "yanbu", city: "Yanbu" },
    { slug: "tabuk", city: "Tabuk" },
    { slug: "neom", city: "NEOM" },
  ],
  included: [
    "Private vehicle, exclusively for your group",
    "Professional, courteous driver with local knowledge",
    "Flexible hourly, half-day or full-day booking",
    "Choice of economy sedan through to luxury SUV",
    "24/7 availability",
  ],
  useCases: [
    { icon: "🛍️", title: "Shopping Trips", description: "Explore malls, souqs and shopping centers at your convenience." },
    { icon: "🏥", title: "Medical Appointments", description: "Reliable transport for hospital and clinic visits with waiting service." },
    { icon: "🤝", title: "Business Travel", description: "Professional transfer for meetings, conferences and corporate events." },
    { icon: "👨‍👩‍👧‍👦", title: "Family Outings", description: "Comfortable family trips with spacious vehicles for all ages." },
    { icon: "🌆", title: "City Exploration", description: "Explore Makkah, Madinah, Jeddah or Taif at your own leisure pace." },
    { icon: "🕌", title: "Mosque Visits", description: "Visit local mosques, Islamic museums and cultural sites around the Holy Cities." },
  ],
  practicalInfo: [
    { title: "Booking durations", note: "Half-day (around 4 hours) and full-day (around 10 hours) hire both include the vehicle, fuel and driver — request a quote for your specific duration and distance." },
    { title: "Multi-stop itineraries", note: "Tell your driver your full itinerary at the start — private hire is built for changing plans, not a fixed pickup-to-drop-off run." },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },
  tourLinks: [
    { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tour" },
    { href: "/taif-ziyarat-taxi-service", label: "Taif Ziyarat Tour" },
    { href: "/reliable-alula-tour-taxi-service-in-saudi-arabia", label: "AlUla Tour" },
  ],
  reviews: [
    { name: "Layla H.", origin: "Shopper, Riyadh", text: "Booked a half-day for shopping across three malls — driver waited at each stop without any fuss." },
  ],
  faqs: [
    { q: "What's the difference between private taxi and a standard transfer?", a: "A standard transfer is one pickup and one drop-off. Private taxi hire keeps the same vehicle and driver with you for a set number of hours, so you can make multiple stops on your own schedule." },
    { q: "Can I book by the hour for a short trip?", a: "Yes — hourly, half-day and full-day hire are all available. Tell us your rough itinerary and we'll recommend the right duration." },
    { q: "Is private taxi available outside the major cities?", a: "Yes — including Abha, Yanbu, Tabuk and NEOM, using the same booking process as Riyadh or Jeddah." },
    { q: "Can I request the same driver for a multi-day trip?", a: "Yes, subject to availability — mention this when booking and we'll do our best to keep the same driver assigned." },
  ],
  relatedServices: [
    { href: "/airport-transfers", label: "Airport Transfers" },
    { href: "/hotel-transfers", label: "Hotel Transfers" },
    { href: "/corporate-transportation-services", label: "Corporate Transportation" },
    { href: "/umrah-taxi-services", label: "Umrah Taxi Services" },
  ],
  ctaText: "Hire Your Private Taxi Today",
};

export const corporateTransportation: ServiceData = {
  slug: "corporate-transportation-services",
  title: "Corporate Transportation",
  h1: "Corporate Car & Chauffeur Transportation Service",
  breadcrumbLabel: "Corporate Transportation",
  intro: "Premium business travel solutions across Saudi Arabia — professional, punctual, and tailored to your company's needs.",
  overviewTitle: "Professional Business Travel Solutions",
  overviewParagraphs: [
    "Gulf Trip Service provides corporate transportation designed around the standards modern business travel needs — punctuality, professionalism, and reliability, whether that's a single executive pickup or coordinated transport for an entire event.",
    "From individual executive transfers in premium sedans to group transport for large events, we manage the logistics so your team can focus on the business itself.",
    "The same coordinated approach carries over to our other group and event work, from wedding transportation to educational tour transport for schools and universities.",
  ],
  quickFacts: [
    { label: "Service Type", value: "Executive & group corporate" },
    { label: "Pickup", value: "Airport / Office / Hotel" },
    { label: "Vehicles", value: "Executive Sedan / SUV / Van" },
    { label: "Booking", value: "Corporate accounts available" },
  ],
  benefits: [
    { icon: "⏱️", title: "Strict Punctuality", description: "We plan pickups around your team and guests' schedules, with zero tolerance for avoidable delays." },
    { icon: "🧑‍✈️", title: "Professional Drivers", description: "Licensed chauffeurs with strong local knowledge and business-appropriate etiquette." },
    { icon: "🚐", title: "Diverse Fleet", description: "From executive sedans to higher-capacity vehicles for staff shuttles and events." },
  ],
  audience: [
    { icon: "💼", title: "Executives", description: "VIP airport pickups and hotel-to-meeting transfers." },
    { icon: "👥", title: "Corporate Teams", description: "Scheduled staff shuttles across major Saudi cities." },
    { icon: "🎤", title: "Conferences & Events", description: "Coordinated transport for large-scale conferences and trade shows." },
  ],
  coverage: [
    { slug: "riyadh", city: "Riyadh" },
    { slug: "jeddah", city: "Jeddah" },
    { slug: "dammam", city: "Dammam" },
    { slug: "khobar", city: "Khobar" },
    { slug: "dhahran", city: "Dhahran" },
  ],
  included: [
    "Executive-class private vehicle",
    "Ministry-licensed, business-appropriate drivers",
    "Airport meet & greet for VIP arrivals",
    "Scheduled staff shuttle coordination",
    "Corporate account billing available",
  ],
  useCases: [
    { icon: "💼", title: "Executive Transfers", description: "VIP airport pickups and hotel-to-meeting transfers for your key stakeholders." },
    { icon: "🚌", title: "Staff Shuttles", description: "Reliable, scheduled transportation for employees across major Saudi cities." },
    { icon: "🎤", title: "Corporate Events", description: "Coordinated transport for large-scale conferences, trade shows, and business events." },
  ],
  airportLinks: [
    { href: "/riyadh-airport-taxi-service", label: "Riyadh Airport" },
    { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport" },
    { href: "/dammam-airport-taxi-service", label: "Dammam Airport" },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },
  specificHotelLinks: [
    { href: "/hotels/riyadh/the-ritz-carlton-riyadh", label: "The Ritz-Carlton, Riyadh" },
  ],
  practicalInfo: [
    { title: "Corporate accounts", note: "Consolidated monthly billing and priority booking are available for companies with regular transport needs — contact us to set one up." },
    { title: "Event-day coordination", note: "For conferences or trade shows, share attendee numbers and schedule in advance so we can plan vehicle allocation properly." },
  ],
  reviews: [
    { name: "Mohammed T.", origin: "Corporate Client", text: "We use Gulf Trip for all executive airport transfers. Reliable every single time." },
  ],
  faqs: [
    { q: "Do you offer corporate accounts with invoiced billing?", a: "Yes — consolidated monthly billing and a dedicated account contact are available for businesses with regular transport needs." },
    { q: "Can you handle transport for a large conference or trade show?", a: "Yes — we coordinate multi-vehicle transport for events, provided attendee numbers and schedules are shared in advance." },
    { q: "What vehicles are used for executive transfers?", a: "Premium sedans and SUVs are the standard for individual executive transfers; larger vans and buses cover staff shuttles and event groups." },
    { q: "Can this service combine with airport pickups?", a: "Yes — airport meet & greet for arriving executives is one of our most regular corporate bookings." },
  ],
  relatedServices: [
    { href: "/wedding-transportation", label: "Wedding Transportation" },
    { href: "/educational-tours-transport", label: "Educational Tours Transport" },
    { href: "/private-taxi", label: "Private Taxi" },
    { href: "/airport-transfers", label: "Airport Transfers" },
  ],
  ctaText: "Inquire About Corporate Accounts",
};

export const umrahTransportPackage: ServiceData = {
  slug: "umrah-transport-package",
  title: "Umrah Transport Package",
  h1: "Umrah Taxi & Transport — Makkah to Madinah Transfers",
  breadcrumbLabel: "Umrah Transport Package",
  intro: "Complete, all-inclusive transportation coverage for Umrah pilgrims — from arrival to departure, one dedicated driver for the whole journey.",
  overviewTitle: "One Driver, Every Leg of Your Umrah Trip",
  overviewParagraphs: [
    "Rather than booking separate transfers for each leg of your trip, an Umrah transport package assigns one dedicated driver and vehicle for your full stay — airport pickup, hotel transfers, Makkah↔Madinah travel, and Ziyarat, coordinated as one booking.",
    "Trip length varies by pilgrim — some stay a week, others three — so packages are built around your actual dates rather than a fixed itinerary. Share your flight details and hotel names and we'll confirm exactly what's covered.",
    "Booking for a specific city only? Our Makkah taxi service and Madinah taxi service pages cover local pickup points in more detail, and our Makkah to Madinah taxi service covers just that one leg.",
  ],
  quickFacts: [
    { label: "Service Type", value: "Multi-leg Umrah package" },
    { label: "Typical Duration", value: "7–21 days, tailored to your stay" },
    { label: "Vehicles", value: "Sedan / SUV / Luxury SUV" },
    { label: "Driver", value: "One dedicated driver per group" },
  ],
  benefits: [
    { icon: "✈️", title: "Airport Transfers", description: "Pickup and drop-off at Jeddah KAIA with meet & greet and flight tracking." },
    { icon: "🏨", title: "Hotel Transfers", description: "All transfers to and from your hotel in Makkah and Madinah included." },
    { icon: "🌙", title: "Ziyarat Tours", description: "Guided visits to the holy sites of Makkah and Madinah with your dedicated driver." },
  ],
  audience: [
    { icon: "🕋", title: "First-Time Pilgrims", description: "A single coordinated booking instead of arranging each leg separately." },
    { icon: "👨‍👩‍👧‍👦", title: "Families & Groups", description: "One vehicle and driver for the whole group throughout the stay." },
    { icon: "🔁", title: "Multi-City Itineraries", description: "Pilgrims visiting both Makkah and Madinah in one trip." },
  ],
  coverage: [
    { slug: "makkah", city: "Makkah" },
    { slug: "madinah", city: "Madinah" },
    { slug: "jeddah", city: "Jeddah" },
  ],
  included: [
    "Airport pickup with meet & greet and flight tracking",
    "All hotel transfers in Makkah and Madinah",
    "Makkah ↔ Madinah intercity transfer",
    "Guided Ziyarat trips at both holy cities",
    "One dedicated driver for your group's full stay",
    "24/7 support via WhatsApp",
  ],
  useCases: [
    { icon: "✈️", title: "Airport to Makkah", description: "Direct from Jeddah arrivals to your Makkah hotel." },
    { icon: "🕌", title: "Makkah ↔ Madinah", description: "Intercity transfer between the two Holy Cities." },
    { icon: "🌙", title: "Ziyarat Tours", description: "Guided visits to the sacred sites of both cities." },
  ],
  process: [
    { title: "Choose Your Package Length", description: "Tell us your travel dates and group size." },
    { title: "Share Travel Details", description: "Flight details, hotel names and any Ziyarat preferences." },
    { title: "Receive Confirmation", description: "Get your driver's details and contact number before you fly." },
    { title: "Travel with Peace of Mind", description: "Your driver handles all transport — focus on your Umrah." },
  ],
  airportLinks: [
    { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA)" },
    { href: "/madina-airport-taxi-service", label: "Madinah Airport" },
  ],
  routeLinks: [
    { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah" },
    { href: "/makkah-to-madinah-taxi-service", label: "Makkah to Madinah" },
    { href: "/madinah-to-makkah-taxi-service", label: "Madinah to Makkah" },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },
  tourLinks: [
    { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tour" },
  ],
  reviews: [
    { name: "Hassan M.", origin: "Pilgrim, Egypt", text: "Booked the full package for our family of 6 — one driver the entire trip, spacious van, excellent service." },
  ],
  faqs: [
    { q: "Can the package be customized?", a: "Yes — we tailor coverage to your specific travel dates, group size and preferences." },
    { q: "How many people does the package cover?", a: "Standard bookings cover 1–4 passengers; for larger groups we offer minivans and multiple vehicle options." },
    { q: "What if my flight is delayed?", a: "We monitor all arriving flights and adjust your pickup time accordingly at no extra charge." },
    { q: "Do you provide child seats?", a: "Yes, child seats are available upon request — mention this when booking." },
    { q: "What payment methods do you accept?", a: "Cash (local currency), bank transfer and major credit cards, payable on arrival or in advance." },
  ],
  relatedServices: [
    { href: "/airport-transfer-for-umrah", label: "Airport Transfer for Umrah" },
    { href: "/ziyarat-services-in-saudi-arabia", label: "Ziyarat Services" },
    { href: "/umrah-taxi-services", label: "Umrah Taxi Services" },
  ],
  ctaText: "Book Your Umrah Transport Package",
};

export const umrahTaxiServices: ServiceData = {
  slug: "umrah-taxi-services",
  title: "Umrah Taxi Services",
  h1: "Umrah Taxi & Chauffeur Service in Makkah & Madinah",
  breadcrumbLabel: "Umrah Taxi Services",
  intro: "Trusted transportation for Umrah pilgrims. Travel between Makkah, Madinah and Jeddah Airport with comfort, safety, and peace of mind.",
  overviewTitle: "Your Umrah Transport Partner",
  overviewParagraphs: [
    "Performing Umrah is a sacred journey, and transportation shouldn't be something you have to worry about. Our Umrah taxi services cover every leg — from the airport to the Holy Mosque and back — comfortably and without unnecessary stops.",
    "Drivers are experienced with Umrah pilgrims specifically, familiar with the sacred sites, Ihram etiquette, and prayer-time planning, not just general city driving.",
    "For city-specific detail, see our Makkah taxi service and Madinah taxi service pages, or book the Makkah to Madinah taxi directly if that's the only leg you need.",
  ],
  quickFacts: [
    { label: "Service Type", value: "Umrah-focused private taxi" },
    { label: "Coverage", value: "Makkah, Madinah, Jeddah Airport" },
    { label: "Vehicles", value: "Sedan / SUV / Van, Ihram-friendly" },
    { label: "Cancellation", value: "Free up to 24 hours ahead" },
  ],
  benefits: [
    { icon: "🕌", title: "Ihram-Friendly Vehicles", description: "No music or entertainment systems, clean and modest interiors, and enough space to sit comfortably in Ihram clothing. Zamzam water is stored securely, separate from your luggage." },
    { icon: "♿", title: "Wheelchair-Accessible Vans", description: "Hydraulic ramps and secure anchoring for elderly pilgrims or wheelchair users — mention this when booking." },
    { icon: "🕰️", title: "Prayer-Time Awareness", description: "Drivers plan routes around prayer times rather than through them, with flexible timing around Jumu'ah." },
  ],
  audience: [
    { icon: "🕋", title: "First-Time Pilgrims", description: "Guidance and familiarity with the holy sites from experienced drivers." },
    { icon: "👨‍👩‍👧‍👦", title: "Families & Groups", description: "Spacious vehicles from sedans to large vans, child seats available." },
    { icon: "♿", title: "Elderly & Accessibility Needs", description: "Wheelchair-accessible vans and drivers trained in accessibility assistance." },
  ],
  coverage: [
    { slug: "makkah", city: "Makkah" },
    { slug: "madinah", city: "Madinah" },
    { slug: "jeddah", city: "Jeddah" },
  ],
  included: [
    "Meet & greet at Jeddah Airport",
    "Multilingual drivers (Arabic, English, Urdu)",
    "Clean, air-conditioned, Ihram-friendly vehicles",
    "24/7 customer support",
    "Transparent, agreed rates with no hidden charges",
    "Free cancellation up to 24 hours ahead",
  ],
  useCases: [
    { icon: "✈️", title: "Airport Pickup & Drop-off", description: "Seamless transfers from Jeddah KAIA to your hotel in Makkah or Madinah." },
    { icon: "🕌", title: "Makkah to Madinah Transfer", description: "Comfortable, direct transfers between the two Holy Cities." },
    { icon: "🏨", title: "Hotel to Haram Transfer", description: "Quick rides from your hotel to Masjid Al-Haram or Masjid An-Nabawi, round the clock." },
    { icon: "🗺️", title: "Ziyarat Tours", description: "Visit the sacred and historical sites around Makkah and Madinah." },
    { icon: "👨‍👩‍👧‍👦", title: "Family & Group Transport", description: "Spacious vehicles for families and groups, child seats available." },
    { icon: "🔄", title: "Multi-Day Bookings", description: "A dedicated vehicle and driver for the duration of your Umrah stay." },
  ],
  process: [
    { title: "Book Online or via WhatsApp", description: "Share your travel details and preferred vehicle." },
    { title: "Confirmation", description: "Receive your driver's details, vehicle information, and pickup time." },
    { title: "Enjoy Your Ride", description: "Your driver arrives on time and assists with luggage." },
    { title: "Arrive Safely", description: "Reach your destination relaxed, ready to continue your journey." },
  ],
  airportLinks: [
    { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA)" },
  ],
  routeLinks: [
    { href: "/makkah-to-madinah-taxi-service", label: "Makkah to Madinah" },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },
  tourLinks: [
    { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tour" },
  ],
  practicalInfo: [
    { title: "Hajj season booking", note: "Advance booking is essential during Hajj (Dhul-Hijjah) — at least 2–4 weeks ahead, since availability during 8th–12th Dhul-Hijjah is extremely limited." },
    { title: "Solo female travelers", note: "All drivers are background-checked and GPS-tracked; a female driver or family-style vehicle can be requested subject to availability." },
  ],
  reviews: [
    { name: "Bilal H.", origin: "Umrah Pilgrim, UK", text: "Our driver waited patiently during our Tawaf and understood the spiritual nature of the trip." },
  ],
  faqs: [
    { q: "Can I book a taxi during Hajj season?", a: "Yes, but advance booking is essential — at least 2–4 weeks ahead, since availability during peak Hajj days is extremely limited." },
    { q: "Do you provide separate transportation for men and women?", a: "We offer family vehicles with privacy partitions, or separate vehicles on request. Female travelers can also request a female driver, subject to availability." },
    { q: "Can your taxis accommodate wheelchair users?", a: "Yes — wheelchair-accessible vans with hydraulic ramps and secure anchoring. Mention this when booking." },
    { q: "Are your vehicles genuinely Ihram-friendly?", a: "Yes — no music or entertainment systems, clean and modest interiors, and secure Zamzam water storage separate from your luggage." },
    { q: "Is it safe for solo female travelers?", a: "Yes — drivers are background-checked and GPS-tracked, and a female driver or family-style vehicle can be requested." },
    { q: "What payment methods do you accept?", a: "Cash (SAR), credit/debit card, Apple Pay, and Google Pay. Corporate accounts with invoiced billing are available for travel agencies and groups." },
    { q: "Can I add a Jeddah city tour before or after my Umrah?", a: "Yes — many pilgrims add a half or full day in Jeddah on the way through KAIA. See our Jeddah City Tour page for what's covered, and mention it when booking your transport." },
  ],
  relatedServices: [
    { href: "/airport-transfer-for-umrah", label: "Airport Transfer for Umrah" },
    { href: "/ziyarat-services-in-saudi-arabia", label: "Ziyarat Services" },
    { href: "/umrah-transport-package", label: "Umrah Transport Package" },
  ],
  ctaText: "Start Your Umrah Journey With Us",
};

export const ziyaratServices: ServiceData = {
  slug: "ziyarat-services-in-saudi-arabia",
  title: "Ziyarat Services",
  h1: "Ziyarat Taxi & Guided Transfer Service",
  breadcrumbLabel: "Ziyarat Services",
  intro: "Visit the revered holy and historical sites of Makkah and Madinah with knowledgeable drivers and comfortable, private transportation.",
  overviewTitle: "Explore the Holy Cities with Reverence and Comfort",
  overviewParagraphs: [
    "Ziyarat — the visitation of sacred sites — is a spiritually enriching part of any Umrah or Hajj trip. Our Ziyarat transfers provide comfortable, respectful visits to the blessed sites of Makkah and Madinah, with drivers who know the history and significance of each stop.",
    "Traveling during Hajj season specifically? Our Hajj transportation guide covers logistics for Mina, Arafat and the other Hajj-specific sites.",
  ],
  quickFacts: [
    { label: "Service Type", value: "Guided Ziyarat transfer" },
    { label: "Coverage", value: "Makkah, Madinah, Taif" },
    { label: "Typical Duration", value: "Full day (8–10 hrs) or multi-day" },
    { label: "Booking", value: "Fixed itinerary or custom route" },
  ],
  benefits: [
    { icon: "🕌", title: "Knowledgeable Drivers", description: "Drivers share the history and significance of each site along the way." },
    { icon: "🗺️", title: "Flexible Itineraries", description: "Choose a set Ziyarat route or request a custom order of sites." },
    { icon: "🌹", title: "Beyond the City", description: "Combine Makkah Ziyarat with a Taif day trip for rose farms and mountain scenery." },
  ],
  audience: [
    { icon: "🕋", title: "Umrah & Hajj Pilgrims", description: "A dedicated Ziyarat day built into or added onto your pilgrimage trip." },
    { icon: "👨‍👩‍👧‍👦", title: "Families & Groups", description: "Comfortable vehicles for visiting sites together at a relaxed pace." },
    { icon: "📚", title: "History-Focused Visitors", description: "Travelers wanting the historical context behind each site, not just a drive-by." },
  ],
  coverage: [
    { slug: "makkah", city: "Makkah" },
    { slug: "madinah", city: "Madinah" },
    { slug: "taif", city: "Taif" },
  ],
  included: [
    "Private vehicle for your Ziyarat itinerary",
    "Driver with knowledge of each site's history",
    "Flexible stop order and pacing",
    "Comfortable, air-conditioned vehicles",
  ],
  useCases: [
    { icon: "🕌", title: "Makkah Ziyarat", description: "Jabal Al-Nour, Jabal Thawr, Arafat, Mina and other sacred Makkah sites." },
    { icon: "🌙", title: "Madinah Ziyarat", description: "Masjid Quba, Mount Uhud, Jannat Al-Baqi and the Seven Mosques." },
    { icon: "🌹", title: "Makkah + Taif", description: "A two-day extension combining Ziyarat with Taif's rose farms and mountain scenery." },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },
  tourLinks: [
    { href: "/taif-ziyarat-taxi-service", label: "Taif Ziyarat Tour" },
  ],
  siteGroups: [
    {
      title: "Makkah Ziyarat Sites",
      sites: [
        { name: "Masjid Al-Haram", description: "The Grand Mosque surrounding the Holy Kaaba — the most sacred site in Islam." },
        { name: "Jabal Al-Nour", description: "The Mountain of Light, where the first Quranic revelation descended in the Cave of Hira." },
        { name: "Jabal Thawr", description: "The mountain where the Prophet ﷺ and Abu Bakr sought refuge during the Hijra." },
        { name: "Jannat Al-Mualla", description: "The historic cemetery in Makkah, resting place of many family members of the Prophet ﷺ." },
        { name: "Mina", description: "The tent city where pilgrims stay during Hajj and perform the symbolic stoning of Shaitan." },
        { name: "Arafat (Mount Mercy)", description: "The plain where pilgrims gather on the 9th of Dhul Hijja — the climax of Hajj." },
      ],
    },
    {
      title: "Madinah Ziyarat Sites",
      sites: [
        { name: "Masjid Al-Nabawi", description: "The Prophet's Mosque — the second most sacred mosque in Islam, built by the Prophet ﷺ himself." },
        { name: "Raudhah Al-Sharif", description: "The blessed garden between the Prophet's ﷺ pulpit and his tomb." },
        { name: "Jannat Al-Baqi", description: "The main cemetery of Madinah, where many Companions and family of the Prophet ﷺ rest." },
        { name: "Masjid Quba", description: "The first mosque ever built in Islam — praying two rakat here equals the reward of an Umrah." },
        { name: "Masjid Al-Qiblatayn", description: "The Mosque of Two Qiblas, where the direction of prayer changed from Jerusalem to Makkah." },
        { name: "Mount Uhud", description: "The site of the Battle of Uhud — visit the graves of the martyrs and walk historic ground." },
      ],
    },
  ],
  reviews: [
    { name: "Amna S.", origin: "Pilgrim, Canada", text: "The Ziyarat tour was exceptional — driver explained every site with genuine knowledge." },
  ],
  faqs: [
    { q: "Can I customize the Ziyarat itinerary?", a: "Yes — choose a set route or request a custom order of sites within Makkah or Madinah." },
    { q: "Can I combine Makkah and Madinah Ziyarat in one trip?", a: "Yes — many pilgrims book both, along with the Makkah to Madinah transfer between them." },
    { q: "How long does a full Ziyarat day take?", a: "Typically 8–10 hours for a full-day tour covering the main sites in one city." },
    { q: "Is the Taif extension worth adding?", a: "If you have an extra day, yes — it adds rose farms, mountain scenery and a different pace from the holy-city sites." },
  ],
  relatedServices: [
    { href: "/umrah-transport-package", label: "Umrah Transport Package" },
    { href: "/umrah-taxi-services", label: "Umrah Taxi Services" },
    { href: "/airport-transfer-for-umrah", label: "Airport Transfer for Umrah" },
  ],
  ctaText: "Start Your Ziyarat Journey",
};

export const airportTransferForUmrah: ServiceData = {
  slug: "airport-transfer-for-umrah",
  title: "Airport Transfer for Umrah",
  h1: "Airport Transfer for Umrah Pilgrims — Trusted Local Drivers",
  breadcrumbLabel: "Airport Transfer for Umrah",
  intro: "Hassle-free airport transfers from Jeddah and Madinah airports. Meet & greet, flight tracking, and door-to-door service to your Umrah hotel.",
  overviewTitle: "Seamless Airport Transfers for Your Umrah Journey",
  overviewParagraphs: [
    "After a long international flight, the last thing you want is the stress of finding reliable transport to Makkah or Madinah. This service ensures a comfortable, pre-arranged ride is waiting the moment you step out of the airport.",
    "We serve Jeddah King Abdulaziz International Airport (KAIA) and Madinah Prince Mohammad Bin Abdulaziz Airport, with drivers trained to assist Umrah pilgrims specifically.",
  ],
  quickFacts: [
    { label: "Service Type", value: "Umrah airport transfer" },
    { label: "Airports", value: "Jeddah (KAIA), Madinah (MED)" },
    { label: "Pickup", value: "Meet & greet at arrivals" },
    { label: "Availability", value: "24/7, flight tracked" },
  ],
  benefits: [
    { icon: "👋", title: "Meet & Greet Service", description: "Your driver waits at the arrivals hall with a name board — easy to find, even for first-time visitors." },
    { icon: "📡", title: "Real-Time Flight Tracking", description: "We monitor your flight status and adjust pickup timing accordingly, at no extra cost." },
    { icon: "💼", title: "Full Luggage Assistance", description: "Drivers handle your luggage from the airport exit to the car and to your hotel doorstep." },
  ],
  audience: [
    { icon: "🕋", title: "First-Time Pilgrims", description: "A pre-arranged, easy-to-find driver instead of navigating unfamiliar arrivals halls." },
    { icon: "👨‍👩‍👧‍👦", title: "Families & Groups", description: "Vehicles sized to your group, with luggage assistance for everyone." },
    { icon: "🌙", title: "Late-Night Arrivals", description: "Flights don't run 9-to-5 — this service operates around the clock." },
  ],
  coverage: [
    { slug: "jeddah", city: "Jeddah" },
    { slug: "makkah", city: "Makkah" },
    { slug: "madinah", city: "Madinah" },
  ],
  included: [
    "Meet & greet at arrivals with a name board",
    "Real-time flight tracking, adjusted at no extra cost",
    "Full luggage assistance",
    "24/7 availability",
    "Modern, air-conditioned vehicles",
  ],
  useCases: [
    { icon: "✈️", title: "Jeddah Airport to Makkah", description: "Direct transfer from KAIA arrivals to your Makkah hotel." },
    { icon: "✈️", title: "Jeddah Airport to Madinah", description: "For pilgrims following a Madinah-first itinerary." },
    { icon: "🏨", title: "Madinah Airport to Hotel", description: "The shortest airport-to-holy-site transfer of any Saudi city." },
  ],
  process: [
    { title: "Share Flight Details", description: "Flight number, arrival time, passenger count, and hotel name." },
    { title: "Get Confirmation", description: "Instant confirmation with driver name, phone number, and vehicle details." },
    { title: "Get Picked Up", description: "Your driver meets you at arrivals, helps with luggage, and drives you to your hotel." },
  ],
  airportLinks: [
    { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA)" },
    { href: "/madina-airport-taxi-service", label: "Madinah Airport" },
  ],
  routeLinks: [
    { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah Airport to Makkah" },
    { href: "/jeddah-airport-to-madinah-taxi-service", label: "Jeddah Airport to Madinah" },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },
  reviews: [
    { name: "Fatima B.", origin: "Umrah Pilgrim, Pakistan", text: "Arrived at 2am and our driver was already waiting. Transferred straight to Makkah — perfect service." },
  ],
  faqs: [
    { q: "Which airports do you cover for Umrah arrivals?", a: "Jeddah King Abdulaziz International Airport (KAIA) and Madinah Prince Mohammad Bin Abdulaziz Airport." },
    { q: "What happens if my flight is delayed?", a: "We track your flight and adjust the pickup time automatically — no extra charge, no need to contact us." },
    { q: "How will I find my driver?", a: "Your driver waits at the arrivals hall with a name board matching your booking." },
    { q: "Can I book both my arrival and departure transfer together?", a: "Yes — many pilgrims book both legs at once so the return pickup is arranged before they even land." },
  ],
  relatedServices: [
    { href: "/umrah-transport-package", label: "Umrah Transport Package" },
    { href: "/umrah-taxi-services", label: "Umrah Taxi Services" },
    { href: "/ziyarat-services-in-saudi-arabia", label: "Ziyarat Services" },
  ],
  ctaText: "Book Your Airport Transfer Now",
};

export const weddingTransportation: ServiceData = {
  slug: "wedding-transportation",
  title: "Wedding Transportation",
  h1: "Wedding Car & Chauffeur Transportation Service",
  breadcrumbLabel: "Wedding Transportation",
  intro: "Elegant and reliable transport for your special day. From luxury bridal cars to guest shuttles, we handle the logistics with care.",
  overviewTitle: "Luxury Transport for Unforgettable Weddings",
  overviewParagraphs: [
    "Every detail matters on your wedding day. Gulf Trip Service provides premium wedding transportation that combines elegance with reliability, so you and your guests arrive in comfort and on time.",
    "Our fleet of premium sedans and SUVs suits bridal parties, while vans and buses move larger groups of guests between hotels and venues.",
    "The same coordinated large-group planning carries over to corporate transportation and school transport, so if your event needs regular group logistics beyond the wedding day itself, we already have the fleet for it.",
  ],
  quickFacts: [
    { label: "Service Type", value: "Bridal car & guest shuttle" },
    { label: "Vehicles", value: "Executive Sedan / Luxury SUV / Van" },
    { label: "Coverage", value: "Major Saudi cities" },
    { label: "Booking", value: "Custom packages by request" },
  ],
  benefits: [
    { icon: "⭐", title: "Luxury Bridal Cars", description: "A range of high-end executive sedans and SUVs for a grand entrance." },
    { icon: "👥", title: "Guest Logistics", description: "Coordinated shuttle services to move guests safely between locations." },
    { icon: "🚗", title: "Honeymoon Transfers", description: "Door-to-airport transfers in premium comfort for the newlyweds." },
  ],
  audience: [
    { icon: "💍", title: "Brides & Grooms", description: "A dedicated luxury vehicle for the wedding party." },
    { icon: "👥", title: "Wedding Guests", description: "Coordinated shuttles between hotels and the venue." },
    { icon: "✈️", title: "Newlyweds", description: "A comfortable honeymoon airport transfer to start the trip right." },
  ],
  coverage: [
    { slug: "riyadh", city: "Riyadh" },
    { slug: "jeddah", city: "Jeddah" },
    { slug: "dammam", city: "Dammam" },
    { slug: "makkah", city: "Makkah" },
    { slug: "madinah", city: "Madinah" },
  ],
  included: [
    "Premium bridal car (sedan or SUV)",
    "Coordinated guest shuttle scheduling",
    "Professional, well-presented driver",
    "Honeymoon airport transfer",
  ],
  useCases: [
    { icon: "⭐", title: "Bridal Party Transport", description: "A luxury vehicle for the couple's arrival and departure." },
    { icon: "👥", title: "Guest Shuttles", description: "Coordinated transport between hotels and the venue for larger guest lists." },
    { icon: "✈️", title: "Honeymoon Departure", description: "Door-to-airport transfer for the newlyweds after the celebration." },
  ],
  hotelLink: { href: "/hotel-transfers", label: "Hotel Transfers" },
  practicalInfo: [
    { title: "Bespoke packages", note: "Packages are tailored to your specific schedule, guest count, and venue requirements — share these details for an accurate plan." },
    { title: "Book ahead for peak wedding season", note: "Popular wedding dates and venues get booked up — reach out as early as possible once your date is confirmed." },
  ],
  reviews: [
    { name: "Nadia K.", origin: "Bride, Jeddah", text: "The bridal car was immaculate and the driver coordinated perfectly with our guest shuttle schedule." },
  ],
  faqs: [
    { q: "How far in advance should I book wedding transportation?", a: "As early as possible once your date and venue are confirmed — popular dates fill up." },
    { q: "Can you manage guest shuttles for a large wedding?", a: "Yes — we coordinate multi-vehicle shuttle schedules between hotels and the venue based on your guest count." },
    { q: "Is a honeymoon airport transfer included?", a: "It can be added as part of your package — let us know if you need a post-wedding airport transfer." },
    { q: "Can we request a specific vehicle for the bridal car?", a: "Yes, subject to availability — mention your preference when requesting a quote." },
  ],
  relatedServices: [
    { href: "/corporate-transportation-services", label: "Corporate Transportation" },
    { href: "/school-buses-services", label: "School Bus Services" },
    { href: "/private-taxi", label: "Private Taxi" },
  ],
  ctaText: "Let Us Handle the Wedding Logistics",
};

export const schoolBusesServices: ServiceData = {
  slug: "school-buses-services",
  title: "School Bus Services",
  h1: "School Bus & Student Transport Service",
  breadcrumbLabel: "School Bus Services",
  intro: "Safe, reliable student transportation across Saudi Arabia — prioritizing safety, punctuality, and comfort.",
  overviewTitle: "Our Commitment to Student Safety",
  overviewParagraphs: [
    "Gulf Trip Service provides school bus services that parents and educational institutions can trust. Student transportation is a serious responsibility, and we hold our dedicated school fleet to high safety standards.",
    "Every vehicle in our school fleet undergoes regular inspections and is operated by experienced, background-checked drivers specifically briefed for student transport.",
    "For one-off trips beyond the daily school run, the same vetted drivers and fleet cover educational tour transport, and the same reliability standard applies across our other group services, including wedding transportation.",
  ],
  quickFacts: [
    { label: "Service Type", value: "Daily student transport" },
    { label: "Fleet", value: "Dedicated school vehicles" },
    { label: "Drivers", value: "Background-checked, student-transport briefed" },
    { label: "Booking", value: "Institutional contracts" },
  ],
  benefits: [
    { icon: "📍", title: "Monitored Routes", description: "School buses run on planned, monitored routes for predictable pickup and drop-off." },
    { icon: "🧑‍✈️", title: "Trained Drivers", description: "Professional drivers with specific briefing on student safety and care." },
    { icon: "⏰", title: "Strict Punctuality", description: "Reliable pickup and drop-off times so students don't miss class." },
  ],
  audience: [
    { icon: "🏫", title: "Schools & Institutions", description: "Contracted daily transport for student populations of any size." },
    { icon: "👨‍👩‍👧", title: "Parents", description: "Peace of mind from a dedicated, background-checked school fleet." },
    { icon: "🎒", title: "Daily Commuting Students", description: "Consistent, predictable pickup and drop-off times." },
  ],
  coverage: [
    { slug: "riyadh", city: "Riyadh" },
    { slug: "jeddah", city: "Jeddah" },
    { slug: "dammam", city: "Dammam" },
    { slug: "makkah", city: "Makkah" },
    { slug: "madinah", city: "Madinah" },
  ],
  included: [
    "Dedicated school fleet, regularly inspected",
    "Background-checked drivers briefed for student transport",
    "Planned, monitored routes",
    "Reliable, punctual pickup and drop-off",
  ],
  useCases: [
    { icon: "🎒", title: "Daily School Run", description: "Consistent morning and afternoon student transport." },
    { icon: "🏛️", title: "Field Trips", description: "One-off trips covered by our educational tours transport service." },
    { icon: "⚽", title: "After-School Activities", description: "Transport coordination for sports, clubs and other scheduled activities." },
  ],
  practicalInfo: [
    { title: "Institutional contracts", note: "Route planning and specialized fleet options are set up directly with your institution — contact us to discuss requirements." },
  ],
  reviews: [
    { name: "Yousef A.", origin: "School Administrator, Khobar", text: "Booked for our institution's daily routes — drivers are consistent and communicative with school staff." },
  ],
  faqs: [
    { q: "How are routes planned for a school contract?", a: "Our logistics team works with your institution to plan efficient routes and pickup schedules across the relevant locations." },
    { q: "Are drivers specifically vetted for student transport?", a: "Yes — background-checked and specifically briefed for student safety and care, not just general driving." },
    { q: "Can the same fleet handle field trips as well as daily routes?", a: "Yes — for one-off trips beyond the daily run, see our educational tours transport service, using the same vetted drivers and fleet." },
    { q: "Do you serve institutions outside major cities?", a: "Coverage depends on the specific institution's location — contact us to confirm availability for your area." },
  ],
  relatedServices: [
    { href: "/educational-tours-transport", label: "Educational Tours Transport" },
    { href: "/wedding-transportation", label: "Wedding Transportation" },
    { href: "/corporate-transportation-services", label: "Corporate Transportation" },
  ],
  ctaText: "Reliable Transport for Educational Institutions",
};

export const educationalToursTransport: ServiceData = {
  slug: "educational-tours-transport",
  title: "Educational Tours Transport",
  h1: "Educational Tour & Group Transport Service",
  breadcrumbLabel: "Educational Tours",
  intro: "Safe and inspiring journeys for students — professional group transport for educational trips across Saudi Arabia.",
  overviewTitle: "Coordinated Transport for Learning",
  overviewParagraphs: [
    "Educational tours are vital for student growth, and a reliable transportation partner is essential for a successful trip. We provide safe, coordinated transport for schools, colleges, and universities visiting historic and educational sites across the Kingdom.",
    "We manage the logistics of moving large groups of students and faculty, keeping everyone together, on schedule, and safe throughout the tour.",
    "Schools running regular routes alongside occasional trips can also use our daily school bus service, and for institutional or business events we offer the same coordinated planning through corporate transportation.",
  ],
  quickFacts: [
    { label: "Service Type", value: "Group educational tour transport" },
    { label: "Vehicles", value: "Large-capacity buses & vans" },
    { label: "Coordination", value: "Multi-vehicle convoy support" },
    { label: "Booking", value: "Institutional / group bookings" },
  ],
  benefits: [
    { icon: "🏛️", title: "Historic Site Visits", description: "Safe transfers to museums, cultural centers, and archaeological landmarks." },
    { icon: "🧭", title: "Guided Group Logistics", description: "Expert handling of large-capacity buses and coordinated multi-vehicle convoys." },
    { icon: "🛡️", title: "Highest Safety Standards", description: "Background-checked drivers and vehicles with modern safety features." },
  ],
  audience: [
    { icon: "🏫", title: "Schools, Colleges & Universities", description: "Group transport for field trips and academic excursions." },
    { icon: "🏛️", title: "Museum & Heritage Tour Groups", description: "Coordinated visits to cultural and archaeological sites." },
    { icon: "🧑‍🏫", title: "Tour Coordinators", description: "A logistics partner that plans routes around your itinerary." },
  ],
  coverage: [
    { slug: "riyadh", city: "Riyadh" },
    { slug: "jeddah", city: "Jeddah" },
    { slug: "makkah", city: "Makkah" },
    { slug: "madinah", city: "Madinah" },
    { slug: "taif", city: "Taif" },
    { slug: "abha", city: "Abha" },
  ],
  included: [
    "Large-capacity buses and vans",
    "Background-checked, safety-trained drivers",
    "Multi-vehicle convoy coordination",
    "Route planning with your tour coordinators",
  ],
  useCases: [
    { icon: "🏛️", title: "Museum & Heritage Visits", description: "Safe transfers to cultural centers and archaeological landmarks." },
    { icon: "🗺️", title: "Multi-Location Tours", description: "Coordinated pickups and stops across several sites in one trip." },
    { icon: "🚌", title: "Large-Group Convoys", description: "Multiple vehicles coordinated together for bigger student groups." },
  ],
  practicalInfo: [
    { title: "Tour coordination", note: "Our logistics team works with educational coordinators to plan efficient routes and schedule pickups across multiple locations if required." },
  ],
  reviews: [
    { name: "Sara M.", origin: "Tour Coordinator, Riyadh", text: "Coordinated a multi-site history tour for our students — the convoy stayed organized across every stop." },
  ],
  faqs: [
    { q: "Can you handle multi-location tours in one trip?", a: "Yes — our logistics team plans routes and pickup scheduling across multiple sites as needed." },
    { q: "What vehicles are used for large student groups?", a: "Large-capacity buses and vans, with multi-vehicle convoys coordinated for bigger groups." },
    { q: "Are drivers vetted for working with students?", a: "Yes — background-checked and briefed on student safety, the same standard as our school bus service." },
    { q: "Do you cover heritage sites outside the major cities?", a: "Yes, including Taif and Abha — contact us to confirm coverage for your specific itinerary." },
  ],
  relatedServices: [
    { href: "/school-buses-services", label: "School Bus Services" },
    { href: "/corporate-transportation-services", label: "Corporate Transportation" },
    { href: "/wedding-transportation", label: "Wedding Transportation" },
  ],
  ctaText: "Plan Your Next Educational Tour",
};

export const allCoreServices: ServiceData[] = [
  privateTaxi,
  corporateTransportation,
  umrahTransportPackage,
  umrahTaxiServices,
  ziyaratServices,
  airportTransferForUmrah,
  weddingTransportation,
  schoolBusesServices,
  educationalToursTransport,
];
