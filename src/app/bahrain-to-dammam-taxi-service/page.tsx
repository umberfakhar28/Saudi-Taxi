import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { bahrainToDammam } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Bahrain to Dammam Taxi & Private Transfer | 24/7 Service",
  description: "Reliable Bahrain to Dammam taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/bahrain-to-dammam-taxi-service",
  keywords: ["Bahrain to Dammam taxi", "Bahrain to Saudi Arabia taxi", "King Fahd Causeway transfer", "Manama to Dammam taxi"],
});

export default function Page() {
  return <RoutePage data={bahrainToDammam} />;
}
