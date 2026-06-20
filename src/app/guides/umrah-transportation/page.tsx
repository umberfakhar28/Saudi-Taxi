import { generatePageMetadata } from "@/lib/seo";
import GuidePage from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Complete Umrah Transportation Guide | How to Travel Between Holy Cities | Gulf Trip Service",
  description: "The definitive guide to Umrah transportation — Jeddah airport to Makkah, Makkah to Madinah, Ziyarat tours, hotel transfers, and booking tips for pilgrims.",
  path: "/guides/umrah-transportation",
  keywords: ["Umrah transportation guide", "Umrah taxi guide", "Makkah Madinah transfer Umrah", "how to travel for Umrah Saudi Arabia"],
});

const data = {
  title: "Complete Umrah Transportation Guide",
  subtitle: "Everything pilgrims need to know about getting around Saudi Arabia for Umrah — from arrival at Jeddah Airport to Makkah, Madinah, and every holy site in between.",
  eyebrow: "Pilgrim Guide",
  sections: [
    { heading: "Understanding Umrah Travel Logistics", content: "Umrah requires movement between multiple holy sites across two cities — Makkah and Madinah — with the initial journey from Jeddah Airport. Most pilgrims spend 5–14 days split between the two cities. Planning your transport in advance is as important as your Umrah rituals themselves, particularly during peak Umrah months." },
    { heading: "Step 1: Jeddah Airport (KAIA) to Makkah", content: "The Umrah journey begins at King Abdulaziz International Airport. From KAIA, Makkah is 80km southeast — approximately 60–90 minutes by car. Non-Muslims are not permitted beyond the checkpoints on the Makkah Expressway. All Gulf Trip Service drivers are Muslim and authorised to enter Makkah. We recommend booking your airport-to-Makkah transfer before you depart your home country." },
    { heading: "Step 2: Getting Around Makkah", content: "Makkah's road network is complex, especially the ring roads around the Haram. Our drivers know every hotel's access road, the optimal times to depart for Tawaf, and how to navigate road closures near the Grand Mosque. We offer daily hotel-to-Haram shuttle service — ideal for elderly pilgrims or families with young children." },
    { heading: "Step 3: Makkah to Madinah Transfer", content: "After completing Umrah in Makkah, most pilgrims travel to Madinah to visit the Prophet's Mosque. The journey is 450km and takes 4–5 hours. Gulf Trip Service runs this route daily. We recommend an early morning departure (after Fajr) to arrive in Madinah before afternoon heat. Our vehicles are air-conditioned with prayer time alerts." },
    { heading: "Step 4: Getting Around Madinah", content: "Madinah has a restricted zone around the Prophet's Mosque. Our drivers are permitted to operate within this zone and know exactly which roads are open at which times. We offer half-day Madinah Ziyarat tours covering Quba Mosque, Masjid al-Qiblatayn, Uhud mountain, and the Dates Market." },
    { heading: "Ziyarat Tours: Makkah & Madinah", content: "Ziyarat (historical site visits) are an integral part of Umrah travel. In Makkah, we cover Jabal al-Noor, Jabal Thawr, Mina, Arafat, and Muzdalifah. In Madinah, we cover Quba, Uhud, Masjid al-Qiblatayn, and the historic cemetery of Al-Baqi. All Ziyarat drivers are briefed on the significance of each site." },
    { heading: "Booking Tips for Umrah Transport", content: "Book all transfers before your departure — availability tightens dramatically during Ramadan, Shawwal, and Dhul Qa'dah. Provide your hotel names and full flight details at booking. WhatsApp is the primary communication channel with your driver. Keep the driver's number saved before you land. Always confirm your pickup time the evening before each journey." },
  ],
  faqs: [
    { q: "How much does a Jeddah to Makkah transfer cost?", a: "Prices vary by vehicle type and season. Request a fixed quote via our website before booking. All prices are locked with no surcharges." },
    { q: "Can I book all my Umrah transfers as a single package?", a: "Yes — our Umrah Transport Package covers airport arrival, daily Haram transfers in Makkah, the Makkah–Madinah intercity transfer, and Madinah Ziyarat in one booking." },
    { q: "What if I want to stay longer in Makkah or Madinah than planned?", a: "No problem. Contact us via WhatsApp to adjust your Madinah transfer date. We accommodate changes subject to availability." },
    { q: "Are your drivers knowledgeable about Umrah rituals?", a: "Yes — our Makkah and Madinah drivers are practising Muslims familiar with pilgrim needs, prayer times, and site significance." },
  ],
  ctaText: "Book Umrah Transport Package",
  ctaLink: "/umrah-transport-package",
};

export default function UmrahTransportationGuide() {
  return <GuidePage data={data} />;
}
