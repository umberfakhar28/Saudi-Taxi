import type { CityData } from "@/components/CityServicePage";

export const khobar: CityData = {
  slug: "khobar",
  city: "Khobar",
  region: "Eastern Province",
  intro: "Premium taxi services in Al Khobar — business transfers, airport pickups from King Fahd International, and intercity routes across the Eastern Province.",
  whyVisit: "Al Khobar is the Eastern Province's commercial and leisure hub — home to the famous Khobar Corniche, upscale shopping malls, and proximity to Saudi Aramco's Dhahran headquarters. It's a key destination for business travelers and Gulf tourists alike.",
  challenge: "Al Khobar's rapid growth means traffic between the city centre, Corniche, and the airport can be unpredictable. Visitors often need reliable point-to-point transfers without the complexity of metered taxis.",
  benefit: "Our fixed-rate transfers connect Khobar to King Fahd International Airport, neighboring Dammam and Dhahran, and corporate venues — with executive vehicles suitable for business clients.",
  airport: { name: "King Fahd International Airport", code: "DMM", distance: "25 km from Khobar city centre" },
  popularRoutes: [
    { from: "Khobar", to: "DMM Airport", time: "25–35 min" },
    { from: "Khobar", to: "Dammam / Dhahran", time: "15–25 min" },
    { from: "Khobar", to: "Jubail", time: "~1 hr" },
  ],
  pickupPoints: ["Khobar Corniche", "Al Rashid Mall", "Dhahran Mall", "Half Moon Bay Road hotels", "Prince Turki Street", "Khobar business district"],
  faqs: [
    { q: "Is Khobar covered in your Eastern Province service?", a: "Yes — Khobar is a primary service city. We cover all districts including Half Moon Bay and the Corniche." },
    { q: "Can I book a transfer from Khobar to Jubail?", a: "Yes, Khobar to Jubail Industrial City is a regular route — approximately 1 hour drive." },
    { q: "Do you have female-friendly vehicle options?", a: "Yes — all our vehicles are private and driven by vetted, licensed drivers. Female passengers travel in comfort and privacy." },
  ],
  reviews: [
    { name: "Patricia M.", origin: "Expat, USA", text: "Reliable, clean, and professional. My go-to service for Khobar–Airport transfers." },
    { name: "Yousef A.", origin: "Business Client, Khobar", text: "Booked for our corporate guests every visit. Never a complaint." },
    { name: "Emma L.", origin: "Tourist, Australia", text: "Khobar Corniche to the airport was smooth and stress-free." },
  ],
};

export const jubail: CityData = {
  slug: "jubail",
  city: "Jubail",
  region: "Eastern Province",
  intro: "Reliable taxi services in Jubail and Jubail Industrial City — corporate transfers, airport connections, and intercity routes for the Eastern Province's industrial capital.",
  whyVisit: "Jubail Industrial City is one of the world's largest industrial complexes, hosting major petrochemical companies, SABIC facilities, and hundreds of international contractors. It draws thousands of business travelers from around the globe each year.",
  challenge: "Jubail's industrial layout means transfers between the residential areas, industrial zones, and King Fahd International Airport require a knowledgeable driver familiar with security checkpoints and restricted access zones.",
  benefit: "Our Jubail service is tailored for corporate clients — pre-approved drivers, executive sedans and SUVs, and reliable timing for shift changes, contractor site visits, and executive airport runs.",
  airport: { name: "King Fahd International Airport", code: "DMM", distance: "80 km from Jubail" },
  popularRoutes: [
    { from: "Jubail Industrial City", to: "DMM Airport", time: "~1 hr" },
    { from: "Jubail", to: "Dammam / Khobar", time: "~1 hr" },
    { from: "Jubail", to: "Riyadh", time: "~3.5 hrs" },
  ],
  pickupPoints: ["Jubail Industrial City gates", "SABIC headquarters", "Jubail residential area hotels", "Royal Commission guesthouses", "Fanateer Beach", "Jubail Commercial Area"],
  faqs: [
    { q: "Do your drivers have access to Jubail Industrial City?", a: "Our drivers are familiar with all major entry gates and contractor procedures for the Industrial City." },
    { q: "Can you handle regular corporate shuttle contracts in Jubail?", a: "Yes — we offer monthly retainer contracts for companies needing recurring staff transfers in Jubail." },
    { q: "Is there a direct transfer from Jubail to Riyadh?", a: "Yes — approximately 3.5 hours via the Jubail–Dammam–Riyadh expressway. Book at least 24 hours in advance." },
  ],
  reviews: [
    { name: "David H.", origin: "Contractor, Netherlands", text: "Used Gulf Trip for 3 months of Jubail–Airport transfers. Faultless every time." },
    { name: "Chen W.", origin: "Project Manager, Singapore", text: "Arranged transfers for our entire site team. Professional and cost-effective." },
    { name: "Khalid S.", origin: "Saudi Aramco, Jubail", text: "Best corporate taxi option in Jubail. Highly recommend." },
  ],
};

