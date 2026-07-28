import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import ContactUsClient from "./ContactUsClient";

/**
 * Server wrapper — the page itself is a client component (form state), and
 * client components cannot export `metadata`. Splitting it out here is what
 * gives this page its own title/description/canonical/hreflang instead of
 * silently inheriting the root layout's homepage defaults.
 */
export const metadata = generatePageMetadata({
    title: "Contact Us",
    description: "Contact Gulf Trip Service via phone, WhatsApp, or email. Get a quote, book a ride, or ask questions. Available 24/7 for all your transport needs.",
    path: "/contact-us",
    hreflangPath: "/contact-us",
});

const schemas = [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact-us" }]),
];

export default function ContactUsPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            <div className="container" style={{ paddingTop: 'var(--space-4)' }}>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Contact Us</span>
                </div>
            </div>
            <ContactUsClient />
        </>
    );
}
