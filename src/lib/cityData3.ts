import type { CityData } from "@/components/CityServicePage";

export const yanbu: CityData = {
  slug: "yanbu",
  city: "Yanbu",
  region: "Madinah Province",
  intro: "Professional taxi services in Yanbu — airport transfers, petrochemical industry corporate travel, Red Sea diving trip connections, and routes to Madinah and Jeddah.",
  whyVisit: "Yanbu is a dual-purpose city — a major petrochemical and industrial hub on the Red Sea coast, and an emerging leisure destination known for its pristine coral reefs, historic old town, and proximity to Madinah. Its deep-water port is one of the largest in the region.",
  challenge: "Yanbu has limited public transport options, and the distances between the industrial zone, the old town, the Royal Commission residential areas, and the airport make a reliable taxi service essential for both business and leisure visitors.",
  benefit: "We serve both Yanbu's corporate community and its growing leisure tourism sector — from Aramco contractor transfers to Red Sea dive site drop-offs and same-day Madinah connections.",
  airport: { name: "Yanbu Airport", code: "YNB", distance: "10 km from city centre" },
  popularRoutes: [
    { from: "Yanbu Airport (YNB)", to: "Yanbu city / Industrial City", time: "15–20 min" },
    { from: "Yanbu", to: "Madinah", time: "~2.5 hrs" },
    { from: "Yanbu", to: "Jeddah", time: "~4 hrs" },
  ],
  pickupPoints: ["Yanbu Airport", "Yanbu Al-Bahr old town", "Royal Commission compound", "Yanbu Industrial City gates", "Red Sea dive clubs", "Yanbu waterfront hotels"],
  faqs: [
    { q: "Do you serve Yanbu Industrial City separately from the old town?", a: "Yes — both zones are covered under the same booking with no premium charge for the Industrial City." },
    { q: "Can you take me from Yanbu to Madinah for Umrah?", a: "Yes — Yanbu to Madinah is a popular route for residents making a quick Umrah trip, approximately 2.5 hours." },
    { q: "Do you cover dive site drop-offs on the Red Sea coast?", a: "Yes — we transfer to dive sites north and south of Yanbu along the Red Sea coast." },
  ],
  reviews: [
    { name: "Carlos R.", origin: "Contractor, Spain", text: "Six months of Yanbu transfers — always on time. Best option in the region." },
    { name: "Hana M.", origin: "Diver, Saudi Arabia", text: "Transferred to my dive site at dawn without any fuss. Excellent service." },
    { name: "Ibrahim Y.", origin: "Resident, Yanbu", text: "Regular Yanbu–Madinah trips for Umrah. Always reliable, always comfortable." },
  ],
};

export const alula: CityData = {
  slug: "alula",
  city: "AlUla",
  region: "Madinah Province",
  intro: "Dedicated taxi and tour transfers in AlUla — Hegra site visits, airport connections, resort hotel pickups, and full-day heritage exploration across Saudi Arabia's most spectacular archaeological landscape.",
  whyVisit: "AlUla is Saudi Arabia's cultural crown jewel — home to Hegra (Madain Saleh), the first Saudi UNESCO World Heritage Site, ancient Nabataean tombs, dramatic Elephant Rock, and the extraordinary Ashar Arts District. It is one of the most hyped travel destinations in the world.",
  challenge: "AlUla is vast. Distances between the airport, the Old Town, Hegra, Elephant Rock, Maraya Concert Hall, and Sharaan Nature Reserve can exceed 100km. Most sites require a private vehicle and often a guide-accompanied tour.",
  benefit: "We provide AlUla's most essential service — airport pickups from AlUla Regional Airport, resort-to-site daily transfers, and full-day itinerary drives that let you experience every rock formation, ancient carving, and sunset perfectly timed.",
  airport: { name: "AlUla Regional Airport", code: "ULH", distance: "18 km from Old Town" },
  popularRoutes: [
    { from: "AlUla Airport (ULH)", to: "AlUla Old Town / Banyan Tree", time: "20–25 min" },
    { from: "AlUla", to: "Hegra (Madain Saleh)", time: "~25 min" },
    { from: "AlUla", to: "Tabuk", time: "~4 hrs" },
  ],
  pickupPoints: ["AlUla Regional Airport", "Banyan Tree AlUla resort", "Hegra visitor centre", "Elephant Rock", "Maraya Concert Hall", "AlUla Old Town"],
  faqs: [
    { q: "Do I need a guide to visit Hegra, or just a driver?", a: "Hegra requires a licensed guide (bookable through Saudi Tourism). We provide the transport — a driver who knows the exact access roads and timing." },
    { q: "Can you do multi-day transfers across AlUla?", a: "Yes — many guests book us for their full 3–5 day AlUla itinerary including morning Hegra trips, afternoon Elephant Rock, and evening Ashar Arts District visits." },
    { q: "Do you cover the Sharaan Nature Reserve?", a: "Yes — we transfer to the Sharaan entry point and coordinate collection times with your guide." },
  ],
  reviews: [
    { name: "Isabella F.", origin: "Tourist, Italy", text: "Watching sunrise at Hegra from our private car was life-changing. Gulf Trip made it effortless." },
    { name: "Jens K.", origin: "Photographer, Germany", text: "Four days of AlUla transfers. Drivers knew every golden-hour shooting location." },
    { name: "Reem Al-Otaibi", origin: "Traveler, Saudi Arabia", text: "Best way to experience AlUla. Professional, punctual, and deeply knowledgeable." },
  ],
};

