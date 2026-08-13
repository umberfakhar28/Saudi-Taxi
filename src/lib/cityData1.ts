import type { CityData } from "@/components/CityServicePage";

export const riyadh: CityData = {
  slug: "riyadh",
  landmarks: [
    { name: "Kingdom Centre Tower", description: "The city\'s signature skyscraper, known for the Sky Bridge connecting its two towers near the top — one of the best panoramic views over Riyadh." },
    { name: "Diriyah (At-Turaif)", description: "The mud-brick birthplace of the first Saudi state, now a UNESCO World Heritage district being restored as a major cultural destination on Riyadh\'s edge." },
    { name: "Edge of the World (Jebel Fihrayn)", description: "A dramatic desert escarpment roughly 90 minutes outside the city — a popular day-trip for the view alone, best reached with a driver who knows the unmarked desert track." },
    { name: "Riyadh Boulevard", description: "The city\'s entertainment and dining district, home to seasonal festivals and one of the busiest pickup/drop-off zones in the capital." },
  ],
  seasonalNote: "Riyadh Season (roughly October to March) brings major entertainment events and heavy evening traffic around Boulevard City and the main venues — book pickups with extra buffer time on event nights. Summer (June–August) heat routinely passes 45°C, so most riders shift outdoor plans to early morning or after sunset.",
  tags: ["business"],
  priority: 1,
  nearbyCities: [{ city: "Dammam", slug: "dammam" }, { city: "Jeddah", slug: "jeddah" }, { city: "Al-Ahsa", slug: "al-ahsa" }],
  city: "Riyadh",
  h1: "Private Taxi & Car Transfer in Riyadh — Available 24/7",
  region: "Riyadh Province",
  intro: "Premium taxi and chauffeur services across Riyadh — airport transfers, corporate travel, intercity routes, and 24/7 on-demand rides.",
  whyVisit: "Riyadh is Saudi Arabia's capital and economic powerhouse. Home to Vision 2030 mega-projects, the Kingdom Centre Tower, Diriyah heritage site, and a booming business district, it attracts millions of business travelers, tourists, and government visitors each year.",
  challenge: "Riyadh is a vast city where distances between destinations can exceed 50km. Public transport is limited outside the metro corridors, and ride-hailing apps often surge during peak business hours.",
  benefit: "Gulf Trip Service provides fixed-rate, pre-booked chauffeur rides across all Riyadh districts — ensuring you reach KAFD, Olaya, Diriyah, or King Khalid Airport on time, every time.",
  airport: { name: "King Khalid International Airport", code: "RUH", distance: "35 km from city centre" },
  popularRoutes: [
    { from: "Riyadh Airport (RUH)", to: "Olaya / KAFD", time: "35–50 min" },
    { from: "Riyadh", to: "Jeddah", time: "~10 hrs drive / or connect" },
    { from: "Riyadh", to: "Dammam", time: "~4 hrs" },
  ],
  pickupPoints: ["King Khalid International Airport", "Kingdom Centre Tower", "Diriyah Gate", "KAFD Financial District", "Riyadh Season venues", "Five-star hotels"],
  faqs: [
    { q: "Do you cover all Riyadh districts?", a: "Yes — Olaya, Al Malaz, Al Murabbaa, KAFD, Diriyah, Al Nakheel and all major areas." },
    { q: "Can I book a corporate account in Riyadh?", a: "Absolutely. We offer monthly invoiced corporate accounts for businesses based in Riyadh." },
    { q: "How far in advance should I book?", a: "We recommend 2–4 hours for city rides and 24 hours for airport pickups during peak periods." },
    { q: "Is Riyadh Season traffic really that bad?", a: "Evenings near Boulevard City and the main venues get significantly busier during Riyadh Season (roughly October–March) — book pickups with extra buffer time on event nights." },
    { q: "Can you take me to the Edge of the World?", a: "Yes — this popular day-trip needs a driver familiar with the unmarked desert track. We offer it as a half-day charter from Riyadh, roughly 90 minutes each way." },
  ],
  reviews: [
    { name: "Ahmed Al-Rashid", origin: "Business Traveler, Riyadh", text: "Impeccable service for my KAFD meetings. Driver was punctual and the vehicle was spotless." },
    { name: "Sarah K.", origin: "Tourist, UK", text: "Exploring Diriyah was so easy with Gulf Trip Service. Fixed price, no stress." },
    { name: "Mohammed T.", origin: "Corporate Client", text: "We use Gulf Trip for all executive airport transfers. Reliable every single time." },
  ],
  heroImage: "/destinations/riyadh-skyline-night.webp",
  heroImageAlt: "Riyadh skyline at blue hour with the Kingdom Centre Tower — private chauffeur and taxi service in Saudi Arabia's capital",
};

