import { generatePageMetadata } from "@/lib/seo";
import GuidePage, { type GuideData } from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Saudi Arabia to Kuwait by Road: Routes, Borders & Time",
  brandSuffix: false,
  description: "How to travel from Saudi Arabia to Kuwait by road: distances from Riyadh, Dammam and Khafji, the Al Khafji–Al Nuwaiseeb border, documents and travel time.",
  path: "/guides/saudi-arabia-to-kuwait-by-road",
  ogImage: "/images/routes/riyadh-to-kuwait/riyadh-to-kuwait-taxi-by-road-og.jpg",
  ogImageAlt: "Private car on the road from Saudi Arabia to Kuwait City",
});

/*
 * Content map — Search Console, 28 days to 19 Nov 2026
 * (docs/seo/kuwait/keyword-map.md)
 *
 * QUERIES: "saudi to kuwait by road", "saudi to kuwait distance (by road)",
 *   "kuwait saudi border crossing", "kuwait--saudi arabia border",
 *   "nuwaiseeb border", "دخول الكويت".
 * INTENT: planning the whole trip: which road, which border, what to carry.
 * DOES NOT COMPETE WITH:
 *   /distance/riyadh-to-kuwait, /distance/dammam-to-kuwait — one corridor's
 *     distance each ("riyadh to kuwait distance")
 *   /riyadh-to-kuwait-taxi-service — the booking page ("taxi", "by car")
 *   /khafji-to-kuwait-taxi-service — the Khafji border searches
 * FIGURES: the same as those pages. Riyadh: owner-confirmed route and time
 *   (19 Nov 2026). Dammam and Khafji: map routing (OSRM), Nov 2026.
 */

