import { generatePageMetadata } from "@/lib/seo";
import BlogPost from "@/components/BlogPost";

/*
 * Strengthened, not rewritten (Batch 4 MD1). This URL already had search
 * visibility (~10 impressions, avg position ~48.9), so the existing page is
 * the ranking target rather than a new competing article.
 *
 * All five original destination sections are preserved verbatim; each now
 * carries one additional practical sentence drawn from the site's own
 * verified data (airport codes/distances in airportRoutesData.ts, seasonal
 * notes in cityData). Added around them: a direct-answer intro, a
 * choose-by-age section, a brief inter-city transport section, a commercial
 * bridge, and FAQs.
 *
 * Cannibalization: /guides/family-travel owns family TRANSPORT logistics
 * (vehicle sizing, child seats, elderly travellers). This post owns family
 * DESTINATIONS (where to go, what's there, who it suits). Transport detail
 * here stays deliberately brief and links out to that guide rather than
 * duplicating it. The per-destination links point at the commercial city
 * pages that own each location's transactional intent.
 *
 * November 2026: three H2s added or renamed to answer, in their own
 * words, the question-style searches this page ranks 5-11 for with no
 * clicks (GSC, 11 Oct - 7 Nov): "plan a saudi vacation for parents,
 * children and grandparents" (27 impr), "which saudi places are best for a
 * family religious trip?" (16) and "how should families travel between
 * riyadh, jeddah and red sea destinations?" (6). Every fact in them is
 * already stated elsewhere on the site: /guides/family-travel (van sizing,
 * elderly travellers), /guides/red-sea-coast-travel (airports, Yanbu,
 * Umluj), and the Jeddah-Makkah and Makkah-Madinah distance pages.
 * "Where should families stay" is deliberately not answered: the site has
 * no verified accommodation recommendations to answer it from.
 *
 * FAQs are visible content only — no FAQPage schema. Google restricted FAQ
 * rich results to authoritative gov/health domains, and the BlogPost
 * template doesn't implement faqSchema, so adding it would be unsupported
 * markup for no benefit.
 */

export const metadata = generatePageMetadata({
  // Year dropped from the title — "2025" is now stale and dates a page that
  // is otherwise evergreen.
  title: "Best Family Destinations in Saudi Arabia",
  description: "Which Saudi destinations suit a first family trip: AlUla, Abha, Taif, Jeddah and Riyadh — what fits which ages, when to go, and how families travel between them.",
  path: "/blog/family-saudi-destinations",
  keywords: ["family destinations Saudi Arabia", "Saudi Arabia family trip", "family friendly Saudi Arabia", "Abha family travel", "AlUla family visit"],
});

