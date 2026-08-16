import { generatePageMetadata } from "@/lib/seo";
import BorderPage from "@/components/BorderPage";
import { saudiToUae } from "@/lib/borderData";

export const metadata = generatePageMetadata({
  title: "Saudi Arabia to UAE Taxi | Dubai & Abu Dhabi Transfer",
  description: "Private overland taxi from Saudi Arabia to Dubai or Abu Dhabi via the Al Batha border. Professional drivers, 24/7 availability. Book on WhatsApp today.",
  path: "/saudi-arabia-to-uae-taxi-service",
  keywords: ["Saudi to UAE taxi", "Saudi to Dubai taxi", "Saudi to Abu Dhabi taxi", "Al Batha border crossing"],
});

export default function SaudiToUae() {
  return <BorderPage data={saudiToUae} />;
}
