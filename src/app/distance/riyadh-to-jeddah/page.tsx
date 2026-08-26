import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Jeddah Distance & Travel Time",
  description: "Riyadh to Jeddah distance by road, driving time, and why most travelers fly between Saudi Arabia's two largest cities. Plan your trip.",
  path: "/distance/riyadh-to-jeddah",
});

export default function RiyadhToJeddahDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-jeddah"]} />;
}
