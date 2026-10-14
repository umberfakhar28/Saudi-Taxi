'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { scrollToTopIfOn } from '@/lib/scrollToTop';

/**
 * Wraps the footer logo in a Home link that also returns a scrolled homepage
 * to the top — the same behaviour the header logos have.
 *
 * It exists as its own client component because Footer.tsx is a server
 * component: it cannot carry an onClick, and making the whole footer a client
 * component to add one would ship far more JavaScript than this needs.
 *
 * The footer is the one place a visitor is guaranteed to have scrolled, so
 * the already-on-the-homepage case matters more here than anywhere else.
 */
export default function HomeLogoLink({
  children,
  className,
  homePath = '/',
  ariaLabel = 'Gulf Trip Service — Home',
}: {
  children: React.ReactNode;
  className?: string;
  /** "/ar" where an Arabic footer reuses this, so Arabic visitors are not
   *  sent to the English homepage. */
  homePath?: string;
  ariaLabel?: string;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={homePath}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => scrollToTopIfOn(homePath, pathname, e)}
    >
      {children}
    </Link>
  );
}
