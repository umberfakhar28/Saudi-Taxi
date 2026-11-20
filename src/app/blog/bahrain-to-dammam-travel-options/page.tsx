import { generatePageMetadata } from "@/lib/seo";
import ArticlePage from "@/components/ArticlePage";
import { COVERS, type ArticleData } from "@/lib/articles";

export const metadata = generatePageMetadata({
  title: "Bahrain to Dammam: Taxi, Uber, Bus or Private Car?",
  brandSuffix: false,
  description: "Can Uber or Careem cross the causeway? Taxi, bus, self-drive and private car between Bahrain and Dammam compared, plus Dammam station to Janabiya.",
  path: "/blog/bahrain-to-dammam-travel-options",
  ogImage: "/images/routes/dammam-to-bahrain/dammam-to-bahrain-taxi-king-fahd-causeway-og.jpg",
  ogImageAlt: "Private car on the King Fahd Causeway between Saudi Arabia and Bahrain",
});

/*
 * Owner page for cluster C1 (docs/seo/content/content-audit.md §4): the
 * mode choice between Bahrain and Dammam / Khobar. The site's only post with
 * clicks (1,226 impressions, 36 clicks, position 6.3; GSC 28 days to 19 Nov
 * 2026).
 *
 * Queries: "bahrain to dammam", "bahrain to dammam by road" (50 / 6.8),
 * "uber taxi from dammam train station to janabiya bahrain" (23 / 9.2),
 * "careem dammam to bahrain", "can i uber from bahrain to saudi".
 *
 * Does not compete with:
 *   /bahrain-to-dammam-taxi-service, /dammam-to-bahrain-taxi-service (booking)
 *   /distance/bahrain-to-dammam (distance and time)
 *   /guides/bahrain-saudi-commuter-guide (crossing every week)
 *
 * Figures: 65 km and 1–2 h door to door (route pages). Dammam station to
 * Janabiya ~65 km, ~50 min driving: OSRM, 20 Nov 2026. Fares are the route
 * pages' "starting from" fares, nothing else.
 */

