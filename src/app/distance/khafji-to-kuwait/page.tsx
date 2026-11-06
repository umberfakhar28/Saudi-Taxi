import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Khafji to Kuwait: 180 km via Al Nuwaiseeb",
  description: "Khafji sits about 15 km from the Al Nuwaiseeb border and roughly 180 km from Kuwait City — about 2.5 to 3 hours including the crossing.",
  path: "/distance/khafji-to-kuwait",
});

export default function KhafjiToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["khafji-to-kuwait"]} />;
}
