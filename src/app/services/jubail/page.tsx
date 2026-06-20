import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { jubail } from "@/lib/cityData2";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Jubail | Industrial City Corporate Transfers | Gulf Trip Service",
  description: "Corporate taxi in Jubail Industrial City. Airport runs to King Fahd International, inter-site contractor transfers, Dammam & Khobar routes. Monthly accounts available.",
  path: "/services/jubail",
  keywords: ["Jubail taxi", "Jubail Industrial City transfer", "Jubail airport taxi", "corporate taxi Jubail"],
});

export default function JubailPage() {
  return <CityServicePage data={jubail} />;
}
