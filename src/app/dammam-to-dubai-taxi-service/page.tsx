import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dammamToDubai } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dammam to Dubai Taxi Service",
  description: "Private long-distance overland transfer from Dammam to Dubai via the Al Batha (Ghuwaifat) border crossing. Executive vehicles for the ~1,100 km journey. Book now.",
  path: "/dammam-to-dubai-taxi-service",
  keywords: ["Dammam to Dubai taxi", "Saudi Arabia to Dubai transfer", "Ghuwaifat border taxi", "Dammam to UAE taxi"],
});

export default function Page() {
  return <RoutePage data={dammamToDubai} />;
}
