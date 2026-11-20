import { generatePageMetadata } from "@/lib/seo";
import ArticleIndex from "@/components/ArticleIndex";

export const metadata = generatePageMetadata({
  title: "Saudi Arabia Travel Guides: Airports, Borders and Drivers",
  brandSuffix: false,
  description: "Practical Saudi travel guides: Riyadh and Jeddah airport terminals, crossing to Bahrain and Kuwait, the Red Sea coast, Umrah transport and car with driver.",
  path: "/guides",
});

// New index, 20 Nov 2026: /guides was a 404 and the guides' breadcrumbs
// pointed at /our-services. Guides come from lib/articles.ts.
export default function GuidesIndex() {
  return (
    <ArticleIndex
      kind="guide"
      h1="Saudi Arabia Travel Guides"
      lead="Practical guides to Saudi airports, land borders, the Red Sea coast, Umrah transport and getting around with a driver, checked against the trips we drive."
    />
  );
}
