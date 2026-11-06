import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  // "by Road" matches the phrasing this page's search demand actually uses
  // ("riyadh to kuwait by road", "... distance by road"), which Google bolds
  // in the snippet. The border-crossing angle — the part a SERP distance
  // panel can't answer — moves into the description, since the title has no
  // room for it once generatePageMetadata appends the 20-char brand suffix.
  title: "Riyadh to Kuwait by Road: 639 km",
  description: "Riyadh to Kuwait is roughly 639 km via the inland crossing — plan most of a day once border processing and rest stops are counted.",
  path: "/distance/riyadh-to-kuwait",
});

export default function RiyadhToKuwaitDistance() {
  return <DistancePage data={distanceRoutes["riyadh-to-kuwait"]} />;
}
