import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { madinahToJeddahAirport } from "@/lib/routeData";

// Closes the /jeddah-airport-to-madinah-taxi-service reciprocal pair (W7).
export const metadata = generatePageMetadata({
  title: "Madinah to Jeddah Airport Taxi & Departure Transfer | Gulf Trip",
  description: "Private taxi from Madinah to King Abdulaziz International Airport (KAIA). Flight-timed pickup, 24/7 availability. Book on WhatsApp.",
  path: "/madinah-to-jeddah-airport-taxi-service",
  keywords: ["Madinah to Jeddah airport taxi", "Madinah to KAIA transfer", "Madinah departure taxi"],
});

export default function MadinahToJeddahAirport() {
  return <RoutePage data={madinahToJeddahAirport} />;
}
