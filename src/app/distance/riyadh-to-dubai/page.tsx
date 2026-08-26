import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Dubai Distance & Travel Time",
  description: "Riyadh to Dubai distance via the UAE border, driving time, and realistic travel options including flying for business trips.",
  path: "/distance/riyadh-to-dubai",
});

export default function RiyadhToDubaiDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-dubai"]} />;
}
