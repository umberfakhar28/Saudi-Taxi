import { generatePageMetadata } from "@/lib/seo";
import ArticlePage from "@/components/ArticlePage";
import type { ArticleData } from "@/lib/articles";

export const metadata = generatePageMetadata({
  title: "Best Family Destinations in Saudi Arabia: Where to Go First",
  brandSuffix: false,
  description: "Where to take the family in Saudi Arabia: the best first trip, travelling with grandparents, beach resorts, a 5-day itinerary and getting between cities.",
  path: "/blog/family-saudi-destinations",
});

/*
 * Owner page for clusters A1–A3 (docs/seo/content/content-audit.md §4).
 * 583 impressions, 0 clicks, position 5.6 (GSC 28 days to 19 Nov 2026).
 *
 * Queries answered in their own section:
 *   "which saudi destinations are best for a first family trip?" 165 / 3.4
 *   "plan a saudi vacation for parents, children and grandparents" 49 / 5.4
 *   "which saudi places are best for a family religious trip?" 74 / 5.1
 *   "where should families stay … beach, culture, easy transport" 15 / 9.0
 *   "best saudi beach and resort destinations for families"
 *   "build a five-day saudi family itinerary", "plan a family trip to
 *   riyadh, jeddah and the red sea", "how should families travel between
 *   riyadh, jeddah and red sea destinations?" 8 / 15.4
 *
 * Merged in (301): /guides/family-travel — vehicle sizes, child seats,
 * travelling with older relatives, rest stops.
 * Abha vs Taif has its own post: /blog/abha-vs-taif-summer-family-trip.
 *
 * Figures: distance pages (Riyadh–Jeddah 950 km, Jeddah–Makkah 80 km,
 * Makkah–Madinah 450 km, Abha–Jeddah 690 km); OSRM 20 Nov 2026 for
 * Jeddah–Taif (~170 km), Makkah–Taif (~90 km), Jeddah–Yanbu (~330 km).
 * Vehicle capacities: lib/fleetConfig.ts. Accommodation is advised by area
 * only; the site recommends no individual hotels.
 */

