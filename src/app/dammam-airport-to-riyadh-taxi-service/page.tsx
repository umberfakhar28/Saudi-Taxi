import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Book Dammam Airport to Riyadh Taxi — Border Crossing Made Easy",
  description: "Reliable Dammam Airport to Riyadh taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/dammam-airport-to-riyadh-taxi-service",
  keywords: ["Dammam airport to Riyadh taxi", "DMM to Riyadh transfer", "Dammam to Riyadh intercity taxi"],
});

export default function Page() {
  return <RoutePage data={dammamAirportToRiyadh} />;
}
