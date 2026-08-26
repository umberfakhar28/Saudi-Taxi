import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Bahrain to Riyadh Distance & Travel Time",
  description: "Bahrain to Riyadh distance via the King Fahd Causeway, travel time, and private transfer options for business and family travelers.",
  path: "/distance/bahrain-to-riyadh",
  ogImage: distanceRoutes["bahrain-to-riyadh"].heroImage,
  ogImageAlt: distanceRoutes["bahrain-to-riyadh"].heroImageAlt,
});

export default function BahrainToRiyadhDistance() {
  return <DistancePage data={distanceRoutes["bahrain-to-riyadh"]} />;
}
