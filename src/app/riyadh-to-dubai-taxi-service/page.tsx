import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToDubai } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Riyadh to Dubai Taxi Service",
  description: "Private long-distance overland transfer from Riyadh to Dubai via the Al Batha (Ghuwaifat) border crossing. Executive vehicles for the ~1,100 km journey. Book now.",
  path: "/riyadh-to-dubai-taxi-service",
  keywords: ["Riyadh to Dubai taxi", "Saudi Arabia to Dubai transfer", "Ghuwaifat border taxi", "Riyadh to UAE taxi"],
});

export default function Page() {
  return <RoutePage data={riyadhToDubai} />;
}
