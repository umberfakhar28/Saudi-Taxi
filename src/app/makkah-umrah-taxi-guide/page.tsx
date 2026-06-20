import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Makkah Umrah Taxi Service | Professional Pilgrim Transport | Gulf Trip Service",
  description: "Professional Umrah taxi service in Makkah. 24/7 Ihram-friendly transportation. Airport transfers, Ziyarat tours, hotel shuttles. English-speaking drivers. Book now.",
  path: "/makkah-umrah-taxi-guide",
  keywords: ["makkah umrah taxi", "umrah transport makkah", "taxi for umrah", "makkah ziyarat taxi", "ihram friendly taxi"],
});

export default function MakkahUmrahGuide() {
  const html = readContentFile("makkah-umrah-taxi-service.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
