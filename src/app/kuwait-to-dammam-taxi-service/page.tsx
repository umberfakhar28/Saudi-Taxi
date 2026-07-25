import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { kuwaitToDammam } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Book Kuwait to Dammam Taxi — Border Crossing Made Easy",
  description: "Reliable Kuwait to Dammam taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/kuwait-to-dammam-taxi-service",
  keywords: ["Kuwait to Dammam taxi", "Kuwait to Saudi Arabia taxi", "Al Nuwaiseeb border taxi", "Kuwait to Khobar transfer"],
});

export default function Page() {
  return <RoutePage data={kuwaitToDammam} />;
}