export const jeddah: CityData = {
  slug: "jeddah",
  landmarks: [
    { name: "Al-Balad (Historic Jeddah)", description: "The UNESCO-listed old town — coral-stone merchant houses, narrow lanes, and centuries-old mosques, best explored on foot once your driver drops you at the edge of the district." },
    { name: "King Fahd's Fountain", description: "One of the world\'s tallest fountains, jetting seawater over 300 metres above the Corniche — most striking after dark." },
    { name: "Jeddah Corniche", description: "A long waterfront promenade of parks, public art, and seafront cafés stretching along the Red Sea — the city\'s main evening gathering spot." },
    { name: "Floating Mosque (Al Rahma Mosque)", description: "Built out over the Red Sea on stilts, appearing to float at high tide — a short stop worth combining with a Corniche visit." },
  ],
  seasonalNote: "Jeddah is the main arrival point for Umrah pilgrims, so traffic around KAIA and the routes toward Makkah gets noticeably heavier during Ramadan and in the weeks before Hajj — build in extra time for airport pickups on those dates. Coastal humidity peaks in summer, making early-morning or evening Corniche visits far more comfortable than midday.",
  tags: ["umrah", "airport"],
  priority: 1,
  nearbyCities: [{ city: "Makkah", slug: "makkah" }, { city: "Madinah", slug: "madinah" }],
  city: "Jeddah",
  h1: "Airport Transfer & Chauffeur Service in Jeddah & Nearby Areas",
  region: "Makkah Province",
  intro: "Luxury taxi transfers in Jeddah — from King Abdulaziz Airport to the Corniche, Al-Balad, and all intercity routes including Makkah and Madinah.",
  whyVisit: "Jeddah is Saudi Arabia's gateway city — home to KAIA airport, the stunning Red Sea Corniche, UNESCO-listed Al-Balad historic district, and the world's tallest unsupported flagpole. It's the primary entry point for Umrah pilgrims worldwide.",
  challenge: "Jeddah's sprawling layout, heavy traffic near the airport, and limited regulated taxis make getting around difficult — especially for first-time visitors arriving with luggage after a long flight.",
  benefit: "We provide meet-and-greet airport pickups at KAIA Terminal 1 and Terminal 2, direct transfers to Makkah, Madinah or any Jeddah hotel — with a driver waiting at arrivals regardless of flight delays.",
  airport: { name: "King Abdulaziz International Airport", code: "JED", distance: "19 km from city centre" },
  popularRoutes: [
    { from: "Jeddah Airport (KAIA)", to: "Makkah", time: "60–90 min" },
    { from: "Jeddah Airport (KAIA)", to: "Madinah", time: "~5 hrs" },
    { from: "Jeddah City", to: "Taif", time: "~1.5 hrs" },
  ],
  pickupPoints: ["KAIA Terminal 1 & 2", "Al-Balad Historic District", "Jeddah Corniche", "Red Sea Mall", "Serafi Megamall", "North Jeddah hotels"],
  faqs: [
    { q: "Can you pick me up at Jeddah Airport at 3am?", a: "Yes — we operate 24/7, including overnight arrivals. Your driver will be at arrivals holding your name sign." },
    { q: "How long is the drive from Jeddah to Makkah?", a: "Typically 60–90 minutes depending on traffic. During peak Umrah season allow extra time." },
    { q: "Do you offer Jeddah city tours?", a: "Yes, we offer half-day and full-day city tour transfers covering Al-Balad, the Corniche, and local landmarks." },
    { q: "Do you serve Al-Balad specifically?", a: "Yes, though vehicle access into the narrow historic lanes is limited — we drop you at the edge of the district and arrange a fixed pickup time and point for when you're done exploring." },
    { q: "Is Jeddah humid in summer?", a: "Yes, coastal humidity peaks from June to September. Early-morning or evening Corniche visits are noticeably more comfortable than midday." },
  ],
  reviews: [
    { name: "Fatima B.", origin: "Umrah Pilgrim, Pakistan", text: "Arrived at 2am and our driver was already waiting. Transferred straight to Makkah. Perfect service." },
    { name: "James O.", origin: "Tourist, USA", text: "Booked a Jeddah city tour. Driver was knowledgeable and the car was luxurious." },
    { name: "Tariq M.", origin: "Business Traveler, UAE", text: "Regular Jeddah–Makkah transfers for my clients. Always on time, always professional." },
  ],
  heroImage: "/destinations/jeddah-corniche-skyline.webp",
  heroImageAlt: "Jeddah Corniche waterfront with the King Fahd Fountain at sunset — premium private transfer service on Saudi Arabia's Red Sea coast",
};

