import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";

export const metadata = generatePageMetadata({
  title: "Madinah Umrah Taxi Service",
  description: "Professional Umrah taxi service in Madinah. 24/7 transportation to Prophet's Mosque, Ziyarat tours, airport transfers. Rawdah access support. English-speaking drivers.",
  path: "/madinah-umrah-taxi-guide",
  keywords: ["madinah umrah taxi", "madinah taxi service", "prophet mosque transport", "madinah ziyarat taxi", "madinah airport taxi"],
});

export default function MadinahUmrahGuide() {
  const html = readContentFile("madinah-umrah-taxi-service.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
