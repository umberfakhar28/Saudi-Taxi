import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Checkout",
    description: "Complete your taxi booking checkout. Review your trip details and confirm your reservation with Gulf Trip Service.",
    path: "/checkout",
    keywords: ["checkout taxi booking Saudi Arabia", "payment taxi service", "complete booking"],
});

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
