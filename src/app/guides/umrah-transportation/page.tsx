import { generatePageMetadata } from "@/lib/seo";
import GuidePage, { type GuideData } from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Umrah Transportation Guide | Jeddah, Makkah & Madinah",
  description: "Complete Umrah transport guide — Jeddah Airport to Makkah, Makkah to Madinah distances and times, Ziyarat tours, hotel transfers, and how to plan pilgrim transport.",
  path: "/guides/umrah-transportation",
  keywords: ["Umrah transportation guide", "Umrah transport", "Umrah transfers", "Umrah taxi guide", "Makkah Madinah transfer Umrah", "Jeddah airport to Makkah"],
});

/*
 * Strengthened rather than replaced (SEO brief §32/§37): this page already
 * owns "Umrah transportation" intent and shows real Search Console
 * impressions ("umrah transport", "umrah transportation", "ummrah
 * transfers"), so a second Umrah article would have cannibalized it. All
 * seven original sections and all four original FAQs are preserved; what's
 * added is a quick-answer summary, a verified distance/time table, section
 * checklists, extra FAQs, contextual CTAs, and a Related Resources network.
 *
 * The link checker also flagged this URL as having ZERO inbound internal
 * links despite ranking — fixed alongside this by adding it to Makkah's and
 * Madinah's city pages and to the Jeddah/Madinah airport pages.
 *
 * Distance/time figures reuse the site's existing verified route data
 * (distanceRouteData.ts) rather than new estimates, so no two pages state
 * conflicting facts about the same corridor.
 */

