import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Dammam to Dubai Distance & Travel Time",
  description: "Dammam to Dubai distance via the UAE border, driving time, and private transfer options for this long overland route.",
  path: "/distance/dammam-to-dubai",
});

export default function DammamToDubaiDistance() {
  return <DistancePage data={distanceRoutes["dammam-to-dubai"]} />;
}
