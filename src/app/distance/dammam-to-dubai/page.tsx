import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Dammam to Dubai Distance: 1,100 km by Road",
  description: "Dammam to Dubai is approximately 1,100 km by road via the Al Batha border — 11.5 to 13 hours once border processing is counted.",
  path: "/distance/dammam-to-dubai",
});

export default function DammamToDubaiDistance() {
  return <DistancePage data={distanceRoutes["dammam-to-dubai"]} />;
}
