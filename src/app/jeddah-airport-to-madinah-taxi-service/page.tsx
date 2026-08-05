import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { jeddahAirportToMadinah } from "@/lib/routeData";

// W7 P1 — new corridor for the Madinah-first Umrah itinerary (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Jeddah Airport to Madinah Taxi & Umrah Transfer | Gulf Trip",
  description: "Direct taxi from Jeddah Airport (KAIA) to Madinah for Madinah-first Umrah itineraries. Meet-and-greet pickup, 24/7. Book on WhatsApp.",
  path: "/jeddah-airport-to-madinah-taxi-service",
  keywords: ["Jeddah airport to Madinah taxi", "KAIA to Madinah transfer", "Jeddah to Madinah Umrah taxi"],
});

export default function JeddahAirportToMadinah() {
  return <RoutePage data={jeddahAirportToMadinah} />;
}
