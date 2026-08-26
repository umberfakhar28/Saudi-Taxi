import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Doha to Dammam Distance & Travel Time",
  description: "Doha to Dammam distance via the Salwa/Abu Samra border, driving time, and private transfer options. Plan your trip or book a taxi.",
  path: "/distance/doha-to-dammam",
});

export default function DohaToDammamDistance() {
  return <DistancePage data={distanceRoutes["doha-to-dammam"]} />;
}
