import { generatePageMetadata } from "@/lib/seo";
import GuidePage from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Hajj Transportation Guide | Getting Around the Holy Sites | Gulf Trip Service",
  description: "Complete guide to Hajj transportation — Mina, Arafat, Muzdalifah transfers, Jeddah airport logistics, group transport, and booking tips for Hajj pilgrims.",
  path: "/guides/hajj-transportation",
  keywords: ["Hajj transportation guide", "Mina Arafat Muzdalifah transfer", "Hajj taxi service", "group transport Hajj"],
});

const data = {
  title: "Hajj Transportation Guide",
  subtitle: "A comprehensive guide to navigating the logistics of Hajj — from Jeddah Airport to the five sacred days across Mina, Arafat, and Muzdalifah.",
  eyebrow: "Hajj Guide",
  sections: [
    { heading: "Understanding Hajj Transportation Complexity", content: "Hajj brings over 2 million pilgrims to the Makkah region in a single week — making it the largest annual human movement on Earth. The five days of Hajj require travel between four distinct sites: Makkah (Masjid al-Haram), Mina (the tent city), Arafat (the plain of standing), and Muzdalifah — each with strict timing requirements tied to Islamic ritual." },
    { heading: "Getting to Makkah for Hajj", content: "Most international Hajj pilgrims arrive at Jeddah's KAIA airport during the official Hajj window (1–10 Dhul Hijjah). Our Hajj airport transfers are pre-booked through official travel agencies. We coordinate with group leaders to ensure entire delegations are transported in convoy. The KAIA to Makkah route during Hajj season takes 2–4 hours due to volume — we depart strategically to avoid peak congestion." },
    { heading: "Mina, Arafat & Muzdalifah Transfers", content: "The movement between Hajj sites follows a specific ritual schedule. Pilgrims travel to Mina on 8 Dhul Hijjah, to Arafat on 9 Dhul Hijjah for the Standing (Wuquf), to Muzdalifah overnight, then back to Mina for the Stoning of the Jamarat. We provide private group transport for these movements — an alternative to walking in extreme heat." },
    { heading: "Group Transport for Hajj Delegations", content: "We work with Hajj travel agencies and mission operators to provide full-delegation transport. Our fleet includes Toyota HiAce minivans (12 seats) and Mercedes Sprinters (16 seats). Group bookings require a 30-day advance reservation and are co-ordinated through a dedicated operations manager." },
    { heading: "Post-Hajj: Leaving Makkah", content: "After Hajj completion (around 13 Dhul Hijjah), pilgrims typically travel to Madinah for a 3–8 day stay before departing from MED or JED airports. We manage all post-Hajj transfers and can synchronise with your group tour operator for seamless departure logistics." },
  ],
  faqs: [
    { q: "Can private vehicles enter Mina and Arafat during Hajj?", a: "Movement to the official Hajj sites is tightly controlled by Saudi authorities. We provide transport to the designated entry points. For movements within the Hajj zone, the official Hajj bus system operates." },
    { q: "How far in advance must Hajj group transport be booked?", a: "At least 30–60 days in advance. Hajj season demand far exceeds supply. Early booking is essential." },
    { q: "Do you work with official Hajj travel agencies?", a: "Yes — we partner with licensed Hajj mission operators from Pakistan, India, UK, Nigeria, Malaysia, and Indonesia." },
    { q: "Can you handle airport transfers for large Hajj groups?", a: "Yes — we coordinate multi-vehicle convoys for groups of 20–200+ pilgrims arriving at KAIA during the Hajj window." },
  ],
  ctaText: "Enquire About Hajj Transport",
  ctaLink: "/contact-us",
};

export default function HajjTransportationGuide() {
  return <GuidePage data={data} />;
}
