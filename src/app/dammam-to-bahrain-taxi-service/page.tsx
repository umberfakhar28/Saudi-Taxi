import { generatePageMetadata } from "@/lib/seo";
import RouteLanding from "@/components/RouteLanding";
import { dammamToBahrain } from "@/lib/routeData";

// Phase A route page (docs/seo/routes/new-routes-plan.md). Targets the
// Saudi → Bahrain direction only ("dammam to bahrain taxi", "khobar to
// bahrain"); /bahrain-to-dammam-taxi-service keeps the reverse queries it
// already ranks for. Sedan from Dammam from 500 SAR (owner, 20 Nov 2026).
export const metadata = generatePageMetadata({
  title: "Dammam to Bahrain Taxi from 500 SAR | Private Car",
  brandSuffix: false,
  description: "Private taxi from Dammam to Bahrain across the King Fahd Causeway, about 65 km. Sedan starting from 500 SAR, toll included. Khobar and Dhahran pickups too.",
  path: "/dammam-to-bahrain-taxi-service",
  hreflangPath: "/dammam-to-bahrain-taxi-service",
  ogImage: "/images/routes/dammam-to-bahrain/dammam-to-bahrain-taxi-king-fahd-causeway-og.jpg",
  ogImageAlt: "Dammam to Bahrain taxi on the King Fahd Causeway",
  keywords: ["Dammam to Bahrain taxi", "Dammam to Bahrain by road", "Khobar to Bahrain taxi", "Khobar to Bahrain Airport"],
});

export default function DammamToBahrain() {
  return <RouteLanding data={dammamToBahrain} />;
}