export default function Post() {
  return <BlogPost data={{
    path: "/blog/family-saudi-destinations",
    title: "Best Family Destinations in Saudi Arabia",
    category: "Travel Tips",
    date: "June 2025",
    excerpt: "Saudi Arabia has become one of the region's most compelling family travel destinations. Here are the best spots.",
    body: [
      {
        text: "Saudi Arabia's five strongest family destinations are AlUla for history and desert landscapes, Abha for cool mountain air and cable cars, Taif for an easy day trip from Makkah or Jeddah, Jeddah's Corniche for relaxed waterfront time, and Riyadh for entertainment and heritage. Which one fits depends mostly on your children's ages and the time of year — the sections below cover each in turn, then how families typically travel between them.",
      },
      { heading: "1. AlUla — Wonder & History Combined", text: "AlUla's ancient Nabataean tombs, dramatic rock formations, and Elephant Rock are genuinely awe-inspiring for children and adults alike. The Winter at Tantora festival (December–March) adds concerts and activities. Best for: families with children 8+. Transport: private transfer from AlUla Airport, then a dedicated driver for site visits. AlUla Regional Airport (ULH) is the usual arrival point, and because the heritage sites are spread across a wide desert area with timed entry slots, most families book a driver for the full day rather than moving between sites individually." },
      { heading: "2. Abha & the Asir Highlands", text: "At 2,200m elevation, Abha is Saudi Arabia's coolest summer destination. The Al-Soudah cable car, Habala hanging village, and lush Asir escarpment are unlike anywhere else in the Kingdom. Best for: families with children of all ages. Transport: Abha Airport transfer, then local mountain driver for full-day excursions. Abha International (AHB) sits about 22 km from the city, and June–August is peak season precisely because families come here to escape the heat elsewhere — book accommodation and drivers ahead if travelling then." },
      { heading: "3. Taif — The City of Roses", text: "Taif is perfect for a family day trip from Makkah or Jeddah. The Al-Hada cable car, honey markets, rose farms, and cool mountain air make it a favourite for Saudi families escaping summer heat. Best for: families with young children. Transport: direct Makkah–Taif or Jeddah–Taif private transfer. The rose harvest runs roughly March into early April, when the farms and rose-water souqs are at their busiest — the most rewarding time to visit, and the one that most needs booking in advance." },
      { heading: "4. Jeddah Corniche & Waterfront", text: "The Jeddah waterfront offers a relaxed, family-friendly atmosphere with parks, cycling tracks, seafood restaurants, and the world's tallest fountain. Al-Shallal Theme Park is ideal for children aged 5–16. Best for: all family types. Transport: Jeddah city taxi with hourly or half-day booking. Coastal humidity peaks in summer, so families generally find early-morning or evening Corniche visits far more comfortable than the middle of the day." },
      { heading: "5. Riyadh Boulevard & Diriyah", text: "Riyadh Boulevard City hosts year-round entertainment. Diriyah's UNESCO mudbrick city is genuinely fascinating for older children interested in history. Riyadh Season (October–February) adds world-class events. Best for: families with teens. Transport: Riyadh city transfers with our fixed-rate service. Riyadh's districts can sit 30–50 km apart, so a single driver for a multi-stop day is considerably easier with children than arranging separate rides between each stop." },
      {
        heading: "Choosing by Your Children's Ages",
        text: "Younger children (under 8) tend to do best in Taif and Jeddah, where the attractions are compact, low-effort and easy to leave early if the day goes sideways. Abha suits all ages — the cable cars and open highland spaces work for a wide range. AlUla rewards children of around 8 and up, who can appreciate the archaeology and manage longer days across the site. Riyadh's Boulevard and Diriyah are strongest for teenagers, with more to hold their attention in a single area.",
      },
      {
        heading: "How do you plan a Saudi trip for parents, children and grandparents?",
        text: "Choose destinations where a day can be kept short. Taif and Jeddah suit this best, because their attractions are compact and easy to leave early, and Abha works across all ages. Outside October to March, keep to the highlands: Abha and Taif are noticeably cooler than the coast or the interior. For transport, three generations usually means a van. Groups of 6 to 9 need one, and going up a size early avoids a cramped, luggage-heavy trip. Drivers are used to travelling with older passengers, and vehicles with lower entry steps can be arranged for anyone with limited mobility, if you mention it at booking.",
      },
      {
        heading: "Which Saudi destinations are best for a family religious trip?",
        text: "For Umrah, the destinations are Makkah and Madinah. Families usually arrive through Jeddah's King Abdulaziz International Airport, about 80 km from Makkah, or through Madinah's own airport. The two holy cities are about 450 km apart, roughly 4 to 5 hours by road via the Haramain Expressway. Many families making this trip travel with elderly relatives, so a private vehicle for each leg saves repeated transfers with luggage. Taif makes a cool day trip from Makkah once the Umrah itself is done.",
      },
      {
        heading: "How should families travel between Riyadh, Jeddah and the Red Sea coast?",
        text: "These destinations are spread right across the country, so most families fly between regions and arrange ground transport at each end rather than driving the whole way. Abha, AlUla and Taif each have their own airport; Jeddah and Riyadh are the two major international gateways. The one exception is Taif, which is genuinely a road trip — it's a comfortable day trip from either Makkah or Jeddah. The Red Sea coast runs north from Jeddah through Yanbu and Umluj, and four airports serve it: Jeddah (JED), Madinah (MED), Yanbu (YNB) and Red Sea International (RSI) for the Red Sea Project. Yanbu is the most practical base on the central coast, and Umluj is roughly two hours further north by road. For vehicle sizing, child seats and travelling with elderly family members, our family travel guide covers the transport side in detail.",
      },
      {
        heading: "Planning a Family Trip Around Saudi Arabia?",
        text: "The practical difficulty with family travel here is rarely the destinations themselves — it's the distances between them and the logistics at each end. A private transfer gives you door-to-door travel with a vehicle sized to your group and luggage, airport pickup timed to your flight, and one driver for a full sightseeing day rather than repeatedly arranging rides with children in tow. Sedans seat up to 3, SUVs up to 5, and vans up to 9; child seats are available on request when you mention ages at booking.",
      },
      {
        heading: "Which destination is best for a first family visit to Saudi Arabia?",
        text: "For a first trip, Jeddah or Riyadh are the easiest starting points — both are major international gateways with the widest range of accommodation and the shortest transfers to family attractions. Abha is the strongest choice if you're visiting in summer and want to avoid the heat.",
      },
      {
        heading: "When is the best time of year for a family trip?",
        text: "October through March is comfortable almost everywhere, and it overlaps with both Riyadh Season and Winter at Tantora in AlUla. Summer (June–August) is best spent in the highlands — Abha and Taif are noticeably cooler than the coast or the interior.",
      },
      {
        heading: "How do families usually travel between Saudi cities?",
        text: "Domestic flights for the long legs, private transfers at each end. The distances are substantial — Riyadh to Jeddah is roughly 950 km — so driving the full route is rarely the practical choice for a family, though shorter corridors like Makkah to Taif or Jeddah to Taif are comfortable road trips.",
      },
      {
        heading: "Are child seats available in private transfers?",
        text: "Yes — infant, toddler and booster seats can be arranged on request. Specify each child's age and weight when booking so the right restraints are ready in the vehicle rather than sorted out on arrival.",
      },
    ],
    relatedServiceLinks: [
      { href: "/services/alula", label: "AlUla Transfers", reason: "A dedicated driver for Hegra, Elephant Rock and the wider heritage sites." },
      { href: "/services/abha", label: "Abha Transfers", reason: "Airport pickup and mountain-road excursions to Al-Soudah and Habala." },
      { href: "/services/taif", label: "Taif Transfers", reason: "Day trips from Makkah or Jeddah, including the rose farms and cable car." },
      { href: "/services/jeddah", label: "Jeddah Transfers", reason: "Corniche, Al-Balad and half-day city bookings with the family." },
      { href: "/services/riyadh", label: "Riyadh Transfers", reason: "One driver for a multi-stop day across Boulevard and Diriyah." },
      { href: "/guides/family-travel", label: "Family Travel Guide", reason: "Vehicle sizing, child seats and travelling with elderly family members." },
      { href: "/umrah-taxi-services", label: "Umrah Transfers", reason: "Airport, hotel and Makkah–Madinah transfers for families making Umrah." },
      { href: "/guides/red-sea-coast-travel", label: "Red Sea Coast Guide", reason: "Which airport to fly into for Yanbu, Umluj and the Red Sea Project." },
    ],
  }} />;
}
