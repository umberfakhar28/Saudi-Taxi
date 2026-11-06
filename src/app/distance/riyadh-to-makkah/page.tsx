import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Makkah Distance: 870 km by Road",
  description: "Riyadh to Makkah is approximately 870 km by road, around 9 to 10 hours of continuous driving — plus the alternatives for an Umrah trip.",
  path: "/distance/riyadh-to-makkah",
});

export default function RiyadhToMakkahDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-makkah"]} />;
}
