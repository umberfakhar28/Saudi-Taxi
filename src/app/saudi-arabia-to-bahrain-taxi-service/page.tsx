import { generatePageMetadata } from "@/lib/seo";
import BorderPage from "@/components/BorderPage";
import { saudiToBahrain } from "@/lib/borderData";

export const metadata = generatePageMetadata({
  title: "Saudi Arabia to Bahrain Taxi | Causeway Transfer 24/7",
  description: "Private taxi from anywhere in Saudi Arabia to Bahrain via King Fahd Causeway. Licensed drivers, door-to-door, 24/7. Book your transfer on WhatsApp.",
  path: "/saudi-arabia-to-bahrain-taxi-service",
  keywords: ["Saudi to Bahrain taxi", "King Fahd Causeway transfer", "Bahrain border taxi", "Saudi to Bahrain car"],
});

export default function SaudiToBahrain() {
  return <BorderPage data={saudiToBahrain} />;
}
