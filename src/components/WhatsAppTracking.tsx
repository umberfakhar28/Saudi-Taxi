'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gaEvent, pageLanguage, pageTemplate } from '@/lib/analytics';

/**
 * Records which WhatsApp button a visitor actually pressed.
 *
 * WhatsApp is the main way enquiries arrive, and until now every one of the
 * 57 WhatsApp buttons on this site was invisible: a customer could message
 * us from a route page, a pricing table, the floating bubble or the footer
 * and all four looked identical afterwards. There was no way to answer
 * "which pages produce enquiries?", which is the question most decisions
 * about this site depend on.
 *
 * ── Why one delegated listener, not 57 onClick handlers ──
 * Most of those buttons live in server components (RoutePage, DistancePage,
 * CityServicePage and the rest render 114 pages between them). An onClick
 * would force each of those files to become a client component, shipping a
 * large amount of currently server-only JSX to the browser and slowing down
 * the exact pages that earn the organic traffic.
 *
 * A single capture-phase listener on `document` avoids all of that. It also
 * cannot be forgotten: a WhatsApp link added to a new page next month is
 * tracked the day it ships, with no wiring step to remember.
 *
 * ── Where the label comes from ──
 * `data-wa-cta` on the anchor (or any ancestor) names the button's position:
 * "hero", "pricing-table", "footer-contact", "floating-button". It is a
 * plain HTML attribute, so server components can carry it freely.
 *
 * An unlabelled link reports its nearest landmark and, failing that,
 * "unlabelled" — deliberately not a guess. A visible "unlabelled" count in
 * GA is a reminder that a button needs an attribute; a plausible-looking
 * wrong label would quietly corrupt the numbers it is supposed to produce.
 */

/** wa.me and the long-form API host are the only two shapes used on the site. */
const WHATSAPP_LINK_SELECTOR = 'a[href*="wa.me"], a[href*="api.whatsapp.com"]';

/**
 * Admin WhatsApp links point the other way — our team messaging a customer
 * about an existing booking. Counting those as enquiries would inflate the
 * lead numbers with our own outbound replies.
 */
const EXCLUDED_PATH = /^\/admin(\/|$)/;

function inferSource(anchor: Element): string {
  const labelled = anchor.closest('[data-wa-cta]');
  const explicit = labelled?.getAttribute('data-wa-cta')?.trim();
  if (explicit) return explicit;

  // No attribute: name the landmark it sits in, which is at least true,
  // rather than inventing a position.
  if (anchor.closest('footer')) return 'unlabelled-footer';
  if (anchor.closest('header, nav')) return 'unlabelled-nav';
  if (anchor.closest('form')) return 'unlabelled-form';
  return 'unlabelled';
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
      if (!anchor) return;

      const path = pathRef.current || window.location.pathname;
      if (EXCLUDED_PATH.test(path)) return;

      gaEvent('whatsapp_click', {
        cta_source: inferSource(anchor),
        page_template: pageTemplate(path),
        page_path: path,
        site_language: pageLanguage(path),
      });
    };

    // Capture phase: the event is seen on the way down, so a handler that
    // stops propagation further in cannot silently drop the measurement.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
