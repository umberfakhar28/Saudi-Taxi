import { generatePageMetadata } from "@/lib/seo";
import RouteLanding from "@/components/RouteLanding";
import { riyadhToBahrain } from "@/lib/routeData";

// Title leads with the fare: the page sits around position 7 (GSC, Nov
// 2026) for price-led queries ("taxi fare", "price", "cost"), so the aim is
// click-through. It is the owner's exact wording (search-intent brief,
// 12 Nov) and already 56 characters, so the brand suffix is left off rather
// than pushing the title past what Google displays; Google shows the site
// name above the title anyway.
export const metadata = generatePageMetadata({
  title: "Riyadh to Bahrain Taxi Fare from 1,000 SAR | Private Car",
  brandSuffix: false,
  description: "Private Riyadh to Bahrain taxi & airport transfer via King Fahd Causeway. ~470 km, 4.5–5.5 hrs. Sedan 1,000 SAR, SUV 1,500 SAR. Book on WhatsApp.",
  path: "/riyadh-to-bahrain-taxi-service",
  hreflangPath: "/riyadh-to-bahrain-taxi-service",
  ogImage: "/images/routes/luxury-riyadh-to-bahrain-transfer-og.jpg",
  ogImageAlt: "Luxury private car transfer from Riyadh to Bahrain via King Fahd Causeway",
});

export default function Page() {
  return <RouteLanding data={riyadhToBahrain} />;
}
