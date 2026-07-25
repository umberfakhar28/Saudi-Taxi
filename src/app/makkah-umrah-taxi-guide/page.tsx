import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Makkah Umrah Taxi Guide | Ihram-Friendly Transfers 24/7",
  description: "Makkah Umrah taxi guide with Ihram-friendly vehicles: airport transfers, Ziyarat tours, hotel shuttles. English-speaking drivers, 24/7. Book on WhatsApp.",
  path: "/makkah-umrah-taxi-guide",
  keywords: ["makkah umrah taxi", "umrah transport makkah", "taxi for umrah", "makkah ziyarat taxi", "ihram friendly taxi"],
});

export default function MakkahUmrahGuide() {
  const html = readContentFile("makkah-umrah-taxi-service.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
