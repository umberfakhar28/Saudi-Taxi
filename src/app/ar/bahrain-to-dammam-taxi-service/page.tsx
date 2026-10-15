import RoutePage from "@/components/RoutePage";
import { bahrainToDammamAr } from "@/lib/ar/routeDataAr";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "سيارة خاصة من البحرين إلى الدمام | عبر جسر الملك فهد",
    description: "نقل خاص من باب إلى باب من البحرين إلى الدمام والخبر والظهران عبر جسر الملك فهد. سيارة واحدة وسائق مرخّص، وخدمة على مدار الساعة.",
    path: "/ar/bahrain-to-dammam-taxi-service",
    hreflangPath: "/bahrain-to-dammam-taxi-service",
});

export default function Page() {
    return <RoutePage data={bahrainToDammamAr} locale="ar" />;
}
