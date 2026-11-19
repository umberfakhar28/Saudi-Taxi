import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Khafji to Kuwait Distance: 125 km, 1.5 hrs via Nuwaiseeb",
  brandSuffix: false,
  description: "Khafji is about 15 km from the Al Nuwaiseeb border and about 125 km from Kuwait City by road: 1.5 hours of driving, 2 to 3 hours with the border.",
  path: "/distance/khafji-to-kuwait",
});

export default function KhafjiToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["khafji-to-kuwait"]} />;
}
