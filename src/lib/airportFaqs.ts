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
    q: "Riyadh Airport has several terminals — which one will my driver meet me at?",
    a: "King Khalid International has both the newer Terminal 5 (most international flights) and the older Terminals 1–4 (mostly domestic Saudia flights). Tell us your flight number when booking and we'll confirm exactly which terminal and exit your driver will be waiting at.",
    airports: ["RUH"],
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
  {
    q: "Do I need to book a guide as well as a driver from AlUla Airport?",
    a: "For Hegra specifically, yes — it requires a licensed guide booked through Saudi Tourism, separate from your transport. We handle the driving and know the exact site access timings; the guide is arranged on your end.",
    airports: ["ULH"],
  },
];
