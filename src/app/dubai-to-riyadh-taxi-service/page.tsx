import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dubaiToRiyadh } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dubai to Riyadh Taxi Service",
  description: "Private long-distance overland transfer from Dubai to Riyadh via the Al Batha (Ghuwaifat) border crossing. Executive vehicles for the ~1,100 km journey. Book now.",
  path: "/dubai-to-riyadh-taxi-service",
  keywords: ["Dubai to Riyadh taxi", "UAE to Saudi Arabia transfer", "Ghuwaifat border taxi", "Dubai to Riyadh overland"],
});

export default function Page() {
  return <RoutePage data={dubaiToRiyadh} />;
}
