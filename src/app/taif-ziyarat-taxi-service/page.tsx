import { generatePageMetadata } from "@/lib/seo";
import TourPage from "@/components/TourPage";
import { taifZiyarat } from "@/lib/tourPageData";

export const metadata = generatePageMetadata({
  title: "Taif Ziyarat Taxi Service | Private Tour with Driver",
  description: "Private Taif Ziyarat and city tour taxi from Makkah or Jeddah: rose farms, Al-Shafa gardens, Taif Zoo. Professional drivers, 24/7. Book on WhatsApp.",
  path: "/taif-ziyarat-taxi-service",
  keywords: ["Taif Ziyarat taxi", "Taif tour taxi", "Taif sightseeing", "Taif from Makkah tour"],
});

export default function TaifZiyaratTaxi() {
  return <TourPage data={taifZiyarat} />;
}
