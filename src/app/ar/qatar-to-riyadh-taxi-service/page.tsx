import RoutePage from "@/components/RoutePage";
import { qatarToRiyadhAr } from "@/lib/ar/routeDataAr";
import { generatePageMetadata } from "@/lib/seo";

// Built to answer a URL Google was already ranking: Search Console showed
// /ar/qatar-to-riyadh-taxi-service at position 1 with impressions while the
// page returned 404. See the note on qatarToRiyadhAr for the evidence.
//
// Title and description follow the pattern of /ar/riyadh-to-qatar-taxi-service
// — which earns 40 clicks at 8.4% CTR, the best Arabic page on the site — with
// the direction reversed. No fare is quoted because this corridor publishes
// none in either language.
export const metadata = generatePageMetadata({
    title: "سيارة خاصة من الدوحة إلى الرياض | عبر منفذ أبو سمرة",
    description: "نقل خاص من الدوحة إلى الرياض عبر منفذ أبو سمرة وسلوى. سيارة واحدة وسائق مرخّص طوال الطريق، من باب إلى باب، دون تغيير مركبة.",
    path: "/ar/qatar-to-riyadh-taxi-service",
    hreflangPath: "/qatar-to-riyadh-taxi-service",
});

export default function Page() {
    return <RoutePage data={qatarToRiyadhAr} locale="ar" />;
}
