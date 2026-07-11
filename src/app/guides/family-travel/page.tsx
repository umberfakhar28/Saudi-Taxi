import { generatePageMetadata } from "@/lib/seo";
import GuidePage from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Family Travel Guide in Saudi Arabia",
  description: "Family travel guide for Saudi Arabia — child seats, luggage, safe routes, AlUla with kids, Abha mountain trips, and tips for traveling with elderly family members.",
  path: "/guides/family-travel",
  keywords: ["family travel Saudi Arabia", "family taxi Saudi Arabia", "child seat taxi Saudi", "AlUla family trip", "Abha family travel"],
});

const data = {
  path: "/guides/family-travel",
  title: "Family Travel Guide Across Saudi Arabia",
  subtitle: "Comfortable, safe, and stress-free family transportation across Saudi Arabia — with child seats, spacious vehicles, and drivers who understand family travel.",
  eyebrow: "Family Travel Guide",
  sections: [
    { heading: "Traveling as a Family in Saudi Arabia", content: "Saudi Arabia has transformed into a family-friendly destination with world-class theme parks, heritage sites, mountain resorts, and coastal getaways. Families from across the GCC and internationally visit AlUla, Abha, Taif, and the Red Sea coast. Reliable private transport — rather than public options — is the standard for family travel in the Kingdom." },
    { heading: "Choosing the Right Vehicle", content: "For families of 4–5, our standard SUV (Toyota Land Cruiser or Fortuner) provides comfortable seating and generous boot space. Families of 6–10 should book our Toyota HiAce minivan. Child seats and booster seats are available on request — mention ages and weights at booking so we prepare the right restraints." },
    { heading: "Traveling with Elderly Family Members", content: "Saudi Arabia's holy cities receive many families with elderly pilgrims. Our drivers are trained to assist elderly passengers — gentle driving, minimised waiting, luggage handling, and patience at every stop. Vehicles with lower entry steps are available for those with mobility challenges. Always mention elderly passengers at booking." },
    { heading: "Top Family Destinations & Transport Tips", content: "AlUla is best experienced over 3–4 days — book a multi-day driver who knows the site timings. Abha's mountain terrain requires an experienced driver familiar with Al-Soudah and Habala roads. Taif is an ideal one-day family trip from Makkah or Jeddah, including the cable car and rose farms. Riyadh's Boulevard and Diriyah are excellent for older children and teens." },
    { heading: "Safety on Saudi Roads", content: "Saudi Arabia's highways are modern and well-maintained. All Gulf Trip Service vehicles are fully insured, undergo regular mechanical checks, and carry first aid kits. Our drivers follow speed limits strictly and do not use phones while driving. Child safety locks are active on all rear doors in family bookings." },
  ],
  faqs: [
    { q: "Do you provide child seats?", a: "Yes — infant seats, toddler seats, and booster seats are available on request. Specify child ages when booking." },
    { q: "What is the largest group your vehicles can seat?", a: "Our largest vehicles seat up to 10 passengers. For larger groups we dispatch multiple coordinated vehicles." },
    { q: "Can we make stops during long journeys?", a: "Yes — for intercity trips, we stop at designated rest areas on request. The driver will plan stops at clean, safe facilities." },
    { q: "Is it safe to travel at night as a family?", a: "Yes — our vehicles are tracked, drivers are vetted, and all journeys can be monitored. We recommend pre-booking rather than hailing at night." },
  ],
  ctaText: "Book a Family Transfer",
  ctaLink: "/book-online",
};

export default function FamilyTravelGuide() {
  return <GuidePage data={data} />;
}
