import { generatePageMetadata } from "@/lib/seo";
import RouteLanding from "@/components/RouteLanding";
import { jubailToBahrain } from "@/lib/routeData";

// Phase A route page (docs/seo/routes/new-routes-plan.md). Taxi intent for
// "jubail to bahrain taxi"; the distance queries stay with
// /distance/bahrain-to-jubail. No price: the fare is confirmed on WhatsApp.
export const metadata = generatePageMetadata({
  title: "Jubail to Bahrain Taxi: Private Car via the Causeway",
  brandSuffix: false,
  description: "Private taxi from Jubail to Bahrain, door to door: about 160 km via Al Khobar and the King Fahd Causeway. Fare confirmed on WhatsApp before you book.",
  path: "/jubail-to-bahrain-taxi-service",
  ogImage: "/images/routes/jubail-to-bahrain/jubail-to-bahrain-taxi-og.jpg",
  ogImageAlt: "Private taxi from Jubail to Bahrain on a coastal highway",
  keywords: ["Jubail to Bahrain taxi", "Jubail to Bahrain by road", "Jubail to Bahrain Airport", "Al Jubail to Bahrain"],
});

export default function JubailToBahrain() {
  return <RouteLanding data={jubailToBahrain} />;
}
