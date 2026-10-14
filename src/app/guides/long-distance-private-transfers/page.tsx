import { generatePageMetadata } from "@/lib/seo";
import GuidePage, { type GuideData } from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Long-Distance Private Transfers Guide",
  description: "How a long-distance private transfer works — door-to-door intercity and cross-border journeys, when a car with a driver beats flying, planning the day, and choosing the right vehicle.",
  path: "/guides/long-distance-private-transfers",
});

/*
 * Content map — 28-day Search Console report (17 Aug–13 Sep 2026)
 *
 * QUERIES: "car with driver from dubai to riyadh" (15 impressions), "bahrain
 *   to riyadh by car", "riyadh to uae by road", "riyadh to dubai car",
 *   "dammam to bahrain by road", "private transfer", "private transfer
 *   service", "taxi with driver", "private driver", "by car".
 * INTENT: Informational — "what is a long private road journey actually
 *   like, and is it right for my trip?" The route-specific questions
 *   (distance, time, booking) already belong to the /distance and route
 *   pages; nothing on the site explains the long-distance journey itself.
 * DOES NOT COMPETE WITH:
 *   /guides/chauffeur-vs-taxi-saudi-arabia  — chauffeur vs metered taxi
 *   /guides/rent-a-car-vs-private-driver    — self-drive vs driver
 *   /blog/vip-transport-saudi               — executive service standards
 *   /distance/* and route pages             — one corridor each
 * FIGURES: every distance and time below is copied from the site's own
 *   distance pages (distanceRouteData.ts), so the two can never disagree.
 */

