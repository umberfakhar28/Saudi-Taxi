import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Dammam to Kuwait by Road — Distance, Border & Drive Time",
  description: "About 410 km from Dammam to Kuwait along the Gulf coast, roughly 5–6 hours including the Al Nuwaiseeb crossing. What affects the journey time, and private door-to-door transfers.",
  path: "/distance/dammam-to-kuwait",
});

export default function DammamToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["dammam-to-kuwait"]} />;
}
