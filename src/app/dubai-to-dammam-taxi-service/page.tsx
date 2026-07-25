import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dubaiToDammam } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Book Dubai to Dammam Taxi — Border Crossing Made Easy",
  description: "Reliable Dubai to Dammam taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/dubai-to-dammam-taxi-service",
  keywords: ["Dubai to Dammam taxi", "UAE to Saudi Arabia transfer", "Ghuwaifat border taxi", "Dubai to Eastern Province taxi"],
});

export default function Page() {
  return <RoutePage data={dubaiToDammam} />;
}
