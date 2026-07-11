import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { qatarToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Qatar to Riyadh Taxi Service | Salwa Border Transfer | Gulf Trip Service",
  description: "Private door-to-door transfer from Doha, Qatar to Riyadh via the Salwa/Abu Samra border. One vehicle for the entire journey. Book your long-distance transfer today.",
  path: "/qatar-to-riyadh-taxi-service",
  keywords: ["Qatar to Riyadh taxi", "Doha to Riyadh taxi", "Salwa border transfer", "Qatar to Saudi Arabia taxi"],
});

export default function Page() {
  return <RoutePage data={qatarToRiyadh} />;
}
