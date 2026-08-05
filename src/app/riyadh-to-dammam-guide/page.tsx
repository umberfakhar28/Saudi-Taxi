import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToDammam } from "@/lib/routeData";

// Migrated off the legacy content/riyadh-to-dammam-taxi.html
// (dangerouslySetInnerHTML) onto the shared RoutePage template —
// Execution Brief v3 W3 / docs/page-inventory.md D2. Not a duplicate
// consolidation: this was the only content for the corridor, so the slug
// is unchanged and there's no redirect.
export const metadata = generatePageMetadata({
  title: "Book Riyadh to Dammam Taxi — Executive Business Transfer",
  description: "Reliable Riyadh to Dammam taxi & private transfer. Executive vehicles, onboard WiFi, corporate accounts, 24/7 service. Book your ride on WhatsApp.",
  path: "/riyadh-to-dammam-guide",
  keywords: ["riyadh to dammam taxi", "business taxi saudi", "corporate transport eastern province", "riyadh dammam transfer"],
});

export default function RiyadhToDammam() {
  return <RoutePage data={riyadhToDammam} />;
}
