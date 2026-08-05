import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { makkahToMadinah } from "@/lib/routeData";

// Migrated from a bespoke page onto the shared RoutePage template —
// Execution Brief v3 W3, docs/page-inventory.md D1 ("Hardcoded pages").
export const metadata = generatePageMetadata({
  title: "Book Makkah to Madinah Taxi — Intercity Transfer",
  description: "Reliable Makkah to Madinah taxi & private transfer. Licensed drivers, comfortable vehicles, 24/7 service. Book your ride on WhatsApp.",
  path: "/makkah-to-madinah-taxi-service",
  keywords: ["Makkah to Madinah taxi", "Makkah to Madinah transfer", "intercity transfer Saudi Arabia", "Makkah to Madinah car"],
});

export default function MakkahToMadinah() {
  return <RoutePage data={makkahToMadinah} />;
}
