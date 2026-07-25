import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dubaiToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Taxi Dubai to Riyadh | Cross-Border Car Service 24/7",
  description: "Reliable Dubai to Riyadh taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/dubai-to-riyadh-taxi-service",
  keywords: ["Dubai to Riyadh taxi", "UAE to Saudi Arabia transfer", "Ghuwaifat border taxi", "Dubai to Riyadh overland"],
});

export default function Page() {
  return <RoutePage data={dubaiToRiyadh} />;
}