export const neom: CityData = {
  slug: "neom",
  city: "NEOM",
  region: "Tabuk Province",
  intro: "Executive transfers to and from NEOM — construction contractor logistics, Sharma Airport connections, and access to The Line, Sindalah, and Aqaba Gulf coastal sites.",
  whyVisit: "NEOM is Saudi Arabia's most ambitious Vision 2030 project — a $500 billion futuristic city region spanning Tabuk Province's Red Sea coast. It encompasses The Line, Sindalah yacht island, Trojena ski resort, and Oxagon. It currently attracts thousands of international contractors, consultants, and media visitors.",
  challenge: "NEOM's construction zones span a vast, remote area. Reaching Sharma Airport, the various project sites, and nearby Haql or Tabuk requires expert knowledge of the access routes and security checkpoint procedures.",
  benefit: "We specialise in NEOM contractor logistics — executive airport transfers from Sharma and Tabuk airports, inter-site connectivity, and direct routes to Haql town and Aqaba border for international teams.",
  airport: { name: "Sharma Airport (NEOM Bay Airport)", code: "NUM", distance: "Within NEOM zone" },
  popularRoutes: [
    { from: "Sharma Airport (NEOM)", to: "NEOM project sites", time: "20–60 min (varies by site)" },
    { from: "NEOM", to: "Tabuk city", time: "~3 hrs" },
    { from: "Haql (NEOM gateway)", to: "Tabuk Airport", time: "~2.5 hrs" },
  ],
  pickupPoints: ["Sharma Airport", "NEOM Bay Hotel", "Haql coastal access point", "Tabuk Airport connection", "Aqaba Ferry Terminal (Jordan side)", "NEOM contractor compounds"],
  faqs: [
    { q: "Do you have access to NEOM construction zones?", a: "We work with pre-approved access rosters. Contractor clients provide their site clearance and we handle the transport logistics." },
    { q: "Can I connect from Tabuk Airport to NEOM?", a: "Yes — Tabuk International Airport is the main international hub. We run direct transfers from Tabuk to NEOM sites." },
    { q: "Do you cover Haql for Aqaba ferry connections?", a: "Yes — Haql to the Aqaba ferry is a regular route for international teams entering via Jordan." },
  ],
  reviews: [
    { name: "Andrew B.", origin: "Project Consultant, UK", text: "Six-month NEOM contract — Gulf Trip handled all airport transfers without a single issue." },
    { name: "Yuki T.", origin: "Architect, Japan", text: "Sharma Airport to site in an executive SUV. Professional and efficient." },
    { name: "Marcus D.", origin: "Engineer, Australia", text: "Reliable partner for all our NEOM team transfers. Highly recommend for contractors." },
  ],
};

export const tabuk: CityData = {
  slug: "tabuk",
  city: "Tabuk",
  region: "Tabuk Province",
  intro: "Reliable taxi services in Tabuk — Tabuk Airport transfers, NEOM connectivity, Wadi Disah and Qaraqir canyon day trips, and access to the Aqaba border.",
  whyVisit: "Tabuk is northwest Saudi Arabia's gateway city — a base for NEOM project access, the dramatic Wadi Disah canyon, ancient Tabuk Castle, and proximity to the Gulf of Aqaba coastline. It's growing rapidly as both a military hub and adventure tourism destination.",
  challenge: "Tabuk's sprawling geography makes it difficult to navigate without local knowledge. Distances to Wadi Disah, the Aqaba coastal road, and NEOM sites can exceed 200km from the city centre.",
  benefit: "Our Tabuk service connects the city to its key attractions and infrastructure — airport transfers, NEOM contractor routing, Wadi Disah excursions, and Aqaba border drop-offs for travelers continuing into Jordan or Egypt.",
  airport: { name: "Tabuk Regional Airport", code: "TUU", distance: "8 km from city centre" },
  popularRoutes: [
    { from: "Tabuk Airport (TUU)", to: "Tabuk city", time: "15–20 min" },
    { from: "Tabuk", to: "NEOM / Haql", time: "~2.5 hrs" },
    { from: "Tabuk", to: "Wadi Disah canyon", time: "~2 hrs" },
  ],
  pickupPoints: ["Tabuk Regional Airport", "Tabuk Castle historic site", "KKIA University area", "Wadi Disah canyon entrance", "Haql Red Sea coast", "Aqaba border crossing"],
  faqs: [
    { q: "Can I book a Wadi Disah day trip from Tabuk?", a: "Yes — we offer round-trip transfers to Wadi Disah and Qaraqir. The canyon is approximately 2 hours from Tabuk and requires a 4WD-capable vehicle." },
    { q: "Is Tabuk a good base for Aqaba trips?", a: "Yes — we transfer guests to the Aqaba border crossing (Durra) for ferry connections to Jordan and Egypt." },
    { q: "How far is Tabuk from NEOM Sharma Airport?", a: "Approximately 230km, typically 2.5–3 hours. We run this route regularly for contractors." },
  ],
  reviews: [
    { name: "Lucas V.", origin: "Adventure Traveler, France", text: "Wadi Disah from Tabuk in a proper 4WD. Spectacular. Driver was fantastic." },
    { name: "Sophie H.", origin: "Traveler, Canada", text: "Tabuk Airport to our guesthouse and back. Reliable and affordable." },
    { name: "Omar Al-Harbi", origin: "Local Guide, Tabuk", text: "We partner with Gulf Trip for all our guests' airport transfers. Never a complaint." },
  ],
};
