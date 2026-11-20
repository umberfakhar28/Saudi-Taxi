import { generatePageMetadata } from "@/lib/seo";
import ArticlePage from "@/components/ArticlePage";
import { COVERS, type ArticleData } from "@/lib/articles";

export const metadata = generatePageMetadata({
  title: "Commuting Between Bahrain and Saudi Arabia: Causeway Guide",
  brandSuffix: false,
  description: "Crossing the King Fahd Causeway every week: the quietest and busiest times, documents, Riyadh to Bahrain by bus, train or car, and standing arrangements.",
  path: "/guides/bahrain-saudi-commuter-guide",
});

/*
 * Owner page for clusters C2 and C3 (docs/seo/content/content-audit.md §4).
 * 62 impressions, 0 clicks, position 5.5 (GSC 28 days to 19 Nov 2026): the
 * old 81-character title was cut off in results.
 * Queries: "bahrain to riyadh distance by bus" 17, "how to go bahrain from
 * riyadh by road" 2, "how close is bahrain to saudi arabia" 4.
 *
 * Does not compete with: /blog/bahrain-to-dammam-travel-options (the
 * one-off mode choice), /distance/bahrain-to-riyadh and
 * /distance/bahrain-to-dammam (distance and time), the route pages.
 *
 * Figures: distance pages (Bahrain–Dammam 65 km / 1–2 h; Bahrain–Jubail
 * 160 km / 2.5–3 h; Bahrain–Riyadh 470 km / 4.5–5.5 h with the border).
 * Fares: route pages only (Dammam → Bahrain 500 SAR, Riyadh → Bahrain
 * 1,250 SAR, both "starting from").
 */

