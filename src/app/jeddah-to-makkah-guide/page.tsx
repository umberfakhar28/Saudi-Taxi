import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata = generatePageMetadata({
  title: "Taxi Jeddah to Makkah | Cross-Border Car Service 24/7",
  description: "Reliable Jeddah to Makkah taxi & private transfer. Cross-border paperwork handled, licensed drivers, 24/7 service. Book your ride on WhatsApp.",
  path: "/jeddah-to-makkah-guide",
  keywords: ["jeddah to makkah taxi", "jeddah makkah transfer", "umrah taxi jeddah", "taxi from jeddah airport to makkah"],
});

export default function JeddahToMakkahGuide() {
  const html = readContentFile("jeddah-to-makkah-taxi.html");
  return (
    <>
      <div className="guide-content" dangerouslySetInnerHTML={{ __html: html }} />
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
