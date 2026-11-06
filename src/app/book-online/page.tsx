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
 *
 * The H1/hero/breadcrumb are rendered here too, outside the Suspense
 * boundary below, rather than inside BookOnlineClient. BookOnlineClient
 * calls useSearchParams() (for the homepage search bar's prefill —
 * Homepage Hero + Multi-Mode Search addendum §2.4), which on this fully
 * static route makes its whole subtree bail out to client-side rendering —
 * so anything placed inside it (including an <h1>) was previously absent
 * from the actual HTML sent to the browser/crawlers until after hydration.
 */
export const metadata = generatePageMetadata({
    title: "Book Online",
    description: "Book your Saudi Arabia taxi or transfer online — airport transfers, hotel transfers, private taxi, Umrah transport and day tours. Agreed fares, no advance payment required.",
    path: "/book-online",
  hreflangPath: "/book-online",
});

const schemas = [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Book Online", path: "/book-online" }]),
];

export default function BookOnlinePage() {
    return (
        <main>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
            {/* .container supplies the horizontal gutter: .page-hero sets only
                vertical padding, so without it this heading and breadcrumb ran
                edge-to-edge with no side margin on a phone. The Arabic page
                already had it. */}
            <section className="page-hero">
                <div className="container">
                    <h1>Book Online</h1>
                    {/* "Instant confirmation" contradicted the success screen,
                        which promised 30 minutes. Both are replaced by the one
                        approved line, used here and on submission. */}
                    <p>Reserve your taxi or transport service in Saudi Arabia in two quick steps. Our team will get back to you as soon as possible.</p>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link> / <span>Book Online</span>
                    </div>
                </div>
            </section>
            <Suspense fallback={null}>
                <BookOnlineClient />
            </Suspense>
        </main>
    );
}
