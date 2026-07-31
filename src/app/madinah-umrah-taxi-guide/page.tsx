import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Madinah Umrah Taxi Guide | Prophet's Mosque Transfers",
  description: "Madinah Umrah taxi guide: transport to the Prophet's Mosque, Ziyarat tours and airport transfers. English-speaking drivers, 24/7. Reserve on WhatsApp.",
  path: "/madinah-umrah-taxi-guide",
  keywords: ["madinah umrah taxi", "madinah taxi service", "prophet mosque transport", "madinah ziyarat taxi", "madinah airport taxi"],
});

export default function MadinahUmrahGuide() {
  const html = readContentFile("madinah-umrah-taxi-service.html");
  return <div className="guide-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
