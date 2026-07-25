import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToKhafji } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Taxi Dammam Airport to Khafji | Cross-Border Car Service 24/7",
  description: "Reliable Dammam Airport to Khafji taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/dammam-airport-to-khafji-taxi-service",
  keywords: ["Dammam airport to Khafji taxi", "DMM to Khafji transfer", "Khafji taxi service", "Al Khafji airport transfer"],
});

export default function Page() {
  return <RoutePage data={dammamAirportToKhafji} />;
}
