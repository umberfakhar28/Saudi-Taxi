import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Frequently Asked Questions | Makkah Taxi Service",
    description: "Find answers to common questions about our taxi services in Makkah, Jeddah & Madinah. Booking, payments, airport transfers, Umrah packages, and more.",
};

export default function FAQsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
