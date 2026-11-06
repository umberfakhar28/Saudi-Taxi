import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Jeddah Distance: 950–1,000 km",
  description: "Riyadh to Jeddah is roughly 950 to 1,000 km by road — about 10 to 11 hours of driving, which is why most travellers fly this route.",
  path: "/distance/riyadh-to-jeddah",
});

export default function RiyadhToJeddahDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-jeddah"]} />;
}
