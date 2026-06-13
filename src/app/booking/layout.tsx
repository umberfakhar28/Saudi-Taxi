import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Book a Taxi | Saudi Arabia Taxi Booking",
    description: "Book a taxi in Makkah, Jeddah or Madinah. Quick and easy online booking for airport transfers, Umrah transport, and intercity travel. Instant confirmation.",
    path: "/booking",
    keywords: ["booking taxi Saudi Arabia", "reserve taxi Makkah Jeddah", "Saudi Arabia taxi booking", "online taxi booking"],
});

export default function BookingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
