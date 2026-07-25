import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToQatar } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam Airport → Qatar Private Transfer & Chauffeur | Gulf Trip",
  description: "Reliable Dammam Airport to Qatar taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/dammam-airport-to-qatar-taxi-service",
  keywords: ["Dammam airport to Qatar taxi", "DMM to Doha taxi", "Salwa border transfer", "Dammam to Doha taxi"],
  hreflangPath: "/dammam-airport-to-qatar-taxi-service",
});

export default function Page() {
  return <RoutePage data={dammamAirportToQatar} />;
}
