/**
 * `airports` tags which airport page(s) a question is genuinely specific to
 * (AirportPage.tsx §8 pulls these first, then fills up to its minimum with
 * the untagged/generic ones below). Omit `airports` for a question that
 * applies at every airport equally — don't tag it everywhere by hand.
 */
export const AIRPORT_FAQS: { q: string; a: string; airports?: Array<"JED" | "MED" | "DMM" | "RUH" | "AHB" | "TIF" | "TUU" | "YNB" | "ULH"> }[] = [
  {
    q: "Where does the driver wait at Jeddah Airport — Terminal 1, the Hajj Terminal, or the South Terminal?",
    a: "Your driver waits at the arrivals exit of whichever terminal your flight lands at — Terminal 1 for most international and domestic carriers, the Hajj Terminal during the seasonal pilgrimage period, or the South Terminal for domestic arrivals. Your terminal is confirmed in your booking, and the driver holds a name board so you can find them easily.",
    airports: ["JED"],
  },
  {
    q: "How do I get from Jeddah Airport to the city centre?",
    a: "King Abdulaziz International sits about 19 km north of central Jeddah, so the options are a pre-booked private transfer, an airport taxi from the rank, or a ride-hailing app. A pre-booked transfer is the one that has a named driver waiting at your terminal when you land — useful after a long-haul flight, and the difference matters more at 2am than at midday. Most travelers continuing to Makkah or Madinah book the onward leg directly rather than stopping in the city at all.",
    airports: ["JED"],
  },
  {
    q: "What is the difference between a Jeddah airport taxi and a private airport transfer?",
    a: "An airport taxi is taken from the rank on arrival — whatever vehicle is next in line, with the fare running as you go. A private airport transfer is arranged before you land, so the vehicle size, the driver, and the price are all confirmed in advance, and the driver tracks your flight and waits with a name board. For a family with luggage or an overnight arrival, that certainty is usually the deciding factor.",
    airports: ["JED"],
  },
  {
    q: "Riyadh Airport has several terminals — which one will my driver meet me at?",
    a: "King Khalid International has five passenger terminals, and which one you use depends on your airline and whether the flight is domestic or international — allocations can change. Tell us your flight number when booking and we'll confirm exactly which terminal and exit your driver will be waiting at.",
    airports: ["RUH"],
  },
  {
    q: "Do you offer pickup at Riyadh Airport Terminal 1, 2, 3, 4 or 5 specifically?",
    a: "Yes — we cover pickup at every King Khalid International terminal, from Terminal 1 through Terminal 5. Your driver waits at your specific terminal's arrivals exit, confirmed once you share your flight number.",
    airports: ["RUH"],
  },
  {
    q: "How do I get from Madinah Airport to the Prophet's Mosque?",
    a: "Prince Mohammad Bin Abdulaziz International sits about 15 km from the Haram area — one of the shortest airport-to-holy-site transfers in the Kingdom, typically 20–30 minutes. A pre-booked transfer means a driver waiting at arrivals; note that vehicles can't enter the restricted zone immediately around the Prophet's Mosque, so your driver stops at the nearest designated point and coordinates the exact spot with you.",
    airports: ["MED"],
  },
  {
    q: "How do I get from Riyadh Airport to the city centre?",
    a: "King Khalid International sits about 35 km north of central Riyadh, so it's a longer run than most Saudi airport transfers — typically 35–50 minutes depending on traffic. A pre-booked private transfer means a driver waiting at your terminal with a name board; the alternative is the airport taxi rank or a ride-hailing app. Traffic peaks between 7–9am and 4–7pm on weekdays, and evening congestion around Boulevard City is heavier during Riyadh Season (roughly October–March).",
    airports: ["RUH"],
  },
  {
    q: "Can I book a Riyadh airport taxi service in advance for a business trip?",
    a: "Yes — advance booking is the norm for corporate arrivals at King Khalid International. You share the flight number, we confirm the terminal, and the driver tracks the flight so a delay doesn't cost you the pickup. Executive vehicles and monthly invoiced corporate accounts are both available for travelers making the trip regularly.",
    airports: ["RUH"],
  },
  {
    q: "Can you take me from my Madinah hotel back to the airport?",
    a: "Yes — pickup is from your hotel near the Prophet's Mosque, straight to the departures entrance at Prince Mohammad Bin Abdulaziz International. Share your flight time when booking and the pickup is planned around your check-in.",
    airports: ["MED"],
  },
  {
    q: "How early should I leave my Madinah hotel for my flight?",
    a: "The drive is usually 20–30 minutes, but allow extra time for the restricted streets around the Haram, and add the check-in time your airline advises. Leave more margin during Ramadan and the busiest Umrah weeks.",
    airports: ["MED"],
  },
  {
    q: "What happens if my flight is delayed, or lands at 3am?",
    a: "We track every flight in real time. If your flight is delayed, your pickup time adjusts automatically at no extra cost — you don't need to contact us. We operate 24/7, so a 3am landing is treated exactly the same as a midday one; your driver will be waiting regardless of the hour.",
  },
  {
    q: "How long is the free waiting time after landing?",
    a: "You get 60 minutes of free waiting time after your flight lands, to allow for immigration, baggage claim, and customs. For non-airport pickups (hotels, city addresses), the free wait is 15 minutes.",
  },
  {
    q: "What's the luggage limit per vehicle?",
    a: "A Sedan comfortably fits 2 large suitcases, an SUV fits 4, and a Van fits 8 or more — ideal for large families or groups. If you're traveling with extra luggage (such as Umrah gifts or zamzam water on departure), let us know when booking so we can recommend the right vehicle size.",
  },
  {
    q: "Are child seats available?",
    a: "Yes, child seats are available on request at no extra charge — just mention it when you book via WhatsApp or the booking widget so a seat is ready in your vehicle.",
  },
  {
    q: "I'm arriving for Umrah in Ihram — does that affect pickup?",
    a: "Not at all. Our drivers are experienced with Umrah arrivals and understand Ihram etiquette — no photography, no unnecessary conversation, and enough space in the vehicle to stay comfortable in Ihram clothing during the drive to Makkah or Madinah.",
    airports: ["JED", "MED"],
  },
  {
    q: "Can you pick me up at Dammam Airport for a Bahrain crossing?",
    a: "Yes — this is one of our most popular Eastern Province routes. We pick you up at King Fahd International Airport (DMM) and drive you to the King Fahd Causeway for your Bahrain crossing. See our dedicated Dammam Airport to Bahrain page for full details on the border process and required documents.",
    airports: ["DMM"],
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash (SAR), card, and online bank transfer. Payment is made directly to your driver after the ride — no advance payment is required to confirm your booking.",
  },
  {
    q: "How far in advance should I book my airport transfer?",
    a: "We recommend booking at least 24 hours ahead, especially during Hajj and Umrah peak season. Same-day bookings are accepted subject to driver availability — WhatsApp us directly for urgent requests.",
  },
  {
    q: "Do you offer a meet-and-greet service inside the terminal?",
    a: "Our standard pickup is a name-board meet-and-greet at the arrivals exit. If you need assistance from the baggage claim area itself (for elderly travelers or those with mobility needs), let us know when booking and we'll arrange it.",
  },
  {
    q: "Can you pick me up at Tabuk Airport for a NEOM contractor assignment?",
    a: "Yes — Tabuk Airport to NEOM/Haql is one of our regular routes for contractors and consultants. Provide your site clearance details when booking so we can plan the checkpoint stops in advance.",
    airports: ["TUU"],
  },
  {
    q: "Do you run transfers from Yanbu Airport to dive sites, not just hotels?",
    a: "Yes — we transfer directly to Red Sea dive clubs and sites north and south of Yanbu, not just the standard hotel or Industrial City drop-offs.",
    airports: ["YNB"],
  },
  // ── Abha (AHB) ──────────────────────────────────────────────────
  // The page had no airport-specific questions at all, so it rendered the
  // generic set alone. Measured demand (GSC, 17 Aug–13 Sep 2026) is for
  // "abha airport transportation", "abha khamis airport", "khamis mushait
  // airport" and "abha to khamis mushait" — which is what these answer.
  {
    q: "How far is Abha Airport from the city centre, and how long does the drive take?",
    a: "Abha International sits about 20 km east of central Abha, between the city and Khamis Mushait. Allow roughly 25–35 minutes to a city-centre hotel, a little more in the summer tourist season when the mountain roads are busier.",
    airports: ["AHB"],
  },
  {
    q: "Can you take me from Abha Airport to Khamis Mushait?",
    a: "Yes — it is one of the most-booked transfers at this airport, and the two cities sit either side of it, so Khamis Mushait is roughly the same distance from the terminal as Abha itself. Allow about 25–30 minutes door to door, depending on where in the city you are staying.",
    airports: ["AHB"],
  },
  {
    q: "Do you drive from Abha Airport up to Al Souda?",
    a: "Yes. Al Souda is about 45 minutes up the mountain from the airport, and the road climbs steadily — worth factoring into your arrival time, particularly for an evening landing or in winter, when the higher sections can be misty.",
    airports: ["AHB"],
  },
  {
    q: "Which terminal does the driver meet me at in Abha?",
    a: "Abha has a single passenger terminal, so there is nothing to confirm — your driver meets you at the one arrivals exit with a name board.",
    airports: ["AHB"],
  },
  {
    q: "Can I book a car from Abha Airport to Riyadh, Jeddah or Madinah?",
    a: "Yes — these are long-distance road journeys rather than short airport runs, so they are planned as a full travel day with rest stops, and the vehicle is matched to your group and luggage. Share your date and passenger count and we will confirm the timing before you book. Our distance guides for Abha to Riyadh and Abha to Jeddah set out the road distance and drive time.",
    airports: ["AHB"],
  },
  {
    q: "Can you drive me from Abha Airport to Jazan, Najran, Bisha or Al Baha?",
    a: "Yes — these are regular onward journeys from Abha for us, and all are long-distance drives across the Asir highlands rather than short airport runs. Jazan is roughly two and a half hours and Najran around three, with Bisha and Al Baha confirmed when you book, since the mountain roads make timing depend on the route and the season. Tell us your landing time and we will plan the departure around it.",
    airports: ["AHB"],
  },
  {
    q: "What should I check before travelling to or from Abha Airport?",
    a: "Confirm your flight directly with your airline before you set out — schedules at regional airports can change at short notice — and let us know if your arrival time moves so the pickup follows it. For road conditions on the mountain routes, your driver will advise on the day.",
    airports: ["AHB"],
  },
  {
    q: "Do I need to book a guide as well as a driver from AlUla Airport?",
    a: "For Hegra specifically, yes — it requires a licensed guide booked through Saudi Tourism, separate from your transport. We handle the driving and know the exact site access timings; the guide is arranged on your end.",
    airports: ["ULH"],
  },
];
