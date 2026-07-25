import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToBahrain } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam Airport to Bahrain Taxi & Private Transfer | 24/7 Service",
  description: "Reliable Dammam Airport to Bahrain taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/dammam-airport-to-bahrain-taxi-service",
  keywords: ["Dammam airport to Bahrain taxi", "DMM to Bahrain transfer", "King Fahd Causeway taxi", "Dammam airport Bahrain transfer"],
  hreflangPath: "/dammam-airport-to-bahrain-taxi-service",
});

export default function Page() {
  return <RoutePage data={dammamAirportToBahrain} />;
}
