import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToKhafji } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam Airport to Khafji Taxi & Transfer",
  description: "Private transfer from King Fahd International Airport (DMM) north to Khafji — about 180 km and 2 to 2.5 hours, with licensed drivers and 24/7 arrival pickups.",
  path: "/dammam-airport-to-khafji-taxi-service",
  keywords: ["Dammam airport to Khafji taxi", "DMM to Khafji transfer", "Khafji taxi service", "Al Khafji airport transfer"],
});

export default function Page() {
  return <RoutePage data={dammamAirportToKhafji} />;
}
