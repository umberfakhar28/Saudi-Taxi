import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Dammam Distance & Travel Time",
  description: "Riyadh to Dammam distance by road, driving time, and private transfer options for business and leisure travelers. Plan your trip or book a taxi.",
  path: "/distance/riyadh-to-dammam",
});

export default function RiyadhToDammamDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-dammam"]} />;
}
