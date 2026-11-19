import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Dammam to Kuwait Distance by Road: 410 km, 4.5 hrs + Border",
  brandSuffix: false,
  description: "Dammam to Kuwait is about 410 km by road, around 4.5 hours of driving via the Khafji–Nuwaiseeb border. Private door-to-door taxi, 24/7, on WhatsApp.",
  path: "/distance/dammam-to-kuwait",
});

export default function DammamToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["dammam-to-kuwait"]} />;
}
