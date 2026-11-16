import type { Metadata } from 'next';
import AdminLayoutClient from './AdminLayoutClient';

/**
 * Server wrapper for the admin portal, so the portal can carry its own
 * metadata (a client component cannot export `metadata`). The portal itself
 * is AdminLayoutClient, unchanged.
 *
 * Before this, every admin page inherited the homepage's title, description
 * and canonical URL — which is also why admin page views in GA showed up as
 * the homepage title (docs/perf/perf-report.md §1.6.3). robots.txt already
 * disallows /admin/; the noindex here covers a crawler that reaches a page
 * anyway, and the canonical is removed rather than pointing at the homepage.
 */
export const metadata: Metadata = {
    title: { absolute: 'Admin | Gulf Trip Service' },
    description: 'Gulf Trip Service admin portal.',
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    alternates: { canonical: null },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
