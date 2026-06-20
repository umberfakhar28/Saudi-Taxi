import { generatePageMetadata } from "@/lib/seo";
import GuidePage from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "Complete Guide to King Abdulaziz International Airport Jeddah (JED) | Gulf Trip Service",
  description: "Full guide to KAIA Jeddah — terminals, taxi transfers to Makkah & Madinah, facilities, Umrah pilgrim tips, and how to book your airport transfer.",
  path: "/guides/king-abdulaziz-airport",
  keywords: ["King Abdulaziz Airport guide", "KAIA taxi", "Jeddah airport transfer Makkah", "JED airport guide"],
});

const data = {
  title: "Complete Guide to King Abdulaziz International Airport, Jeddah (JED)",
  subtitle: "The primary gateway for Umrah pilgrims worldwide — terminals, transfer options to Makkah and Madinah, facilities, and expert travel tips.",
  eyebrow: "Airport Guide",
  sections: [
    { heading: "About King Abdulaziz International Airport", content: "King Abdulaziz International Airport (IATA: JED) in Jeddah is the world's primary Umrah and Hajj gateway, processing over 45 million passengers annually. It is the entry point for pilgrims from over 180 countries and a major international hub for the western region of Saudi Arabia." },
    { heading: "Terminals: North, South & Hajj", content: "KAIA has two main terminals. The North Terminal (Terminal 1) handles international flights including all Umrah pilgrim arrivals. The South Terminal (Terminal 2) handles domestic Saudi Airlines services. During Hajj season (Dhul Hijjah), the dedicated Hajj Terminal processes millions of pilgrims with separate immigration halls and direct bus connections to Makkah." },
    { heading: "Transfers to Makkah from KAIA", content: "The transfer from KAIA to Makkah is the most-booked route in our entire network. The 80km journey takes 60–90 minutes depending on traffic. During Umrah season, expect 90–120 minutes. We provide 24/7 meet-and-greet pickups with a driver waiting at the arrivals exit regardless of delay. All vehicles are Ihram-compatible with privacy screens available." },
    { heading: "Transfers to Madinah from KAIA", content: "KAIA to Madinah is approximately 420km and takes around 4.5–5 hours via the Haramain Highway. This is the preferred route for pilgrims who are starting their trip in Makkah and then travelling to Madinah — or vice versa. We offer this as a direct transfer or as part of an Umrah package." },
    { heading: "Airport Facilities for Pilgrims", content: "KAIA's North Terminal has large prayer halls, Quran reading areas, wudu facilities, Zamzam water distribution points (for returning pilgrims), and halal food outlets. Money exchange and SIM card vendors are located in the arrivals hall. Free Wi-Fi is available throughout the terminal." },
    { heading: "Tips for Arriving Pilgrims", content: "Pre-booking your Makkah transfer before departure eliminates the risk of overpriced unofficial taxis at arrivals. Our drivers track your flight and will be waiting at the exit with a name sign. During peak Umrah months (Ramadan and Dhul Qa'dah), book at least 48 hours in advance. All our Makkah-bound drivers are Muslim and understand the sanctity of your arrival." },
  ],
  faqs: [
    { q: "Is a pre-booked transfer better than airport taxis at KAIA?", a: "Yes — unofficial taxis at KAIA are unmetered and prices can be 3–4x higher than pre-booked fixed rates. Our drivers also track your flight, so there's no rush or confusion at arrivals." },
    { q: "Can you pick up large family groups with lots of luggage?", a: "Yes — we have minivans seating up to 10 passengers and can accommodate large amounts of luggage. Book a minivan or SUV when making your reservation." },
    { q: "Do you serve KAIA Terminal 2 (domestic)?", a: "Yes — we cover both the North (international) and South (domestic) terminals." },
    { q: "What is the price from KAIA to Makkah?", a: "Prices vary by vehicle type. Request a quote via our website for the most current rates. All prices are fixed with no hidden fees." },
  ],
  ctaText: "Book KAIA Airport Transfer",
  ctaLink: "/jeddah-airport-taxi-service",
};

export default function KingAbdulazizAirportGuide() {
  return <GuidePage data={data} />;
}
