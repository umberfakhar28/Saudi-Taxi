import { generatePageMetadata } from "@/lib/seo";
import GuidePage, { type GuideData } from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Family & Group Travel Guide — Saudi Arabia",
  description: "Family and group travel guide for Saudi Arabia — choosing between sedan, SUV and van, child seats, elderly travelers, and transport tips for AlUla, Abha and Taif.",
  path: "/guides/family-travel",
  keywords: ["family travel Saudi Arabia", "family taxi Saudi Arabia", "child seat taxi Saudi", "vehicle for group travel Saudi Arabia", "AlUla family trip"],
});

/*
 * Content map (informational-blog brief §29 / cannibalization rule):
 * This page already existed and already covers vehicle selection for
 * families — a separately-proposed "Choosing the Right Vehicle for Family
 * & Group Travel" article would have duplicated this page's own "Choosing
 * the Right Vehicle" section almost exactly. Per the STOP CONDITION, the
 * correct move is improving this page rather than creating a competing
 * one. Expanded here with a real capacity table (sourced from
 * fleetConfig.ts's FLEET_TIERS, not invented) and richer group-size
 * guidance; the vehicle detail ("Toyota Fortuner") that didn't match the
 * site's actual fleet data is corrected to Land Cruiser/Prado.
 * PRIMARY KEYWORD: family travel Saudi Arabia (unchanged — already owned
 *   this term)
 */

