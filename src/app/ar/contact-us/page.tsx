import { generatePageMetadata } from "@/lib/seo";
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

export default function ArContactUsPage() {
    return <ArContactUsClient />;
}
