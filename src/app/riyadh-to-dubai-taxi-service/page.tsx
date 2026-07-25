import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToDubai } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Dubai Taxi & Private Transfer | 24/7 Service",
  description: "Reliable Riyadh to Dubai taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/riyadh-to-dubai-taxi-service",
  keywords: ["Riyadh to Dubai taxi", "Saudi Arabia to Dubai transfer", "Ghuwaifat border taxi", "Riyadh to UAE taxi"],
});

export default function Page() {
  return <RoutePage data={riyadhToDubai} />;
}
