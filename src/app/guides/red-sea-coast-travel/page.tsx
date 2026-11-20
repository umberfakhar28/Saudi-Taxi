import { generatePageMetadata } from "@/lib/seo";
import ArticlePage from "@/components/ArticlePage";
import type { ArticleData } from "@/lib/articles";

export const metadata = generatePageMetadata({
  title: "Saudi Red Sea Coast Travel Guide: Yanbu, Umluj & Al Wajh",
  brandSuffix: false,
  description: "How to reach Saudi Arabia's Red Sea coast: which airport for Umluj and the Red Sea Project, Yanbu to Umluj and Al Wajh by road, and luxury trips via AlUla.",
  path: "/guides/red-sea-coast-travel",
});

/*
 * Owner page for cluster F (docs/seo/content/content-audit.md §4).
 * 140 impressions, 0 clicks, position 11.4 (GSC 28 days to 19 Nov 2026).
 * Queries: "how should luxury travellers move between riyadh, alula and the
 * red sea?" 5 / 5.2, "red sea international airport umluj" 6 / 23,
 * "umluj to al wajh distance" 4, "neom taxi" 12.
 *
 * Coverage confirmed by the owner 14 Oct 2026: Umluj, Al Wajh and the Red
 * Sea Project — private taxi with driver, full-day bookings, transfers.
 *
 * Figures: OSRM 20 Nov 2026 — Yanbu–Umluj 147 km / 1.75 h, Umluj–Al Wajh
 * 170 km / 2.05 h, AlUla–Al Wajh 241 km / 4.1 h, AlUla–Umluj 310 km /
 * 4.8 h, Jeddah–Yanbu 330 km / 3.7 h, Madinah–Yanbu 240 km / 2.8 h. The
 * previous text gave Umluj–Al Wajh as about 4.5 hours; corrected.
 * Rounded and given as ranges: the coast road's published figures vary.
 * Resort arrival (boat, seaplane) is set by each property and not described.
 */