const data: GuideData = {
  path: "/guides/umrah-transportation",
  title: "Complete Umrah Transportation Guide",
  subtitle: "Everything pilgrims need to know about getting around Saudi Arabia for Umrah — from arrival at Jeddah Airport to Makkah, Madinah, and every holy site in between.",
  eyebrow: "Pilgrim Guide",
  category: { label: "Umrah Transport", href: "/umrah-transport-package" },
  keyTakeaways: [
    "Most Umrah journeys follow the same three legs: airport to Makkah, Makkah to Madinah, then Madinah back to an airport.",
    "Jeddah Airport (KAIA) to Makkah is roughly 80 km — 60–90 minutes normally, longer during peak Umrah season.",
    "Makkah to Madinah is about 450 km and takes 4–5 hours via the Haramain Expressway.",
    "Non-Muslims cannot pass the checkpoints on the Makkah Expressway — all drivers on Makkah routes are Muslim and authorised to enter.",
    "Book transfers before departure: availability tightens sharply during Ramadan, Shawwal and Dhul Qa'dah.",
  ],
  sections: [
    {
      heading: "Understanding Umrah Travel Logistics",
      content: "Umrah requires movement between multiple holy sites across two cities — Makkah and Madinah — with the initial journey from Jeddah Airport. Most pilgrims spend 5–14 days split between the two cities. Planning your transport in advance is as important as your Umrah rituals themselves, particularly during peak Umrah months.",
    },
    {
      heading: "The Three Main Journeys at a Glance",
      content: "Almost every Umrah itinerary is built from the same handful of legs. These are the road distances and typical driving times for each.",
      table: {
        headers: ["Journey", "Distance", "Typical Time"],
        rows: [
          ["Jeddah Airport (KAIA) → Makkah", "~80 km", "60–90 min (90–120 in peak season)"],
          ["Makkah → Madinah", "~450 km", "4–5 hours via Haramain Expressway"],
          ["Jeddah Airport (KAIA) → Madinah", "~420 km", "~4.5 hours"],
          ["Madinah Airport → Madinah hotels", "~15 km", "Short city transfer"],
        ],
      },
    },
    {
      heading: "Step 1: Jeddah Airport (KAIA) to Makkah",
      content: "The Umrah journey begins at King Abdulaziz International Airport. From KAIA, Makkah is 80km southeast — approximately 60–90 minutes by car. Non-Muslims are not permitted beyond the checkpoints on the Makkah Expressway. All Gulf Trip Service drivers are Muslim and authorised to enter Makkah. We recommend booking your airport-to-Makkah transfer before you depart your home country.",
      list: [
        "Share your flight number so the driver tracks your landing — pilgrim flights frequently arrive overnight",
        "KAIA has three terminals; confirm which one your flight uses so the driver waits at the right arrivals hall",
        "If you intend to enter Ihram before landing or at the airport, mention it so the vehicle and timing suit",
      ],
      cta: { text: "Arriving at Jeddah Airport for Umrah?", link: "/jeddah-airport-taxi-service" },
    },
    {
      heading: "Step 2: Getting Around Makkah",
      content: "Makkah's road network is complex, especially the ring roads around the Haram. Our drivers know every hotel's access road, the optimal times to depart for Tawaf, and how to navigate road closures near the Grand Mosque. We offer daily hotel-to-Haram shuttle service — ideal for elderly pilgrims or families with young children.",
    },
    {
      heading: "Step 3: Makkah to Madinah Transfer",
      content: "After completing Umrah in Makkah, most pilgrims travel to Madinah to visit the Prophet's Mosque. The journey is 450km and takes 4–5 hours. Gulf Trip Service runs this route daily. We recommend an early morning departure (after Fajr) to arrive in Madinah before afternoon heat. Our vehicles are air-conditioned with prayer time alerts.",
      list: [
        "An early departure after Fajr is the most common choice and avoids arriving in the afternoon heat",
        "If you're travelling Madinah → Makkah instead, plan for a Miqat stop to enter Ihram en route",
        "A single rest stop partway is normal on a 4–5 hour drive — worth requesting in advance with children or elderly travellers",
      ],
      cta: { text: "Planning the Makkah to Madinah leg?", link: "/makkah-to-madinah-taxi-service" },
    },
    {
      heading: "Step 4: Getting Around Madinah",
      content: "Madinah has a restricted zone around the Prophet's Mosque. Our drivers are permitted to operate within this zone and know exactly which roads are open at which times. We offer half-day Madinah Ziyarat tours covering Quba Mosque, Masjid al-Qiblatayn, Uhud mountain, and the Dates Market.",
    },
    {
      heading: "Ziyarat Tours: Makkah & Madinah",
      content: "Ziyarat (historical site visits) are an integral part of Umrah travel. In Makkah, we cover Jabal al-Noor, Jabal Thawr, Mina, Arafat, and Muzdalifah. In Madinah, we cover Quba, Uhud, Masjid al-Qiblatayn, and the historic cemetery of Al-Baqi. All Ziyarat drivers are briefed on the significance of each site.",
    },
    {
      heading: "Travelling as a Family or Group",
      content: "Umrah is frequently a family journey, and vehicle size is the detail most often underestimated — particularly on the return legs, when luggage tends to include gifts and Zamzam water. A sedan seats up to 3, an SUV up to 5, and a van up to 9; for larger parties we coordinate multiple vehicles as a single booking rather than splitting it into separate reservations.",
      list: [
        "Mention elderly travellers at booking — vehicles with lower entry steps can be arranged",
        "Child seats are available on request; specify ages and weights",
        "Allow for extra luggage on departure legs, not just arrival",
      ],
    },
    {
      heading: "Booking Tips for Umrah Transport",
      content: "Book all transfers before your departure — availability tightens dramatically during Ramadan, Shawwal, and Dhul Qa'dah. Provide your hotel names and full flight details at booking. WhatsApp is the primary communication channel with your driver. Keep the driver's number saved before you land. Always confirm your pickup time the evening before each journey.",
    },
  ],
  faqs: [
    { q: "How much does a Jeddah to Makkah transfer cost?", a: "Prices vary by vehicle type and season. Request a fixed quote via our website before booking. All prices are locked with no surcharges." },
    { q: "Can I book all my Umrah transfers as a single package?", a: "Yes — our Umrah Transport Package covers airport arrival, daily Haram transfers in Makkah, the Makkah–Madinah intercity transfer, and Madinah Ziyarat in one booking." },
    { q: "What if I want to stay longer in Makkah or Madinah than planned?", a: "No problem. Contact us via WhatsApp to adjust your Madinah transfer date. We accommodate changes subject to availability." },
    { q: "Are your drivers knowledgeable about Umrah rituals?", a: "Yes — our Makkah and Madinah drivers are practising Muslims familiar with pilgrim needs, prayer times, and site significance." },
    { q: "How long does the Makkah to Madinah journey take?", a: "About 4–5 hours for the roughly 450 km via the Haramain Expressway, plus any rest stop. Traffic on this corridor increases noticeably during Ramadan and the weeks around Hajj, when both cities are at peak pilgrim volume simultaneously." },
    { q: "Should I fly into Jeddah or Madinah for Umrah?", a: "Both work, and it depends on which city you intend to start in. Jeddah is the main international gateway and is roughly 80 km from Makkah; Madinah's airport is the closer option if you plan to visit the Prophet's Mosque first and travel on to Makkah afterwards." },
    { q: "Can non-Muslim family members travel with us to Makkah?", a: "No — non-Muslims are not permitted beyond the checkpoints on the Makkah Expressway. Travel plans for a mixed group need to account for this, with non-Muslim travellers staying in Jeddah or another city." },
    { q: "When should I book Umrah transport?", a: "Before you depart your home country wherever possible. Availability tightens sharply during Ramadan, Shawwal and Dhul Qa'dah, and pre-booking also avoids arranging transport at the airport after a long-haul flight." },
  ],
  relatedLinks: [
    { href: "/umrah-transport-package", label: "Umrah Transport Package", reason: "Airport arrival, Haram transfers, the Makkah–Madinah leg and Ziyarat in one booking." },
    { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport Transfers", reason: "Meet-and-greet at all three KAIA terminals, the first leg of most Umrah trips." },
    { href: "/makkah-to-madinah-taxi-service", label: "Makkah to Madinah Transfer", reason: "The 450 km intercity leg via the Haramain Expressway." },
    { href: "/services/makkah", label: "Makkah Transport Service", reason: "Hotel-to-Haram transfers and getting around the Holy City." },
    { href: "/services/madinah", label: "Madinah Transport Service", reason: "Prophet's Mosque area transfers and Rawdah-timed pickups." },
    { href: "/ziyarat-services-in-saudi-arabia", label: "Ziyarat Services", reason: "Guided visits to the historical sites in both Holy Cities." },
  ],
  ctaText: "Book Umrah Transport Package",
  closingHeading: "Ready to Plan Your Umrah Transport?",
  ctaHelper: "One booking covering your airport arrival, Makkah transfers, the Madinah leg and Ziyarat — arranged before you land.",
  ctaLink: "/umrah-transport-package",
  relatedGuide: { href: "/guides/hajj-transportation", label: "Hajj Transportation guide" },
  lastReviewed: "September 2026",
};

export default function UmrahTransportationGuide() {
  return <GuidePage data={data} />;
}
