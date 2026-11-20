import { generatePageMetadata } from "@/lib/seo";
import ArticlePage from "@/components/ArticlePage";
import type { ArticleData } from "@/lib/articles";

export const metadata = generatePageMetadata({
  title: "Jeddah Airport (JED) Guide: Terminal 1, T4 & Hajj Terminal",
  brandSuffix: false,
  description: "King Abdulaziz Airport guide: Terminal 1, the new Terminal 4, the Hajj and Umrah Terminal halls, meeting your driver, and the drive to Makkah and Madinah.",
  path: "/guides/king-abdulaziz-airport",
});

/*
 * Owner page for cluster E2 (docs/seo/content/content-audit.md §4).
 * Queries (GSC 28 days to 19 Nov 2026): "haj terminal b taxi" 30 / 5.1,
 * "jeddah airport transfer" 34 / 40.4 (booking intent: that one belongs to
 * /jeddah-airport-taxi-service, linked prominently).
 *
 * Rewritten 20 Nov 2026. The old text described "North (T1) and South (T2)"
 * terminals, which has been wrong since 2021. Current layout, from press
 * reports Sep–Oct 2026 (Khaleej Times, Saudi Gazette, Zawya):
 *   - Terminal 1: the main terminal.
 *   - Terminal 4: the rebuilt former South Terminal, gradual operations from
 *     27 Sep 2026, airlines moving in phases.
 *   - The Hajj and Umrah Terminal complex: halls with codes such as B3.
 *   - North Terminal flights moved to T4 and the Hajj and Umrah halls from
 *     17 Oct 2026.
 * Airline allocations are still moving, so no airline list: the terminal is
 * confirmed from the flight number.
 *
 * Figures: OSRM 20 Nov 2026 — airport to the Haram ~100 km / ~1.5 h,
 * airport to Madinah ~400 km / ~4.7 h, airport to central Jeddah ~18 km.
 * The route page gives ~420 km / ~4.5 h for Madinah; kept as "about 420 km".
 */

