import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Bahrain to Dammam Distance: 65 km",
  description: "Bahrain to Dammam is only about 65 km via the King Fahd Causeway — typically 1 to 1.5 hours once border processing is counted.",
  path: "/distance/bahrain-to-dammam",
  ogImage: distanceRoutes["bahrain-to-dammam"].heroImage,
  ogImageAlt: distanceRoutes["bahrain-to-dammam"].heroImageAlt,
});

export default function BahrainToDammamDistance() {
  return <DistancePage data={distanceRoutes["bahrain-to-dammam"]} />;
}
