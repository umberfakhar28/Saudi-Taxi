import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata = generatePageMetadata({
  title: "Jeddah to Makkah Taxi & Umrah Transfer Guide",
  description: "Jeddah to Makkah by private taxi — roughly 80 km and 1 to 1.5 hours from King Abdulaziz Airport, with licensed drivers and 24/7 pickups for Umrah travellers.",
  path: "/jeddah-to-makkah-guide",
  keywords: ["jeddah to makkah taxi", "jeddah makkah transfer", "umrah taxi jeddah", "taxi from jeddah airport to makkah"],
});

export default function JeddahToMakkahGuide() {
  const html = readContentFile("jeddah-to-makkah-taxi.html");
  return (
    <>
      <div className="guide-content" data-page-template="content-guide" dangerouslySetInnerHTML={{ __html: html }} />
      <RelatedLinks
        title="More Jeddah Taxi Services"
        links={[
          { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA) Taxi" },
          { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA) Taxi" },
          { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah Taxi" },
          { href: "/makkah-to-madinah-guide", label: "Makkah to Madinah Travel Guide" },
        ]}
      />
    </>
  );
}
