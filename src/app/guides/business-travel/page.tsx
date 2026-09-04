import { generatePageMetadata } from "@/lib/seo";
import GuidePage, { type GuideData } from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Business Travel Transportation Guide — Saudi Arabia",
  description: "Business travel transportation in Saudi Arabia — corporate transfers in Riyadh, the Eastern Province and Jeddah, executive vehicles, and what to plan around Vision 2030 project logistics.",
  path: "/guides/business-travel",
  keywords: ["business travel Saudi Arabia", "corporate taxi Riyadh", "executive transfer Saudi Arabia", "KAFD corporate transport", "Eastern Province business travel"],
});

/*
 * Content map (informational-blog brief §29 / §3 cannibalization rule):
 * This page already existed and already owns "business travel Saudi
 * Arabia" — the brief's own Cluster E lists "Business Travel Transportation
 * in Saudi Arabia" as a Priority-1 topic, but creating a NEW article with
 * that same broad title would cannibalize this exact page rather than
 * support it. Per the brief's STOP CONDITION, the correct move is
 * improving this page, not duplicating it — it was 5 one-paragraph
 * sections with no tables, FAQs beyond the basics, or Eastern-Province
 * depth. Expanded here instead.
 * PRIMARY KEYWORD: business travel Saudi Arabia (unchanged, still owned by
 *   this URL)
 * "Aramco" is mentioned once, factually, as regional context (Aramco's HQ
 *   location) — never as a claim of partnership, endorsement, or preferred
 *   vendor status, per the brief's explicit caution.
 */

