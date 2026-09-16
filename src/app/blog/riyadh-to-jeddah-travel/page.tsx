import { generatePageMetadata } from "@/lib/seo";
import BlogPost, { type BlogPostData } from "@/components/BlogPost";

export const metadata = generatePageMetadata({
  title: "Riyadh to Jeddah Travel Options",
  description: "Fly, drive, take the coach or book a private transfer? Riyadh–Jeddah compared by time, comfort and who each option suits — plus why there’s no direct train.",
  path: "/blog/riyadh-to-jeddah-travel",
});

/*
 * Strengthened from the Search Console report, 7 days to 2026-09-10 —
 * the site's best-ranking blog post (position 8).
 *
 * Corrections, not just additions:
 *   - Drive time said 9–10 hours; /distance/riyadh-to-jeddah says 950–1,000
 *     km and 10–11 hours. Aligned to the distance page so the two agree.
 *   - Named "SATRANS and SAMtrans" as the coach operators. SAMtrans is a
 *     California transit agency; the Saudi intercity operator is SAPTCO.
 *   - The meta description promised a train comparison the article never
 *     made. It now answers the question: there's no direct Riyadh–Jeddah
 *     passenger rail.
 *   - Specific fares ("from SAR 150", "sub-SAR 200") couldn't be verified
 *     and change constantly, so they're replaced with guidance that stays
 *     true.
 * Title and H1 are deliberately unchanged, to avoid disturbing a page that
 * already ranks. The original four options and recommendation are kept.
 */

