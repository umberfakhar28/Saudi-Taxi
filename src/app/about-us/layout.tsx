import { generatePageMetadata } from "@/lib/seo";
import { jsonLd, breadcrumbSchema } from "@/lib/jsonld";

export const metadata = generatePageMetadata({
  title: "About Us",
  description: "Learn about Gulf Trip Service — 10+ years serving Umrah pilgrims, tourists, and business travelers across Saudi Arabia. Licensed fleet, certified drivers, available 24/7.",
  path: "/about-us",
  keywords: ["about Gulf Trip Service", "Saudi taxi company", "Umrah transport company Saudi Arabia", "licensed taxi Saudi Arabia"],
});

/**
 * Organization schema for /about-us.
 *
 * This used to carry an `aggregateRating` of 4.9 from 847 reviews and three
 * named `Review` objects. None of it was real: there were no 847 reviews, and
 * the three reviewers were invented. Rating markup that is not backed by
 * reviews a visitor can actually see on the page is a review-snippet policy
 * violation, so it was both untrue and a standing manual-action risk.
 *
 * Nothing replaces it. `aggregateRating` may only come back when there are
 * genuine, verifiable reviews to count — and then it must be derived from
 * them, never typed in by hand.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gulf Trip Service",
  url: "https://gulftripservice.com",
};

const schemas = [
  organizationSchema,
  breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
  ]),
];

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      {children}
    </>
  );
}
