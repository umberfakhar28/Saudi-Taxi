import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToBahrain } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam Airport to Bahrain Taxi",
  description: "Direct taxi from King Fahd International Airport (DMM) to Bahrain via the King Fahd Causeway. Meet-and-greet pickup, fixed pricing, coordinated crossing. Book now.",
  path: "/dammam-airport-to-bahrain-taxi-service",
  keywords: ["Dammam airport to Bahrain taxi", "DMM to Bahrain transfer", "King Fahd Causeway taxi", "Dammam airport Bahrain transfer"],
  hreflangPath: "/dammam-airport-to-bahrain-taxi-service",
});

export default function Page() {
  return <RoutePage data={dammamAirportToBahrain} />;
}
