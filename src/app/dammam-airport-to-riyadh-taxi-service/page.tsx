import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam Airport to Riyadh Taxi & Transfer",
  description: "Private transfer from King Fahd International Airport (DMM) to Riyadh — about 400 km and 3.5 to 4.5 hours, with licensed drivers and 24/7 meet-and-greet pickup.",
  path: "/dammam-airport-to-riyadh-taxi-service",
  keywords: ["Dammam airport to Riyadh taxi", "DMM to Riyadh transfer", "Dammam to Riyadh intercity taxi"],
});

export default function Page() {
  return <RoutePage data={dammamAirportToRiyadh} />;
}