export const taif: CityData = {
  slug: "taif",
  city: "Taif",
  region: "Makkah Province",
  intro: "Comfortable taxi services in Taif — transfers from Taif Regional Airport, Makkah day trips, rose farm excursions, and Al-Hada/Al-Shafa mountain resort transfers.",
  whyVisit: "Taif, the 'City of Roses,' sits 1,800m above sea level in the Hejaz mountains. Known for its fragrant rose farms (producing most of the world's rose water and oud oil), honey markets, and cool summer climate — it's one of Saudi Arabia's most beloved domestic tourism destinations.",
  challenge: "Taif is 85km from Makkah via mountain roads and is frequently visited as a day trip. Its spread-out layout — from Al-Hada cable car to Shubra Palace to the rose farms — requires a vehicle for the full experience.",
  benefit: "We provide the ideal Taif experience: full-day tour transfers, Makkah–Taif direct routes, and airport pickups — with drivers who know every rose farm, honey vendor, and scenic overlook.",
  airport: { name: "Taif Regional Airport", code: "TIF", distance: "30 km from city centre" },
  popularRoutes: [
    { from: "Taif Airport (TIF)", to: "Taif city / Al-Hada", time: "30–40 min" },
    { from: "Taif", to: "Makkah", time: "~1.5 hrs" },
    { from: "Taif", to: "Jeddah", time: "~2 hrs" },
  ],
  pickupPoints: ["Taif Regional Airport", "Shubra Palace", "Al-Hada resort area", "Al-Shafa mountain village", "Taif Rose Festival grounds", "Souq Al-Dabab honey market"],
  faqs: [
    { q: "Can I do a Makkah–Taif day trip?", a: "Yes — this is one of our most popular routes. We offer round-trip day-trip packages from Makkah or Jeddah to Taif." },
    { q: "Is the road to Taif safe?", a: "The Al-Hada road is a beautiful mountain highway. Our drivers are experienced on this route year-round, including in winter fog conditions." },
    { q: "Do you cover the Al-Hada cable car area?", a: "Yes — Al-Hada and Al-Shafa are within our Taif service zone, including cable car entrance pickups." },
  ],
  reviews: [
    { name: "Nora Al-Zahrani", origin: "Tourist, Riyadh", text: "The rose farm tour was magical. Our driver took us to hidden spots only locals know." },
    { name: "Omar F.", origin: "Family Traveler, Jeddah", text: "Taif in summer with kids — the cable car, the honey market, all covered in one day. Perfect service." },
    { name: "Michael T.", origin: "Traveler, UK", text: "Driver was a Taif native and gave us an authentic experience. Highly recommend." },
  ],
};

export const abha: CityData = {
  slug: "abha",
  city: "Abha",
  region: "Asir Province",
  intro: "Scenic taxi services in Abha and the Asir region — airport transfers, cable car excursions, mountain village tours, and connections to Jizan and Najran.",
  whyVisit: "Abha is Saudi Arabia's mountain tourism capital — situated at 2,200m above sea level in the Asir highlands. Its cool misty climate, dramatic escarpments, traditional Asiri villages, and the famous Abha cable car have made it one of Saudi Tourism's most marketed destinations.",
  challenge: "Abha's mountainous terrain makes navigation challenging for visitors. The distances between the city, Habala hanging village, Green Mountain, Rijal Alma historical village, and the cable car station require reliable local transport.",
  benefit: "Our Abha-based drivers are local experts who know every mountain road, seasonal viewpoint, and hidden village. We combine airport transfers with full-day mountain discovery tours.",
  airport: { name: "Abha International Airport", code: "AHB", distance: "22 km from city centre" },
  popularRoutes: [
    { from: "Abha Airport (AHB)", to: "Abha city centre", time: "25–35 min" },
    { from: "Abha", to: "Jizan", time: "~2.5 hrs" },
    { from: "Abha", to: "Najran", time: "~3 hrs" },
  ],
  pickupPoints: ["Abha International Airport", "Abha Palace Hotel", "Green Mountain cable car", "Habala village descent", "Rijal Alma Heritage Village", "Al-Soudah Park"],
  faqs: [
    { q: "Is Abha accessible year-round?", a: "Yes — though summer (June–September) is peak season. Roads can be misty in winter but are safe with experienced drivers." },
    { q: "Can you combine an Abha airport pickup with a tour?", a: "Yes — many guests book an airport pickup combined with a same-day Habala or Al-Soudah tour before hotel check-in." },
    { q: "Do you cover Rijal Alma from Abha?", a: "Yes — Rijal Alma is approximately 45 minutes from Abha and a popular add-on to any Asir itinerary." },
  ],
  reviews: [
    { name: "Sara M.", origin: "Tourist, Jordan", text: "The mountain views from our car were breathtaking. Driver knew every scenic stop." },
    { name: "Abdullah K.", origin: "Family Traveler, Riyadh", text: "Abha with children was unforgettable. Reliable transfers made it stress-free." },
    { name: "Lena P.", origin: "Traveler, Germany", text: "Habala village tour from Abha — extraordinary. Gulf Trip made it seamless." },
  ],
};
