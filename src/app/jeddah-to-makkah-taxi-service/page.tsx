import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { jeddahToMakkah } from "@/lib/routeData";

// Migrated from a bespoke page onto the shared RoutePage template —
// Execution Brief v3 W3, docs/page-inventory.md D1 ("Hardcoded pages").
export const metadata = generatePageMetadata({
  title: "Jeddah → Makkah Private Transfer & Chauffeur | Gulf Trip",
  description: "Reliable Jeddah to Makkah taxi & private transfer. Meet-and-greet pickup, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/jeddah-to-makkah-taxi-service",
  keywords: ["Jeddah to Makkah taxi", "Jeddah to Makkah transfer", "Jeddah to Makkah car", "Jeddah to Makkah transport"],
});

export default function JeddahToMakkah() {
  return <RoutePage data={jeddahToMakkah} />;
}
