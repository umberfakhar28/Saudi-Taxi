import { generatePageMetadata } from "@/lib/seo";
import BlogPost, { type BlogPostData } from "@/components/BlogPost";

export const metadata = generatePageMetadata({
  title: "Top 10 Attractions in Riyadh",
  description: "From Diriyah to Boulevard World — the essential Riyadh attractions for tourists, first-time visitors, and returning travelers.",
  path: "/blog/top-attractions-riyadh",
});

/*
 * Strengthened from the Search Console report, 7 days to 2026-09-10.
 * Queries: "best attractions near area of kingdom centre tower" and two
 * variants, plus "places to visit near king fahd district". The post
 * already covered Kingdom Centre and Al Faisaliah, but gave no sense of how
 * the other eight sights relate to that area — which is what someone
 * staying there is actually asking. One section added; all ten original
 * entries are kept unchanged.
 */

const data: BlogPostData = {
  path: "/blog/top-attractions-riyadh",
  title: "Top 10 Attractions in Riyadh You Must Visit",
  category: "Destinations",
  date: "June 2025",
  lastReviewed: "September 2026",
  excerpt: "Riyadh has transformed into one of the Middle East's most dynamic city destinations. Here are the 10 experiences you cannot miss.",
  body: [
    { heading: "1. Diriyah — UNESCO World Heritage Site", text: "The birthplace of the Saudi state and a UNESCO World Heritage Site, Diriyah's At-Turaif district is a stunning mudbrick heritage city. The ongoing Diriyah Gate development project is turning it into a full destination. Allow at least half a day. Best visited in late afternoon for golden hour photography." },
    { heading: "2. Kingdom Centre Tower Sky Bridge", text: "The observation deck of the Kingdom Centre Tower offers a 360-degree panorama across Riyadh from 300m. The rose-gold glass sky bridge is an architectural icon and a photography landmark. Located in the Olaya district — easily reached via our Riyadh taxi service." },
    { heading: "3. National Museum of Saudi Arabia", text: "One of the best museums in the Arabian Peninsula, covering Saudi history from pre-Islamic civilisations through the founding of the Kingdom and Vision 2030. Eight themed halls with interactive exhibits. Free entry on Saturdays." },
    { heading: "4. Boulevard Riyadh City", text: "A 2.5km open-air entertainment complex with restaurants, concerts, rides, and events running throughout the year. The Boulevard World zone recreates iconic city scenes from Paris, New York, and Tokyo. Extremely popular with families on weekends." },
    { heading: "5. Al-Faisaliah Tower Observation Globe", text: "The golden globe at the top of Al-Faisaliah Tower houses a restaurant and observation area. Located opposite Kingdom Centre in the Olaya commercial district — a short transfer from most Riyadh hotels." },
    { heading: "6. Masmak Fortress", text: "The historic mudbrick fort in central Riyadh where Ibn Saud's warriors launched the 1902 capture of Riyadh. A significant moment in Saudi history, well presented with artefacts, weapons, and historical narrative. In Al-Dira district, walkable from the old markets." },
    { heading: "7. Al-Zal & Al-Dira Souq", text: "The original Riyadh market district — antiques, gold, textiles, and traditional Saudi handicrafts. Less tourist-polished than modern malls and far more authentic. Best visited on a cooler morning with a return taxi booked for when you're ready to leave." },
    { heading: "8. King Abdullah Park & Riyadh Season Venues", text: "Riyadh Season (October–February) transforms multiple entertainment zones across the city into world-class festival venues. Check the official programme before your visit — concerts, exhibitions, and regional celebrations fill hundreds of events." },
    { heading: "9. Wadi Hanifa & Green Riyadh", text: "Riyadh's greening project has transformed the desert valley of Wadi Hanifa into a 120km linear park. Cycling paths, picnic areas, and dramatic escarpment views make it a surprising contrast to the urban core. Accessible via transfer from any Riyadh hotel." },
    { heading: "10. The Edge of the World (Jebel Fihrayn)", text: "90km from Riyadh, the Edge of the World is a dramatic escarpment offering one of Saudi Arabia's most stunning vistas — an abrupt cliff dropping 300m to an ancient seabed. Accessible only by 4WD. We can arrange full-day transfers with an experienced desert driver." },
    {
      heading: "Staying Near Kingdom Centre? How the Sights Fit Together",
      text: "Kingdom Centre and Al Faisaliah Tower both stand on King Fahd Road in Olaya, Riyadh's main business district — which is why so many of the city's hotels, malls and restaurants cluster around them. They're the natural first stop if you're staying in the area. The rest of this list is spread across a large city, and grouping it by distance from Olaya makes it much easier to plan a day:",
      list: [
        "In Olaya itself — Kingdom Centre's Sky Bridge and Al Faisaliah Tower, a short taxi hop from each other on King Fahd Road.",
        "A short transfer south — the National Museum, then Masmak Fortress and the Al-Zal and Al-Dira souqs in the historic centre, which pair well in one outing.",
        "Further out — Diriyah on the city's north-western edge and Boulevard Riyadh City to the north-west are best treated as separate trips.",
        "West of the city — Wadi Hanifa's parks and escarpment views.",
        "A full day — the Edge of the World, around 90 km out, reached by 4WD.",
      ],
    },
  ],
  faqs: [
    { q: "What is there to see near Kingdom Centre in Riyadh?", a: "Kingdom Centre's own Sky Bridge observation deck, and Al Faisaliah Tower's observation globe a short taxi hop along King Fahd Road. Both are in Olaya, Riyadh's main business district, surrounded by hotels, malls and restaurants." },
    { q: "How do I get from Olaya to Diriyah or Boulevard?", a: "Both are a transfer rather than a walk — Diriyah is on Riyadh's north-western edge and Boulevard Riyadh City lies to the north-west, so they're easiest to reach by taxi or a pre-booked transfer from your hotel." },
    { q: "Can I see Masmak Fortress and the old souqs in one visit?", a: "Yes. Masmak Fortress is in the Al-Dira district, within walking distance of the Al-Zal and Al-Dira souqs, so the two fit comfortably into a single morning — ideally a cooler one." },
  ],
  relatedServiceLinks: [
    { href: "/services/riyadh", label: "Riyadh Taxi & Chauffeur Service", reason: "Getting between Diriyah, Boulevard and the city’s districts — they sit 30–50 km apart." },
    { href: "/riyadh-airport-taxi-service", label: "Riyadh Airport Transfers", reason: "Arriving at King Khalid International, 35 km north of the centre." },
    { href: "/hotels/riyadh/the-ritz-carlton-riyadh", label: "Riyadh Hotel Transfers", reason: "Door-to-door transfers to and from the city’s hotel districts." },
  ],
};

export default function Post() {
  return <BlogPost data={data} />;
}
