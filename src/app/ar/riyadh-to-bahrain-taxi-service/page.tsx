import RoutePage from "@/components/RoutePage";
import { riyadhToBahrainAr } from "@/lib/ar/routeDataAr";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "تاكسي من الرياض إلى البحرين | السعر من 1,000 ريال",
    description: "تاكسي خاص من الرياض إلى البحرين وتوصيل من مطار الرياض إلى البحرين عبر جسر الملك فهد. نحو 470 كم و4.5–5.5 ساعات. سعر تاكسي الرياض البحرين: سيدان 1,000 ريال، دفع رباعي 1,500 ريال.",
    path: "/ar/riyadh-to-bahrain-taxi-service",
    hreflangPath: "/riyadh-to-bahrain-taxi-service",
});

export default function Page() {
    return <RoutePage data={riyadhToBahrainAr} locale="ar" />;
}
