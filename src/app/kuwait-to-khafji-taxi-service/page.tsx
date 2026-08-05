import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { kuwaitToKhafji } from "@/lib/routeData";

// W7 P1.5 reciprocal of /khafji-to-kuwait-taxi-service (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Kuwait to Khafji Taxi & Border Transfer | Gulf Trip",
  description: "Private taxi from Kuwait City across the Al Nuwaiseeb border into Al Khafji, Saudi Arabia. 24/7 availability. Book on WhatsApp.",
  path: "/kuwait-to-khafji-taxi-service",
  keywords: ["Kuwait to Khafji taxi", "Al Nuwaiseeb border taxi", "Kuwait to Saudi Arabia border transfer"],
});

export default function KuwaitToKhafji() {
  return <RoutePage data={kuwaitToKhafji} />;
}
