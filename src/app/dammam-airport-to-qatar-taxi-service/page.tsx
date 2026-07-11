import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToQatar } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam Airport to Qatar Taxi Service | Salwa Border | Gulf Trip Service",
  description: "Direct door-to-door taxi from King Fahd International Airport (DMM) to Doha, Qatar via the Salwa/Abu Samra border. One driver, full journey. Book your transfer today.",
  path: "/dammam-airport-to-qatar-taxi-service",
  keywords: ["Dammam airport to Qatar taxi", "DMM to Doha taxi", "Salwa border transfer", "Dammam to Doha taxi"],
});

export default function Page() {
  return <RoutePage data={dammamAirportToQatar} />;
}
