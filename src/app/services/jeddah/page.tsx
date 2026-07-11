import { generatePageMetadata } from "@/lib/seo";
import CityServicePage from "@/components/CityServicePage";
import RelatedLinks from "@/components/RelatedLinks";
import { jeddah } from "@/lib/cityData1";

export const metadata = generatePageMetadata({
  title: "Taxi Service in Jeddah",
  description: "Professional taxi in Jeddah. King Abdulaziz Airport (KAIA) transfers to Makkah, Madinah & city hotels. Al-Balad tours, Corniche pickups. 24/7, fixed rates.",
  path: "/services/jeddah",
  keywords: ["Jeddah taxi", "Jeddah airport taxi", "KAIA transfer", "Jeddah to Makkah", "Jeddah city tour taxi"],
});

export default function JeddahPage() {
  return (
    <>
      <CityServicePage data={jeddah} />
      <RelatedLinks
        title="More Jeddah Taxi Services"
        links={[
          { href: "/jeddah-airport-taxi-service", label: "Jeddah Airport (KAIA) Taxi" },
          { href: "/jeddah-airport-taxi-guide", label: "Jeddah Airport Taxi Guide" },
          { href: "/jeddah-to-makkah-taxi-service", label: "Jeddah to Makkah Taxi" },
          { href: "/jeddah-to-makkah-guide", label: "Jeddah to Makkah Travel Guide" },
          { href: "/jeddah-city-tour-services-in-saudi-arabia", label: "Jeddah City Tours" },
        ]}
      />
    </>
  );
}
