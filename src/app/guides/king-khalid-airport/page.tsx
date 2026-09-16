import { generatePageMetadata } from "@/lib/seo";
import GuidePage, { type GuideData } from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "King Khalid Airport Guide (RUH)",
  description: "King Khalid International Airport (RUH) guide — the five terminals, where your driver meets you, getting to and from Riyadh, and long-distance transfers from the airport.",
  path: "/guides/king-khalid-airport",
  // "RUH airport taxi" removed — that commercial term belongs to
  // /riyadh-airport-taxi-service. This guide keeps the informational
  // terminal/navigation intent it genuinely serves.
});

/*
 * Strengthened from the 28-day Search Console report (17 Aug–13 Sep 2026):
 * a cluster of terminal-specific queries — "ruh terminal 4 pickup" (11
 * impressions), "ruh terminal 1/2/3 pickup", "ruh terminal 2/3/4 car
 * service", "how to get to ruh airport" — which this guide is the natural
 * home for (position ~37), while the commercial booking intent stays with
 * /riyadh-airport-taxi-service.
 *
 * Corrections made at the same time:
 * - Removed "Saudi Arabia's busiest airport" — Jeddah's KAIA handles more
 *   passengers.
 * - The metro line serving the airport is the Yellow Line, not "Line 2".
 * - Dropped the airline-by-terminal list. It contradicted the site's own
 *   airport FAQs, and terminal allocations change; the booking is the
 *   reliable source.
 * - Dropped "no surcharges for late-night arrivals", which the business's
 *   own night-charge pricing rule contradicts.
 */

