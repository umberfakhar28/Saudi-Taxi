import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import FaqsClient from "./FaqsClient";

/**
 * Server wrapper — the page itself is a client component (accordion state),
 * and client components cannot export `metadata`. Without this split the
 * page silently inherited the root layout's homepage title/description and
 * canonical URL, which told search engines this page wasn't worth indexing
 * separately.
 */
export const metadata = generatePageMetadata({
    title: "Frequently Asked Questions",
    description: "Answers to common questions about Gulf Trip Service — bookings, pricing, airport pickups, Umrah transport, cross-border taxi routes, and more.",
    path: "/faqs",
});

const schemas = [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faqs" }]),
];

export default function FaqsPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            <div className="container" style={{ paddingTop: 'var(--space-4)' }}>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>FAQs</span>
                </div>
            </div>
            <FaqsClient />
        </>
    );
}
