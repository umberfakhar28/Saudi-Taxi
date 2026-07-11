import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToQatar } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam Airport to Qatar Taxi",
  description: "Direct door-to-door taxi from King Fahd International Airport (DMM) to Doha, Qatar via the Salwa/Abu Samra border. One driver, full journey. Book your transfer today.",
  path: "/dammam-airport-to-qatar-taxi-service",
  keywords: ["Dammam airport to Qatar taxi", "DMM to Doha taxi", "Salwa border transfer", "Dammam to Doha taxi"],
  hreflangPath: "/dammam-airport-to-qatar-taxi-service",
});

export default function Page() {
  return <RoutePage data={dammamAirportToQatar} />;
}
