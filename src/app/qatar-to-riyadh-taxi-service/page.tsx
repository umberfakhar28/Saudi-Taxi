import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { qatarToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Qatar → Riyadh Private Transfer & Chauffeur | Gulf Trip",
  description: "Reliable Qatar to Riyadh taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/qatar-to-riyadh-taxi-service",
  // Added once /ar/qatar-to-riyadh-taxi-service existed. Before that the
  // Arabic twin was a 404 that Google had nonetheless indexed, and declaring
  // an alternate pointing at it would have advertised the broken URL — which
  // is the trap the comment in kuwait-to-riyadh-taxi-service warns about.
  hreflangPath: "/qatar-to-riyadh-taxi-service",
  keywords: ["Qatar to Riyadh taxi", "Doha to Riyadh taxi", "Salwa border transfer", "Qatar to Saudi Arabia taxi"],
});

export default function Page() {
  return <RoutePage data={qatarToRiyadh} />;
}
