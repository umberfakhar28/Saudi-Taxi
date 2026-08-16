import { generatePageMetadata } from "@/lib/seo";
import BorderPage from "@/components/BorderPage";
import { saudiToQatar } from "@/lib/borderData";

export const metadata = generatePageMetadata({
  title: "Saudi Arabia to Qatar Taxi | Salwa Border Transfer 24/7",
  description: "Private taxi from anywhere in Saudi Arabia to Doha, Qatar via the Salwa border. Professional drivers, door-to-door service, 24/7. Reserve now on WhatsApp.",
  path: "/saudi-arabia-to-qatar-taxi-service",
  keywords: ["Saudi to Qatar taxi", "Salwa crossing transfer", "Saudi to Doha taxi", "Qatar border taxi"],
});

export default function SaudiToQatar() {
  return <BorderPage data={saudiToQatar} />;
}
