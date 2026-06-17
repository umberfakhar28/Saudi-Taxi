import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Book Online | Gulf Trip Service - Quick Taxi Booking",
    description: "Book your taxi online in Saudi Arabia. Quick and easy reservation for airport transfers, Umrah transport, and private hire. Available 24/7.",
    path: "/book-online",
    keywords: ["book taxi online Saudi Arabia", "online taxi booking Makkah", "quick taxi booking", "Saudi taxi online booking"],
});

export default function BookOnlineLayout({ children }: { children: React.ReactNode }) {
    return children;
}
