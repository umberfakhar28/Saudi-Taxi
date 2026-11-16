'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsAllowed, analyticsPageAllowed, ensureRegion, loadGoogleAnalytics, pauseAnalytics } from '@/lib/consent';

/**
 * GA4 for the whole site (property G-TQZY85DG7H, see lib/consent).
 *
 * Loads once per visit, after hydration, but only when:
 *
 *  - the page is on the live domain and outside /admin (analyticsPageAllowed:
 *    no data from local runs, preview deployments or the admin portal);
 *  - the visitor's consent position allows it:
 *      · not in the EU/EEA, UK or Switzerland, and no Reject stored: loads at
 *        once;
 *      · in those regions: nothing loads until Accept in the cookie banner,
 *        which then calls the same loader itself.
 *
 * Page views: the config call records the first one; later in-site
 * navigations are recorded by GA's own enhanced measurement ("page changes
 * based on browser history events"). Nothing here sends a page_view by hand,
 * so each navigation counts once.
 *
 * A client-side navigation into /admin (e.g. an owner opening the portal from
 * the site) pauses collection, and leaving it resumes, so staff page views
 * never reach the property even in a tab where GA is already running.
 *
 * gaEvent() in lib/analytics does nothing while gtag is absent, so for a
 * visitor who has not accepted, events are simply never sent.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // ensureRegion is instant once the gts_region cookie exists; on a first
    // visit it waits for one small /api/region call before deciding.
    if (!analyticsPageAllowed()) return;
    ensureRegion().then(() => {
      if (analyticsAllowed()) loadGoogleAnalytics();
    });
  }, []);

  useEffect(() => {
    pauseAnalytics(!analyticsPageAllowed(pathname));
  }, [pathname]);

  return null;
}
