'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps, FocusEvent, MouseEvent, TouchEvent } from 'react';

/**
 * A next/link that prefetches on intent, not on sight.
 *
 * ── Why ──
 * A plain <Link> prefetches its page as soon as it enters the viewport. The
 * header drop-downs are always in the DOM (hidden with opacity/visibility,
 * which still counts as "in view"), so every page view used to prefetch all
 * 73 menu pages at once: ~300 requests to Vercel for a single visit to the
 * homepage, each one a function invocation (docs/perf/perf-report.md §1.3).
 *
 * Here the page is fetched only when the visitor shows they might open it —
 * the pointer reaches the link (desktop), the link gets keyboard focus, or a
 * finger touches it (mobile, ~100 ms before the click lands). That keeps the
 * click feeling instant while costing one prefetch per real hover instead of
 * dozens per page.
 *
 * Main CTAs (logo/Home, Book Now) keep the ordinary <Link>: they are worth
 * having ready before anyone reaches for them.
 *
 * Drop-in replacement: same props as next/link, href must be a string.
 */

/** Pages already asked for in this tab; the router caches them anyway, this
 *  just avoids repeat calls while a pointer wanders over the same link. */
const warmed = new Set<string>();

type Props = Omit<ComponentProps<typeof Link>, 'href' | 'prefetch'> & { href: string };

export default function IntentLink({ href, onMouseEnter, onFocus, onTouchStart, ...rest }: Props) {
    const router = useRouter();

    const warm = () => {
        // Internal pages only; strip the #fragment so /x#a and /x#b are one page.
        if (!href.startsWith('/') || href.startsWith('//')) return;
        const page = href.split('#')[0] || '/';
        if (warmed.has(page)) return;
        warmed.add(page);
        try {
            router.prefetch(page);
        } catch {
            // A prefetch is only a head start; never let it break the link.
        }
    };

    return (
        <Link
            {...rest}
            href={href}
            prefetch={false}
            onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => { warm(); onMouseEnter?.(e); }}
            onFocus={(e: FocusEvent<HTMLAnchorElement>) => { warm(); onFocus?.(e); }}
            onTouchStart={(e: TouchEvent<HTMLAnchorElement>) => { warm(); onTouchStart?.(e); }}
        />
    );
}
