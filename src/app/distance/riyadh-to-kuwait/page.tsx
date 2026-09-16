import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Kuwait Distance & Travel Time",
  description: "Riyadh to Kuwait distance, journey time, border crossings and private transfer options. Plan your door-to-door trip or request a quote.",
  path: "/distance/riyadh-to-kuwait",
});

export default function RiyadhToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-kuwait"]} />;
}
