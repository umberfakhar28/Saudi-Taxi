import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToBahrain } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam Airport to Bahrain Taxi from 550 SAR | 24/7",
  brandSuffix: false,
  description: "Dammam Airport (DMM) to Bahrain taxi across the King Fahd Causeway: about 100 km. Sedan starting from 550 SAR, toll included. Meet and greet, 24/7.",
  path: "/dammam-airport-to-bahrain-taxi-service",
  keywords: ["Dammam airport to Bahrain taxi", "DMM to Bahrain transfer", "King Fahd Causeway taxi", "Dammam airport Bahrain transfer"],
  hreflangPath: "/dammam-airport-to-bahrain-taxi-service",
});

export default function Page() {
  return <RoutePage data={dammamAirportToBahrain} />;
}
