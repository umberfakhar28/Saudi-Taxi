import { generatePageMetadata } from "@/lib/seo";
import ArticlePage from "@/components/ArticlePage";
import type { ArticleData } from "@/lib/articles";

export const metadata = generatePageMetadata({
  title: "Riyadh Airport (RUH): Terminals, Pickups and Late Arrivals",
  brandSuffix: false,
  description: "King Khalid International Airport guide: the five terminals, where your driver meets you at T1 to T5, late-night arrivals, and getting into Riyadh.",
  path: "/guides/king-khalid-airport",
});

/*
 * Owner page for cluster E1 (docs/seo/content/content-audit.md §4).
 * Queries (GSC 28 days to 19 Nov 2026): "ruh terminal 4 pickup" 15 / 12.3,
 * "ruh terminal 3 pickup" 14 / 11.8, "how to get to ruh airport" 2 / 17,
 * "are taxis 24/7 at riyadh airport, including late-night arrivals?" 5.
 * The booking intent ("riyadh airport taxi") stays with
 * /riyadh-airport-taxi-service.
 *
 * Kept from the September review: no airline-by-terminal list (RUH moved
 * airlines between terminals in 2026 and sources disagree; the terminal is
 * confirmed from the flight number); the Metro line is the Yellow Line;
 * night pickups can carry a night charge, which is inside the quoted price
 * (utils/pricing.ts), so no "no surcharge" claim.
 *
 * Fares quoted are the route pages' "starting from" fares from Riyadh.
 */

