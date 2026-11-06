import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Dammam to Kuwait Distance: 410 km by Road",
  description: "Dammam to Kuwait is about 410 km along the Gulf coast, roughly 5 to 6 hours including the Al Nuwaiseeb crossing. What affects the time, plus private transfers.",
  path: "/distance/dammam-to-kuwait",
});

export default function DammamToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["dammam-to-kuwait"]} />;
}