const data: GuideData = {
  path: "/guides/saudi-arabia-to-kuwait-by-road",
  title: "Saudi Arabia to Kuwait by Road: Routes, Borders, Documents & Travel Time",
  subtitle: "Which road to take from Riyadh, Dammam or Khafji, how the Al Khafji–Al Nuwaiseeb border works, what each passenger needs to carry, and how long the trip really takes.",
  eyebrow: "Travel Guide",
  category: { label: "Border Crossing", href: "/border-crossing" },
  heroImage: "/images/routes/riyadh-to-kuwait/riyadh-to-kuwait-taxi-by-road-1280.webp",
  heroImageAlt: "Private taxi from Riyadh to Kuwait by road, SUV on desert highway toward Kuwait City",
  article: {
    datePublished: "2026-11-19",
    image: "/images/routes/riyadh-to-kuwait/riyadh-to-kuwait-taxi-by-road-og.jpg",
    areaServed: ["Saudi Arabia", "Kuwait"],
  },
  keyTakeaways: [
    "Most road trips from Saudi Arabia to Kuwait cross at Al Khafji (Saudi side) / Al Nuwaiseeb (Kuwaiti side), on the Gulf coast.",
    "Riyadh to Kuwait City is about 648 km, roughly 7 hours 40 minutes of driving. Dammam is about 410 km (about 4.5 hours); Khafji about 125 km (about 1.5 hours).",
    "Border time comes on top and varies with the day and hour. Weekends and public holidays are the busiest.",
    "Each passenger needs a passport valid for 6+ months and a Kuwait visa or eVisa if their nationality requires one; GCC citizens usually cross on their national ID.",
  ],
  sections: [
    {
      heading: "Saudi Arabia to Kuwait by Road at a Glance",
      content: "Kuwait shares a land border with Saudi Arabia's Eastern Province and northern desert. For most travelers the road trip means one long drive to the coast, one border with two posts, and a short final stretch into Kuwait City. The figures below are road distances to central Kuwait City; driving times do not include the border. For the full breakdown from the capital, see the [Riyadh to Kuwait distance by road](/distance/riyadh-to-kuwait).",
      table: {
        headers: ["From", "Distance to Kuwait City", "Driving time", "Border"],
        rows: [
          ["Riyadh", "~648 km", "~7 h 40 min", "Al Khafji / Al Nuwaiseeb"],
          ["Dammam", "~410 km", "~4.5 h", "Al Khafji / Al Nuwaiseeb"],
          ["Al Khafji", "~125 km", "~1.5 h", "Al Khafji / Al Nuwaiseeb"],
        ],
      },
    },
    {
      heading: "The Two Land Crossings Between Saudi Arabia and Kuwait",
      content: "There are two road crossings. The coastal one is Al Khafji on the Saudi side and Al Nuwaiseeb on the Kuwaiti side, on the Gulf road just north of the town of Al Khafji. It is open 24 hours, it is the natural crossing from Dammam, Jubail and Khafji, and it is the one most drivers use from Riyadh too, because the coastal road has more towns and services. The inland crossing is Al Ruqi'i on the Saudi side and Al Salmi on the Kuwaiti side, near Hafar Al Batin in the north-east desert. It can suit a trip that starts in the north of Saudi Arabia, but from Riyadh it is the longer and emptier road.",
      list: [
        "Coastal: Al Khafji (Saudi) / Al Nuwaiseeb (Kuwait), Route 95 into Route 40",
        "Inland: Al Ruqi'i (Saudi) / Al Salmi (Kuwait), near Hafar Al Batin",
        "Both: one exit post and one entry post, passed in the same car",
      ],
    },
    {
      heading: "From Riyadh to Kuwait by Road",
      content: "From Riyadh the road runs north-east to the Gulf coast on Routes 65, 550 and 95, crosses at Al Khafji / Al Nuwaiseeb, and finishes on Route 40 into Kuwait City. It is about 648 km and roughly 7 hours 40 minutes of driving, so with a rest stop and the border most travelers plan a full day. Leaving early is the best way to reach the border in daylight. If you would rather not drive, a [private taxi from Riyadh to Kuwait](/riyadh-to-kuwait-taxi-service) covers the whole trip door to door in one car, starting from 220 KWD per vehicle.",
      cta: { text: "Riyadh to Kuwait private taxi: one car, one driver, door to door.", link: "/riyadh-to-kuwait-taxi-service" },
    },
    {
      heading: "From Dammam and the Eastern Province",
      content: "From Dammam or Al Khobar the drive follows the coast highway north past Jubail to Al Khafji: about 410 km and around 4.5 hours of driving to Kuwait City, or 5 to 6 hours with the border. It is the most common business corridor between the two countries. See the [Dammam to Kuwait distance](/distance/dammam-to-kuwait) for more detail, or book a [Dammam to Kuwait taxi](/dammam-to-kuwait-taxi-service).",
    },
    {
      heading: "From Al Khafji: the Shortest Way In",
      content: "Al Khafji is the last Saudi town before Kuwait. The border post is only about 15 km from the town centre, and Kuwait City is about 125 km away in total, around 1.5 hours of driving, or 2 to 3 hours with the crossing. Our [Khafji to Kuwait taxi](/khafji-to-kuwait-taxi-service) page explains the Al Nuwaiseeb crossing step by step.",
    },
    {
      heading: "What Happens at the Border",
      content: "You stop twice: at the Saudi exit post at Al Khafji, then at the Kuwaiti entry post at Al Nuwaiseeb. In a private car or taxi you stay with the same vehicle throughout; nobody walks across. The two sides of the crossing are handled by different people, and it helps to know who does what.",
      list: [
        "The driver: the vehicle's registration and papers, the Kuwaiti vehicle insurance and toll bought at the border, and the right lanes at each post",
        "Each passenger: presenting their own passport or GCC ID, and answering immigration questions themselves",
        "Everyone: keeping documents in the cabin, not packed in the boot",
      ],
    },
    {
      heading: "Documents You Need to Enter Kuwait by Road",
      content: "Entry rules depend on your nationality and residency, and they change, so confirm your own case with official sources before you travel. As a general guide, this is what travelers carry.",
      list: [
        "A passport valid for at least six months",
        "A Kuwait visa or eVisa if your nationality needs one; some nationalities can get a visa on arrival",
        "GCC citizens: the national ID card is usually enough",
        "Saudi residents: a valid Iqama and an exit and re-entry visa to come back",
        "The address of your hotel or drop-off in Kuwait",
      ],
    },
    {
      heading: "How Long the Trip Takes, and When to Go",
      content: "Driving time is the predictable part. Border time is not: it varies with the day and the hour, and weekends (Thursday and Friday evenings) and public holidays are the busiest. On a long trip from Riyadh, add a rest stop of 20 to 30 minutes and allow for traffic at both ends. Starting early in the morning gives you daylight at the border and an arrival in Kuwait City before the evening rush.",
    },
    {
      heading: "Private Taxi, Self-Drive or Flight?",
      content: "Flying between Riyadh and Kuwait City is quicker for one person with light luggage. By road, the choice is between driving yourself and a private car with a driver.",
      table: {
        headers: ["Option", "Door to door", "What to know"],
        rows: [
          ["Private taxi", "Yes", "One car and driver for the whole trip; the driver handles the vehicle side of the border"],
          ["Self-drive", "Yes", "You buy Kuwaiti vehicle insurance at the border; a rental car needs the rental company's permission to leave Saudi Arabia"],
          ["Flight", "No", "Fastest in the air, plus airport time and a transfer at each end"],
        ],
      },
    },
    {
      heading: "Booking a Private Taxi to Kuwait",
      content: "A private taxi suits families, groups, travelers with luggage and anyone who would rather not drive across a border. Send your pickup, drop-off, date and number of passengers, and the fare is confirmed before you travel. Coming back the other way? Book a [taxi from Kuwait to Riyadh](/kuwait-to-riyadh-taxi-service), or see our [chauffeur service in Kuwait](/destinations/kuwait-city) for airport and city rides once you arrive.",
      list: [
        "Riyadh to Kuwait: starting from 220 KWD per car, one way",
        "Dammam and Khafji to Kuwait: quoted on WhatsApp",
        "Prices may vary depending on date and availability",
      ],
      cta: { text: "Ask for a quote on WhatsApp: pickup, drop-off, date and passengers.", link: "/riyadh-to-kuwait-taxi-service#booking" },
    },
  ],
  faqs: [
    { q: "Can you travel from Saudi Arabia to Kuwait by road?", a: "Yes. The main road crossing is Al Khafji (Saudi) / Al Nuwaiseeb (Kuwait) on the Gulf coast, open 24 hours. An inland crossing, Al Ruqi'i / Al Salmi, is near Hafar Al Batin." },
    { q: "How far is Saudi Arabia from Kuwait by road?", a: "It depends where you start: about 648 km from Riyadh, about 410 km from Dammam and about 125 km from Al Khafji, to central Kuwait City." },
    { q: "How long does it take to drive from Riyadh to Kuwait?", a: "Roughly 7 hours 40 minutes of driving for about 648 km, plus a rest stop and the border, which varies." },
    { q: "Which is the main Kuwait–Saudi border crossing?", a: "Al Khafji on the Saudi side and Al Nuwaiseeb on the Kuwaiti side, on the coast road (Route 95 in Saudi Arabia, Route 40 in Kuwait)." },
    { q: "What documents do I need to enter Kuwait by road?", a: "A passport valid for six months or more, and a Kuwait visa or eVisa if your nationality needs one. GCC citizens usually cross on their national ID. Check official sources before you travel." },
    { q: "Do I have to change cars at the border?", a: "No. In a private car or taxi you stay in the same vehicle through both posts; you only step out if officials ask you to." },
    { q: "How much is a taxi from Riyadh to Kuwait?", a: "A private taxi with Gulf Trip Service starts from 220 KWD per car, one way. Prices may vary depending on date and availability." },
  ],
  relatedLinks: [
    { href: "/riyadh-to-kuwait-taxi-service", label: "Riyadh to Kuwait Taxi", reason: "Private car door to door, starting from 220 KWD per car." },
    { href: "/distance/riyadh-to-kuwait", label: "Riyadh to Kuwait Distance", reason: "648 km by road: route, time and border in detail." },
    { href: "/distance/dammam-to-kuwait", label: "Dammam to Kuwait Distance", reason: "410 km up the Gulf coast, in both directions." },
    { href: "/khafji-to-kuwait-taxi-service", label: "Khafji to Kuwait Taxi", reason: "The shortest way in, and the Al Nuwaiseeb crossing step by step." },
    { href: "/destinations/kuwait-city", label: "Chauffeur Service in Kuwait", reason: "Kuwait Airport pickups, hotels and city rides." },
    { href: "/border-crossing", label: "All Border Crossings", reason: "Every Saudi land border we drive across." },
  ],
  ctaText: "Book a Private Taxi to Kuwait",
  ctaLink: "/riyadh-to-kuwait-taxi-service#booking",
  closingHeading: "Travelling to Kuwait by Road?",
  ctaHelper: "Share your pickup, drop-off, date and number of passengers. Your fare is confirmed before you travel.",
  lastReviewed: "19 November 2026",
};

export default function SaudiArabiaToKuwaitByRoadGuide() {
  return <GuidePage data={data} />;
}
