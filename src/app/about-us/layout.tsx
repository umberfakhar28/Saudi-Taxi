import { generatePageMetadata } from "@/lib/seo";
import { jsonLd } from "@/lib/jsonld";

export const metadata = generatePageMetadata({
  title: "About Us | Gulf Trip Service — Saudi Arabia's Trusted Transport Partner Since 2014",
  description: "Learn about Gulf Trip Service — 10+ years serving Umrah pilgrims, tourists, and business travelers across Saudi Arabia. Licensed fleet, certified drivers, 15,000+ happy customers.",
  path: "/about-us",
  keywords: ["about Gulf Trip Service", "Saudi taxi company", "Umrah transport company Saudi Arabia", "licensed taxi Saudi Arabia"],
});

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gulf Trip Service",
  url: "https://gulftripservice.com",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "847",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    { "@type": "Review", author: { "@type": "Person", name: "Ahmed Al-Rashid" }, reviewRating: { "@type": "Rating", ratingValue: "5" }, reviewBody: "Impeccable service for my KAFD meetings. Driver was punctual and the vehicle was spotless. Best corporate taxi in Riyadh." },
    { "@type": "Review", author: { "@type": "Person", name: "Fatima B." }, reviewRating: { "@type": "Rating", ratingValue: "5" }, reviewBody: "Arrived at 2am and our driver was already waiting. Transferred straight to Makkah. Perfect Umrah service." },
    { "@type": "Review", author: { "@type": "Person", name: "James O." }, reviewRating: { "@type": "Rating", ratingValue: "5" }, reviewBody: "Booked a Jeddah city tour. Driver was knowledgeable and the car was luxurious. Highly recommend." },
  ],
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(reviewSchema) }} />
      {children}
    </>
  );
}
