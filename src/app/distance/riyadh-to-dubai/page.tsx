import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Dubai Distance: 1,100 km by Road",
  description: "Riyadh to Dubai is approximately 1,100 km by road via Al Batha, around 11 to 12.5 hours with border processing — and why most business travellers fly instead.",
  path: "/distance/riyadh-to-dubai",
});

export default function RiyadhToDubaiDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-dubai"]} />;
}