const data: ArticleData = {
  path: "/blog/bahrain-to-dammam-travel-options",
  kind: "blog",
  topic: "bahrain",
  h1: "Bahrain to Dammam: Taxi, Uber, Bus or Private Car?",
  lead: "Bahrain and Dammam are about **65 km** apart, **1 to 2 hours** door to door with the King Fahd Causeway. Only three options take you all the way across: a **pre-booked private car**, a **scheduled coach**, or **your own GCC car**. Uber, Careem and street taxis stop at the border.",
  description: "Which ways of travelling between Bahrain and Dammam actually cross the King Fahd Causeway: taxi, Uber and Careem, coach, self-drive and private car compared.",
  published: "2026-09-10",
  updated: "2026-11-20",
  cover: COVERS.CAUSEWAY_D2B,
  ogImage: "/images/routes/dammam-to-bahrain/dammam-to-bahrain-taxi-king-fahd-causeway-og.jpg",
  quickAnswer: {
    stats: [
      { icon: "route", label: "Distance", value: "About 65 km" },
      { icon: "clock", label: "Door to door", value: "1–2 hours with the border" },
      { icon: "flag", label: "Border", value: "King Fahd Causeway, 24 h" },
      { icon: "wallet", label: "Private car, Dammam → Bahrain", value: "Starting from 500 SAR" },
    ],
    points: [
      "**Crosses end to end:** a pre-booked private car, a scheduled coach, or your own GCC-registered car with cross-border insurance.",
      "**Stops at the border:** Uber, Careem and taxis hailed on the day. Nobody can walk across the causeway.",
      "**From the Dammam train station to Janabiya** (about 65 km): book a car that crosses, or take an app ride to the coach and check the timetable first.",
      "**Quickest time to cross:** weekday mornings. Thursday and Friday evenings are the busiest.",
    ],
  },
  cta: {
    heading: "Book a private car from Dammam to Bahrain",
    body: "One car and one driver from your door, through the causeway, to your address in Bahrain. A sedan from Dammam is starting from 500 SAR, toll included.",
    waMessage: "Hi, I'd like a private car between Dammam and Bahrain. Pickup:  Drop-off:  Date and time:  Passengers:",
    bookHref: "/book-online?mode=transfers&from=Dammam&to=Bahrain",
    route: "Dammam-Bahrain",
  },
  sections: [
    {
      id: "options-compared",
      heading: "Every option, side by side",
      toc: "Options compared",
      blocks: [
        { type: "p", text: "Two questions decide it: does the option actually cross the border, and does it take you door to door?" },
        {
          type: "table",
          head: ["Option", "Crosses the border?", "Door to door?", "Good to know"],
          rows: [
            ["Uber, Careem", "No, stops at the border", "Within one country", "Fine for short trips on either side"],
            ["Taxi hailed on the day", "Usually not", "Within one country", "City taxis rarely hold cross-border permits"],
            ["Scheduled coach", "Yes", "No, terminal to terminal", "Cheapest; fixed timetable, so check it runs"],
            ["Your own car", "Yes", "Yes", "GCC registration and cross-border insurance; toll on the causeway"],
            ["Private car with driver", "Yes, one car all the way", "Yes", "Suits families, luggage and late arrivals; book ahead"],
          ],
          highlightRow: 4,
        },
        { type: "cta" },
      ],
    },
    {
      id: "uber-careem",
      heading: "Can you take Uber or Careem from Bahrain to Dammam?",
      toc: "Uber and Careem",
      blocks: [
        { type: "p", text: "Not as one trip. Ride-hailing apps work country by country, so a booking made in Bahrain ends at the causeway checkpoint, and so does one made in Saudi Arabia. The causeway is a 25 km motorway bridge with no footpath, so being dropped at the border with nothing arranged on the other side does not work." },
        { type: "p", text: "Apps are still useful for the short trips on either side: to your hotel once you have crossed, or around Manama or Al Khobar during your stay. Check service areas in the app itself, because they change." },
        { type: "callout", tone: "warn", title: "Don't plan to change cars at the border", text: "There is no taxi rank between the two posts, and you cannot cross on foot. Arrange the crossing itself before you set off." },
      ],
    },
    {
      id: "train-station-to-janabiya",
      heading: "From the Dammam train station to Janabiya or Manama",
      toc: "Dammam station to Bahrain",
      blocks: [
        { type: "p", text: "Many people arrive in Dammam by train from Riyadh and then head for Bahrain. The railway station is in the west of Dammam. From there it is about **65 km to Janabiya**, on the Bahrain side just past the causeway, and about **80 km to central Manama**: roughly 50 to 60 minutes of driving, plus the time at the border." },
        {
          type: "cards",
          items: [
            { icon: "car", tag: "Easiest", title: "A private car booked ahead", body: "Your driver meets you at the station and takes you through the causeway to your address in Janabiya, Saar, Budaiya, Seef or Manama. Give the train time when you book, and the pickup moves if the train is late." },
            { icon: "bus", tag: "Cheapest", title: "App ride to the coach, then the coach", body: "Take a ride-hail to the coach stop in Dammam or Al Khobar, then a scheduled coach across. Check that day's timetable first: coaches go terminal to terminal, not to Janabiya." },
          ],
        },
        { type: "callout", tone: "tip", text: "Booking a car for a train arrival? Send the train number and arrival time on WhatsApp. If you are going on to the Bahrain airport rather than an address, say so: see our [Dammam to Bahrain taxi](/dammam-to-bahrain-taxi-service) for pickups across Dammam, Al Khobar and Dhahran." },
      ],
    },
    {
      id: "street-taxi",
      heading: "A taxi hailed on the day",
      toc: "Street taxis",
      blocks: [
        { type: "p", text: "A city taxi can take you to the causeway, but carrying paying passengers across needs cross-border permits and insurance that ordinary city taxis rarely hold. You find out at the checkpoint, not before. That is the one thing booking ahead settles." },
      ],
    },
    {
      id: "coach",
      heading: "Scheduled coach",
      toc: "Coach",
      blocks: [
        { type: "p", text: "Licensed international coaches run as scheduled cross-border services, so you stay with the same coach through the checkpoint. The Saudi Public Transport Company (SAPTCO) has run services between the Eastern Province and Bahrain. A coach is usually the cheapest way across, but it runs to a timetable, goes terminal to terminal, and has limited room for luggage." },
        { type: "callout", tone: "info", text: "Routes and timetables change. Confirm with the operator that a service is running on your day before you plan around it." },
      ],
    },
    {
      id: "driving-yourself",
      heading: "Driving yourself",
      toc: "Self-drive",
      blocks: [
        { type: "p", text: "Driving across is easy with a **GCC-registered car** and the right **cross-border insurance**, and it is how many regular crossers do it. A toll applies on the causeway. A hire car is harder: many rental agreements do not allow the car to leave the country, so check the agreement before you book, not at the border." },
      ],
    },
    {
      id: "private-car",
      heading: "A pre-booked private car",
      toc: "Private car",
      blocks: [
        { type: "p", text: "A private car is the door-to-door option. You are collected at your address, your driver takes you through both posts, and the same car continues to your destination. One booking, one contact, nothing to work out at the border." },
        { type: "list", items: [
          "**Dammam, Al Khobar or Dhahran to Bahrain:** a sedan starting from 500 SAR, toll included. See [Dammam to Bahrain taxi](/dammam-to-bahrain-taxi-service).",
          "**Landing at Dammam Airport (DMM):** straight from arrivals to Bahrain, a sedan starting from 550 SAR. See [Dammam Airport to Bahrain taxi](/dammam-airport-to-bahrain-taxi-service).",
          "**Bahrain to Dammam or Al Khobar:** fares on WhatsApp. See [Bahrain to Dammam taxi](/bahrain-to-dammam-taxi-service).",
          "**Further into Saudi Arabia:** Riyadh to Bahrain starts from 1,250 SAR. See [Riyadh to Bahrain taxi](/riyadh-to-bahrain-taxi-service).",
        ] },
        { type: "p", text: "Fares are per car, not per seat. Prices may vary with date and availability, and yours is confirmed before you travel." },
        { type: "cta", heading: "Crossing with family or luggage?", body: "Tell us how many people and bags, and we send the right car: a sedan, an SUV or a van." },
      ],
    },
    {
      id: "which-option",
      heading: "Which option fits your trip",
      toc: "Which one fits",
      blocks: [
        {
          type: "cards",
          items: [
            { icon: "train", title: "Arriving by train in Dammam", body: "An app ride gets you to the causeway, not across. Book a car to meet the train, or check coach times first." },
            { icon: "plane", title: "Landing at Dammam Airport", body: "Go straight from arrivals to Bahrain without stopping in the city.", href: "/dammam-airport-to-bahrain-taxi-service", linkLabel: "Dammam Airport to Bahrain" },
            { icon: "users", title: "A family with luggage", body: "A private car or your own car. Coach luggage space is limited, and app rides stop at the border.", href: "/fleet", linkLabel: "Choose a vehicle size" },
            { icon: "briefcase", title: "Crossing every week", body: "A standing arrangement beats booking each trip. Our commuter guide covers the busy and quiet hours.", href: "/guides/bahrain-saudi-commuter-guide", linkLabel: "Commuter guide" },
          ],
        },
      ],
    },
    {
      id: "before-you-go",
      heading: "Before you set off",
      toc: "Documents and timing",
      blocks: [
        { type: "list", items: [
          "**GCC citizens** cross with their national ID. **Other nationalities** need a valid Saudi visa or Iqama, and a Bahrain visa or eVisa where required. Check the current rules for your passport before you travel.",
          "**Weekday mornings** are usually the quickest. **Thursday and Friday evenings** are the busiest, in both directions.",
          "Keep passports and IDs in the car with you, not packed in the boot.",
          "If someone is meeting you on the other side, agree the exact address before you leave.",
        ] },
        { type: "p", text: "Distance and the best time of day are covered in detail on [Bahrain to Dammam: distance and time](/distance/bahrain-to-dammam)." },
      ],
    },
  ],
  faqs: [
    { q: "Can I take an Uber or Careem from Bahrain to Dammam?", a: "Not as one trip. Ride-hailing works country by country, so a booking stops at the causeway checkpoint, and you cannot walk across. Use apps on either side, and book the crossing itself as a private car, a coach or your own car." },
    { q: "How do I get from the Dammam train station to Janabiya in Bahrain?", a: "It is about 65 km, roughly 50 minutes of driving plus the border. The simplest way is a private car booked to meet your train and drive you through the causeway to Janabiya. The cheaper way is an app ride to the coach stop and a scheduled coach, if one runs that day." },
    { q: "Can I walk across the King Fahd Causeway?", a: "No. The causeway is a motorway bridge with no pedestrian crossing." },
    { q: "Do I change cars at the border?", a: "Not with a private car. The same car and driver take you through both posts to your address. App rides and city taxis stop at the border, which is why they don't work for the crossing." },
    { q: "Is there a bus between Bahrain and Dammam?", a: "Scheduled coaches have run across the causeway, including SAPTCO services. Timetables change, so confirm with the operator before you rely on one." },
    { q: "How much is a private taxi from Dammam to Bahrain?", a: "A sedan from Dammam is starting from 500 SAR per car, one way, with the causeway toll included. From Dammam Airport it starts from 550 SAR. Prices may vary with date and availability." },
    { q: "Can I drive a hire car from Saudi Arabia into Bahrain?", a: "Only if the rental agreement and its insurance allow it, and many don't. With your own GCC-registered car you need cross-border insurance, and a toll applies on the causeway." },
  ],
  routes: [
    { href: "/dammam-to-bahrain-taxi-service", title: "Dammam to Bahrain taxi", body: "From Dammam, Al Khobar or Dhahran. Sedan starting from 500 SAR.", icon: "car" },
    { href: "/bahrain-to-dammam-taxi-service", title: "Bahrain to Dammam taxi", body: "From any Bahrain address to the Eastern Province.", icon: "car" },
    { href: "/dammam-airport-to-bahrain-taxi-service", title: "Dammam Airport to Bahrain", body: "Straight from arrivals. Sedan starting from 550 SAR.", icon: "plane" },
    { href: "/distance/bahrain-to-dammam", title: "Bahrain to Dammam distance", body: "65 km: route, border time and the best time of day.", icon: "route" },
    { href: "/riyadh-to-bahrain-taxi-service", title: "Riyadh to Bahrain taxi", body: "Door to door from the capital, starting from 1,250 SAR.", icon: "car" },
    { href: "/border-crossing", title: "All border crossings", body: "Bahrain, Qatar, Kuwait, the UAE and Jordan.", icon: "flag" },
  ],
  related: ["/guides/bahrain-saudi-commuter-guide", "/guides/saudi-arabia-to-kuwait-by-road", "/guides/rent-a-car-vs-private-driver"],
  sourcesNote: "Distances: map routing (OSRM), checked 20 November 2026. Fares: our own route pages, per car, one way.",
};

export default function Post() {
  return <ArticlePage data={data} />;
}
