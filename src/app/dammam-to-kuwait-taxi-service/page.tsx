import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamToKuwait } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam → Kuwait Private Transfer & Chauffeur | Gulf Trip",
  description: "Reliable Dammam to Kuwait taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/dammam-to-kuwait-taxi-service",
  keywords: ["Dammam to Kuwait taxi", "Eastern Province to Kuwait transfer", "Al Nuwaiseeb border taxi", "Saudi Arabia to Kuwait taxi"],
});

export default function Page() {
  return <RoutePage data={dammamToKuwait} />;
}
