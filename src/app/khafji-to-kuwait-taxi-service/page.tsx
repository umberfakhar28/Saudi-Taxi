import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { khafjiToKuwait } from "@/lib/routeData";

export const metadata = generatePageMetadata({
  title: "Khafji to Kuwait — Border Crossing, Distance & Private Taxi",
  description: "Khafji sits about 15 km from the Al Nuwaiseeb border and 180 km from Kuwait City — roughly 2.5–3 hours including the crossing. Private door-to-door taxi with a licensed driver, quote on WhatsApp.",
  path: "/khafji-to-kuwait-taxi-service",
  keywords: ["Khafji to Kuwait taxi", "Al Nuwaiseeb border transfer", "Khafji Kuwait border crossing", "Saudi Arabia to Kuwait taxi"],
});

export default function Page() {
  return <RoutePage data={khafjiToKuwait} />;
}
