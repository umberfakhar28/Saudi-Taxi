import RoutePage from "@/components/RoutePage";
import { riyadhToQatarAr } from "@/lib/ar/routeDataAr";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "سيارة خاصة من الرياض إلى الدوحة | عبر منفذ سلوى",
    description: "نقل خاص من الرياض إلى الدوحة عبر منفذ سلوى. سيارة واحدة وسائق مرخّص طوال الطريق، من باب إلى باب، دون تغيير مركبة.",
    path: "/ar/riyadh-to-qatar-taxi-service",
    hreflangPath: "/riyadh-to-qatar-taxi-service",
});

export default function Page() {
    return <RoutePage data={riyadhToQatarAr} locale="ar" />;
}
