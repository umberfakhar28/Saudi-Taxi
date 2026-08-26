import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Bahrain to Jubail Distance & Travel Time",
  description: "Bahrain to Jubail distance via the King Fahd Causeway, travel time, and private transfer options for contractors and business travelers.",
  path: "/distance/bahrain-to-jubail",
  ogImage: distanceRoutes["bahrain-to-jubail"].heroImage,
  ogImageAlt: distanceRoutes["bahrain-to-jubail"].heroImageAlt,
});

export default function BahrainToJubailDistance() {
  return <DistancePage data={distanceRoutes["bahrain-to-jubail"]} />;
}
