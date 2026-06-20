import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import { neom } from "@/lib/cityData3";

export const metadata = generatePageMetadata({
  title: "Taxi Service to NEOM | Sharma Airport Transfers & Contractor Logistics | Gulf Trip Service",
  description: "Executive transfers to NEOM. Sharma Airport pickups, Tabuk connections, inter-site contractor logistics, and Haql coastal access. Corporate accounts available.",
  path: "/services/neom",
  keywords: ["NEOM taxi", "Sharma Airport transfer", "NEOM contractor transport", "Tabuk to NEOM taxi", "NEOM transfer service"],
});

export default function NeomPage() {
  return <CityServicePage data={neom} />;
}
