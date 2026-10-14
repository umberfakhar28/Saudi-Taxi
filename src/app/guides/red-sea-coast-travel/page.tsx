import { generatePageMetadata } from "@/lib/seo";
import GuidePage, { type GuideData } from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Travelling Saudi Arabia's Red Sea Coast",
  description: "How to reach and travel Saudi Arabia's Red Sea coast — Yanbu, Umluj, Al Wajh and the Red Sea Project. Which airport to fly into, what the coast road is like, and when to go.",
  path: "/guides/red-sea-coast-travel",
  keywords: ["Saudi Red Sea coast", "how to get to Umluj", "Red Sea International Airport", "Yanbu to Umluj", "Red Sea Project travel"],
});

/*
 * Content map (informational-blog brief §29):
 * PRIMARY KEYWORD: travelling Saudi Arabia's Red Sea coast / how to get to Umluj
 * SEARCH INTENT: Informational — orientation and trip planning for a stretch
 *   of coast most visitors can't place on a map, ahead of any booking.
 * CONTENT GAP: /services/yanbu and /yanbu-airport-taxi-service both earn
 *   impressions (58 and 67 over the 28 days to 2026-10-11) and both already
 *   reference Red Sea dive tourism — but they are single-city service pages.
 *   Nothing on the site covers the coast as a region, and Umluj, Al Wajh and
 *   Red Sea International Airport (RSI) appear nowhere at all. See
 *   docs/seo-action-plan-2026-10.md §12.6.
 * PRIMARY COMMERCIAL PAGE: /services/yanbu — the coastal city actually
 *   served, and the one with proven rankings.
 * DOES NOT COMPETE WITH: /services/yanbu (city service page, booking intent)
 *   or /services/neom (a different region further north).
 *
 * ACCURACY NOTE — read before editing:
 * Public sources disagree sharply on road distances along this coast
 * (Rome2rio alone gives both ~147 km and ~198 km for Yanbu–Umluj on
 * different pages, and quotes an RSI–Umluj taxi time that is not physically
 * consistent with its own distance). Nothing here states a kilometre figure
 * for that reason — drive times are given as ranges and labelled as
 * approximate, per the site-wide rule against presenting estimates as facts.
 *
 * This guide deliberately makes NO claim that Gulf Trip Service operates
 * transfers to Umluj, Al Wajh or the Red Sea Project. Coverage there is
 * unconfirmed. The CTA points at Yanbu, which is served, and invites an
 * enquiry rather than asserting availability.
 */

