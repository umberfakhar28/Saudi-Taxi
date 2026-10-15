import RoutePage from "@/components/RoutePage";
import { riyadhToBahrainAr } from "@/lib/ar/routeDataAr";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "سيارة خاصة من الرياض إلى البحرين | عبر جسر الملك فهد",
    description: "نقل خاص من الرياض إلى المنامة والسيف عبر جسر الملك فهد. سيارة تنفيذية وسائق مرخّص من باب إلى باب.",
    path: "/ar/riyadh-to-bahrain-taxi-service",
    hreflangPath: "/riyadh-to-bahrain-taxi-service",
});

export default function Page() {
    return <RoutePage data={riyadhToBahrainAr} locale="ar" />;
}