const data: ArticleData = {
  path: "/guides/bahrain-saudi-commuter-guide",
  kind: "guide",
  topic: "bahrain",
  h1: "Commuting Between Bahrain and Saudi Arabia's Eastern Province",
  lead: "Bahrain is joined to Saudi Arabia by the **25 km King Fahd Causeway**: Al Khobar and Dammam are about **65 km** from Manama, **1 to 2 hours** door to door. Regular crossers save the most time by going on **weekday mornings**, avoiding **Thursday and Friday evenings**, keeping documents valid, and using **one standing arrangement** instead of booking every trip.",
  description: "A practical guide to crossing the King Fahd Causeway every week: timing, documents, Riyadh to Bahrain by bus, train or car, and regular transfers.",
  published: "2026-09-01",
  updated: "2026-11-20",
  cover: COVERS.CAUSEWAY_BORDER,
  quickAnswer: {
    stats: [
      { icon: "route", label: "Causeway", value: "25 km bridge, open 24 h" },
      { icon: "clock", label: "Khobar or Dammam ↔ Manama", value: "About 65 km, 1–2 h" },
      { icon: "calendar", label: "Quietest", value: "Weekday mornings" },
      { icon: "flag", label: "Busiest", value: "Thursday and Friday evenings" },
    ],
    points: [
      "**How close is Bahrain to Saudi Arabia?** Very: the causeway lands at Al Khobar, and Manama is about 65 km from Dammam by road.",
      "**Timing:** weekday mornings are the quickest; Thursday and Friday evenings are the slowest in both directions.",
      "**Documents:** GCC citizens use their national ID. Others need a valid Saudi visa or Iqama with re-entry, and a Bahrain visa where required.",
      "**Riyadh to Bahrain:** about 470 km, 4.5 to 5.5 hours by car with the border. Coaches and the Riyadh–Dammam train are cheaper but slower overall.",
    ],
  },
  cta: {
    heading: "Book a regular causeway crossing",
    body: "A private car between the Eastern Province and Bahrain, door to door. From Dammam, a sedan is starting from 500 SAR, toll included; regular crossers can set up a standing booking.",
    waMessage: "Hi, I cross the causeway regularly. From:  To:  Days and times:  Passengers:",
    bookHref: "/book-online?mode=transfers&from=Dammam&to=Bahrain",
    route: "Dammam-Bahrain",
  },
  sections: [
    {
      id: "how-it-works",
      heading: "How the crossing works, first trip or fiftieth",
      toc: "How the crossing works",
      blocks: [
        { type: "p", text: "The process is the same every time. A pre-booked car collects you, goes through the checkpoint halfway across the bridge with you, and continues to the other side: the same car, and on a standing booking often the same driver. Ride-hailing apps can't cross, so the crossing has to be arranged either way." },
        { type: "list", items: [
          "**GCC citizens** cross with their national ID.",
          "**Residents of Saudi Arabia** need a valid Iqama and an exit and re-entry visa to come back.",
          "**Other nationalities** need a valid Saudi visa, and a Bahrain visa or eVisa where their passport requires one.",
          "Passport control and customs for both countries sit roughly midway across the causeway.",
        ] },
        { type: "callout", tone: "warn", title: "Watch your expiry dates", text: "For a regular commuter, a lapsed Iqama, re-entry visa or Bahrain visa stops every future crossing, not just one. Put the renewal dates in your calendar." },
      ],
    },
    {
      id: "timing",
      heading: "Quiet and busy times at the causeway",
      toc: "Best times to cross",
      blocks: [
        {
          type: "table",
          head: ["When", "What to expect"],
          rows: [
            ["Weekday mornings", "Usually the quickest time to cross"],
            ["Weekday afternoons and evenings", "Moderate: busier than mornings"],
            ["Thursday and Friday evenings", "The busiest: weekend traffic in both directions"],
            ["Weekend daytime", "Variable, usually lighter than the evening peak"],
            ["Public holidays and Eid", "Very busy; leave early or cross another day"],
          ],
          highlightRow: 0,
        },
        { type: "cta" },
      ],
    },
    {
      id: "riyadh-to-bahrain",
      heading: "Riyadh to Bahrain: bus, train or car?",
      toc: "Riyadh to Bahrain",
      blocks: [
        { type: "p", text: "From Riyadh the road runs east on Highway 40 to Al Khobar, then across the causeway: about **470 km**, roughly **4.5 hours** of driving and **4.5 to 5.5 hours** with the border. See [Bahrain to Riyadh distance](/distance/bahrain-to-riyadh) for the full route." },
        {
          type: "table",
          head: ["Option", "How it works", "Good to know"],
          rows: [
            ["Coach", "Scheduled cross-border coach, terminal to terminal", "Cheapest; longer overall with stops; check that it runs on your day"],
            ["Train, then car", "Riyadh–Dammam train, then a car across the causeway", "Comfortable; you change once in Dammam"],
            ["Your own car", "Highway 40, then the causeway", "GCC registration and cross-border insurance; toll on the causeway"],
            ["Private car with driver", "One car from your Riyadh address to Bahrain", "Door to door, starting from 1,250 SAR per car"],
          ],
          highlightRow: 3,
        },
        { type: "p", text: "Book the whole trip on our [Riyadh to Bahrain taxi](/riyadh-to-bahrain-taxi-service) page." },
      ],
    },
    {
      id: "where-to-base",
      heading: "Al Khobar: the natural base",
      toc: "Where to base yourself",
      blocks: [
        { type: "p", text: "The causeway lands at Al Khobar, so it is the closest Eastern Province city to Bahrain and the natural base for regular crossings. Dammam and Dhahran are a few minutes further. Commuting from Jubail adds distance: about 160 km to Bahrain, 2.5 to 3 hours with the border; see [Jubail to Bahrain taxi](/jubail-to-bahrain-taxi-service)." },
      ],
    },
    {
      id: "options",
      heading: "Options for regular crossers",
      toc: "Ways to commute",
      blocks: [
        {
          type: "cards",
          items: [
            { icon: "car", title: "Book each trip", body: "Simple, but you book again every time. Fine for a crossing every few weeks.", href: "/dammam-to-bahrain-taxi-service", linkLabel: "Dammam to Bahrain taxi" },
            { icon: "calendar", title: "A standing booking", body: "Set days and times with the same driver where possible. Suits a fixed weekly pattern." },
            { icon: "briefcase", title: "A corporate account", body: "Monthly invoicing and named drivers for staff who cross on company business.", href: "/corporate-transportation-services", linkLabel: "Corporate transport" },
            { icon: "shield", title: "Driving yourself", body: "Realistic with a GCC-registered car and cross-border insurance. A borrowed or hired car often isn't covered." },
          ],
        },
      ],
    },
    {
      id: "mistakes",
      heading: "Common mistakes",
      toc: "Common mistakes",
      blocks: [
        { type: "list", items: [
          "Scheduling a weekly crossing on Thursday or Friday evening without allowing for the weekend queue.",
          "Re-booking the same trip every week instead of a standing arrangement.",
          "Assuming any car can cross: it needs GCC registration and the right insurance.",
          "Letting an Iqama, re-entry visa or Bahrain visa lapse mid-routine.",
        ] },
        { type: "p", text: "Crossing just once? Compare every option in [Bahrain to Dammam: taxi, Uber, bus or private car](/blog/bahrain-to-dammam-travel-options)." },
      ],
    },
  ],
  faqs: [
    { q: "How close is Bahrain to Saudi Arabia?", a: "Very close: the 25 km King Fahd Causeway joins them. Manama is about 65 km from Dammam by road, 1 to 2 hours door to door with the border." },
    { q: "What is the best time to cross the causeway for a commute?", a: "Weekday mornings are usually the quickest. Thursday and Friday evenings are the busiest in both directions." },
    { q: "How far is Riyadh from Bahrain by bus?", a: "The road distance is about 470 km. A coach takes longer than a car because of stops and terminal times; a car takes 4.5 to 5.5 hours with the border." },
    { q: "How do I get from Riyadh to Bahrain by road?", a: "Take Highway 40 east to Al Khobar, then the King Fahd Causeway. By private car with driver it is door to door, starting from 1,250 SAR per car." },
    { q: "Can I set up a standing arrangement instead of booking every crossing?", a: "Yes. Regular crossers can book set days and times, and companies can open a corporate account with monthly invoicing." },
    { q: "Do GCC citizens need a visa to commute?", a: "No, GCC citizens cross with their national ID. Other nationalities need a valid Saudi visa or Iqama, and a Bahrain visa where required." },
  ],
  routes: [
    { href: "/dammam-to-bahrain-taxi-service", title: "Dammam to Bahrain taxi", body: "Dammam, Al Khobar or Dhahran. Sedan starting from 500 SAR.", icon: "car" },
    { href: "/bahrain-to-dammam-taxi-service", title: "Bahrain to Dammam taxi", body: "From any Bahrain address to the Eastern Province.", icon: "car" },
    { href: "/riyadh-to-bahrain-taxi-service", title: "Riyadh to Bahrain taxi", body: "Door to door, starting from 1,250 SAR.", icon: "car" },
    { href: "/jubail-to-bahrain-taxi-service", title: "Jubail to Bahrain taxi", body: "About 160 km via the causeway.", icon: "car" },
    { href: "/corporate-transportation-services", title: "Corporate transport", body: "Accounts and named drivers for staff.", icon: "briefcase" },
    { href: "/distance/bahrain-to-riyadh", title: "Bahrain to Riyadh distance", body: "470 km: route and border time.", icon: "route" },
  ],
  related: ["/blog/bahrain-to-dammam-travel-options", "/guides/saudi-arabia-to-kuwait-by-road", "/guides/business-travel"],
  sourcesNote: "Distances and times: our distance pages. Fares: our route pages, per car, one way; prices may vary with date and availability.",
};

export default function BahrainSaudiCommuterGuide() {
  return <ArticlePage data={data} />;
}
