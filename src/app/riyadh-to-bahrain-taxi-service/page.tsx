import { generatePageMetadata } from "@/lib/seo";
import RouteLanding from "@/components/RouteLanding";
import { riyadhToBahrain } from "@/lib/routeData";

// Title leads with the price: the page sits around position 7 (GSC, Nov
// 2026), so the aim is click-through. The brand suffix is appended by
// generatePageMetadata; the brief's second segment ("Private Transfer")
// was dropped to keep the full title under 60 characters.
export const metadata = generatePageMetadata({
  title: "Riyadh to Bahrain Taxi from 1,000 SAR",
  description: "Private Riyadh to Bahrain taxi via King Fahd Causeway. Sedan 1,000 SAR, SUV 1,500 SAR, door to door, 24/7. Book instantly on WhatsApp.",
  path: "/riyadh-to-bahrain-taxi-service",
  hreflangPath: "/riyadh-to-bahrain-taxi-service",
  ogImage: "/images/routes/luxury-riyadh-to-bahrain-transfer-og.jpg",
  ogImageAlt: "Luxury private car transfer from Riyadh to Bahrain via King Fahd Causeway",
});

export default function Page() {
  return <RouteLanding data={riyadhToBahrain} />;
}
