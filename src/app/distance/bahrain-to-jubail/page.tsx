import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";
import { distanceMetadata } from "@/lib/distanceFare";

// Title, description and every figure come from the pair's record in
// lib/distanceRouteData.ts (docs/seo/distance/distance-audit.md).
const data = distanceRoutes["bahrain-to-jubail"];

export const metadata = distanceMetadata(data);

export default function BahrainToJubailDistance() {
  return <DistancePage data={data} />;
}
