import { generatePageMetadata } from "@/lib/seo";
import { faqSchema, jsonLd } from "@/lib/jsonld";

export const metadata = generatePageMetadata({
    title: "Frequently Asked Questions | Gulf Trip Service",
    description: "Find answers to common questions about our taxi services in Makkah, Jeddah & Madinah. Booking, payments, airport transfers, Umrah packages, and more.",
    path: "/faqs",
    keywords: ["taxi FAQ Saudi Arabia", "Umrah taxi questions", "Makkah taxi booking help", "Saudi taxi FAQ"],
});

// Representative FAQs for structured data — matches on-page content
const SCHEMA_FAQS = [
    { question: "What areas do you serve?", answer: "We provide taxi services across Saudi Arabia with a primary focus on Makkah, Madinah, and Jeddah. We cover all routes between these cities, airports, and holy sites. We also serve Riyadh, Dammam, and Taif upon request." },
    { question: "Are your drivers licensed and professional?", answer: "All our drivers are licensed by the Saudi Transport Authority, fully background-checked, and trained in customer service. Many speak Arabic, English, and Urdu." },
    { question: "Do you operate 24/7?", answer: "Yes, we operate round the clock, 365 days a year. Our customer support team is also available 24/7 via phone and WhatsApp." },
    { question: "How do I book a taxi?", answer: "You can book through our online booking form, WhatsApp, phone, or email. We respond within 30 minutes during business hours." },
    { question: "What payment methods do you accept?", answer: "We accept Cash (SAR), Visa, Mastercard, bank transfers, Apple Pay, STC Pay, and mada." },
    { question: "What if my flight is delayed?", answer: "We track all incoming flights in real-time. If your flight is delayed, your driver adjusts automatically at no extra charge." },
    { question: "Do you offer special packages for Umrah pilgrims?", answer: "Yes, we offer comprehensive Umrah packages including airport pickup, Makkah–Madinah transfers, hotel-to-Haram transfers, and Ziyarat tours." },
    { question: "Are your prices fixed or metered?", answer: "All prices are fixed and agreed at booking. There are no meters, no surge pricing, and no hidden charges." },
];

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(SCHEMA_FAQS)) }}
            />
            {children}
        </>
    );
}
