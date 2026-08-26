import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Dammam to Abu Dhabi Distance & Travel Time",
  description: "Dammam to Abu Dhabi distance via the UAE border, driving time, and private transfer options for this long overland route.",
  path: "/distance/dammam-to-abu-dhabi",
});

export default function DammamToAbuDhabiDistance() {
  return <DistancePage data={distanceRoutes["dammam-to-abu-dhabi"]} />;
}
