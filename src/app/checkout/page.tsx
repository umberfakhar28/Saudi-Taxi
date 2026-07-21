import { generatePageMetadata } from "@/lib/seo";
import CheckoutClient from "./CheckoutClient";

/**
 * Server wrapper — see src/app/contact-us/page.tsx for the general pattern.
 * Checkout is a transactional, session-specific page with no unique content
 * for search, so it's explicitly noindexed rather than left to silently
 * inherit the homepage's canonical URL.
 */
export const metadata = generatePageMetadata({
    title: "Checkout",
    description: "Complete your Gulf Trip Service booking.",
    path: "/checkout",
    noindex: true,
});

export default function CheckoutPage() {
    return <CheckoutClient />;
}
