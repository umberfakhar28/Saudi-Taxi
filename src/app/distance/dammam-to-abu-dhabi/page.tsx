import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Dammam to Abu Dhabi Distance: 950 km",
  description: "Dammam to Abu Dhabi is about 950 km by road via the Al Batha border, roughly 10 to 11.5 hours including border processing.",
  path: "/distance/dammam-to-abu-dhabi",
});

export default function DammamToAbuDhabiDistance() {
  return <DistancePage data={distanceRoutes["dammam-to-abu-dhabi"]} />;
}
