import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { kuwaitToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Kuwait to Riyadh Taxi & Private Transfer | 24/7 Service",
  description: "Reliable Kuwait to Riyadh taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/kuwait-to-riyadh-taxi-service",
  keywords: ["Kuwait to Riyadh taxi", "Kuwait to Riyadh transfer", "Haradh border taxi", "Kuwait to Saudi Arabia overland"],
});

export default function Page() {
  return <RoutePage data={kuwaitToRiyadh} />;
}
