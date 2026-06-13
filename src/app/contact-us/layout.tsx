import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Contact Us | Makkah Taxi Service - 24/7 Support",
    description: "Contact Makkah Taxi Service via phone, WhatsApp, or email. Get a quote, book a ride, or ask questions. Available 24/7 for all your transport needs.",
    path: "/contact-us",
    keywords: ["contact Gulf Trip Service", "Saudi taxi customer support", "Makkah taxi phone number", "taxi customer service"],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
