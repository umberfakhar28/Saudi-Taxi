import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Dammam to Kuwait Distance & Travel Time",
  description: "Dammam to Kuwait distance via the Al Nuwaiseeb border, driving time, and private transfer options. Plan your trip or book a private taxi.",
  path: "/distance/dammam-to-kuwait",
});

export default function DammamToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["dammam-to-kuwait"]} />;
}
