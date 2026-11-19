import { generatePageMetadata } from "@/lib/seo";
import RouteLanding from "@/components/RouteLanding";
import { riyadhToKuwait } from "@/lib/routeData";

// The main lead page for the Kuwait cluster (docs/seo/kuwait/keyword-map.md).
// Search demand is "riyadh to kuwait by road / by car", so the title says
// "by Road" and leads with the fare. 56 characters, so the brand suffix is
// left off; Google shows the site name above the title anyway.
export const metadata = generatePageMetadata({
  title: "Riyadh to Kuwait Taxi by Road from 220 KWD | Private Car",
  brandSuffix: false,
  description: "Private taxi from Riyadh to Kuwait City by road: about 648 km, 7 h 40 min via the Al Khafji border. From 220 KWD per car, 24/7. Book on WhatsApp.",
  path: "/riyadh-to-kuwait-taxi-service",
  hreflangPath: "/riyadh-to-kuwait-taxi-service",
  ogImage: "/images/routes/riyadh-to-kuwait/riyadh-to-kuwait-taxi-by-road-og.jpg",
  ogImageAlt: "Private taxi from Riyadh to Kuwait by road, SUV on desert highway toward Kuwait City",
  keywords: ["Riyadh to Kuwait taxi", "Riyadh to Kuwait by road", "Riyadh to Kuwait by car", "Riyadh to Kuwait City taxi"],
});

export default function RiyadhToKuwait() {
  return <RouteLanding data={riyadhToKuwait} />;
}