const data: ArticleData = {
  path: "/blog/family-saudi-destinations",
  kind: "blog",
  topic: "family",
  h1: "Best Family Destinations in Saudi Arabia: Where to Go First",
  lead: "For a **first family trip**, start with **Jeddah** for the sea and the old town, or **Riyadh** for heritage and big days out. Add **Abha or Taif** in summer for cool mountain air, **AlUla** for children aged 8 and up, and the **Red Sea coast** for beach time. Travelling with grandparents? Keep days short, use one driver for the day, and pick a van for three generations.",
  description: "The best Saudi destinations for families: first trips, travelling with grandparents, beach resorts, where to stay, a 5-day itinerary and getting between cities.",
  published: "2025-06-01",
  updated: "2026-11-20",
  quickAnswer: {
    stats: [
      { icon: "star", label: "Best first trip", value: "Jeddah or Riyadh" },
      { icon: "sun", label: "Best in summer", value: "Abha and Taif (highlands)" },
      { icon: "calendar", label: "Best months overall", value: "October to March" },
      { icon: "users", label: "Three generations", value: "A van seats up to 9" },
    ],
    points: [
      "**First trip:** Jeddah (Corniche, Al-Balad, the beach at Obhur) or Riyadh (Diriyah, Boulevard). Both have the most hotels and the shortest transfers.",
      "**With grandparents:** Jeddah, Taif and Abha, where a day can be kept short. One driver for the whole day saves repeated pickups.",
      "**Beach and resorts:** north Jeddah (Obhur), Yanbu, the Red Sea Project resorts, and Half Moon Bay near Al Khobar.",
      "**Religious trip:** Makkah and Madinah, usually arriving through Jeddah, with Taif as a cool day out afterwards.",
      "**Between cities:** fly the long legs (Riyadh–Jeddah is about 950 km) and use a private car at each end.",
    ],
  },
  cta: {
    heading: "Book a family car with a driver",
    body: "A car sized for your family and luggage, child seats on request, and one driver for airport runs, city days and trips between cities.",
    waMessage: "Hi, I'm planning a family trip in Saudi Arabia. Cities:  Dates:  Adults and children (ages):  Bags:",
    bookHref: "/book-online",
  },
  sections: [
    {
      id: "first-family-trip",
      heading: "Which Saudi destinations are best for a first family trip?",
      toc: "Best for a first trip",
      blocks: [
        { type: "p", text: "Pick by your children's ages and the month you travel. These six places cover almost every first trip:" },
        {
          type: "cards",
          items: [
            { icon: "waves", tag: "All ages · Oct–Apr", title: "Jeddah", body: "The Corniche, King Fahd's Fountain at night, the old town of Al-Balad and the beaches of Obhur in the north. The easiest first stop.", href: "/services/jeddah", linkLabel: "Jeddah with a driver" },
            { icon: "building", tag: "Older kids and teens · Oct–Mar", title: "Riyadh", body: "Diriyah's mud-brick old town, Boulevard City, and Riyadh Season events in winter. Districts are far apart, so one driver for the day helps.", href: "/services/riyadh", linkLabel: "Riyadh with a driver" },
            { icon: "mountain", tag: "All ages · Jun–Sep", title: "Abha", body: "About 2,200 m up in the Asir mountains: cooler summers, green hills, Al Soudah and the hanging village of Habala.", href: "/blog/abha-vs-taif-summer-family-trip", linkLabel: "Abha vs Taif" },
            { icon: "sun", tag: "Young children · Mar–Apr, summer", title: "Taif", body: "Mountain air, the Al Hada road and rose farms in spring. An easy day out from Makkah (about 90 km) or Jeddah (about 170 km).", href: "/services/taif", linkLabel: "Taif with a driver" },
            { icon: "map", tag: "Ages 8+ · Oct–Mar", title: "AlUla", body: "Hegra's Nabataean tombs, Elephant Rock and desert canyons. Sites are spread out with timed entries, so families book a driver for the day.", href: "/services/alula", linkLabel: "AlUla with a driver" },
            { icon: "waves", tag: "Beach time · Oct–Apr", title: "The Red Sea coast", body: "Yanbu, Umluj and the Red Sea Project resorts. Plan by airport: Jeddah, Yanbu or Red Sea International.", href: "/guides/red-sea-coast-travel", linkLabel: "Red Sea coast guide" },
          ],
        },
        {
          type: "table",
          caption: "Which destination suits which family",
          head: ["Destination", "Under 8", "8 to 12", "Teens", "Grandparents"],
          rows: [
            ["Jeddah", "Very good", "Very good", "Good", "Very good"],
            ["Riyadh", "Good", "Good", "Very good", "Good, with short days"],
            ["Abha", "Very good", "Very good", "Good", "Good"],
            ["Taif", "Very good", "Good", "Fair", "Very good"],
            ["AlUla", "Fair", "Very good", "Very good", "Fair (long site days)"],
            ["Red Sea resorts", "Very good", "Very good", "Good", "Very good"],
          ],
          note: "Our view from driving families to each place. Long site days in AlUla and long city distances in Riyadh are the main things that tire young children and older relatives.",
        },
        { type: "cta" },
      ],
    },
    {
      id: "with-grandparents",
      heading: "Planning a Saudi trip for parents, children and grandparents",
      toc: "Trips with grandparents",
      blocks: [
        { type: "p", text: "Three generations travel well in Saudi Arabia when each day is short and the transport is simple. Choose places where you can leave early without wasting the day: Jeddah, Taif and Abha are the easiest. Outside October to March, stay in the highlands, where it is noticeably cooler than the coast or Riyadh." },
        { type: "list", items: [
          "**One driver for the day.** The car waits between stops, so nobody stands outside waiting for the next ride.",
          "**Size up the car.** Six or more people with luggage need a van; a family of five with big suitcases and a stroller is often more comfortable in one too.",
          "**Lower entry steps** can be arranged for anyone with limited mobility. Mention it when you book.",
          "**Plan rest stops** on any drive over two hours. Tell us when you book and they are built into the trip.",
          "**Keep one free afternoon** every two or three days. It is what keeps the trip enjoyable for the oldest and youngest.",
        ] },
        {
          type: "table",
          caption: "Which car for your family",
          head: ["Family size", "Vehicle", "Seats", "Large bags"],
          rows: [
            ["1 to 3 people", "Sedan (Toyota Camry or similar)", "Up to 3", "Up to 2"],
            ["4 to 5 people", "SUV (Land Cruiser or Prado)", "Up to 5", "Up to 4"],
            ["6 to 9 people", "Van (Toyota HiAce)", "Up to 9", "Up to 8"],
            ["10 or more", "Two or more cars, booked together", "As needed", "Split across cars"],
          ],
          note: "Child seats (infant, toddler and booster) are available on request: give each child's age and weight when you book. See the full [fleet](/fleet).",
        },
      ],
    },
    {
      id: "beach-resorts",
      heading: "Best beach and resort destinations for families",
      toc: "Beach and resorts",
      blocks: [
        {
          type: "cards",
          items: [
            { icon: "waves", title: "North Jeddah (Obhur)", body: "Beach clubs and resorts along the creek and coast north of the city, close to the airport. Easy for a first trip: city sights one day, beach the next." },
            { icon: "waves", title: "Yanbu", body: "A real town with hotels at several prices, calm water and reefs nearby. About 330 km north of Jeddah by road, or fly into Yanbu airport.", href: "/services/yanbu", linkLabel: "Yanbu with a driver" },
            { icon: "star", title: "The Red Sea Project", body: "Purpose-built luxury resorts, some on islands reached by boat or seaplane. Fly into Red Sea International and follow your resort's arrival instructions.", href: "/guides/red-sea-coast-travel", linkLabel: "Red Sea coast guide" },
            { icon: "sun", title: "Half Moon Bay, Eastern Province", body: "Beach resorts on the Gulf south of Al Khobar. Pairs well with a visit to Bahrain across the causeway.", href: "/services/khobar", linkLabel: "Khobar with a driver" },
          ],
        },
        { type: "callout", tone: "tip", text: "From October to April the sea is calmest and days are comfortable. In summer, plan beach time for early morning and evening." },
      ],
    },
    {
      id: "where-to-stay",
      heading: "Where should families stay?",
      toc: "Where to stay",
      blocks: [
        { type: "p", text: "Choose the area first, then the hotel. These areas balance sights, the beach and short drives:" },
        {
          type: "table",
          head: ["City", "Area", "Why families pick it"],
          rows: [
            ["Jeddah", "Corniche", "Sea views, evening walks, the fountain, short drives to Al-Balad"],
            ["Jeddah", "North Jeddah and Obhur", "Beach resorts, newer hotels, closest to the airport"],
            ["Riyadh", "Olaya", "The most hotel choice, central for malls and Boulevard"],
            ["Riyadh", "Diriyah", "Quieter, next to the At-Turaif heritage site"],
            ["Abha", "City centre", "Restaurants and Green Mountain close by; Al Soudah about 25 km away"],
            ["Taif", "City centre or Al Hada", "Centre for souqs and parks; Al Hada for the mountain view"],
          ],
          note: "We don't recommend individual hotels. Check family rooms and pool access when you book, and send us the hotel name for pickups.",
        },
      ],
    },
    {
      id: "five-day-itinerary",
      heading: "A five-day family itinerary: Riyadh, Jeddah and the Red Sea",
      toc: "5-day itinerary",
      blocks: [
        { type: "p", text: "This plan suits a first visit from October to April. It flies the long leg and keeps every day to one main outing." },
        {
          type: "timeline",
          items: [
            { when: "Day 1 · Riyadh", title: "Arrive and settle in", body: "Airport pickup to your hotel. Evening at Boulevard City, or a quiet dinner if the flight was long." },
            { when: "Day 2 · Riyadh", title: "Diriyah", body: "Morning at At-Turaif, the mud-brick old town, before the heat. Lunch at Bujairi, then back to the hotel for a rest." },
            { when: "Day 3 · To Jeddah", title: "Fly west, evening on the Corniche", body: "A car to the airport, a flight of about two hours, and a driver waiting in Jeddah. King Fahd's Fountain is lit at night." },
            { when: "Day 4 · Jeddah", title: "Al-Balad and the beach", body: "The old town in the morning, then an afternoon on the beach at Obhur in north Jeddah." },
            { when: "Day 5 · Red Sea or mountains", title: "Choose your last day", body: "A boat trip or a beach club on the Red Sea, or a day trip up to Taif for cooler air. Then the airport." },
          ],
        },
        { type: "callout", tone: "info", title: "Coming in summer?", text: "Swap Riyadh for Abha or Taif. See [Abha vs Taif for a summer family trip](/blog/abha-vs-taif-summer-family-trip) for 2- and 3-day plans." },
      ],
    },
    {
      id: "between-cities",
      heading: "How should families travel between Riyadh, Jeddah and the Red Sea?",
      toc: "Getting between cities",
      blocks: [
        { type: "p", text: "Saudi cities are far apart. Fly the long legs and use a private car at each end; drive the short ones." },
        {
          type: "table",
          head: ["Leg", "By road", "Best way for a family"],
          rows: [
            ["Riyadh to Jeddah", "About 950 km, 10–11 h", "Fly; car to and from each airport. [Distance](/distance/riyadh-to-jeddah)"],
            ["Jeddah to Makkah", "About 80 km, 1–1.5 h", "Private car. [Distance](/distance/jeddah-to-makkah)"],
            ["Jeddah to Taif", "About 170 km, 2–2.5 h", "Private car, a good day trip"],
            ["Makkah to Taif", "About 90 km, 1–1.5 h", "Private car"],
            ["Jeddah to Yanbu", "About 330 km, 3.5–4 h", "Car with a rest stop, or fly"],
            ["Makkah to Madinah", "About 450 km, 4–5 h", "Private car or the Haramain train. [Distance](/distance/makkah-to-madinah)"],
            ["Abha to Jeddah", "About 690 km, 7.5–8.5 h", "Fly. [Distance](/distance/abha-to-jeddah)"],
          ],
          note: "Road times are driving only. Add rest stops with children: about 20 minutes every two hours.",
        },
        { type: "cta", heading: "Need cars at both ends of a flight?", body: "Book the airport pickup and drop-off together, with the same child seats ready in each city." },
      ],
    },
    {
      id: "religious-trip",
      heading: "Which Saudi places are best for a family religious trip?",
      toc: "Family religious trip",
      blocks: [
        { type: "p", text: "For Umrah, the destinations are **Makkah** and **Madinah**. Most families arrive through Jeddah airport, about 80 km from Makkah, or fly into Madinah. The two holy cities are about 450 km apart, 4 to 5 hours by road. Entry to Makkah, and to the area around the Prophet's Mosque in Madinah, is for Muslims only." },
        { type: "list", items: [
          "**With older relatives:** a private car for each leg means no changing vehicles with luggage, and the car can drop you close to your hotel.",
          "**Order of the trip:** many families do Umrah first in Makkah, then travel to Madinah to finish more slowly.",
          "**After the Umrah:** Taif is a cool day out from Makkah, about 90 km away, with the [Taif ziyarat](/taif-ziyarat-taxi-service) sites on the way.",
        ] },
        { type: "p", text: "Our [Umrah transportation guide](/guides/umrah-transportation) covers each leg, and [Umrah taxi services](/umrah-taxi-services) has the bookings." },
      ],
    },
    {
      id: "with-children",
      heading: "Getting around with children",
      toc: "Getting around with kids",
      blocks: [
        { type: "list", items: [
          "**Child seats:** infant, toddler and booster seats on request. Give ages and weights when you book so the right seats are fitted before pickup.",
          "**Airport arrivals:** the driver tracks your flight and waits at arrivals with a name board, so you don't queue with tired children.",
          "**Day bookings:** for a day of several stops, book the car by the hour or for the day so it waits for you.",
          "**Night travel:** pre-book rather than hailing a car late at night.",
          "**Big groups:** for 10 or more, two or more cars are sent together as one booking.",
        ] },
      ],
    },
  ],
  faqs: [
    { q: "Which Saudi destination is best for a first family trip?", a: "Jeddah or Riyadh. Both are major airports with the most hotels and the shortest transfers. Jeddah adds the sea and the old town; Riyadh suits older children with Diriyah and Boulevard. In summer, Abha or Taif is the better first choice." },
    { q: "How do you plan a Saudi trip for parents, children and grandparents?", a: "Choose places where days can be short (Jeddah, Taif, Abha), stay in the highlands in summer, and book one car and driver for each day so the car waits between stops. Six or more people with luggage need a van, which seats up to 9." },
    { q: "Which Saudi places are best for a family religious trip?", a: "Makkah and Madinah for Umrah, usually arriving through Jeddah. Many families add a day in Taif afterwards. Entry to Makkah is for Muslims only." },
    { q: "What are the best beach destinations in Saudi Arabia for families?", a: "North Jeddah around Obhur, Yanbu, the Red Sea Project resorts, and Half Moon Bay near Al Khobar on the Gulf." },
    { q: "When is the best time for a family trip to Saudi Arabia?", a: "October to March is comfortable almost everywhere. From June to September, head for the highlands of Abha and Taif." },
    { q: "How do families travel between Saudi cities?", a: "By air for long legs such as Riyadh to Jeddah (about 950 km), with a private car at each end, and by road for short legs such as Jeddah to Makkah (about 80 km) or Jeddah to Taif (about 170 km)." },
    { q: "Are child seats available?", a: "Yes. Infant, toddler and booster seats are available on request. Give each child's age and weight when you book." },
  ],
  routes: [
    { href: "/jeddah-airport-taxi-service", title: "Jeddah Airport transfers", body: "Pickup at arrivals with a name board, to Jeddah, Makkah or Madinah.", icon: "plane" },
    { href: "/riyadh-airport-taxi-service", title: "Riyadh Airport transfers", body: "Pickup at all five RUH terminals.", icon: "plane" },
    { href: "/jeddah-to-makkah-taxi-service", title: "Jeddah to Makkah taxi", body: "About 80 km, door to door to your hotel.", icon: "car" },
    { href: "/services/taif", title: "Taif with a driver", body: "Day trips from Makkah or Jeddah.", icon: "mountain" },
    { href: "/services/abha", title: "Abha with a driver", body: "Airport pickup and days out to Al Soudah and Habala.", icon: "mountain" },
    { href: "/fleet", title: "Our vehicles", body: "Sedan, SUV and van, with seats and luggage space.", icon: "users" },
  ],
  related: ["/blog/abha-vs-taif-summer-family-trip", "/guides/red-sea-coast-travel", "/guides/umrah-transportation"],
  sourcesNote: "Road distances: our distance pages and map routing (OSRM), checked 20 November 2026. Vehicle sizes: our fleet list.",
};

export default function Post() {
  return <ArticlePage data={data} />;
}
