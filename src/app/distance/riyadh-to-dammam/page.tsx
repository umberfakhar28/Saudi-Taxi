import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Dammam Distance: 400 km, 4 Hours",
  description: "Riyadh to Dammam is about 400 km by road and roughly 4 hours of driving across open highway — no border crossing. Journey planning and private transfer options.",
  path: "/distance/riyadh-to-dammam",
});

export default function RiyadhToDammamDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-dammam"]} />;
}
