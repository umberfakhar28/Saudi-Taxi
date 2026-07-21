import { generatePageMetadata } from "@/lib/seo";
import PayOnlineClient from "./PayOnlineClient";

/**
 * Server wrapper — see src/app/contact-us/page.tsx for the general pattern.
 * This is a transactional, session-specific page with no unique content for
 * search, so it's explicitly noindexed rather than left to silently inherit
 * the homepage's canonical URL.
 */
export const metadata = generatePageMetadata({
    title: "Pay Online",
    description: "Securely pay for your Gulf Trip Service booking online.",
    path: "/pay-online",
    noindex: true,
});

export default function PayOnlinePage() {
    return <PayOnlineClient />;
}
