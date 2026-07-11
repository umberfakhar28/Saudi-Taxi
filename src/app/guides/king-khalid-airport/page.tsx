import { generatePageMetadata } from "@/lib/seo";
import GuidePage from "@/components/GuidePage";

export const metadata = generatePageMetadata({
  title: "King Khalid Airport Guide (RUH)",
  description: "Everything you need to know about King Khalid International Airport in Riyadh — terminals, taxi services, transport options, tips, and how to book your transfer.",
  path: "/guides/king-khalid-airport",
  keywords: ["King Khalid Airport guide", "RUH airport taxi", "Riyadh airport transport", "King Khalid International Airport terminals"],
});

const data = {
  path: "/guides/king-khalid-airport",
  title: "Complete Guide to King Khalid International Airport (RUH)",
  subtitle: "Everything you need to know about Riyadh's international airport — terminals, transfers, waiting areas, and getting into the city.",
  eyebrow: "Airport Guide",
  sections: [
    { heading: "About King Khalid International Airport", content: "King Khalid International Airport (IATA: RUH) is Saudi Arabia's busiest airport by passenger volume, handling over 35 million passengers annually. Located 35km north of Riyadh's city centre, it serves as the primary gateway to the capital and the entire central region of the Kingdom." },
    { heading: "Terminals Overview", content: "RUH has five terminals. Terminal 1 handles domestic Saudi Airlines flights. Terminal 2 is the main international terminal. Terminal 3 serves additional international carriers. Terminal 4 handles budget carriers and overflow. Terminal 5 (the newest) serves select premium international routes. Always check your ticket for terminal allocation before arrival." },
    { heading: "Getting from RUH to Riyadh City", content: "The journey from King Khalid Airport to central Riyadh takes 35–50 minutes depending on traffic. Options include the Riyadh Metro (Line 2 connects to the airport), standard taxis, app-based rides, and pre-booked private transfers. We strongly recommend pre-booking a private transfer to avoid queues and guarantee a fixed price, especially arriving at peak hours or late at night." },
    { heading: "Airport Facilities", content: "RUH offers extensive facilities including prayer rooms on every floor, 24-hour currency exchange, numerous food and retail outlets in the departure zones, business lounges accessible with Priority Pass, and dedicated family lanes at security. The airport has free Wi-Fi throughout all terminals." },
    { heading: "Tips for First-Time Arrivals", content: "Collect your luggage before proceeding to the ground floor taxi rank. If you have a pre-booked transfer with Gulf Trip Service, your driver will be holding a name sign at the arrivals exit. WhatsApp communication is active from the moment your flight lands. During Ramadan and Hajj season, expect additional delays at checkpoints and allow extra travel time." },
    { heading: "Booking Your RUH Airport Transfer", content: "Gulf Trip Service operates 24/7 at King Khalid International Airport. We track all incoming flights, so if your flight is delayed, your driver adjusts automatically. Executive sedans, SUVs, and minivans are all available. All transfers are fixed-rate with no surcharges for early morning or late-night arrivals." },
  ],
  faqs: [
    { q: "How far in advance should I book my RUH transfer?", a: "We recommend booking at least 24 hours in advance, especially during peak season. Same-day bookings are available subject to availability." },
    { q: "Where exactly does my driver wait at King Khalid Airport?", a: "Your driver waits at the arrivals exit of your specific terminal with a name sign. Terminal number is confirmed in your booking confirmation." },
    { q: "What if my flight is significantly delayed?", a: "We track all flights in real time. If your flight is delayed by more than 2 hours, we'll contact you to confirm the revised pickup time. No extra charge for delays." },
    { q: "Is there a meet-and-greet service at RUH?", a: "Yes — our standard airport pickup includes a name sign meet-and-greet at the arrivals hall. Premium meet-and-greet with baggage assistance is available on request." },
  ],
  ctaText: "Book RUH Airport Transfer",
  ctaLink: "/riyadh-airport-taxi-service",
};

export default function KingKhalidAirportGuide() {
  return <GuidePage data={data} />;
}
