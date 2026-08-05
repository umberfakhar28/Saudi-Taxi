// No route-specific schema here — AirportPage.tsx injects the complete
// Service/FAQPage/BreadcrumbList schema for this page directly (see the
// duplicate-JSON-LD fix applied to the W2 airport pages in Execution Brief v3 W5).
export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