const data: ArticleData = {
  path: "/guides/red-sea-coast-travel",
  kind: "guide",
  topic: "destinations",
  h1: "Travelling Saudi Arabia's Red Sea Coast: Yanbu, Umluj, Al Wajh and the Red Sea Project",
  lead: "Pick the **airport** first: **Jeddah (JED)** for the south, **Yanbu (YNB)** for the central coast, **Red Sea International (RSI)** for the Red Sea Project and Umluj. Then go by road: **Yanbu to Umluj** is about **150 km** (around 2 hours) and **Umluj to Al Wajh** about **170 km** (2 to 2.5 hours). Public transport is thin, so most visitors use a car with a driver.",
  description: "Saudi Arabia's Red Sea coast: which airport to fly into, Yanbu to Umluj and Al Wajh by road, the Red Sea Project, luxury trips via AlUla, and when to go.",
  published: "2026-10-14",
  updated: "2026-11-20",
  quickAnswer: {
    stats: [
      { icon: "plane", label: "Airports", value: "JED · YNB · RSI · MED" },
      { icon: "route", label: "Yanbu to Umluj", value: "About 150 km, ~2 h" },
      { icon: "route", label: "Umluj to Al Wajh", value: "About 170 km, 2–2.5 h" },
      { icon: "calendar", label: "Best months", value: "October to April" },
    ],
    points: [
      "**Umluj:** fly into Red Sea International (RSI), the closest airport, or into Yanbu and drive about 2 hours north.",
      "**The Red Sea Project:** fly into RSI. Some resorts are reached by road, island ones by boat or seaplane arranged by the resort.",
      "**Luxury trips from Riyadh:** fly to AlUla, spend a few days, then go on to the coast by car with a driver (about 4 hours to Al Wajh) or by air.",
      "**Fuel and rest stops** thin out north of Yanbu. Start long legs early.",
    ],
  },
  cta: {
    heading: "Book a car with driver on the Red Sea coast",
    body: "Airport pickups at Yanbu, Jeddah and Red Sea International, transfers along the coast, and full-day bookings in Umluj and Al Wajh.",
    waMessage: "Hi, I'm planning a trip on the Red Sea coast. Arriving at (airport):  Going to:  Dates:  Passengers:",
    bookHref: "/book-online",
  },
  sections: [
    {
      id: "the-coast",
      heading: "Where the Red Sea coast begins and ends",
      toc: "The coast at a glance",
      blocks: [
        { type: "p", text: "Saudi Arabia's Red Sea shore runs for well over a thousand kilometres. For most visitors it starts at **Jeddah** and runs north through **Yanbu**, **Umluj** and **Al Wajh** to the **Red Sea Project**, with **NEOM** much further north. These are not neighbouring towns: each leg is a real drive, which is why the airport you choose shapes the trip." },
        {
          type: "table",
          head: ["Leg", "By road", "Driving time"],
          rows: [
            ["Jeddah to Yanbu", "About 330 km", "3.5–4 h"],
            ["Madinah to Yanbu", "About 240 km", "About 3 h"],
            ["Yanbu to Umluj", "About 150 km", "About 2 h"],
            ["Umluj to Al Wajh", "About 170 km", "2–2.5 h"],
            ["AlUla to Al Wajh", "About 240 km", "About 4 h"],
            ["AlUla to Umluj", "About 310 km", "4.5–5 h"],
          ],
          note: "Driving only, by map routing in November 2026. Published figures for this coast vary, so allow extra time and plan by hours, not kilometres.",
        },
      ],
    },
    {
      id: "airports",
      heading: "Which airport to fly into",
      toc: "Which airport",
      blocks: [
        {
          type: "table",
          head: ["Airport", "Where", "Best for"],
          rows: [
            ["King Abdulaziz International (JED)", "Jeddah", "The southern coast, and the most international flights"],
            ["Prince Mohammed bin Abdulaziz (MED)", "Madinah", "An inland gateway, about 3 hours by road to Yanbu"],
            ["Yanbu (YNB)", "Yanbu", "Yanbu and the central coast, including Umluj"],
            ["Red Sea International (RSI)", "Hanak, Tabuk Province", "The Red Sea Project resorts, Umluj and Al Wajh"],
          ],
          note: "Routes to the newer airports change often. Check current flights with the airline before booking anything else.",
        },
        { type: "cta" },
      ],
    },
    {
      id: "yanbu",
      heading: "Yanbu: the practical base for the central coast",
      toc: "Yanbu",
      blocks: [
        { type: "p", text: "Yanbu is a working port city on very good water. That gives it what the newer places further north lack: hotels at several prices, its own airport, and good roads to Madinah and Jeddah. Dive sites sit both north and south of the city. See [Yanbu with a driver](/services/yanbu) and [Yanbu Airport transfers](/yanbu-airport-taxi-service)." },
      ],
    },
    {
      id: "umluj-al-wajh",
      heading: "Umluj and Al Wajh",
      toc: "Umluj and Al Wajh",
      blocks: [
        { type: "p", text: "**Umluj** is a small town about 150 km north of Yanbu. The draw is offshore: low islands and sandbars reached by boat from the harbour. Accommodation is limited, so many visitors come for a day or a night from Yanbu, or fly into RSI." },
        { type: "p", text: "**Al Wajh** is about 170 km further north, 2 to 2.5 hours by road, and is the nearest established town to the Red Sea Project area. Between the two the road is long and open, with few services." },
        { type: "list", items: [
          "Public transport is indirect: buses tend to run inland via Madinah, which turns a 2-hour drive into most of a day.",
          "Boat trips to Umluj's islands leave from the town harbour.",
          "Mobile coverage is good in towns and patchy between them.",
        ] },
        { type: "p", text: "See [Umluj transfers and a private driver](/services/umluj), which covers Al Wajh and the Red Sea Project too." },
      ],
    },
    {
      id: "red-sea-project",
      heading: "The Red Sea Project and Red Sea International Airport",
      toc: "The Red Sea Project",
      blocks: [
        { type: "p", text: "The Red Sea Project is a purpose-built resort area on the northern coast, and the reason Red Sea International Airport (RSI) exists. How you reach your hotel depends on the property: some are on the mainland or on islands linked by road; others are on outer islands, reached by boat or seaplane arranged by the resort." },
        { type: "callout", tone: "info", text: "Read your resort's arrival instructions before booking ground transport. We can collect you at RSI or drive you to the resort's own transfer point." },
      ],
    },
    {
      id: "luxury-route",
      heading: "How luxury travellers move between Riyadh, AlUla and the Red Sea",
      toc: "Riyadh, AlUla and the Red Sea",
      blocks: [
        { type: "p", text: "The three are far apart, so the comfortable plan combines short flights with a private car and driver on the ground." },
        {
          type: "timeline",
          items: [
            { when: "Riyadh", title: "Fly to AlUla", body: "A domestic flight to AlUla (ULH) instead of a full day on the road. Your driver meets you at arrivals." },
            { when: "AlUla · 2–3 days", title: "A driver for the heritage sites", body: "Hegra, Elephant Rock and the old town are spread out with timed entries. One driver for each day keeps it simple.", },
            { when: "AlUla to the coast", title: "By road or by air", body: "About 4 hours by road to Al Wajh, or 4.5 to 5 hours to Umluj, in an SUV or executive car with rest stops. Or fly to RSI, if a flight suits your dates." },
            { when: "The Red Sea", title: "Resort days, then home", body: "Your resort's own transfer for island hotels, a car for mainland ones, then RSI or Jeddah for the flight home." },
          ],
        },
        { type: "p", text: "See [AlUla with a driver](/services/alula), [AlUla Airport taxi](/alula-airport-taxi-service) and our [AlUla travel guide](/blog/alula-complete-guide)." },
      ],
    },
    {
      id: "coast-road",
      heading: "Driving the coast road",
      toc: "The coast road",
      blocks: [
        { type: "list", items: [
          "Plan by driving time; published distances on this coast disagree.",
          "Fuel and rest stops thin out north of Yanbu. Fill up before long legs.",
          "Start long legs in the morning so you drive in daylight.",
          "A pre-booked car avoids depending on limited buses.",
        ] },
        { type: "callout", tone: "tip", title: "Going further north?", text: "NEOM and Tabuk are beyond Al Wajh (Tabuk is about 350 km from Al Wajh). See [NEOM transfers](/services/neom) and [Tabuk with a driver](/services/tabuk)." },
      ],
    },
    {
      id: "when-to-go",
      heading: "When to go",
      toc: "When to go",
      blocks: [
        { type: "p", text: "October to April is calmest at sea and most comfortable ashore, and most diving and boat trips are planned for it. Summer is hot enough to change a trip: outdoor time moves to early morning and evening, and sea conditions are less reliable. The months at either end of the season balance water conditions and availability best." },
      ],
    },
  ],
  faqs: [
    { q: "Which airport is closest to Umluj?", a: "Red Sea International (RSI) is the nearest airport to Umluj. From the central coast, Yanbu (YNB) is the alternative, about 150 km and 2 hours south by road." },
    { q: "How far is Umluj from Al Wajh?", a: "About 170 km by road, roughly 2 to 2.5 hours of driving along the coast." },
    { q: "Can you drive from Yanbu to Umluj?", a: "Yes. It is about 150 km up the coast road, around 2 hours. Allow extra time for stops." },
    { q: "How do luxury travellers get from Riyadh to AlUla and the Red Sea?", a: "Usually a flight from Riyadh to AlUla, a driver for the days in AlUla, then a car with driver to the coast (about 4 hours to Al Wajh) or a flight to Red Sea International." },
    { q: "How do you reach the Red Sea Project's island resorts?", a: "It depends on the property. Some are reached by road; outer-island resorts by boat or seaplane arranged by the resort. Check your hotel's arrival instructions first." },
    { q: "Is there public transport along the Red Sea coast?", a: "Very little. There is no quick bus between Yanbu and Umluj; routes generally run inland via Madinah. Most visitors drive or book a car with driver." },
    { q: "When is the best time to visit the Saudi Red Sea coast?", a: "October to April, when the sea is calmest and the weather comfortable." },
  ],
  routes: [
    { href: "/services/umluj", title: "Umluj with a driver", body: "Transfers and full days, including Al Wajh and the Red Sea Project.", icon: "waves" },
    { href: "/services/yanbu", title: "Yanbu with a driver", body: "City, dive sites and the coast road.", icon: "waves" },
    { href: "/yanbu-airport-taxi-service", title: "Yanbu Airport taxi", body: "Pickup at YNB arrivals.", icon: "plane" },
    { href: "/services/alula", title: "AlUla with a driver", body: "Hegra and the heritage sites, by the day.", icon: "map" },
    { href: "/jeddah-airport-taxi-service", title: "Jeddah Airport transfers", body: "The southern gateway to the coast.", icon: "plane" },
    { href: "/services/neom", title: "NEOM transfers", body: "Further north, beyond Al Wajh and Tabuk.", icon: "route" },
  ],
  related: ["/blog/alula-complete-guide", "/blog/family-saudi-destinations", "/guides/long-distance-private-transfers"],
  sourcesNote: "Road distances and times: map routing (OSRM), checked 20 November 2026, rounded. Coverage of Umluj, Al Wajh and the Red Sea Project confirmed 14 October 2026.",
};

export default function RedSeaCoastTravelGuide() {
  return <ArticlePage data={data} />;
}