export const makkah: CityData = {
  slug: "makkah",
  landmarks: [
    { name: "Masjid al-Haram & the Kaaba", description: "The holiest site in Islam and the destination for every pilgrim\'s journey — the Grand Mosque surrounds the Kaaba at the heart of the city." },
    { name: "Abraj Al-Bait (Clock Tower)", description: "The clock tower complex overlooking the Haram, home to the world\'s largest clock face and a cluster of pilgrim hotels within walking distance of the mosque." },
    { name: "Jabal al-Nour", description: "The mountain containing the Cave of Hira, where the first Quranic revelation is believed to have descended — a steep climb best attempted with good footwear and plenty of water." },
    { name: "Mina, Arafat & Muzdalifah", description: "The plains and tent city central to the Hajj rites, reachable only during the pilgrimage period with proper permits." },
  ],
  seasonalNote: "Hajj (in Dhul-Hijjah) brings the entire city to its busiest point of the year — book transport weeks in advance if traveling then. Ramadan also drives a major Umrah surge, with the heaviest congestion in the final ten nights; outside those windows, weekday mornings are consistently the easiest time to move around the city.",
  tags: ["umrah"],
  priority: 1,
  nearbyCities: [{ city: "Jeddah", slug: "jeddah" }, { city: "Taif", slug: "taif" }, { city: "Abha", slug: "abha" }],
  city: "Makkah",
  h1: "Chauffeur Service, Private Taxi & Car Transfer across Makkah",
  region: "Makkah Province",
  intro: "Dedicated taxi services in and around Makkah — hotel-to-Haram transfers, Ziyarat tours, Jeddah airport pickups, and intercity travel for Umrah and Hajj pilgrims.",
  whyVisit: "Makkah is the holiest city in Islam and the destination for over 10 million Umrah pilgrims annually. The Masjid al-Haram, Mina, Arafat, Muzdalifah, and surrounding Ziyarat sites make transportation a critical part of every pilgrim's journey.",
  challenge: "During Umrah and Hajj seasons, Makkah's roads become extremely congested. Finding reliable, non-exploitative transport from hotels to the Haram and between sacred sites is a constant challenge for pilgrims.",
  benefit: "We specialize in Makkah's unique transport needs — Ihram-friendly vehicles, patient drivers who understand pilgrim schedules, and flexible transfers between all five-star Abraj al-Bait hotels and beyond.",
  airport: { name: "King Abdulaziz International Airport (Jeddah)", code: "JED", distance: "80 km from Makkah city centre" },
  popularRoutes: [
    { from: "Jeddah Airport", to: "Makkah Hotels", time: "60–90 min" },
    { from: "Makkah", to: "Madinah", time: "4–5 hrs" },
    { from: "Makkah", to: "Taif", time: "~1.5 hrs" },
  ],
  pickupPoints: ["Abraj Al-Bait / Clock Tower hotels", "Ajyad area hotels", "Aziziyah district", "Mina", "Muzdalifah", "Jabal al-Noor vicinity"],
  faqs: [
    { q: "Can non-Muslims be drivers in Makkah?", a: "All our Makkah-based drivers are Muslim, fully licensed, and familiar with the holy sites and pilgrim etiquette." },
    { q: "Do you do Ziyarat tours in Makkah?", a: "Yes — we offer half-day Makkah Ziyarat tours covering Jabal al-Noor, Jabal Thawr, Mina, Arafat, and Muzdalifah." },
    { q: "What vehicles are available for large groups?", a: "We have minivans seating up to 10, ideal for family Umrah groups traveling between hotels and the Haram." },
    { q: "How far in advance should I book during Hajj?", a: "At least 2–4 weeks ahead — availability during peak Hajj days (8th–12th Dhul-Hijjah) is extremely limited without advance booking." },
    { q: "Can you pick me up directly from my Haram-area hotel?", a: "Yes, though during Ramadan and Hajj some roads near the Haram have vehicle restrictions — your driver will meet you at the nearest permitted point and guide you in." },
  ],
  reviews: [
    { name: "Bilal H.", origin: "Umrah Pilgrim, UK", text: "Our driver waited patiently during our Tawaf. Truly understood the spiritual nature of our trip." },
    { name: "Amna S.", origin: "Pilgrim, Canada", text: "The Ziyarat tour was exceptional. Driver explained every site with genuine knowledge." },
    { name: "Dr. Khalid F.", origin: "Pilgrim, Malaysia", text: "Transferred from KAIA at midnight — flawless. Will book again for Hajj season." },
  ],
  heroImage: "/hero-slider/saudi-arabia-luxury-chauffeur-service.webp",
  heroImageAlt: "Private chauffeur vehicle on a Saudi Arabia highway — premium transport service for Makkah pilgrims and visitors",
};

