import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "My Account",
    description: "Manage your Gulf Trip Service account. View your booking history, manage preferences, and update your personal details.",
    path: "/my-account",
    keywords: ["my account Saudi taxi", "customer portal taxi booking", "Saudi taxi account"],
});

export default function MyAccountLayout({ children }: { children: React.ReactNode }) {
    return children;
}
