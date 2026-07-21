import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { kuwaitToDammam } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Kuwait to Dammam Taxi Service",
  description: "Direct taxi from Kuwait City to Dammam and the Eastern Province via the Al Nuwaiseeb border crossing at Khafji. Fixed pricing, one vehicle for the whole trip. Book now.",
  path: "/kuwait-to-dammam-taxi-service",
  keywords: ["Kuwait to Dammam taxi", "Kuwait to Saudi Arabia taxi", "Al Nuwaiseeb border taxi", "Kuwait to Khobar transfer"],
});

export default function Page() {
  return <RoutePage data={kuwaitToDammam} />;
}
