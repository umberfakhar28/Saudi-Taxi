import { generatePageMetadata } from "@/lib/seo";
import RoutePage from "@/components/RoutePage";
import { riyadhToQatar } from "@/lib/routeData";

// W7 P1 reciprocal of /qatar-to-riyadh-taxi-service (docs/page-gap-analysis.md
// — this is the "Riyadh <-> Doha" gap flagged in the gap analysis).
// Title and description are deliberately unchanged. Over the 28 days to
// 2026-10-11 this was the site's best-performing page — 31 clicks, 13.48%
// CTR, average position 4.63 — and that CTR is the evidence the current
// wording works. The only title change it has had is the brand-duplication
// fix in generatePageMetadata (docs/seo-action-plan-2026-10.md), which left
// the keywords untouched. Rewriting proven copy here would risk the result
// without evidence of a better one.
//
// What is new is a route-specific Open Graph image: previously this page
// shared the site-wide default, so every social/WhatsApp share of a Riyadh
// to Qatar booking link showed a generic card. Additive only — it has no
// bearing on the title, description or ranking signals above.
export const metadata = generatePageMetadata({
  title: "Riyadh to Qatar Taxi & Cross-Border Transfer | Gulf Trip",
  description: "Private door-to-door taxi from Riyadh to Doha, Qatar via the Salwa/Abu Samra border. One vehicle, no layovers. Book on WhatsApp.",
  path: "/riyadh-to-qatar-taxi-service",
  keywords: ["Riyadh to Qatar taxi", "Riyadh to Doha transfer", "Salwa border taxi from Riyadh"],
  // A dedicated 1200x630 card, not the 3:2 hero: generatePageMetadata
  // declares og:image:width/height as 1200x630 for every page, so pointing
  // at the hero would have published dimensions that did not match the file.
  // Letterboxed on the artwork's own panel navy rather than cropped, since
  // no 1.91:1 crop of this 3:2 composition keeps both the caption and the
  // vehicle.
  ogImage: "/og/riyadh-to-qatar-taxi.webp",
  ogImageAlt: riyadhToQatar.heroImageAlt,
});

export default function RiyadhToQatar() {
  return <RoutePage data={riyadhToQatar} />;
}
