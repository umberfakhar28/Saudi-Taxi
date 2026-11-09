'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import {
  pageTemplateFromPath,
  trackPhoneClick,
  trackWhatsAppClick,
  whatsAppDestination,
} from '@/lib/analytics';

/**
 * Records which WhatsApp button a visitor actually pressed.
 *
 * WhatsApp is the main way enquiries arrive, and until now every WhatsApp
 * button on this site was invisible: a customer could message us from a
 * route page, a pricing table, the floating bubble or the footer and all
 * four looked identical afterwards. There was no way to answer "which pages
 * produce enquiries?", which is the question most decisions about this site
 * depend on.
 *
 * ── Why one delegated listener, not one handler per button ──
 * Most of these buttons live in server components: RoutePage, DistancePage,
 * CityServicePage and the rest render over a hundred pages between them. An
 * onClick would force each of those files to become a client component,
 * shipping a large amount of currently server-only JSX to the browser and
 * slowing down the exact pages that earn the organic traffic.
 *
 * One capture-phase listener on `document` avoids all of that, and it cannot
 * be forgotten: a WhatsApp link added to a new page next month is tracked
 * the day it ships. It is also the reason there is exactly one handler per
 * click — there is no second tracking layer anywhere that could double-count.
 *
 * ── Where the two labels come from ──
 * `data-wa-cta` on the anchor names the button's position ("hero",
 * "pricing-table", "footer-contact", "floating-button"). `data-page-template`
 * on the page's root element names the page family ("route", "distance",
 * "city"). Both are plain HTML attributes, so server components carry them
 * freely, and the template is declared by the component that renders the
 * page rather than guessed from the URL.
 *
 * Anything unlabelled reports its nearest landmark and, failing that,
 * "unlabelled" — deliberately not a guess. A visible "unlabelled" count in
 * GA is a reminder that a button needs an attribute; a plausible-looking
 * wrong label would quietly corrupt the numbers it is supposed to produce.
 *
 * ── What is never sent ──
 * No name, phone number, booking detail or message text. The pre-filled
 * WhatsApp message is stripped from the URL before anything is reported —
 * see whatsAppDestination in lib/analytics.
 */

/** wa.me and the long-form API host are the only two shapes WhatsApp uses. */
const WHATSAPP_LINK_SELECTOR = 'a[href*="wa.me"], a[href*="api.whatsapp.com"]';

/**
 * Call buttons ride on the same listener, for the same reasons: they sit in
 * the same server-rendered pages, and one listener means one count per tap.
 * They report as phone_click, never as whatsapp_click. The admin exclusion
 * below matters even more here, since an admin tel: link is a customer's
 * own number.
 */
const PHONE_LINK_SELECTOR = 'a[href^="tel:"]';

/**
 * The admin portal is excluded, and not as a matter of taste.
 *
 * Admin WhatsApp links point the other way — our team messaging a customer
 * about an existing booking — so the number in the URL is the customer's own
 * phone number, sitting in the path where stripping the query cannot remove
 * it. Reporting those links would put customer phone numbers into Google
 * Analytics. They are also outbound staff replies, so counting them would
 * inflate the enquiry numbers with our own activity.
 */
const EXCLUDED_PATH = /^\/admin(\/|$)/;

function ctaSourceFor(anchor: Element): string {
  const explicit = anchor.closest('[data-wa-cta]')?.getAttribute('data-wa-cta')?.trim();
  if (explicit) return explicit;

  // No attribute: name the landmark it sits in, which is at least true,
  // rather than inventing a position.
  if (anchor.closest('footer')) return 'unlabelled-footer';
  if (anchor.closest('header, nav')) return 'unlabelled-nav';
  if (anchor.closest('form')) return 'unlabelled-form';
  return 'unlabelled';
}

/**
 * The page family, read from whichever element on the page declares it.
 *
 * Deliberately a document-level lookup rather than `closest()` on the
 * anchor. The template is a property of the page, not of the button's
 * ancestry, and the navbar, footer and mobile bottom bar all sit outside the
 * <main> that carries the attribute — three quarters of every click. Walking
 * up from the anchor would have reported "other" for all of them and thrown
 * away the one thing worth knowing about a footer click: which page the
 * visitor was reading when they pressed it.
 *
 * Falls back to the path for the one-off pages that no shared template
 * renders.
 */
function pageTemplateFor(path: string): string {
  const declared = document
    .querySelector('[data-page-template]')
    ?.getAttribute('data-page-template')
    ?.trim();
  return declared || pageTemplateFromPath(path);
}

export default function WhatsAppTracking() {
  const pathname = usePathname();

  // The listener is attached once; the path it reports has to stay current
  // across client-side navigations, so it reads a ref rather than closing
  // over the first value it ever saw.
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest(WHATSAPP_LINK_SELECTOR);
      const callAnchor = anchor ? null : target.closest(PHONE_LINK_SELECTOR);
      if (!anchor && !callAnchor) return;

      const path = pathRef.current || window.location.pathname;
      if (EXCLUDED_PATH.test(path)) return;

      const pageLocation = `${window.location.origin}${window.location.pathname}`;
      if (callAnchor) {
        trackPhoneClick(ctaSourceFor(callAnchor), pageTemplateFor(path), { pagePath: path, pageLocation });
        return;
      }
      if (!anchor) return;

      trackWhatsAppClick(ctaSourceFor(anchor), pageTemplateFor(path), {
        pagePath: path,
        pageLocation,
        linkUrl: whatsAppDestination(anchor.getAttribute('href') || ''),
      });
    };

    // Capture phase: the event is seen on the way down, so a handler further
    // in that stops propagation cannot silently drop the measurement. The
    // link is never intercepted — no preventDefault, nothing awaited — so
    // WhatsApp opens exactly as it did before, blocked analytics or not.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
