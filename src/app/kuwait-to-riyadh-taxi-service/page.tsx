import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { kuwaitToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Kuwait to Riyadh Taxi Service",
  description: "Private overland transfer from Kuwait City to Riyadh via the Haradh/Wajir land border. One vehicle, one driver, door-to-door. Fixed pricing. Book your transfer today.",
  path: "/kuwait-to-riyadh-taxi-service",
  keywords: ["Kuwait to Riyadh taxi", "Kuwait to Riyadh transfer", "Haradh border taxi", "Kuwait to Saudi Arabia overland"],
});

export default function Page() {
  return <RoutePage data={kuwaitToRiyadh} />;
}