const data: GuideData = {
  path: "/guides/king-khalid-airport",
  title: "Complete Guide to King Khalid International Airport (RUH)",
  subtitle: "Riyadh's main airport — its five terminals, where your driver meets you, getting to and from the city, and travelling onward from the arrivals hall.",
  eyebrow: "Airport Guide",
  category: { label: "Airport Transfers", href: "/riyadh-airport-taxi-service" },
  keyTakeaways: [
    "King Khalid International (RUH) is about 35 km north of central Riyadh — usually a 35–50 minute drive, longer at peak times.",
    "It has five passenger terminals. Your terminal depends on your airline and flight, so trust your booking rather than an online list.",
    "Your driver waits at the arrivals exit of your terminal with a name board — share your flight number and the terminal is confirmed from it.",
    "From the arrivals hall you can travel on door to door — to your Riyadh hotel, or on long-distance routes to Makkah, Dammam, Bahrain or beyond.",
  ],
  sections: [
    {
      heading: "About King Khalid International Airport",
      content: "King Khalid International Airport (IATA: RUH) is the main airport for Riyadh and the central region of Saudi Arabia. It sits around 35 km north of the city centre, which makes the drive into town noticeably longer than at most Saudi airports — worth factoring in when you plan an arrival or a departure.",
    },
    {
      heading: "The Five Terminals",
      content: "RUH has five passenger terminals, numbered 1 to 5. Which one you use depends on your airline and on whether the flight is domestic or international, and airlines are sometimes moved between terminals. The terminal printed on your booking or boarding pass is the one to rely on.",
      list: [
        "Check your terminal in your airline's app or confirmation the day before you fly",
        "The terminals are separate buildings — confirm the right one before you travel to the airport",
        "Allow extra time if you are connecting between a domestic and an international flight",
      ],
    },
    {
      heading: "Terminal Pickups: Where Your Driver Meets You",
      content: "A pre-booked pickup works the same way at every terminal: your driver waits at the arrivals exit of the terminal your flight uses, holding a name board. Because the terminals are separate, the one detail that has to be right is the terminal number — which is why it is confirmed from your flight number rather than assumed.",
      list: [
        "Share your flight number when you book, and the terminal is confirmed from it",
        "Your flight is tracked, so the pickup time moves with any delay",
        "After baggage claim and customs, head for your terminal's arrivals exit",
        "If your terminal changes at the last minute, send a WhatsApp message and your driver moves to the right exit",
      ],
      cta: { text: "Arriving at RUH? Book a meet-and-greet pickup at your terminal.", link: "/riyadh-airport-taxi-service" },
    },
    {
      heading: "Getting to RUH for a Departure",
      content: "Allow at least 35–50 minutes from central Riyadh, and more during the weekday rush hours of roughly 7–9am and 4–7pm. Add the check-in time your airline advises — international flights generally need more than domestic ones.",
      list: [
        "Private transfer — collected from your hotel, home or office and dropped at your terminal's departures entrance",
        "Riyadh Metro — the Yellow Line serves the airport, convenient if you are staying near a station and travelling light",
        "Taxi or ride-hailing — widely available across the city",
      ],
    },
    {
      heading: "Getting from RUH into Riyadh",
      content: "The drive from the airport to central Riyadh usually takes 35–50 minutes, depending on traffic and where in the city you are staying. The options are a pre-booked private transfer, the Metro's Yellow Line, the airport taxi rank, or a ride-hailing app. A pre-booked transfer is the one that has a named driver waiting as you walk out, with the price agreed before you travel — especially useful after a long-haul flight or a late-night landing.",
    },
    {
      heading: "Travelling Onward from the Airport",
      content: "Many travellers landing at RUH are not staying in Riyadh at all. A private transfer can take you from the arrivals hall straight to another city, door to door, without a second flight or a change of vehicle in town.",
      table: {
        headers: ["From RUH to", "Good to know"],
        rows: [
          ["Makkah", "A long intercity journey west — popular with pilgrims who land in Riyadh"],
          ["Dammam, Khobar & the Eastern Province", "The main road east, often for business travel"],
          ["Bahrain", "Continues east across the King Fahd Causeway"],
          ["Kuwait, Qatar & the UAE", "Long-distance, cross-border journeys — plan documents in advance"],
        ],
      },
    },
    {
      heading: "Airport Facilities",
      content: "The terminals offer prayer rooms, currency exchange, food and retail outlets, business lounges and Wi-Fi. Facilities differ between terminals, so check your own terminal's options if you are arriving early or have a long wait.",
    },
    {
      heading: "Tips for First-Time Arrivals",
      content: "Collect your luggage and clear customs before looking for your driver at the arrivals exit. Keep your phone on after landing so the driver can reach you on WhatsApp. During Ramadan, Hajj season and Riyadh Season events, allow extra time for both arrival formalities and the drive into the city.",
    },
  ],
  faqs: [
    { q: "Which terminal will I arrive at?", a: "It depends on your airline and whether your flight is domestic or international. Check your booking or your airline's app — and share your flight number when you book a transfer so the terminal is confirmed from it." },
    { q: "Where exactly does my driver wait at King Khalid Airport?", a: "At the arrivals exit of your terminal, holding a name board. The pickup works the same way at Terminals 1, 2, 3, 4 and 5." },
    { q: "How do I get to RUH airport from central Riyadh?", a: "By private transfer, Metro (the Yellow Line serves the airport), taxi or ride-hailing. Allow at least 35–50 minutes by road, and more during weekday rush hours." },
    { q: "What if my flight is significantly delayed?", a: "Flights are tracked in real time, so your pickup time moves with the delay — you don't need to rebook." },
    { q: "Is there a meet-and-greet service at RUH?", a: "Yes — the standard pickup includes a name-board meet-and-greet at the arrivals exit. Assistance from the baggage hall can be requested for elderly travellers or those with mobility needs." },
    { q: "Can I travel straight from RUH to another city?", a: "Yes — door-to-door transfers run from the arrivals hall to Makkah, the Eastern Province, Bahrain and other long-distance destinations." },
    { q: "How far in advance should I book my RUH transfer?", a: "At least 24 hours ahead is recommended, especially in busy seasons. Same-day bookings are possible subject to availability." },
  ],
  relatedLinks: [
    { href: "/riyadh-airport-taxi-service", label: "Riyadh Airport Transfers", reason: "Book a meet-and-greet pickup at your RUH terminal." },
    { href: "/services/riyadh", label: "Riyadh Chauffeur & Taxi Service", reason: "Getting around the city once you've landed." },
    { href: "/riyadh-to-makkah-taxi-service", label: "Riyadh to Makkah Transfer", reason: "Door to door from the capital to the Haram area." },
    { href: "/riyadh-to-bahrain-taxi-service", label: "Riyadh to Bahrain Transfer", reason: "A long-distance journey east across the causeway." },
    { href: "/guides/business-travel", label: "Business Travel in Saudi Arabia", reason: "Planning meetings around arrival and departure days." },
    { href: "/blog/riyadh-to-jeddah-travel", label: "Riyadh to Jeddah Travel Options", reason: "Flying, driving or a private transfer — compared." },
  ],
  ctaText: "Book RUH Airport Transfer",
  ctaLink: "/riyadh-airport-taxi-service",
  closingHeading: "Arriving at King Khalid International?",
  ctaHelper: "A named driver at your terminal's arrivals exit, with your flight tracked and the price agreed before you travel.",
  lastReviewed: "September 2026",
};

export default function KingKhalidAirportGuide() {
  return <GuidePage data={data} />;
}
