import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { bahrainToDammam } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Bahrain to Dammam Taxi Service",
  description: "Coordinated taxi transfer from Bahrain across the King Fahd Causeway into Dammam, Saudi Arabia. Seamless vehicle handover at the border. Book your crossing today.",
  path: "/bahrain-to-dammam-taxi-service",
  keywords: ["Bahrain to Dammam taxi", "Bahrain to Saudi Arabia taxi", "King Fahd Causeway transfer", "Manama to Dammam taxi"],
});

export default function Page() {
  return <RoutePage data={bahrainToDammam} />;
}
