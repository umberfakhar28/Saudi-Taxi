import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Doha to Riyadh Distance & Travel Time",
  description: "Doha to Riyadh distance via the Salwa/Abu Samra border, driving time, and private transfer options. Plan your trip or book a taxi.",
  path: "/distance/doha-to-riyadh",
});

export default function DohaToRiyadhDistance() {
  return <DistancePage data={distanceRoutes["doha-to-riyadh"]} />;
}
