import { generatePageMetadata } from "@/lib/seo";
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

export default function FaqsPage() {
    return <FaqsClient />;
}
