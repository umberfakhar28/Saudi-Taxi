import { generatePageMetadata } from "@/lib/seo";
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

export default function BookOnlinePage() {
    return <BookOnlineClient />;
}
