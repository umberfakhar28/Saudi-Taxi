import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { makkahToJeddah } from "@/lib/routeData";

// W7 P1 reciprocal of /jeddah-to-makkah-taxi-service (docs/page-gap-analysis.md).
export const metadata = generatePageMetadata({
  title: "Makkah to Jeddah Taxi & Airport Departure Transfer | Gulf Trip",
  description: "Makkah to Jeddah private taxi and KAIA departure transfer. Timed around your flight and Tawaf al-Wada. Meet-and-greet, 24/7. Book on WhatsApp.",
  path: "/makkah-to-jeddah-taxi-service",
  keywords: ["Makkah to Jeddah taxi", "Makkah to Jeddah airport transfer", "Makkah departure taxi"],
});

export default function MakkahToJeddah() {
  return <RoutePage data={makkahToJeddah} />;
}