const data: ArticleData = {
  path: "/guides/king-abdulaziz-airport",
  kind: "guide",
  topic: "airports",
  h1: "King Abdulaziz International Airport, Jeddah (JED): Terminals, the Hajj Terminal and Getting to Makkah",
  lead: "Jeddah airport now has **three passenger areas**: **Terminal 1** (the main terminal), the new **Terminal 4** (opened in stages from September 2026) and the **Hajj and Umrah Terminal**, whose halls carry codes such as **B3**. Airlines are still moving between them, so go by your ticket. From any of them, **Makkah's Haram area is about 100 km**, roughly **1.5 hours** by car.",
  description: "A guide to Jeddah's King Abdulaziz International Airport: Terminal 1, Terminal 4, the Hajj and Umrah Terminal, meeting your driver, and transfers to Makkah and Madinah.",
  published: "2025-06-01",
  updated: "2026-11-20",
  quickAnswer: {
    stats: [
      { icon: "plane", label: "Terminals", value: "T1, T4, Hajj & Umrah Terminal" },
      { icon: "route", label: "To Makkah (Haram)", value: "About 100 km, ~1.5 h" },
      { icon: "route", label: "To Madinah", value: "About 420 km, ~4.5 h" },
      { icon: "building", label: "To central Jeddah", value: "About 18 km" },
    ],
    points: [
      "**Hajj Terminal pickups:** the driver waits at your hall's arrivals exit. Send the flight number and the hall code on your ticket (for example B3).",
      "**Terminal 4** is the rebuilt old South Terminal. Airlines began moving there on 27 September 2026, and more are moving in phases.",
      "**North Terminal** flights moved to Terminal 4 and the Hajj and Umrah halls in October 2026.",
      "**Going to Makkah:** a private car is door to door to your hotel; the Haramain train runs from the Terminal 1 station.",
    ],
  },
  cta: {
    heading: "Book a pickup at Jeddah airport",
    body: "A driver at your terminal or hall with a name board, flight tracked, to Jeddah, Makkah or Madinah. 24 hours a day.",
    waMessage: "Hi, I need a pickup at Jeddah airport. Flight number:  Terminal or hall (if known):  Going to:  Passengers and bags:",
    bookHref: "/jeddah-airport-taxi-service",
    route: "Jeddah Airport-Makkah",
  },
  sections: [
    {
      id: "terminals",
      heading: "Jeddah airport's terminals in 2026",
      toc: "The terminals",
      blocks: [
        {
          type: "table",
          head: ["Terminal", "What it is", "Good to know"],
          rows: [
            ["Terminal 1", "The main terminal, used by most airlines", "Has the airport's Haramain train station"],
            ["Terminal 4", "The rebuilt former South Terminal, open in stages since 27 Sep 2026", "Airlines are moving here in phases"],
            ["Hajj and Umrah Terminal", "A separate complex of halls, used for Hajj and Umrah flights and some regular flights", "Halls carry codes such as B3; check your ticket"],
          ],
          note: "The North Terminal's flights moved to Terminal 4 and the Hajj and Umrah halls from 17 October 2026. Some airline websites are out of date, so confirm your terminal with the airline before you fly.",
        },
        { type: "callout", tone: "info", title: "Don't rely on a list", text: "Terminal allocations at Jeddah are changing through late 2026. Share your flight number when you book and we confirm the terminal from it." },
      ],
    },
    {
      id: "hajj-terminal",
      heading: "Taxi from the Hajj Terminal: how pickup works",
      toc: "Hajj Terminal pickups",
      blocks: [
        { type: "p", text: "The Hajj and Umrah Terminal is separate from Terminal 1, with its own halls and its own pickup areas. That is why the hall matters: a driver at the wrong hall is a long way from you." },
        {
          type: "timeline",
          items: [
            { when: "When you book", title: "Send the flight number and the hall", body: "If your ticket or airline shows a hall code such as B3, include it. If not, the flight number is enough; we check it." },
            { when: "After landing", title: "Immigration, bags and Zamzam", body: "Clear passport control and collect your bags. Arrivals in busy seasons can take a while, and the flight is tracked, so the driver waits." },
            { when: "At the exit", title: "Find the name board", body: "Your driver waits at your hall's arrivals exit with a name board. Keep your phone on for a WhatsApp message." },
            { when: "On the road", title: "To Makkah, Madinah or Jeddah", body: "Straight to your hotel, about 1.5 hours to the Haram area in Makkah." },
          ],
        },
        { type: "callout", tone: "warn", title: "Avoid unofficial drivers", text: "People offering rides inside the halls are not licensed taxis, and the price is set on the spot. Use your pre-booked driver, the official taxi rank, or a ride-hailing app's pickup zone." },
        { type: "cta" },
      ],
    },
    {
      id: "terminal-1-and-4",
      heading: "Meeting your driver at Terminal 1 or Terminal 4",
      toc: "Terminal 1 and 4 pickups",
      blocks: [
        { type: "p", text: "It works the same way: after baggage claim and customs, walk out through arrivals and look for your name board. If your airline has just moved to Terminal 4, your booking moves with it; tell us if your ticket shows a change." },
      ],
    },
    {
      id: "to-makkah",
      heading: "From Jeddah airport to Makkah",
      toc: "To Makkah",
      blocks: [
        {
          type: "table",
          head: ["Option", "Door to door?", "Good to know"],
          rows: [
            ["Private car", "Yes, to your hotel", "About 1.5 hours; Ihram-friendly; the car size fits your group and bags"],
            ["Haramain train", "No, station to station", "From the Terminal 1 station to Makkah station; you need a car to the hotel"],
            ["Taxi rank or app", "Yes", "Price set on the spot; check that the car fits your luggage"],
          ],
          highlightRow: 0,
        },
        { type: "p", text: "Allow more time in Ramadan and the weeks before Hajj, when the roads into Makkah are at their busiest. Book on our [Jeddah to Makkah taxi](/jeddah-to-makkah-taxi-service) page." },
      ],
    },
    {
      id: "to-madinah",
      heading: "From Jeddah airport to Madinah",
      toc: "To Madinah",
      blocks: [
        { type: "p", text: "Starting your trip in Madinah? It is about 420 km by road, around 4.5 hours, with a rest stop. A private car takes you straight from arrivals to your hotel, and no Ihram is needed for this leg. The Haramain train is the alternative, station to station. See [Jeddah Airport to Madinah taxi](/jeddah-airport-to-madinah-taxi-service)." },
      ],
    },
    {
      id: "pilgrim-tips",
      heading: "Tips for arriving pilgrims",
      toc: "Tips for pilgrims",
      blocks: [
        { type: "list", items: [
          "**Book before you fly**, especially in Ramadan and Dhul Qadah. Two days ahead is sensible in peak weeks.",
          "**Give the hotel name** in Makkah or Madinah, so the driver can plan the closest drop-off.",
          "**Families and groups:** a van seats up to 9 with luggage; for more, two cars are sent together.",
          "**Older relatives:** ask for a car with a lower step, and for help with bags at the exit.",
          "**Zamzam:** official Zamzam water counters are in the terminals for departing pilgrims; carry your passport.",
        ] },
        { type: "p", text: "More on the whole trip in our [Umrah transportation guide](/guides/umrah-transportation)." },
      ],
    },
  ],
  faqs: [
    { q: "How do I get a taxi from the Hajj Terminal at Jeddah airport?", a: "Pre-book a driver with your flight number and, if you have it, the hall code on your ticket (such as B3). The driver waits at that hall's arrivals exit with a name board. The official taxi rank and ride-hailing pickup zones are the alternatives." },
    { q: "What is Terminal 4 at Jeddah airport?", a: "The rebuilt former South Terminal. It began operating in stages on 27 September 2026, and airlines are moving there in phases. Confirm your terminal with your airline." },
    { q: "Is the North Terminal still used?", a: "Flights from the North Terminal were moved to Terminal 4 and the Hajj and Umrah halls from 17 October 2026." },
    { q: "How far is Jeddah airport from Makkah?", a: "About 100 km to the Haram area, roughly 1.5 hours by car, longer in Ramadan and the Hajj season." },
    { q: "Can I take the train from Jeddah airport to Makkah?", a: "Yes, the Haramain train runs from the Terminal 1 station to Makkah. It is station to station, so you need a car from Makkah station to your hotel." },
    { q: "How far is Jeddah airport from Madinah?", a: "About 420 km by road, around 4.5 hours." },
    { q: "Can you pick up a large family with lots of luggage?", a: "Yes. A van seats up to 9 with luggage, and larger groups get two or more cars together." },
  ],
  routes: [
    { href: "/jeddah-airport-taxi-service", title: "Jeddah Airport taxi", body: "Book a pickup at any terminal or hall.", icon: "plane" },
    { href: "/jeddah-to-makkah-taxi-service", title: "Jeddah to Makkah taxi", body: "Door to door to your hotel near the Haram.", icon: "car" },
    { href: "/jeddah-airport-to-madinah-taxi-service", title: "Jeddah Airport to Madinah", body: "About 420 km, straight from arrivals.", icon: "car" },
    { href: "/airport-transfer-for-umrah", title: "Airport transfer for Umrah", body: "Pickups planned around the Umrah.", icon: "moon" },
    { href: "/umrah-transport-package", title: "Umrah transport package", body: "Airport, Makkah, Madinah and ziyarat in one booking.", icon: "route" },
    { href: "/services/jeddah", title: "Jeddah with a driver", body: "Hotels, the Corniche and Al-Balad.", icon: "building" },
  ],
  related: ["/guides/umrah-transportation", "/guides/king-khalid-airport", "/blog/umrah-travel-planning"],
  sourcesNote: "Terminal changes: airport announcements reported in September and October 2026. Distances: map routing (OSRM) and our route pages, checked 20 November 2026.",
};

export default function KingAbdulazizAirportGuide() {
  return <ArticlePage data={data} />;
}
