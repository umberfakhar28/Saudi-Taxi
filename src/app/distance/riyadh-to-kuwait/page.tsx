import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";
import { distanceMetadata } from "@/lib/distanceFare";

// Title, description and every figure come from the pair's record in
// lib/distanceRouteData.ts (docs/seo/distance/distance-audit.md).
const data = distanceRoutes["riyadh-to-kuwait"];

export const metadata = distanceMetadata(data);

export default function RiyadhToKuwaitDistance() {
  return <DistancePage data={data} />;
}
