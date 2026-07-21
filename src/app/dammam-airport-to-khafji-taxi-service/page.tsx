import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamAirportToKhafji } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam Airport to Khafji Taxi Service",
  description: "Direct intercity taxi from King Fahd International Airport to Al Khafji on Saudi Arabia's Gulf coast. Fixed pricing, meet-and-greet pickup, KJO compound transfers. Book now.",
  path: "/dammam-airport-to-khafji-taxi-service",
  keywords: ["Dammam airport to Khafji taxi", "DMM to Khafji transfer", "Khafji taxi service", "Al Khafji airport transfer"],
});

export default function Page() {
  return <RoutePage data={dammamAirportToKhafji} />;
}