const data: BlogPostData = {
  path: "/blog/riyadh-to-jeddah-travel",
  title: "Riyadh to Jeddah: All Your Travel Options Compared",
  category: "Transportation",
  date: "June 2025",
  lastReviewed: "September 2026",
  excerpt: "Riyadh and Jeddah are around 950–1,000 km apart — one of Saudi Arabia’s most-travelled corridors. Here’s the honest breakdown of every way to make the trip.",
  body: [
    {
      heading: "The Short Answer",
      text: "Most people fly: the flight is about an hour and a half, against 10–11 hours of continuous driving on the road. Driving yourself or taking a private transfer makes sense when you need a vehicle at the other end, are travelling as a group, or are carrying more than an airline allows. The intercity coach is the cheapest option and also the slowest. There is currently no direct passenger train between the two cities.",
    },
    {
      heading: "Option 1: Fly (about 1.5 hours in the air)",
      text: "Saudia, flynas and flyadeal all fly between Riyadh and Jeddah, with frequent departures through the day. Once you add getting to the airport, checking in and reaching your hotel at the other end, the door-to-door time is typically 4–5 hours. Fares vary by date and carrier, and booking early is usually the cheapest way to fly. Best for business travellers, solo travellers and anyone on a tight schedule — with airport transfers at both ends for a smooth end-to-end journey.",
      cta: { text: "Flying from Riyadh? Arrange your transfer to King Khalid International.", link: "/riyadh-airport-taxi-service" },
    },
    {
      heading: "Option 2: Drive Yourself (10–11 hours)",
      text: "The road route runs roughly 950–1,000 km west across the country via Taif, crossing from the central Najd plateau to the Hejaz coast. Allow 10–11 hours of continuous driving — and more in practice once you stop for rest, meals and fuel. Driver fatigue is the real consideration on a trip this long, so many people break it with an overnight stop. Best for travellers who need their own car in Jeddah, road-trip enthusiasts, or anyone moving belongings.",
    },
    {
      heading: "Option 3: Private Intercity Transfer",
      text: "A private transfer takes you from your Riyadh address to your Jeddah hotel in one vehicle, with no airport queues, no airline baggage allowances and a departure time you choose. The road time is the same as driving yourself, but the driver handles the navigation and the long day at the wheel. Best for families, groups and executives who value door-to-door travel, or anyone with more luggage than a flight allows.",
    },
    {
      heading: "Option 4: Intercity Coach (12+ hours)",
      text: "SAPTCO, the Saudi Public Transport Company, runs intercity coach services on this route from its bus stations. With stops, the journey takes 12 hours or more. It’s the most affordable way to travel, but also the most time-consuming, and it runs to fixed departure times — not a good fit for business travellers or pilgrims on a tight schedule.",
    },
    {
      heading: "Is There a Train From Riyadh to Jeddah?",
      text: "Not directly. The Haramain high-speed railway links Jeddah with Makkah and Madinah, but it doesn’t reach Riyadh, and Riyadh’s passenger rail lines run east to Dammam and north toward Qassim rather than west to the Red Sea coast. For now, a Riyadh–Jeddah journey means flying, driving or taking the coach.",
    },
    {
      heading: "The Options Side by Side",
      text: "Here’s how the four options compare on time and on who each one suits best.",
      table: {
        headers: ["Option", "Time", "Best for", "Trade-off"],
        rows: [
          ["Flight", "About 1.5 hours in the air; 4–5 hours door to door", "Solo and business travellers, tight schedules", "Airport time at both ends; baggage allowances"],
          ["Drive yourself", "10–11 hours of driving, more with stops", "Travellers who need their own car in Jeddah", "A very long day at the wheel"],
          ["Private transfer", "Same road time, door to door", "Families, groups, heavy luggage", "A long journey — plan rest stops"],
          ["Coach (SAPTCO)", "12+ hours including stops", "The tightest budgets", "The slowest option; fixed departure times"],
        ],
      },
    },
    {
      heading: "When a Private Transfer Beats Flying",
      text: "Flying wins for most single travellers. The balance shifts when the group gets bigger or the luggage gets heavier, because each flight seat is paid for individually while a private vehicle carries the whole group for one booking.",
      list: [
        "Groups of four or more, where several flight tickets plus two sets of airport transfers add up",
        "Travellers moving belongings, equipment or more luggage than an airline allows",
        "Anyone who would rather avoid airports entirely, or who doesn’t fly",
        "Trips with a stop along the way — a private transfer can pause in Taif, a flight can’t",
      ],
    },
    {
      heading: "Our Recommendation",
      text: "For most travellers, flying is the best option — book early for the best fares and pair the flight with airport transfers at both ends for a seamless journey. For families or groups of four or more, a private intercity transfer becomes cost-competitive and is far more comfortable than the coach.",
    },
  ],
  faqs: [
    { q: "Is there a train from Riyadh to Jeddah?", a: "Not directly. The Haramain high-speed railway connects Jeddah with Makkah and Madinah but doesn’t reach Riyadh, so the practical options are flying, driving or taking the coach." },
    { q: "Is it cheaper to fly or drive for a family?", a: "It depends on the size of the group. Each flight seat is paid for individually, while a private vehicle carries the whole group for one booking — so for four or more travellers a private transfer often compares well, especially once airport transfers at both ends are counted." },
    { q: "Can I break the drive with an overnight stop?", a: "Yes, and on a 10–11 hour drive many people do. The route passes Taif, which is a natural place to break the journey. A private transfer can be arranged with a stop built in." },
    { q: "How far are the airports from the city centres?", a: "King Khalid International is about 35 km north of central Riyadh, and King Abdulaziz International is about 19 km north of central Jeddah — worth allowing for when you compare door-to-door times." },
    { q: "Which bus company runs Riyadh to Jeddah?", a: "SAPTCO, the Saudi Public Transport Company, operates intercity coach services on this route. The journey takes 12 hours or more with stops." },
  ],
  relatedServiceLinks: [
    { href: "/distance/riyadh-to-jeddah", label: "Riyadh to Jeddah: Distance & Drive Time", reason: "Road distance, drive time and route details for the full journey." },
    { href: "/riyadh-airport-taxi-service", label: "Riyadh Airport Transfers", reason: "Getting to King Khalid International, about 35 km north of the centre." },
    { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport Transfers", reason: "From King Abdulaziz International into Jeddah, about 19 km." },
    { href: "/services/jeddah", label: "Jeddah Taxi & Chauffeur Service", reason: "Getting around the city once you arrive." },
    { href: "/fleet", label: "Our Fleet", reason: "Sedans to vans — the right vehicle for a long intercity journey." },
  ],
};

export default function Post() {
  return <BlogPost data={data} />;
}
