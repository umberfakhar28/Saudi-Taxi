import Link from "next/link";
import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import BookOnlineClient from "@/app/book-online/BookOnlineClient";

/**
 * The Arabic booking page runs the same component, the same validation and
 * the same API calls as /book-online — only the labels change. A booking
 * made here is indistinguishable in the admin panel from an English one,
 * which is the point: one booking system, two languages.
 */
export const metadata = generatePageMetadata({
    title: "احجز الآن | خدمة نقل خاصة في السعودية والخليج",
    description: "احجز سيارتك الخاصة أونلاين: توصيل من وإلى المطار، نقل بين الفنادق، رحلات العمرة، والرحلات بين المدن وعبر الحدود. أسعار متفق عليها مسبقاً وخدمة على مدار الساعة.",
    path: "/ar/book-online",
    hreflangPath: "/book-online",
});

const schemas = [
    breadcrumbSchema([
        { name: "الرئيسية", path: "/ar" },
        { name: "الحجز عبر الإنترنت", path: "/ar/book-online" },
    ]),
];

export default function ArabicBookOnlinePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            <main>
                <section className="page-hero">
                    <div className="container">
                        <h1>احجز رحلتك عبر الإنترنت</h1>
                        <p>
                            املأ تفاصيل رحلتك وسنؤكد الحجز والسعر قبل السفر. سيارة خاصة لك ولمرافقيك،
                            من باب إلى باب، داخل السعودية أو عبر الحدود.
                        </p>
                        <div className="breadcrumb">
                            <Link href="/ar">الرئيسية</Link> / <span>الحجز عبر الإنترنت</span>
                        </div>
                    </div>
                </section>

                <Suspense fallback={<div style={{ minHeight: 480 }} />}>
                    <BookOnlineClient locale="ar" />
                </Suspense>
            </main>
        </>
    );
}
