import Link from "next/link";
import { Suspense } from "react";
import { generatePageMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import BookOnlineClient from "./BookOnlineClient";

/**
 * Server wrapper — the page itself is a client component (multi-step form
 * state), and client components cannot export `metadata`. Without this
 * split, one of the site's most-linked conversion pages silently inherited
 * the homepage's title/description and canonical URL instead of its own.
 */
export const metadata = generatePageMetadata({
    title: "Book Online",
    description: "Book your Saudi Arabia taxi or transfer online — airport transfers, hotel transfers, private taxi, Umrah transport and day tours. Fixed rates, instant confirmation.",
    path: "/book-online",
});

const schemas = [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Book Online", path: "/book-online" }]),
];

export default function BookOnlinePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            <div className="container" style={{ paddingTop: 'var(--space-4)' }}>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Book Online</span>
                </div>
            </div>
            {/* useSearchParams() (for the homepage search bar's prefill —
                Homepage Hero + Multi-Mode Search addendum §2.4) requires a
                Suspense boundary during static rendering. */}
            <Suspense fallback={null}>
                <BookOnlineClient />
            </Suspense>
        </>
    );
}
