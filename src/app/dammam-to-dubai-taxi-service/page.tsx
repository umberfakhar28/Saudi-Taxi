import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamToDubai } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam → Dubai Private Transfer & Chauffeur | Gulf Trip",
  description: "Reliable Dammam to Dubai taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/dammam-to-dubai-taxi-service",
  keywords: ["Dammam to Dubai taxi", "Saudi Arabia to Dubai transfer", "Ghuwaifat border taxi", "Dammam to UAE taxi"],
});

export default function Page() {
  return <RoutePage data={dammamToDubai} />;
}
