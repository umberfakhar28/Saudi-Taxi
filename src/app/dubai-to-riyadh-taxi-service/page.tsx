import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dubaiToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dubai to Riyadh Taxi & Private Car with Driver | 24/7",
  description: "Book a private car with driver from Dubai to Riyadh. Executive chauffeur, cross-border paperwork handled, 24/7 service. Reserve on WhatsApp.",
  path: "/dubai-to-riyadh-taxi-service",
  keywords: ["Dubai to Riyadh taxi", "car with driver Dubai to Riyadh", "UAE to Saudi Arabia transfer", "Ghuwaifat border taxi", "Dubai to Riyadh overland"],
});

export default function Page() {
  return <RoutePage data={dubaiToRiyadh} />;
}
