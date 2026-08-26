import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Makkah Distance & Travel Time",
  description: "Riyadh to Makkah distance by road, driving time, and realistic travel options including flying. Plan your Umrah trip or book a private taxi.",
  path: "/distance/riyadh-to-makkah",
});

export default function RiyadhToMakkahDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-makkah"]} />;
}
