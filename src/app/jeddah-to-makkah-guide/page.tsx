import { generatePageMetadata } from "@/lib/seo";
import { readContentFile } from "@/lib/readContent";
import RelatedLinks from "@/components/RelatedLinks";

export const metadata = generatePageMetadata({
  title: "Taxi from Jeddah to Makkah",
  description: "Professional taxi from Jeddah to Makkah. 100km journey in 60–90 minutes. Ihram-friendly vehicles, fixed prices SAR 150–400. 24/7 Umrah transfers. Book online instantly.",
  path: "/jeddah-to-makkah-guide",
  keywords: ["jeddah to makkah taxi", "jeddah makkah transfer", "umrah taxi jeddah", "taxi from jeddah airport to makkah"],
});

export default function JeddahToMakkahGuide() {
  const html = readContentFile("jeddah-to-makkah-taxi.html");
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <RelatedLinks
        title="More Jeddah Taxi Services"
        links={[
          { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA) Taxi" },
          { href: "/jeddah-airport-taxi-guide", label: "Jeddah Airport Taxi Guide" },
          { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah Taxi" },
          { href: "/services/jeddah", label: "Jeddah Taxi Services Overview" },
          { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tours" },
        ]}
      />
    </>
  );
}
