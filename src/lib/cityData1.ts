import type { CityData } from "@/components/CityServicePage";

export const riyadh: CityData = {
  slug: "riyadh",
  city: "Riyadh",
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
  ],
  reviews: [
    { name: "Ahmed Al-Rashid", origin: "Business Traveler, Riyadh", text: "Impeccable service for my KAFD meetings. Driver was punctual and the vehicle was spotless." },
    { name: "Sarah K.", origin: "Tourist, UK", text: "Exploring Diriyah was so easy with Gulf Trip Service. Fixed price, no stress." },
    { name: "Mohammed T.", origin: "Corporate Client", text: "We use Gulf Trip for all executive airport transfers. Reliable every single time." },
  ],
  heroImage: "/images/city-riyadh.jpg",
};

export const jeddah: CityData = {
  slug: "jeddah",
  city: "Jeddah",
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
  ],
  reviews: [
    { name: "Fatima B.", origin: "Umrah Pilgrim, Pakistan", text: "Arrived at 2am and our driver was already waiting. Transferred straight to Makkah. Perfect service." },
    { name: "James O.", origin: "Tourist, USA", text: "Booked a Jeddah city tour. Driver was knowledgeable and the car was luxurious." },
    { name: "Tariq M.", origin: "Business Traveler, UAE", text: "Regular Jeddah–Makkah transfers for my clients. Always on time, always professional." },
  ],
  heroImage: "/images/city-jeddah.jpg",
};

export const makkah: CityData = {
  slug: "makkah",
  city: "Makkah",
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
  ],
  reviews: [
    { name: "Bilal H.", origin: "Umrah Pilgrim, UK", text: "Our driver waited patiently during our Tawaf. Truly understood the spiritual nature of our trip." },
    { name: "Amna S.", origin: "Pilgrim, Canada", text: "The Ziyarat tour was exceptional. Driver explained every site with genuine knowledge." },
    { name: "Dr. Khalid F.", origin: "Pilgrim, Malaysia", text: "Transferred from KAIA at midnight — flawless. Will book again for Hajj season." },
  ],
};

export const madinah: CityData = {
  slug: "madinah",
  city: "Madinah",
  region: "Madinah Province",
  intro: "Professional taxi services in Madinah — transfers from Prince Mohammad Bin Abdulaziz Airport, Prophet's Mosque vicinity hotels, and Ziyarat tours across the holy city.",
  whyVisit: "Madinah is the second holiest city in Islam, home to Al-Masjid an-Nabawi (the Prophet's Mosque) and numerous sacred historical sites. Every Umrah pilgrim and Hajj visitor typically spends several days here.",
  challenge: "The area around the Prophet's Mosque is a restricted zone with specific traffic rules. Navigating Madinah's hotel belt, the Quba Mosque, Uhud, and the Dates Market requires a knowledgeable local driver.",
  benefit: "Our Madinah drivers are trained to operate within all restricted zones, know exactly where to wait without congesting the Haram area, and can guide you through Madinah Ziyarat sites with care and respect.",
  airport: { name: "Prince Mohammad Bin Abdulaziz Airport", code: "MED", distance: "15 km from city centre" },
  popularRoutes: [
    { from: "Madinah Airport (MED)", to: "Prophet's Mosque hotels", time: "20–30 min" },
    { from: "Madinah", to: "Makkah", time: "4–5 hrs" },
    { from: "Madinah", to: "Jeddah", time: "~5 hrs" },
  ],
  pickupPoints: ["MED Airport arrivals", "Anbar area hotels", "Bab Al-Salam gate vicinity", "Quba Mosque", "Al-Baqi cemetery area", "Dates Market"],
  faqs: [
    { q: "Can you pick me up inside the Prophet's Mosque restricted zone?", a: "Drivers wait at designated pickup points outside the restricted zone. We coordinate your exact meeting point via WhatsApp." },
    { q: "Do you do Madinah Ziyarat tours?", a: "Yes — covering Quba Mosque, Masjid al-Qiblatayn, Uhud mountain, Dates Market and more." },
    { q: "Is there a direct transfer from Madinah to Makkah?", a: "Yes, we run this route daily. It's approximately 4–5 hours on the Haramain Expressway." },
  ],
  reviews: [
    { name: "Usman A.", origin: "Pilgrim, Nigeria", text: "Transfer from MED airport was smooth. Driver helped us to our hotel despite road closures." },
    { name: "Siti R.", origin: "Pilgrim, Indonesia", text: "Beautiful Ziyarat tour around Madinah. Driver was respectful and knowledgeable." },
    { name: "Hassan M.", origin: "Pilgrim, Egypt", text: "Booked the Makkah–Madinah transfer for our family of 6. Spacious van, excellent service." },
  ],
};

export const dammam: CityData = {
  slug: "dammam",
  city: "Dammam",
  region: "Eastern Province",
  intro: "Executive taxi services in Dammam and the Eastern Province — airport transfers from King Fahd International, corporate travel to Khobar and Jubail, and intercity routes to Riyadh.",
  whyVisit: "Dammam is the capital of the Eastern Province and the hub of Saudi Arabia's oil industry. Home to Saudi Aramco's global headquarters, King Fahd Causeway to Bahrain, and a rapidly developing tourism sector along the Arabian Gulf.",
  challenge: "The tri-city Eastern Province (Dammam, Khobar, Dhahran) is highly car-dependent, and the distances between business districts, the airport, and border crossings can make logistics complicated for visiting executives.",
  benefit: "We provide seamless corporate transfers between Dammam, Khobar, Dhahran, Jubail, and the King Fahd Causeway — with executive vehicles and professional drivers who understand the business travel needs of the region.",
  airport: { name: "King Fahd International Airport", code: "DMM", distance: "35 km from Dammam city centre" },
  popularRoutes: [
    { from: "Dammam Airport (DMM)", to: "Khobar / Dhahran", time: "30–40 min" },
    { from: "Dammam", to: "Riyadh", time: "~4 hrs" },
    { from: "Dammam", to: "Bahrain (King Fahd Causeway)", time: "~1 hr" },
  ],
  pickupPoints: ["King Fahd International Airport", "Saudi Aramco HQ, Dhahran", "Khobar Corniche", "Half Moon Bay", "King Fahd Causeway", "Jubail Industrial City"],
  faqs: [
    { q: "Do you cover the Dammam–Khobar–Dhahran tri-city area?", a: "Yes — all three cities are covered under a single booking with no additional city surcharge." },
    { q: "Can you take me to the Bahrain border at King Fahd Causeway?", a: "Yes — we provide Dammam to Causeway border transfer. We do not cross into Bahrain but will drop you at the Saudi border exit." },
    { q: "Do you serve Jubail Industrial City?", a: "Yes, Jubail is within our Eastern Province service zone. Corporate accounts available for Jubail-based companies." },
  ],
  reviews: [
    { name: "Robert S.", origin: "Oil Industry Executive, USA", text: "Used Gulf Trip for all my Aramco-area transfers. Punctual, professional, and the car is always clean." },
    { name: "Nadia K.", origin: "Business Traveler, UK", text: "Airport to Khobar was seamless. Highly recommend for Eastern Province travel." },
    { name: "Ali Al-Dosari", origin: "Local Client, Dammam", text: "Best corporate taxi service in the Eastern Province. Our whole team uses them." },
  ],
};