const data: GuideData = {
  path: "/guides/family-travel",
  eyebrow: "Family Travel Guide",
  title: "Family & Group Travel Guide — Saudi Arabia",
  subtitle: "Choosing the right vehicle for your group, traveling with children or elderly family members, and transport tips for AlUla, Abha and Taif.",
  keyTakeaways: [
    "For 4-5 people, a standard SUV is usually the right fit; groups of 6-9 need a van — going up a size early avoids a cramped, luggage-heavy trip.",
    "Child seats and booster seats are available on request — mention ages and weights at booking so the right restraints are ready.",
    "AlUla rewards a multi-day driver who knows site timings; Abha's mountain roads need a driver experienced with the Al-Souda and Habala routes specifically.",
    "For groups larger than 9, multiple coordinated vehicles are dispatched together rather than one oversized vehicle.",
  ],
  sections: [
    {
      heading: "Traveling as a Family or Group in Saudi Arabia",
      content: "Saudi Arabia has become a genuinely family-friendly destination — theme parks, heritage sites, mountain resorts, and coastal getaways draw families from across the GCC and internationally. AlUla, Abha, Taif, and the Red Sea coast are among the most common family destinations. Reliable private transport, rather than public transit, is the standard way families and groups get around.",
    },
    {
      heading: "Choosing the Right Vehicle",
      content: "The right vehicle size depends on your group's headcount and luggage — going a size larger than the bare minimum usually makes for a more comfortable trip.",
      table: {
        headers: ["Group Size", "Recommended Vehicle", "Passengers", "Luggage"],
        rows: [
          ["1-3 people", "Sedan (Toyota Camry / Hyundai Sonata)", "Up to 3", "Up to 2 bags"],
          ["4-5 people", "SUV (Toyota Land Cruiser / Prado)", "Up to 5", "Up to 4 bags"],
          ["6-9 people", "Van (Toyota HiAce)", "Up to 9", "Up to 8 bags"],
          ["10+ people", "Multiple coordinated vehicles", "Dispatched together", "Split across vehicles"],
        ],
      },
      list: [
        "Child seats and booster seats are available on request — specify ages and weights at booking",
        "A group with heavy luggage (strollers, multiple suitcases) is often more comfortable one size up from the minimum headcount fit",
        "For 10 or more travelers, we coordinate multiple vehicles as one booking rather than a single oversized vehicle",
      ],
      cta: { text: "Traveling as a family or group?", link: "/fleet" },
    },
    {
      heading: "Traveling With Elderly Family Members",
      content: "Saudi Arabia's holy cities in particular see many families traveling with elderly relatives, often for Umrah. Drivers are experienced with gentle driving, minimising wait times, and handling luggage without rushing older passengers. Vehicles with lower entry steps are available for travelers with mobility challenges — mention this when booking so the right vehicle is arranged.",
    },
    {
      heading: "Top Family Destinations & Transport Tips",
      content: "A few destinations reward specific transport planning.",
      list: [
        "AlUla is best experienced over 3-4 days — a multi-day driver who knows site timings makes a real difference to how much you see comfortably",
        "Abha's mountain terrain needs a driver experienced with the Al-Souda and Habala roads specifically, not just general highway driving",
        "Taif is a strong one-day family trip from Makkah or Jeddah, combining the cable car and rose farms in a single day",
        "Riyadh's Boulevard and Diriyah districts work well for older children and teens, with more to do in a compact area",
      ],
    },
    {
      heading: "Safety on Saudi Roads",
      content: "Saudi Arabia's highways are modern and well-maintained. All vehicles are fully insured and undergo regular mechanical checks, and drivers follow speed limits and don't use phones while driving. For long intercity trips, rest stops at clean, safe facilities can be planned in on request — worth mentioning at booking rather than assuming a non-stop drive.",
    },
  ],
  faqs: [
    { q: "Do you provide child seats?", a: "Yes — infant seats, toddler seats, and booster seats are available on request. Specify child ages and weights when booking." },
    { q: "What is the largest group your vehicles can seat?", a: "Our largest single vehicle (the HiAce van) seats up to 9. For larger groups, we dispatch multiple coordinated vehicles as one booking." },
    { q: "Can we make stops during long journeys?", a: "Yes — for intercity trips, we can plan stops at clean, safe rest facilities on request. Mention this at booking so it's built into the journey plan." },
    { q: "Is it safe to travel at night as a family?", a: "Yes — drivers are vetted and journeys can be tracked. We generally recommend pre-booking rather than hailing a ride at night, for both convenience and peace of mind." },
    { q: "How far in advance should I book for a group of 10 or more?", a: "As early as possible — coordinating multiple vehicles for a single group takes more planning than a standard booking, so advance notice helps ensure everything arrives together." },
    { q: "Which vehicle is best for a family of 5 with a lot of luggage?", a: "An SUV comfortably seats 5, but if luggage is heavy (multiple large suitcases, a stroller), the HiAce van is worth considering even for a smaller headcount — extra space matters more than seat count in that case." },
  ],
  relatedLinks: [
    { href: "/fleet", label: "View Our Full Fleet", reason: "Compare every vehicle option, from sedan to van, with real capacity details." },
    { href: "/services/alula", label: "AlUla Taxi & Transfer Service", reason: "Multi-day driver bookings for AlUla's heritage sites." },
    { href: "/services/abha", label: "Abha Taxi & Transfer Service", reason: "Mountain-road transfers to Al-Souda and Habala." },
    { href: "/services/taif", label: "Taif Taxi & Transfer Service", reason: "A popular one-day family trip from Makkah or Jeddah." },
    { href: "/guides/rent-a-car-vs-private-driver", label: "Rent a Car vs Private Driver", reason: "Whether self-driving or a private driver suits your family trip better." },
    { href: "/hotel-transfers", label: "Hotel Transfers", reason: "Door-to-door transfers with luggage assistance for the whole family." },
  ],
  ctaText: "Book a Family Transfer",
  closingHeading: "Ready to Book Your Family's Trip?",
  ctaHelper: "The right vehicle size, child seats on request, and drivers experienced with family and group travel across Saudi Arabia.",
  ctaLink: "/book-online",
  relatedGuide: { href: "/guides/hajj-transportation", label: "Hajj Transportation guide" },
  lastReviewed: "September 2026",
};

export default function FamilyTravelGuide() {
  return <GuidePage data={data} />;
}
