import RoutePage from "@/components/RoutePage";
import { riyadhToKuwaitAr } from "@/lib/ar/routeDataAr";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "سيارة خاصة من الرياض إلى الكويت | رحلة برية خاصة",
    description: "نقل خاص من الرياض إلى مدينة الكويت عبر الحدود البرية. سيارة واحدة وسائق مرخّص، بديل مريح عن الطيران للعائلات والمجموعات.",
    path: "/ar/riyadh-to-kuwait-taxi-service",
    hreflangPath: "/riyadh-to-kuwait-taxi-service",
});

export default function Page() {
    return <RoutePage data={riyadhToKuwaitAr} locale="ar" />;
}
