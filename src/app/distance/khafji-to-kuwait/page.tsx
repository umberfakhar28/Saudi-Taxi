import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Khafji to Kuwait Distance & Travel Time",
  description: "Khafji to Kuwait distance via the Al Nuwaiseeb border, the shortest Saudi-Kuwait crossing, and private transfer options.",
  path: "/distance/khafji-to-kuwait",
});

export default function KhafjiToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["khafji-to-kuwait"]} />;
}
