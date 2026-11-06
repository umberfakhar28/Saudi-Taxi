import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Bahrain to Riyadh Distance: 470 km by Road",
  description: "Bahrain to Riyadh is about 470 km by road via the King Fahd Causeway — roughly 4.5 to 5.5 hours including border processing, plus private transfer options.",
  path: "/distance/bahrain-to-riyadh",
  ogImage: distanceRoutes["bahrain-to-riyadh"].heroImage,
  ogImageAlt: distanceRoutes["bahrain-to-riyadh"].heroImageAlt,
});

export default function BahrainToRiyadhDistance() {
  return <DistancePage data={distanceRoutes["bahrain-to-riyadh"]} />;
}
