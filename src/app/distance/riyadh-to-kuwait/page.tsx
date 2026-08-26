import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Kuwait Distance & Travel Time",
  description: "Riyadh to Kuwait distance via the Haradh/Wajir border, driving time, and private transfer options. Plan your trip or book a private taxi.",
  path: "/distance/riyadh-to-kuwait",
});

export default function RiyadhToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-kuwait"]} />;
}
