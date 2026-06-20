import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { alula } from "@/lib/cityData3";

export const metadata = generatePageMetadata({
  title: "Taxi Service in AlUla | Hegra & Heritage Site Transfers | Gulf Trip Service",
  description: "Premium taxi in AlUla. Airport pickups, Hegra daily transfers, Elephant Rock excursions, Maraya Concert Hall rides, and full-day itinerary drives across AlUla.",
  path: "/services/alula",
  keywords: ["AlUla taxi", "AlUla airport transfer", "Hegra taxi", "Elephant Rock transfer AlUla", "AlUla tour driver"],
});

export default function AlulaPage() {
  return <CityServicePage data={alula} />;
}
