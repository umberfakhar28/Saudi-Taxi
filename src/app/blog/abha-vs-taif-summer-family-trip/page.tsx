import { generatePageMetadata } from "@/lib/seo";
import ArticlePage from "@/components/ArticlePage";
import type { ArticleData } from "@/lib/articles";

export const metadata = generatePageMetadata({
  title: "Abha vs Taif for a Summer Family Trip: Which to Choose",
  brandSuffix: false,
  description: "Abha or Taif with children? Climate, getting there from Jeddah, Riyadh or Qatar, what kids can do, and a 3-day Abha and 2-day Taif itinerary.",
  path: "/blog/abha-vs-taif-summer-family-trip",
});

/*
 * New post, approved 20 Nov 2026 (docs/seo/content/content-audit.md §6).
 * Cluster A4. Queries (GSC 28 days to 19 Nov 2026):
 *   "plan an itinerary for abha for a family with kids" 19 / 8.2
 *   "abha or taif for a summer family trip from qatar" 5 / 3.8
 * The family hub (/blog/family-saudi-destinations) gives each city one card
 * and links here for the comparison and day plans.
 *
 * Figures: OSRM 20 Nov 2026 — Jeddah–Taif ~170 km, Makkah–Taif ~90 km,
 * Taif–Al Hada ~20 km, Taif–Al Shafa ~30 km, Taif airport–city ~30 km,
 * Abha airport–city ~21 km, Abha–Al Soudah ~25 km, Abha–Habala ~45 km,
 * Doha–Taif ~1,370 km, Doha–Abha ~1,525 km. Abha–Jeddah 690 km and
 * Abha–Riyadh 950 km from the distance pages. Elevations rounded.
 * No fares: neither city has a fixed-fare route page.
 */