// Spelling note: this site standardizes on "Madinah" everywhere except one
// existing slug, /madina-airport-taxi-service ("Madina", no H) — kept as-is
// per the no-slug-changes rule (docs/page-inventory.md). Do not copy that
// spelling into any new page, field, or route; always use "Madinah".
export const madinah: CityData = {
  slug: "madinah",
  landmarks: [
    { name: "Masjid an-Nabawi (Prophet's Mosque)", description: "The second-holiest mosque in Islam, built by the Prophet Muhammad himself and home to the Rawdah — a section many pilgrims specifically plan a visit around." },
    { name: "Quba Mosque", description: "The first mosque built in Islam, a short drive from the city centre and a common early stop for pilgrims settling into Madinah." },
    { name: "Mount Uhud", description: "Site of the historic Battle of Uhud, with the martyrs\' cemetery at its base — a quieter, more reflective Ziyarat stop than the central mosque area." },
    { name: "Masjid al-Qiblatayn", description: "The \'Mosque of the Two Qiblas\', marking the spot where the direction of prayer changed from Jerusalem to Makkah." },
  ],
  seasonalNote: "Rawdah access is booked through the Nusuk app in advance, and early-morning slots (after Fajr) are consistently the least crowded — plan pickup times around your slot rather than the other way around. Like Makkah, Madinah sees its busiest periods during Ramadan and the weeks around Hajj.",
  tags: ["umrah"],
  priority: 1,
  nearbyCities: [{ city: "Makkah", slug: "makkah" }, { city: "Yanbu", slug: "yanbu" }],
  city: "Madinah",
  h1: "Executive Car Service & Airport Transfer in Madinah — Book Anytime",
  region: "Madinah Province",
  intro: "Professional taxi services in Madinah — transfers from Prince Mohammad Bin Abdulaziz Airport, Prophet's Mosque vicinity hotels, and Ziyarat tours across the holy city.",
  whyVisit: "Madinah is the second holiest city in Islam, home to Al-Masjid an-Nabawi (the Prophet's Mosque) and numerous sacred historical sites. Every Umrah pilgrim and Hajj visitor typically spends several days here.",
  challenge: "The area around the Prophet's Mosque is a restricted zone with specific traffic rules. Navigating Madinah's hotel belt, the Quba Mosque, Uhud, and the Dates Market requires a knowledgeable local driver.",
  benefit: "Our Madinah drivers are trained to operate within all restricted zones, know exactly where to wait without congesting the Haram area, and can guide you through Madinah Ziyarat sites — plus help you time your visit to the Rawdah — with care and respect.",
  airport: { name: "Prince Mohammad Bin Abdulaziz Airport", code: "MED", distance: "15 km from city centre" },
  popularRoutes: [
    { from: "Madinah Airport (MED)", to: "Prophet's Mosque hotels", time: "20–30 min" },
    { from: "Madinah", to: "Makkah", time: "4–5 hrs" },
    { from: "Madinah", to: "Jeddah", time: "~5 hrs" },
  ],
  pickupPoints: ["MED Airport arrivals", "Anbar area hotels", "Bab Al-Salam gate vicinity", "Quba Mosque", "Al-Baqi cemetery area", "Dates Market"],
  // Rawdah/Nusuk-app and length-of-stay FAQs migrated from the retired
  // /madinah-umrah-taxi-guide (Execution Brief v3 W4 / D2) — the guide's
  // most genuinely useful, non-generic content.
  faqs: [
    { q: "Can you pick me up inside the Prophet's Mosque restricted zone?", a: "Drivers wait at designated pickup points outside the restricted zone. We coordinate your exact meeting point via WhatsApp." },
    { q: "Do you do Madinah Ziyarat tours?", a: "Yes — covering Quba Mosque, Masjid al-Qiblatayn, Uhud mountain, Dates Market and more." },
    { q: "Is there a direct transfer from Madinah to Makkah?", a: "Yes, we run this route daily. It's approximately 4–5 hours on the Haramain Expressway." },
    { q: "How do I book a Rawdah visit, and can you help with transport for it?", a: "Rawdah access is booked through the Nusuk app — you reserve your own time slot there. We handle the transport side: getting you to the Prophet's Mosque in good time for your slot, with early-morning pickups (after Fajr) recommended since those times are least crowded." },
    { q: "How many days should I plan to stay in Madinah?", a: "Most Umrah pilgrims stay 2–4 days — enough time for daily prayers at the Prophet's Mosque, a Rawdah visit, a Ziyarat tour, and some rest before continuing on." },
  ],
  reviews: [
    { name: "Usman A.", origin: "Pilgrim, Nigeria", text: "Transfer from MED airport was smooth. Driver helped us to our hotel despite road closures." },
    { name: "Siti R.", origin: "Pilgrim, Indonesia", text: "Beautiful Ziyarat tour around Madinah. Driver was respectful and knowledgeable." },
    { name: "Hassan M.", origin: "Pilgrim, Egypt", text: "Booked the Makkah–Madinah transfer for our family of 6. Spacious van, excellent service." },
  ],
  heroImage: "/hero-slider/saudi-airport-transfer-service.webp",
  heroImageAlt: "Private airport transfer vehicle in Saudi Arabia — premium chauffeur service for Madinah visitors and pilgrims",
};

