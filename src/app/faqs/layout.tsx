import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Frequently Asked Questions | Makkah Taxi Service",
    description: "Find answers to common questions about our taxi services in Makkah, Jeddah & Madinah. Booking, payments, airport transfers, Umrah packages, and more.",
    path: "/faqs",
    keywords: ["taxi FAQ Saudi Arabia", "Umrah taxi questions", "Makkah taxi booking help", "Saudi taxi FAQ"],
});

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
