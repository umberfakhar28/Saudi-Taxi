import { generatePageMetadata } from "@/lib/seo";
import DistancePage from "@/components/DistancePage";
import { distanceRoutes } from "@/lib/distanceRouteData";

export const metadata = generatePageMetadata({
  title: "Bahrain to Jubail Distance: 150 km by Road",
  description: "Bahrain to Jubail is about 150 km including the King Fahd Causeway, usually 2 to 2.5 hours with border processing — the practical route for Jubail contractors.",
  path: "/distance/bahrain-to-jubail",
  ogImage: distanceRoutes["bahrain-to-jubail"].heroImage,
  ogImageAlt: distanceRoutes["bahrain-to-jubail"].heroImageAlt,
});

export default function BahrainToJubailDistance() {
  return <DistancePage data={distanceRoutes["bahrain-to-jubail"]} />;
}