export const dammam: CityData = {
  slug: "dammam",
  landmarks: [
    { name: "Dammam Corniche", description: "A waterfront park and promenade along the Gulf, popular for evening walks and one of the easiest orientation points for first-time visitors." },
    { name: "Ithra (King Abdulaziz Center for World Culture)", description: "A striking cultural centre just outside Dammam in Dhahran — museum, cinema, and library housed in one of the Eastern Province\'s most distinctive buildings." },
    { name: "Half Moon Bay", description: "A popular Gulf-coast beach south of the city, busiest on weekends with families and groups from across the Eastern Province." },
  ],
  seasonalNote: "Dammam\'s economy runs on Aramco and the wider Eastern Province energy sector, so weekday mornings see business-travel-driven traffic toward the King Fahd International Airport and the Khobar/Dhahran business districts. Summer humidity here is some of the highest in the Kingdom — most outdoor activity shifts to evenings from June through September.",
  tags: ["business", "gcc"],
  priority: 1,
  nearbyCities: [{ city: "Khobar", slug: "khobar" }, { city: "Riyadh", slug: "riyadh" }, { city: "Jubail", slug: "jubail" }, { city: "Dhahran", slug: "dhahran" }],
  city: "Dammam",
  h1: "Private Car Service & Chauffeur Service across Dammam",
  region: "Eastern Province",
  intro: "Executive taxi services in Dammam and the Eastern Province — airport transfers from King Fahd International, corporate travel to Khobar and Jubail, and intercity routes to Riyadh.",
  whyVisit: "Dammam is the capital of the Eastern Province and the hub of Saudi Arabia's oil industry. Home to Saudi Aramco's global headquarters, King Fahd Causeway to Bahrain, and a rapidly developing tourism sector along the Arabian Gulf.",
  challenge: "The tri-city Eastern Province (Dammam, Khobar, Dhahran) is highly car-dependent, and the distances between business districts, the airport, and border crossings can make logistics complicated for visiting executives.",
  benefit: "We provide seamless corporate transfers between Dammam, Khobar, Dhahran, Jubail, and the King Fahd Causeway — with executive vehicles and professional drivers who understand the business travel needs of the region.",
  airport: { name: "King Fahd International Airport", code: "DMM", distance: "35 km from Dammam city centre" },
  popularRoutes: [
    { from: "Dammam Airport (DMM)", to: "Khobar / Dhahran", time: "30–40 min" },
    { from: "Dammam Airport", to: "Riyadh", time: "~4 hrs", href: "/dammam-airport-to-riyadh-taxi-service" },
    { from: "Dammam Airport", to: "Bahrain (King Fahd Causeway)", time: "~1–1.5 hrs", href: "/dammam-airport-to-bahrain-taxi-service" },
    { from: "Dammam Airport", to: "Qatar (Salwa Border)", time: "~5–6 hrs", href: "/dammam-airport-to-qatar-taxi-service" },
    { from: "Dammam Airport", to: "Khafji", time: "~2–2.5 hrs", href: "/dammam-airport-to-khafji-taxi-service" },
  ],
  pickupPoints: ["King Fahd International Airport", "Saudi Aramco HQ, Dhahran", "Khobar Corniche", "Half Moon Bay", "King Fahd Causeway", "Jubail Industrial City"],
  faqs: [
    { q: "Do you cover the Dammam–Khobar–Dhahran tri-city area?", a: "Yes — all three cities are covered under a single booking with no additional city surcharge." },
    { q: "Can you take me to the Bahrain border at King Fahd Causeway?", a: "Yes — see our dedicated Dammam Airport to Bahrain taxi service page for a coordinated transfer across the King Fahd Causeway." },
    { q: "Do you serve Jubail Industrial City?", a: "Yes, Jubail is within our Eastern Province service zone. Corporate accounts available for Jubail-based companies." },
    { q: "Is Ithra worth visiting from Dammam?", a: "Yes — the King Abdulaziz Center for World Culture (Ithra) in nearby Dhahran is one of the Eastern Province's best cultural stops, and it's a short, easy transfer from central Dammam." },
    { q: "How humid does Dammam get in summer?", a: "Very — coastal humidity from June through September is among the highest in the Kingdom. Most outdoor plans work better scheduled for evenings during those months." },
  ],
  reviews: [
    { name: "Robert S.", origin: "Oil Industry Executive, USA", text: "Used Gulf Trip for all my Aramco-area transfers. Punctual, professional, and the car is always clean." },
    { name: "Nadia K.", origin: "Business Traveler, UK", text: "Airport to Khobar was seamless. Highly recommend for Eastern Province travel." },
    { name: "Ali Al-Dosari", origin: "Local Client, Dammam", text: "Best corporate taxi service in the Eastern Province. Our whole team uses them." },
  ],
  heroImage: "/destinations/dammam-eastern-province-skyline.webp",
  heroImageAlt: "Dammam Eastern Province skyline — private taxi and airport transfer service near King Fahd International Airport",
};