const data: ArticleData = {
  path: "/guides/king-khalid-airport",
  kind: "guide",
  topic: "airports",
  h1: "King Khalid International Airport (RUH): Terminals, Pickups and Late Arrivals",
  lead: "Riyadh's airport is about **35 km north of the city centre**, a **35 to 50 minute** drive. It has **five terminals**, and yours depends on the airline and flight, so go by your booking. A pre-booked driver waits at **your terminal's arrivals exit** with a name board, **24 hours a day**, including after midnight.",
  description: "A guide to King Khalid International Airport in Riyadh: the five terminals, meeting your driver, late-night arrivals, and getting into the city.",
  published: "2026-09-13",
  updated: "2026-11-20",
  quickAnswer: {
    stats: [
      { icon: "plane", label: "Terminals", value: "Five: T1 to T5" },
      { icon: "route", label: "To central Riyadh", value: "About 35 km, 35–50 min" },
      { icon: "clock", label: "Pickups", value: "24 hours, every terminal" },
      { icon: "train", label: "Metro", value: "Yellow Line to the airport" },
    ],
    points: [
      "**Which terminal?** The one on your booking or boarding pass. Share the flight number when you book and the terminal is confirmed from it.",
      "**Terminal 3 and 4 pickups** work like every other terminal: the driver waits at that terminal's arrivals exit.",
      "**Late at night:** pre-booked pickups run around the clock. Any night charge is already in the price you're quoted.",
      "**Into the city:** a private car, the Metro Yellow Line, the taxi rank or a ride-hailing app.",
    ],
  },
  cta: {
    heading: "Book a pickup at Riyadh airport",
    body: "A driver at your terminal's arrivals exit with a name board, flight tracked, price agreed before you fly. Day or night.",
    waMessage: "Hi, I need a pickup at Riyadh airport (RUH). Flight number:  Date:  Going to:  Passengers and bags:",
    bookHref: "/riyadh-airport-taxi-service",
  },
  sections: [
    {
      id: "terminals",
      heading: "The five terminals",
      toc: "The five terminals",
      blocks: [
        { type: "p", text: "RUH has five passenger terminals, numbered 1 to 5. Your terminal depends on your airline and whether the flight is domestic or international, and airlines do move between terminals. Trust the terminal printed on your booking, not a list online." },
        { type: "list", items: [
          "Check the terminal in your airline's app the day before you fly.",
          "The terminals are separate buildings, so get the right one before you set off for a departure.",
          "Allow extra time to connect between a domestic and an international flight.",
        ] },
      ],
    },
    {
      id: "terminal-pickups",
      heading: "Terminal pickups: where your driver meets you",
      toc: "Terminal pickups (T1–T5)",
      blocks: [
        {
          type: "table",
          head: ["Terminal", "Where the driver waits", "What to do"],
          rows: [
            ["Terminal 1", "Arrivals exit, with a name board", "After customs, walk out through arrivals"],
            ["Terminal 2", "Arrivals exit, with a name board", "After customs, walk out through arrivals"],
            ["Terminal 3", "Arrivals exit, with a name board", "After baggage claim, follow signs to the exit"],
            ["Terminal 4", "Arrivals exit, with a name board", "After baggage claim, follow signs to the exit"],
            ["Terminal 5", "Arrivals exit, with a name board", "After baggage claim, follow signs to the exit"],
          ],
          note: "The pickup works the same at every terminal. The one detail that must be right is the terminal number, which is why it is confirmed from your flight number.",
        },
        { type: "list", items: [
          "Your flight is tracked, so the pickup moves with any delay.",
          "Keep your phone on after landing so the driver can reach you on WhatsApp.",
          "If the terminal changes at the last minute, send a WhatsApp message and the driver moves.",
        ] },
        { type: "cta" },
      ],
    },
    {
      id: "late-night",
      heading: "Late-night arrivals: are taxis 24/7 at Riyadh airport?",
      toc: "Late-night arrivals",
      blocks: [
        { type: "p", text: "Yes. Many long-haul flights land in Riyadh after midnight, and pre-booked pickups run around the clock at all five terminals. The airport taxi rank and ride-hailing apps also work at night, but waits can be longer and the price is only known on the spot." },
        {
          type: "cards",
          items: [
            { icon: "moon", title: "Book before you fly", body: "A booked driver is waiting when you walk out, whatever the hour, with the flight tracked if you land late." },
            { icon: "wallet", title: "Night charge, already included", body: "Pickups late at night can carry a night charge. It is inside the price you're quoted, so there is nothing extra to pay on arrival." },
            { icon: "users", title: "Families and groups", body: "Choose the car size when you book, so a family with luggage isn't waiting for a big enough taxi at 3 am." },
            { icon: "hotel", title: "Hotel check-in", body: "Arriving before check-in time? Tell your hotel in advance, or ask the driver to take you somewhere for breakfast first." },
          ],
        },
      ],
    },
    {
      id: "into-riyadh",
      heading: "Getting from RUH into Riyadh",
      toc: "Getting into Riyadh",
      blocks: [
        {
          type: "table",
          head: ["Option", "Good for", "Good to know"],
          rows: [
            ["Pre-booked private car", "Families, luggage, late arrivals, business", "Driver waiting at arrivals; price agreed before you fly"],
            ["Riyadh Metro, Yellow Line", "Light luggage, staying near a station", "Serves the airport; you may need a ride from your stop"],
            ["Airport taxi rank", "A quick ride without booking", "Price set on the spot; check before you set off"],
            ["Ride-hailing app", "Solo travellers who know the city", "Pickup zones vary by terminal"],
          ],
          highlightRow: 0,
        },
        { type: "p", text: "The drive to central Riyadh (Olaya, KAFD) usually takes 35 to 50 minutes, longer in the weekday rush hours of roughly 7 to 9 am and 4 to 7 pm." },
      ],
    },
    {
      id: "departures",
      heading: "Getting to RUH for a departure",
      toc: "Departures",
      blocks: [
        { type: "p", text: "From central Riyadh allow at least 35 to 50 minutes, more in rush hour, plus your airline's check-in time; international flights need more. A private car drops you at your terminal's departures entrance." },
        { type: "callout", tone: "tip", text: "Tell us your terminal when you book a departure. If you don't know it yet, send the flight number and we'll check." },
      ],
    },
    {
      id: "onward",
      heading: "Travelling on from the airport",
      toc: "Onward from RUH",
      blocks: [
        { type: "p", text: "Many people landing at RUH are not staying in Riyadh. A private car can take you from arrivals straight to another city or country." },
        {
          type: "table",
          head: ["From Riyadh to", "Good to know"],
          rows: [
            ["[Makkah](/riyadh-to-makkah-taxi-service)", "A long trip west, popular with pilgrims landing in Riyadh"],
            ["Dammam and Al Khobar", "About 400 km east on Highway 40. [Distance](/distance/riyadh-to-dammam)"],
            ["[Bahrain](/riyadh-to-bahrain-taxi-service)", "Across the King Fahd Causeway, starting from 1,250 SAR"],
            ["[Qatar](/riyadh-to-qatar-taxi-service)", "Via the Salwa border, starting from 1,700 SAR"],
            ["[Kuwait](/riyadh-to-kuwait-taxi-service)", "About 648 km, starting from 220 KWD"],
          ],
          note: "Fares are per car, one way, from Riyadh; prices may vary with date and availability.",
        },
      ],
    },
    {
      id: "facilities",
      heading: "Airport facilities and first-time tips",
      toc: "Facilities and tips",
      blocks: [
        { type: "p", text: "The terminals have prayer rooms, currency exchange, food and shops, lounges and Wi-Fi; facilities differ by terminal. Collect your bags and clear customs before looking for your driver. During Ramadan, the Hajj season and Riyadh Season events, allow extra time for arrival and the drive." },
      ],
    },
  ],
  faqs: [
    { q: "Which terminal will I arrive at in Riyadh?", a: "It depends on your airline and flight. Check your booking or the airline's app, and share your flight number when you book a pickup so the terminal is confirmed from it." },
    { q: "Where does my driver wait at RUH Terminal 3 or 4?", a: "At the arrivals exit of that terminal, holding a name board. Pickups work the same way at all five terminals." },
    { q: "Are taxis available 24/7 at Riyadh airport, including late at night?", a: "Yes. Pre-booked pickups run 24 hours at every terminal. Any night charge is included in the price you're quoted, so there is nothing extra to pay on arrival." },
    { q: "How do I get to RUH airport from central Riyadh?", a: "By private car, the Metro Yellow Line, a taxi or a ride-hailing app. Allow at least 35 to 50 minutes by road, more in rush hour." },
    { q: "How far is Riyadh airport from the city centre?", a: "About 35 km north of central Riyadh, usually 35 to 50 minutes by car." },
    { q: "What if my flight is delayed?", a: "Flights are tracked, so the pickup moves with the delay. You don't need to rebook." },
    { q: "Can I go straight from RUH to another city?", a: "Yes. Door-to-door cars run from arrivals to Makkah, the Eastern Province, Bahrain, Qatar and Kuwait." },
  ],
  routes: [
    { href: "/riyadh-airport-taxi-service", title: "Riyadh Airport taxi", body: "Book a pickup at any RUH terminal.", icon: "plane" },
    { href: "/services/riyadh", title: "Riyadh with a driver", body: "City days and meetings once you've landed.", icon: "building" },
    { href: "/riyadh-to-bahrain-taxi-service", title: "Riyadh to Bahrain taxi", body: "Across the causeway, starting from 1,250 SAR.", icon: "car" },
    { href: "/riyadh-to-makkah-taxi-service", title: "Riyadh to Makkah taxi", body: "Door to door to your hotel in Makkah.", icon: "car" },
    { href: "/riyadh-alternative-airports", title: "Riyadh's other airports", body: "When another airport suits your trip better.", icon: "plane" },
    { href: "/airport-transfers", title: "All airport transfers", body: "Every major Saudi airport.", icon: "plane" },
  ],
  related: ["/guides/king-abdulaziz-airport", "/guides/business-travel", "/blog/airport-transfer-tips"],
  sourcesNote: "Terminal allocations change; the terminal is always confirmed from your flight number. Fares: our route pages.",
};

export default function KingKhalidAirportGuide() {
  return <ArticlePage data={data} />;
}
