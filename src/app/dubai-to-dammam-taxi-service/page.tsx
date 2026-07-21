import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { dubaiToDammam } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Dubai to Dammam Taxi Service",
  description: "Private long-distance overland transfer from Dubai to Dammam via the Al Batha (Ghuwaifat) border crossing. Executive vehicles for the ~1,100 km journey. Book now.",
  path: "/dubai-to-dammam-taxi-service",
  keywords: ["Dubai to Dammam taxi", "UAE to Saudi Arabia transfer", "Ghuwaifat border taxi", "Dubai to Eastern Province taxi"],
});

export default function Page() {
  return <RoutePage data={dubaiToDammam} />;
}