const data: GuideData = {
  path: "/guides/long-distance-private-transfers",
  title: "Long-Distance Private Transfers: How Door-to-Door Intercity Travel Works",
  subtitle: "What to expect from a private car and driver on a journey of several hours — between Saudi cities, across GCC borders, and from the airport straight to another city.",
  eyebrow: "Travel Guide",
  category: { label: "Routes", href: "/routes" },
  keyTakeaways: [
    "A long-distance private transfer collects you at your door and takes you to your destination address in another city or country — one booking, one driver, no connections.",
    "It usually makes most sense for families and groups, travellers with a lot of luggage, trips with stops along the way, and destinations without a convenient flight.",
    "Plan journeys of five hours or more as a full travel day, with rest stops every two to three hours.",
    "Cross-border journeys need passports, visas or GCC IDs ready before departure; the driver handles the vehicle side of the crossing.",
  ],
  sections: [
    {
      heading: "What a Long-Distance Private Transfer Is",
      content: "A long-distance private transfer is a single, pre-arranged road journey between cities — Riyadh to Dammam, Jeddah to Madinah, Bahrain to Riyadh, Riyadh to Dubai. A professional driver collects you from your hotel, home, office or airport arrivals hall and drives you to the address you are travelling to. The route, the timing and the stops are agreed before you set off, and the vehicle is chosen for your group and your luggage.",
      list: [
        "Door to door: pickup and drop-off at the addresses you choose",
        "One booking for the whole journey, instead of a taxi, a flight and another taxi",
        "A driver who knows the long intercity roads and plans the rest stops",
        "Departure at a time that suits you, not a timetable",
      ],
    },
    {
      heading: "When a Car With a Driver Makes More Sense Than Flying",
      content: "For a solo traveller on a tight schedule, flying between the major cities is usually quicker. The balance changes as soon as the trip gets more complicated — because a flight still needs a journey to the airport, check-in time, and another transfer at the other end.",
      list: [
        "Families and groups: one vehicle carries everyone, while every flight seat is paid for separately",
        "Heavy luggage: no airline baggage limits — useful for moving, long stays or pilgrimage trips",
        "Stops along the way: a private journey can pause at another city, a viewpoint or a relative's home",
        "Destinations without a convenient airport, or with no direct flight",
        "Travellers who would rather avoid airports altogether",
      ],
    },
    {
      heading: "Common Long-Distance Journeys",
      content: "These are some of the intercity and cross-border journeys travellers book most often. Times are for the drive itself, plus border processing where one applies — add rest stops on top.",
      table: {
        headers: ["Journey", "Road distance", "Typical time"],
        rows: [
          ["Riyadh → Dammam", "~400 km", "~4 hours"],
          ["Jeddah → Madinah", "~420 km", "~4.5 hours"],
          ["Makkah → Madinah", "~450 km", "4–5 hours"],
          ["Doha → Dammam", "~440 km", "5–6 hours incl. border"],
          ["Bahrain → Riyadh", "~470 km incl. causeway", "4.5–5.5 hours incl. border"],
          ["Dammam → Kuwait", "~530 km", "5.5–6.5 hours incl. border"],
          ["Doha → Riyadh", "~580 km", "6.5–7.5 hours incl. border"],
          ["Riyadh → Makkah", "~870 km", "9–10 hours"],
          ["Riyadh → Jeddah", "~950–1,000 km", "10–11 hours"],
          ["Dammam → Abu Dhabi", "~950 km", "10–11.5 hours incl. border"],
          ["Riyadh → Dubai", "~1,100 km", "11–12.5 hours incl. border"],
        ],
      },
      cta: { text: "Planning one of these journeys? Request a door-to-door quote.", link: "/book-online" },
    },
    {
      heading: "Planning the Day",
      content: "Anything over about five hours is best treated as a full travel day rather than something squeezed around other plans.",
      list: [
        "Leave early, especially in summer, when midday temperatures across the interior are extreme",
        "Plan a rest stop every two to three hours — more often with children or older passengers",
        "Agree meal and prayer stops with your driver before you set off",
        "For cross-border journeys, aim to reach the border in daylight and avoid Thursday and Friday evening peaks where you can",
        "Share the exact drop-off address in advance, so the final stretch is planned too",
      ],
    },
    {
      heading: "Choosing the Right Vehicle",
      content: "Comfort matters far more on a ten-hour journey than on a twenty-minute airport run. Choose the vehicle for your group and your luggage, not just the number of seats.",
      table: {
        headers: ["Vehicle", "Suits"],
        rows: [
          ["Executive sedan", "One to three travellers with standard luggage — business trips and couples"],
          ["SUV", "Families of up to five, or smaller groups with more luggage"],
          ["Van", "Larger families and groups travelling together"],
          ["Minibus or coach", "Delegations, tour groups and pilgrimage groups"],
        ],
      },
      cta: { text: "Compare vehicles, seating and luggage space.", link: "/fleet" },
    },
    {
      heading: "Crossing a Border on the Way",
      content: "Many long journeys in the Gulf cross an international border — into Bahrain over the King Fahd Causeway, or into Qatar, Kuwait, the UAE or Jordan by land. Border processing adds time, and each crossing has its own rhythm. Your driver stays with you through it: the vehicle, its documents and the queueing are handled for you, and the journey continues to your destination address on the other side.",
      list: [
        "Passports valid for at least six months are the usual requirement — confirm yours before travel",
        "GCC nationals generally cross with a national ID; other nationalities need the correct visa, eVisa or Iqama",
        "Keep documents within reach rather than packed in the luggage",
        "Entry rules vary by nationality and change — check official sources before you travel",
      ],
    },
    {
      heading: "What to Bring for a Long Road Day",
      content: "A little preparation makes the hours pass far more comfortably.",
      list: [
        "Water and light snacks, even with planned meal stops",
        "Phone charger and any medication you need during the day",
        "Something warm — vehicle air-conditioning can feel cold over several hours",
        "Entertainment for children, and a small bag with essentials kept inside the cabin",
      ],
    },
    {
      heading: "How to Request a Quote",
      content: "A clear request gets a clear answer. Share the details below and the journey can be planned and priced before you travel.",
      list: [
        "Pickup address and destination address",
        "Travel date and preferred departure time",
        "Number of passengers, including children and any child seats needed",
        "Number and size of suitcases",
        "Any stops you would like along the way",
      ],
    },
  ],
  faqs: [
    { q: "Can I hire a car with a driver for a journey to another city or country?", a: "Yes — private transfers run between Saudi cities and to Bahrain, Qatar, Kuwait, the UAE and Jordan, door to door, with the route and stops planned in advance." },
    { q: "Is a long-distance private transfer cheaper than flying?", a: "For one traveller, flying is often cheaper and faster. For families and groups, the comparison changes: each flight seat is paid for separately, plus airport transfers at both ends, while one vehicle carries the whole group." },
    { q: "Can we stop along the way?", a: "Yes — rest, meal and prayer stops are part of the plan, and a stop at another city or a relative's home can be built in when you book." },
    { q: "How long can a single journey be?", a: "Some of the longest common journeys, such as Riyadh to Dubai, take around 11–12.5 hours including border processing. Journeys of that length are best planned as a full day with regular breaks." },
    { q: "Do I need special documents for a cross-border journey?", a: "You need a valid passport and whatever entry permission your nationality requires — a visa, eVisa, Iqama or GCC ID. Requirements vary and change, so confirm yours through official sources before travelling." },
    { q: "Which vehicle is best for a long journey with luggage?", a: "An SUV suits most families; a van suits larger groups or anyone carrying a lot of luggage. Share your passenger and suitcase numbers when you request a quote and the vehicle will be matched to them." },
  ],
  relatedLinks: [
    { href: "/distance", label: "Distance & Travel Time Guides", reason: "Distance, drive time and route details for each corridor." },
    { href: "/routes", label: "All Transfer Routes", reason: "Intercity, airport and cross-border routes in one place." },
    { href: "/border-crossing", label: "Saudi Arabia Border Crossings", reason: "How each GCC and Jordan land border works." },
    { href: "/fleet", label: "Our Fleet", reason: "Sedans to coaches — seating and luggage space compared." },
    { href: "/blog/riyadh-to-jeddah-travel", label: "Riyadh to Jeddah Travel Options", reason: "Flying, driving, coach or private transfer — compared." },
    { href: "/guides/chauffeur-vs-taxi-saudi-arabia", label: "Chauffeur vs Taxi", reason: "How a private chauffeur differs from a metered taxi." },
  ],
  ctaText: "Plan Your Door-to-Door Journey",
  ctaLink: "/book-online",
  closingHeading: "Planning a Long Journey?",
  ctaHelper: "Share your pickup, destination and group size — the route, the vehicle and the stops are planned before you set off.",
  lastReviewed: "September 2026",
};

export default function LongDistancePrivateTransfersGuide() {
  return <GuidePage data={data} />;
}
