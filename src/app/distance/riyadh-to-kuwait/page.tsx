import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  // "by Road" matches the phrasing this page's search demand actually uses
  // ("riyadh to kuwait by road", "... distance by road"), which Google bolds
  // in the snippet. The border-crossing angle — the part a SERP distance
  // panel can't answer — moves into the description, since the title has no
  // room for it once generatePageMetadata appends the 20-char brand suffix.
  title: "Riyadh to Kuwait by Road — Distance & Time",
  description: "How far Kuwait is from Riyadh by road, which of the two border crossings the route uses, and what sets the journey time. Private door-to-door transfers available.",
  path: "/distance/riyadh-to-kuwait",
});

export default function RiyadhToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-kuwait"]} />;
}
