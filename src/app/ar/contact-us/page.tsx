import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import ArContactUsClient from "./ArContactUsClient";

/**
 * Server wrapper — see src/app/contact-us/page.tsx for why this split
 * exists. hreflangPath matches the English page's own hreflangPath
 * ("/contact-us") so both sides of the pair point at each other correctly.
 */
export const metadata = generatePageMetadata({
    title: "اتصل بنا",
    description: "تواصل مع خدمة جلف تريب عبر الهاتف أو واتساب أو البريد الإلكتروني. احصل على عرض سعر أو احجز رحلة أو اطرح استفسارك. متوفرون على مدار الساعة.",
    path: "/ar/contact-us",
    hreflangPath: "/contact-us",
});

const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/ar" }, { name: "اتصل بنا", path: "/ar/contact-us" }]),
];

export default function ArContactUsPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            <div className="container" style={{ paddingTop: 'var(--space-4)' }}>
                <div className="breadcrumb">
                    <Link href="/ar">الرئيسية</Link> / <span>اتصل بنا</span>
                </div>
            </div>
            <ArContactUsClient />
        </>
    );
}
