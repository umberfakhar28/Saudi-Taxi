// Schema injection removed — this was a leftover from before the page was
// migrated onto the shared AirportPage template (Execution Brief v3 W2),
// which now injects its own complete Service/FAQPage/BreadcrumbList schema
// directly. Keeping this as a duplicate caused conflicting JSON-LD for the
// same page. Layout kept as a passthrough rather than removed outright.
export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
