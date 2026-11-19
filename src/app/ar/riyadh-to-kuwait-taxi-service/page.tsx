import RouteLanding from "@/components/RouteLanding";
import { riyadhToKuwaitAr } from "@/lib/ar/routeDataAr";
import { generatePageMetadata } from "@/lib/seo";

// Arabic twin of /riyadh-to-kuwait-taxi-service, in the same designed
// layout. The title carries the two Arabic searches the page is shown for
// ("تاكسي من الرياض إلى الكويت", "المسافة من الرياض إلى الكويت بالسيارة").
export const metadata = generatePageMetadata({
    title: "تاكسي من الرياض إلى الكويت براً من 220 دينار | سيارة خاصة",
    brandSuffix: false,
    description: "تاكسي خاص من الرياض إلى الكويت بالسيارة: نحو 648 كم عبر منفذ الخفجي، ونحو 7 ساعات و40 دقيقة قيادة. يبدأ من 220 دينار كويتي للسيارة. احجز عبر واتساب.",
    path: "/ar/riyadh-to-kuwait-taxi-service",
    hreflangPath: "/riyadh-to-kuwait-taxi-service",
    ogImage: "/images/routes/riyadh-to-kuwait/riyadh-to-kuwait-taxi-by-road-og.jpg",
    ogImageAlt: "تاكسي خاص من الرياض إلى الكويت براً",
});

export default function Page() {
    return <RouteLanding data={riyadhToKuwaitAr} locale="ar" />;
}
