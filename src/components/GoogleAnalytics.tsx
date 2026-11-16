'use client';

import { useEffect } from 'react';
import { analyticsAllowed, ensureRegion, loadGoogleAnalytics } from '@/lib/consent';

/**
 * GA4 for the whole site (property G-TQZY85DG7H, see lib/consent).
 *
 * Loads once per visit, after hydration — the same timing the previous
 * next/script afterInteractive version had — but only when the visitor's
 * consent position allows it:
 *
 *  - not in the EU/EEA, UK or Switzerland, and no Reject stored: loads at
 *    once, exactly as before;
 *  - in those regions: nothing loads until Accept in the cookie banner,
 *    which then calls the same loader itself.
 *
 * gaEvent() in lib/analytics already does nothing while gtag is absent, so
 * WhatsApp and call tracking need no changes: for a visitor who has not
 * accepted, those events are simply never sent.
 */
export default function GoogleAnalytics() {
  useEffect(() => {
    // ensureRegion is instant once the gts_region cookie exists; on a first
    // visit it waits for one small /api/region call before deciding.
    ensureRegion().then(() => {
      if (analyticsAllowed()) loadGoogleAnalytics();
    });
  }, []);

  return null;
}
