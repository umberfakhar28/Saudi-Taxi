import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam Airport to Riyadh Taxi Service",
  description: "Private intercity transfer from King Fahd International Airport straight to Riyadh. Executive vehicles, fixed pricing, door-to-door service. Book your transfer today.",
  path: "/dammam-airport-to-riyadh-taxi-service",
  keywords: ["Dammam airport to Riyadh taxi", "DMM to Riyadh transfer", "Dammam to Riyadh intercity taxi"],
});

export default function Page() {
  return <RoutePage data={dammamAirportToRiyadh} />;
}