const guide: GuideData = {
  eyebrow: "Destination Guide",
  title: "Travelling Saudi Arabia's Red Sea Coast",
  subtitle:
    "Yanbu, Umluj, Al Wajh and the Red Sea Project — where they are, which airport to fly into, and how travel along the coast actually works.",
  path: "/guides/red-sea-coast-travel",
  category: { label: "Travel Guides", href: "/guides/regional-airport-transfer-guide" },
  lastReviewed: "October 14, 2026",

  keyTakeaways: [
    "The coast runs north from Jeddah through Yanbu and Umluj towards Al Wajh, the Red Sea Project and eventually NEOM — a long stretch with very different access at each point.",
    "Four airports serve it: Jeddah (JED) in the south, Madinah (MED) inland, Yanbu (YNB) on the central coast, and Red Sea International (RSI) in the north for the Red Sea Project.",
    "Umluj sits north of Yanbu, roughly a two-hour drive up the coast road. There is no quick public-transport link; most visitors drive or arrange a car.",
    "Diving and boat conditions are calmest roughly October through April.",
    "Resorts on the Red Sea Project's outer islands are reached by boat or seaplane, not by road.",
  ],

  sections: [
    {
      heading: "Where the Red Sea coast begins and ends",
      content:
        "Saudi Arabia's Red Sea shoreline runs for well over a thousand kilometres, and 'the Red Sea coast' means very different things depending on who is saying it. For most travellers it starts at Jeddah, the long-established gateway in the south, and runs north through Yanbu, then Umluj, then Al Wajh, before reaching the Red Sea Project development and, much further north, NEOM. These are not neighbouring towns. The drive between any two of them is a serious journey rather than a hop, and the practical question is almost always which airport to fly into rather than how to drive the whole coast.",
      list: [
        "Jeddah — the southern gateway and the largest international hub on the coast",
        "Yanbu — an established coastal city with its own airport, port and dive scene",
        "Umluj — a smaller coastal town known for its offshore islands and sandbars",
        "Al Wajh — further north, the nearest established town to the Red Sea Project area",
        "The Red Sea Project — a purpose-built resort development with its own airport",
      ],
    },
    {
      heading: "Which airport to fly into",
      content:
        "Choosing the airport is the single decision that shapes the rest of the trip, because the distances between these places are long enough that getting it wrong costs most of a day. The table below is a practical orientation rather than a schedule — airline routes to the newer airports in particular change frequently, so confirm current flights directly with the airline before booking anything else.",
      table: {
        headers: ["Airport", "Location", "Best for"],
        rows: [
          ["King Abdulaziz International (JED)", "Jeddah", "The southern coast, and the widest choice of international flights"],
          ["Prince Mohammed bin Abdulaziz (MED)", "Madinah", "An inland gateway with onward road access to Yanbu and the central coast"],
          ["Yanbu (YNB)", "Yanbu", "Yanbu itself and the central coast, including the drive north towards Umluj"],
          ["Red Sea International (RSI)", "Hanak, Tabuk Province", "The Red Sea Project resorts; reported direct flights from Riyadh, Jeddah and Dubai"],
        ],
      },
    },
    {
      heading: "Yanbu — the practical base for the central coast",
      content:
        "Yanbu is the most straightforward place on this coast to actually base yourself. It is a working city rather than a resort — a petrochemical and port economy that happens to sit on very good water — which means it has ordinary infrastructure that the newer developments further north do not: hotels at a range of prices, its own airport, and a road network that connects properly to Madinah and Jeddah. Its dive sites are the reason most leisure visitors come, and they sit both north and south of the city rather than in one cluster.",
      cta: { text: "Yanbu Transfer Service", link: "/services/yanbu" },
    },
    {
      heading: "Umluj and its islands",
      content:
        "Umluj lies north of Yanbu along the coast road, a drive of roughly two hours depending on where you start and how the road is running. It is a small town, and the draw is offshore: a scatter of low islands and sandbars just out from the shore, reached by boat from the local harbour. Visitors generally treat it as a day trip from Yanbu or as an overnight stop rather than a base, because the town itself has limited accommodation compared with Yanbu or Jeddah. Public transport is the weak point — there is no quick scheduled link from Yanbu, and bus routes tend to run inland via Madinah, which turns a two-hour drive into most of a day.",
      list: [
        "Reached most practically by road from Yanbu, or by air into RSI from the north",
        "Boat trips to the islands depart from the town's harbour",
        "Accommodation is limited — most visitors stay in Yanbu or continue onward",
        "Scheduled public transport is indirect; routes tend to go via Madinah",
      ],
    },
    {
      heading: "The Red Sea Project and Red Sea International Airport",
      content:
        "The Red Sea Project is a purpose-built resort development on the northern stretch of the coast, in Tabuk Province, and it is the reason Red Sea International Airport exists. Access works differently here from anywhere else on the coast: this is a managed destination, and how you reach your hotel depends entirely on which property you have booked. Some resorts sit on the mainland or on islands linked to it by road. Others are on outer islands and are reached by boat or seaplane, arranged by the resort rather than by the traveller. If you are heading here, the resort's own arrival instructions matter more than any general guidance — confirm them before planning ground transport at all.",
    },
    {
      heading: "Driving the coast road",
      content:
        "The coastal highway is the spine of any trip along this shore, and it is a genuinely long drive. Distances published for these legs vary noticeably between sources, so treat any single figure with caution and plan by time rather than kilometres. Fuel and rest stops thin out markedly north of Yanbu, which is the practical constraint most first-time visitors underestimate. Mobile coverage is reliable near the towns and patchier on the open stretches between them.",
      list: [
        "Plan around drive times rather than distances — published figures for this coast disagree",
        "Fuel and rest stops become sparse north of Yanbu",
        "Long open stretches between towns; start legs early rather than late in the day",
        "A pre-arranged car avoids depending on limited scheduled transport",
      ],
    },
    {
      heading: "When to go",
      content:
        "Roughly October through April is when conditions on this coast are calmest, and it is the window most diving and boat activity is planned around. Summer is hot enough to change the character of a trip entirely — time outdoors gets planned around early mornings and evenings, and sea conditions are less dependable. The shoulder months at either end of that window tend to give the best balance of water conditions and availability.",
    },
  ],

  faqs: [
    {
      q: "Which airport is closest to Umluj?",
      a: "Red Sea International (RSI), in Hanak, is the nearest airport to Umluj. If you are already on the central coast, Yanbu (YNB) is the practical alternative, with a road journey of roughly two hours north from there.",
    },
    {
      q: "Can you drive from Yanbu to Umluj?",
      a: "Yes — it is a straightforward run up the coast road, taking roughly two hours. Published distances for this leg vary between sources, so plan by time and allow for stops.",
    },
    {
      q: "Is there public transport along the Red Sea coast?",
      a: "It is limited and indirect. There is no quick scheduled service between Yanbu and Umluj; bus routes generally run inland via Madinah, which makes the journey considerably longer than driving. Most visitors drive or arrange a car.",
    },
    {
      q: "How do you reach the Red Sea Project's island resorts?",
      a: "It depends on the property. Some sit on the mainland or on islands connected by road; others on the outer islands are reached by boat or seaplane, arranged by the resort. Check your hotel's own arrival instructions before planning ground transport.",
    },
    {
      q: "When is the best time to visit the Saudi Red Sea coast?",
      a: "Roughly October through April, when sea conditions are calmest and temperatures are comfortable for time outdoors. This is also when most diving and boat activity is scheduled.",
    },
  ],

  relatedLinks: [
    { href: "/services/yanbu", label: "Yanbu Transfer Service", reason: "The coastal city we cover — airport pickups, dive-site drop-offs and city transfers." },
    { href: "/yanbu-airport-taxi-service", label: "Yanbu Airport (YNB) Transfers", reason: "Meet-and-greet pickup if you're flying into the coast's own regional airport." },
    { href: "/services/madinah", label: "Madinah Transfer Service", reason: "The inland gateway most travellers use to reach the central coast by road." },
    { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA) Transfers", reason: "The southern gateway, and the widest choice of international arrivals." },
    { href: "/services/tabuk", label: "Tabuk Transfer Service", reason: "The province the northern coast and Red Sea International Airport sit in." },
    { href: "/services/neom", label: "NEOM Transfer Service", reason: "Further north again — often combined with a trip up this coast." },
    { href: "/guides/long-distance-private-transfers", label: "Long-Distance Private Transfers", reason: "What a multi-hour road leg actually involves, if you're linking two points on this coast." },
  ],

  closingHeading: "Planning a Trip Along the Red Sea Coast?",
  ctaHelper:
    "We run private, pre-booked transfers in Yanbu, Madinah, Jeddah and Tabuk. Tell us where on the coast you're heading and we'll confirm what we can arrange before you book anything.",
  ctaText: "Yanbu Transfer Service",
  ctaLink: "/services/yanbu",
};

export default function RedSeaCoastTravelGuide() {
  return <GuidePage data={guide} />;
}