const data: ArticleData = {
  path: "/blog/abha-vs-taif-summer-family-trip",
  kind: "blog",
  topic: "family",
  h1: "Abha vs Taif for a Summer Family Trip: Which to Choose",
  lead: "Choose **Abha** for a longer summer break: it is higher, cooler and greener, with more to fill three or four days. Choose **Taif** for a short trip, especially from **Jeddah or Makkah**: it is about **170 km** from Jeddah by road, so you can drive there, while Abha means a flight from almost everywhere, Qatar included.",
  description: "Abha or Taif for a family summer trip: climate, getting there from Jeddah, Riyadh or Qatar, things to do with children, and day-by-day plans.",
  published: "2026-11-20",
  updated: "2026-11-20",
  quickAnswer: {
    stats: [
      { icon: "mountain", label: "Altitude", value: "Abha ~2,200 m · Taif ~1,800 m" },
      { icon: "car", label: "From Jeddah by road", value: "Taif ~170 km · Abha ~690 km" },
      { icon: "calendar", label: "Days to plan", value: "Abha 3–4 · Taif 1–2" },
      { icon: "plane", label: "From Qatar", value: "Fly to either" },
    ],
    points: [
      "**Abha:** cooler, greener and more to do. Best for a 3- to 4-day stay with children of any age.",
      "**Taif:** closer and simpler. Best as a 1- or 2-day trip from Jeddah or Makkah, or with very young children.",
      "**From Qatar:** both are well over 1,300 km by road, so fly. Abha suits the longer stay that justifies the flight.",
      "**Getting around:** in both cities the sights are 20 to 45 km apart on mountain roads, so a car with a driver for the day is the easy option.",
    ],
  },
  cta: {
    heading: "Book a car with driver in Abha or Taif",
    body: "Airport pickup, a driver for mountain days out, and child seats on request. Tell us your dates and who is travelling.",
    waMessage: "Hi, we're planning a family trip to Abha / Taif. Dates:  Arriving at (airport or city):  Adults and children (ages):",
    bookHref: "/book-online",
  },
  sections: [
    {
      id: "comparison",
      heading: "Abha and Taif compared",
      toc: "Side-by-side comparison",
      blocks: [
        {
          type: "table",
          head: ["", "Abha", "Taif"],
          rows: [
            ["Altitude", "About 2,200 m, in the Asir mountains", "About 1,800 m, above Makkah"],
            ["Summer feel", "The cooler of the two; mist and showers are common on summer afternoons", "Warm, dry days and cool evenings; far milder than Jeddah"],
            ["From Jeddah", "About 690 km by road: fly", "About 170 km, 2–2.5 h by road"],
            ["From Makkah", "Fly from Jeddah", "About 90 km, 1–1.5 h by road"],
            ["From Riyadh", "About 950 km: fly", "About 790 km: fly"],
            ["From Qatar", "Fly (about 1,525 km by road)", "Fly (about 1,370 km by road)"],
            ["Airport to city", "About 21 km", "About 30 km"],
            ["What kids love", "Green Mountain at night, Al Soudah, the hanging village of Habala", "The Al Hada road, Al Rudaf park's rocks, rose farms in spring"],
            ["Days to plan", "3 to 4", "1 to 2"],
          ],
        },
        { type: "callout", tone: "tip", title: "Which one for us?", text: "Coming from Jeddah or Makkah for a weekend: **Taif**. Flying in for most of a week, or from Qatar or Riyadh: **Abha**. With a baby or a toddler who dislikes long car days: **Taif**, where everything is close." },
      ],
    },
    {
      id: "abha-3-days",
      heading: "A 3-day Abha itinerary for a family with kids",
      toc: "3 days in Abha",
      blocks: [
        { type: "p", text: "Abha's sights sit around the city on mountain roads: Al Soudah about 25 km away, Habala about 45 km. Plan one outing a day and keep afternoons free for rest or a park." },
        {
          type: "timeline",
          items: [
            { when: "Day 1", title: "Arrive, then Green Mountain at night", body: "Pickup at Abha airport, about 20 minutes into the city. Rest, then drive up Green Mountain (Jabal Al Akhdar) after dark, when the city lights below and the cooler air make it a family favourite." },
            { when: "Day 2", title: "Al Soudah and the mountain air", body: "Head up to Al Soudah in the morning, among the highest ground in the country, for juniper forest, viewpoints and picnic spots. Back to Abha for lunch and a quiet afternoon; Art Street and the Al Muftaha arts village are easy evening walks." },
            { when: "Day 3", title: "Habala or Rijal Almaa", body: "Choose one: the cliff village of Habala, about 45 km away, or the stone towers of Rijal Almaa, down a steep escarpment road. Both are full half-days, so leave after breakfast." },
          ],
        },
        { type: "callout", tone: "info", text: "Mountain attractions and cable cars sometimes close for weather or works. Check opening on the day; your driver can switch the plan if one is closed." },
        { type: "cta", heading: "Planning Abha with children?", body: "Book an airport pickup and a driver by the day, with child seats fitted." },
      ],
    },
    {
      id: "taif-2-days",
      heading: "A 2-day Taif itinerary",
      toc: "2 days in Taif",
      blocks: [
        {
          type: "timeline",
          items: [
            { when: "Day 1", title: "Al Hada and the mountain road", body: "Drive the Al Hada road, about 20 km from the city, for the views down the escarpment. The cable car and family rides at Al Hada are a big hit with children. Evening in central Taif for the souqs and honey and rose shops." },
            { when: "Day 2", title: "Al Shafa, the rose farms and Al Rudaf", body: "Morning in Al Shafa, about 30 km away, for farms, fruit stalls and cool viewpoints. In March and April, visit a rose farm during the harvest. Afternoon at Al Rudaf park, where children climb among the huge granite rocks." },
          ],
        },
        { type: "callout", tone: "warn", title: "Baboons", text: "Baboons gather beside the mountain roads around Taif and Abha. Keep car windows closed when they are near, and don't feed them." },
        { type: "p", text: "Staying in Makkah or Jeddah? Taif works as a day trip: about 90 km from Makkah and 170 km from Jeddah. Travellers who are not Muslim take a road that avoids Makkah, which adds some time from Jeddah." },
      ],
    },
    {
      id: "getting-there",
      heading: "Getting there: flights, roads and airport pickups",
      toc: "Getting there",
      blocks: [
        {
          type: "cards",
          items: [
            { icon: "plane", tag: "Abha", title: "Fly into Abha (AHB)", body: "Flights from Riyadh, Jeddah and other cities. The airport is about 21 km from the city, roughly 20 minutes by car.", href: "/abha-airport-taxi-service", linkLabel: "Abha Airport taxi" },
            { icon: "plane", tag: "Taif", title: "Fly into Taif (TIF)", body: "Domestic flights land about 30 km from the city. Most families from Jeddah and Makkah drive instead.", href: "/taif-airport-taxi-service", linkLabel: "Taif Airport taxi" },
            { icon: "car", tag: "Taif", title: "Drive from Jeddah or Makkah", body: "About 170 km from Jeddah or 90 km from Makkah. A private car can stop at Al Hada on the way up.", href: "/services/taif", linkLabel: "Taif with a driver" },
            { icon: "flag", tag: "From Qatar", title: "Fly, then drive locally", body: "Check direct flights from Doha for your dates, or connect through Riyadh or Jeddah. Book the airport pickup with the flight number." },
          ],
        },
        { type: "p", text: "Going on after Abha? See the road distances [Abha to Jeddah](/distance/abha-to-jeddah) (about 690 km) and [Abha to Riyadh](/distance/abha-to-riyadh) (about 950 km). For the wider country, read [best family destinations in Saudi Arabia](/blog/family-saudi-destinations)." },
      ],
    },
  ],
  faqs: [
    { q: "Is Abha or Taif better for a summer family trip?", a: "Abha for a longer stay: it is higher, cooler and has more to do over 3 or 4 days. Taif for a short trip from Jeddah or Makkah, or with very young children." },
    { q: "Which is cooler in summer, Abha or Taif?", a: "Abha. At about 2,200 m it sits higher than Taif (about 1,800 m), and mist and afternoon showers are common in summer. Both are much cooler than Jeddah or Riyadh." },
    { q: "Abha or Taif for a family from Qatar?", a: "Both mean a flight from Doha: Taif is about 1,370 km by road and Abha about 1,525 km. Abha usually suits better, because it fills the longer stay that a flight justifies." },
    { q: "How many days do you need in Abha with kids?", a: "Three to four days: one outing a day (Green Mountain, Al Soudah, Habala or Rijal Almaa) with afternoons kept free." },
    { q: "Can you do Taif as a day trip from Jeddah?", a: "Yes. It is about 170 km, 2 to 2.5 hours each way. From Makkah it is about 90 km." },
    { q: "Do we need a car in Abha and Taif?", a: "In practice, yes. The main sights are 20 to 45 km from each city on mountain roads, with little public transport. A car with a driver for the day is the easy option with children." },
  ],
  routes: [
    { href: "/abha-airport-taxi-service", title: "Abha Airport taxi", body: "Pickup at arrivals, about 20 minutes to the city.", icon: "plane" },
    { href: "/services/abha", title: "Abha with a driver", body: "Days out to Al Soudah, Habala and Rijal Almaa.", icon: "mountain" },
    { href: "/taif-airport-taxi-service", title: "Taif Airport taxi", body: "Pickup at Taif airport for the city and Al Hada.", icon: "plane" },
    { href: "/services/taif", title: "Taif with a driver", body: "Day trips from Jeddah and Makkah.", icon: "mountain" },
    { href: "/taif-ziyarat-taxi-service", title: "Taif ziyarat taxi", body: "Taif's historic and religious sites with a driver.", icon: "map" },
    { href: "/distance/abha-to-jeddah", title: "Abha to Jeddah distance", body: "About 690 km by road.", icon: "route" },
  ],
  related: ["/blog/family-saudi-destinations", "/guides/regional-airport-transfer-guide", "/guides/red-sea-coast-travel"],
  sourcesNote: "Road distances: map routing (OSRM) and our distance pages, checked 20 November 2026. Altitudes are rounded.",
};

export default function Post() {
  return <ArticlePage data={data} />;
}
