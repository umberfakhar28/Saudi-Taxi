import { generatePageMetadata } from "@/lib/seo";
import MyAccountClient from "./MyAccountClient";

/**
 * Server wrapper — see src/app/contact-us/page.tsx for the general pattern.
 * Account/login is user-specific with no unique content for search, so it's
 * explicitly noindexed rather than left to silently inherit the homepage's
 * canonical URL.
 */
export const metadata = generatePageMetadata({
    title: "My Account",
    description: "Sign in or register for a Gulf Trip Service account.",
    path: "/my-account",
    noindex: true,
});

export default function MyAccountPage() {
    return <MyAccountClient />;
}
