import RouteLanding from "@/components/RouteLanding";
import { dammamToBahrainAr } from "@/lib/ar/routeDataAr";
import { generatePageMetadata } from "@/lib/seo";

// Arabic twin of /dammam-to-bahrain-taxi-service, written for the Arabic
// searches ("من الدمام إلى البحرين سيارة", "من الخبر إلى البحرين").
export const metadata = generatePageMetadata({
    title: "تاكسي الدمام إلى البحرين من 500 ريال | سيارة خاصة",
    brandSuffix: false,
    description: "من الدمام إلى البحرين بالسيارة: تاكسي خاص عبر جسر الملك فهد، نحو 65 كم وساعة إلى ساعتين. يبدأ من 500 ريال للسيارة شامل رسوم الجسر. احجز عبر واتساب.",
    path: "/ar/dammam-to-bahrain-taxi-service",
    hreflangPath: "/dammam-to-bahrain-taxi-service",
    ogImage: "/images/routes/dammam-to-bahrain/dammam-to-bahrain-taxi-king-fahd-causeway-og.jpg",
    ogImageAlt: "تاكسي من الدمام إلى البحرين على جسر الملك فهد",
});

export default function Page() {
    return <RouteLanding data={dammamToBahrainAr} locale="ar" />;
}
