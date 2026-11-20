import { generatePageMetadata } from "@/lib/seo";
import ArticleIndex from "@/components/ArticleIndex";

export const metadata = generatePageMetadata({
  title: "Saudi Arabia Travel Blog: Family Trips, Routes and Tips",
  brandSuffix: false,
  description: "Saudi Arabia travel blog: family destinations, Abha vs Taif, Bahrain to Dammam travel options, Riyadh and Jeddah sights, Umrah planning and airport tips.",
  path: "/blog",
});

// Posts come from lib/articles.ts, grouped by topic (redesigned 20 Nov 2026).
export default function BlogIndex() {
  return (
    <ArticleIndex
      kind="blog"
      h1="Saudi Arabia Travel Blog"
      lead="Where to take the family, how to cross to Bahrain, what to see in Riyadh and Jeddah, and how to plan Umrah: written by the team that drives these roads every day."
    />
  );
}
