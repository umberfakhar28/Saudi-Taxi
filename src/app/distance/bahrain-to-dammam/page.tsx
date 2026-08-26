import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Bahrain to Dammam Distance & Travel Time",
  description: "Bahrain to Dammam distance via the King Fahd Causeway, crossing time, and private transfer options. Plan your trip or book a private taxi.",
  path: "/distance/bahrain-to-dammam",
  ogImage: distanceRoutes["bahrain-to-dammam"].heroImage,
  ogImageAlt: distanceRoutes["bahrain-to-dammam"].heroImageAlt,
});

export default function BahrainToDammamDistance() {
  return <DistancePage data={distanceRoutes["bahrain-to-dammam"]} />;
}
