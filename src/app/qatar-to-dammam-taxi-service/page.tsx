import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { qatarToDammam } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Book Qatar to Dammam Taxi — Border Crossing Made Easy",
  description: "Reliable Qatar to Dammam taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/qatar-to-dammam-taxi-service",
  keywords: ["Qatar to Dammam taxi", "Doha to Dammam transfer", "Salwa border taxi", "Qatar to Saudi Arabia taxi"],
});

export default function Page() {
  return <RoutePage data={qatarToDammam} />;
}