const data: GuideData = {
  path: "/guides/business-travel",
  eyebrow: "Business Travel Guide",
  title: "Business Travel Transportation Guide — Saudi Arabia",
  subtitle: "How corporate travelers get around Riyadh, the Eastern Province and Jeddah efficiently — airport timing, executive vehicles, and what changes during peak business seasons.",
  keyTakeaways: [
    "Riyadh's business district (KAFD, Olaya) sits roughly 35km from King Khalid International Airport — pre-booking a transfer outside the 7-9am and 4-7pm traffic peaks saves real time.",
    "The Eastern Province (Dammam, Khobar, Dhahran, Jubail) is car-dependent and spread across a wider industrial and commercial area than Riyadh's business core.",
    "Corporate accounts with monthly invoicing and named-driver assignment are available for companies with recurring transport needs.",
    "Ramadan and the Hajj/Umrah season shift both traffic patterns and typical meeting hours — plan business trips with those calendar windows in mind.",
  ],
  sections: [
    {
      heading: "Saudi Arabia's Business Travel Landscape",
      content: "Saudi Arabia is one of the world's fastest-growing business destinations, driven by Vision 2030 investment across finance, industry, and new-city projects. Riyadh's King Abdullah Financial District (KAFD), Jeddah's commercial waterfront, the Eastern Province's energy sector, and NEOM each draw a distinct kind of business traveler — and each has a different transport logistics picture.",
    },
    {
      heading: "Riyadh: The Corporate Core",
      content: "Most corporate activity in Riyadh sits in Olaya, KAFD, and the diplomatic quarter. King Khalid International Airport (RUH) is about 35km from downtown, and traffic peaks predictably between 7-9am and 4-7pm on weekdays. Scheduling airport transfers and inter-meeting travel outside those windows is the single most reliable way to protect a tight itinerary.",
      list: [
        "KAFD and Olaya are the two most common meeting-day pickup zones",
        "A 35-50 minute airport transfer is typical outside peak traffic hours",
        "Riyadh Season (roughly October-March) adds evening traffic around Boulevard City on top of the standard rush-hour pattern",
      ],
      cta: { text: "Business travel to Riyadh?", link: "/services/riyadh" },
    },
    {
      heading: "Eastern Province: Dammam, Khobar, Dhahran & Jubail",
      content: "The Eastern Province hosts Saudi Aramco's headquarters in Dhahran, SABIC, and a dense concentration of energy and petrochemical contractors — Jubail Industrial City in particular runs almost entirely on business and contractor traffic rather than tourism. Unlike Riyadh's more compact business core, the tri-city Dammam-Khobar-Dhahran area and Jubail further north are spread out and effectively car-dependent, so a driver familiar with the specific site or gate you're headed to matters more here than in most Saudi cities.",
      table: {
        headers: ["Area", "Typical Business Traveler", "Key Consideration"],
        rows: [
          ["Dammam / Khobar", "Corporate & finance visitors", "King Fahd International Airport is the main gateway"],
          ["Dhahran", "Energy-sector visitors", "Home to Saudi Aramco's headquarters"],
          ["Jubail", "Contractors & technical staff", "Traffic follows industrial shift-change times, not typical rush hour; multiple gated entry points to the Industrial City"],
        ],
      },
      cta: { text: "Traveling for business in the Eastern Province?", link: "/services/dammam" },
    },
    {
      heading: "Corporate Account Features",
      content: "Gulf Trip Service offers monthly invoiced billing, a dedicated account manager, a 24/7 priority booking line, named-driver assignment for repeat executives, and an executive-vehicle guarantee (Mercedes E-Class or equivalent). This suits companies with recurring transport needs — regular airport runs, multi-day executive visits, or standing inter-office transfers — better than booking each trip individually.",
    },
    {
      heading: "Timing Considerations Across the Business Calendar",
      content: "A few recurring calendar patterns are worth planning around rather than being surprised by.",
      list: [
        "Friday midday prayers (roughly 12:30-2pm) create a brief but predictable lull in weekday traffic",
        "Ramadan shifts working hours significantly — most meetings move to after Iftar, and daytime schedules compress",
        "During peak Hajj/Umrah months, Jeddah's airport and the roads toward Makkah see substantial added congestion, which can affect connecting travel even for non-pilgrimage business trips",
      ],
    },
  ],
  faqs: [
    { q: "Do you offer monthly corporate accounts?", a: "Yes — invoiced monthly accounts for businesses with recurring transport needs. Contact our corporate team for a custom quote." },
    { q: "Can you provide the same driver for a multi-day visit?", a: "Yes — named-driver assignment is available for premium bookings across multi-day executive itineraries." },
    { q: "Do you have executive-grade vehicles?", a: "Yes — Mercedes E-Class, BMW 7 Series, and similar executive sedans are available for client-facing transfers, alongside SUVs and vans for larger groups." },
    { q: "How do I arrange transfers for a team of 10+ executives?", a: "Contact our operations team with flight details and group size — we coordinate multi-vehicle arrivals so the whole group lands to a ready fleet rather than separate individual bookings." },
    { q: "Is business travel to Jubail different from Riyadh or Jeddah?", a: "Yes — Jubail's transport is almost entirely business/contractor-driven, traffic follows industrial shift-change patterns rather than typical rush hour, and drivers need to know the specific Industrial City gate or site you're headed to." },
    { q: "Does Ramadan affect business travel scheduling?", a: "Significantly — working hours shift, most meetings move to after Iftar, and daytime schedules generally compress. Build extra flexibility into itineraries during this period." },
  ],
  relatedLinks: [
    { href: "/services/riyadh", label: "Riyadh Business Travel Services", reason: "KAFD and Olaya corporate transfers, executive vehicles, airport pickup." },
    { href: "/services/dammam", label: "Dammam Business Travel Services", reason: "Eastern Province corporate transfers near King Fahd International Airport." },
    { href: "/services/jubail", label: "Jubail Corporate Transportation", reason: "Industrial City gate access and shift-timed contractor transfers." },
    { href: "/guides/chauffeur-vs-taxi-saudi-arabia", label: "Chauffeur vs Taxi: What's the Difference?", reason: "How a pre-booked chauffeur compares to an airport taxi for a business trip." },
    { href: "/corporate-transportation-services", label: "Corporate Transportation Services", reason: "Monthly accounts, named drivers, and multi-vehicle team coordination." },
    { href: "/guides/king-khalid-airport", label: "King Khalid International Airport Guide", reason: "What to expect arriving in Riyadh for a business trip." },
  ],
  ctaText: "Set Up a Corporate Account",
  closingHeading: "Ready to Simplify Your Company's Travel?",
  ctaHelper: "Monthly invoicing, a dedicated account manager, and executive vehicles for every trip — set up once, then book with a message.",
  ctaLink: "/contact-us",
  lastReviewed: "September 2026",
};

export default function BusinessTravelGuide() {
  return <GuidePage data={data} />;
}
