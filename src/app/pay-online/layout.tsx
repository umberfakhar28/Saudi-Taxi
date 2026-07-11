import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Pay Online",
    description: "Pay securely online for your Gulf Trip Service booking. Credit card, bank transfer, Saudi Pay and cash on arrival options available.",
    path: "/pay-online",
    keywords: ["pay online Saudi taxi", "secure payment taxi booking", "Saudi taxi payment", "online payment Saudi"],
});

export default function PayOnlineLayout({ children }: { children: React.ReactNode }) {
    return children;
}
