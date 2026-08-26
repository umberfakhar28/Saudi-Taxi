'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WhatsAppIcon, MenuIcon, XIcon, HomeIcon, CarIcon } from './Icons';
import { waLink } from '@/lib/contact';
import styles from './MobileBottomNav.module.css';

/**
 * Mobile-only fixed bottom navigation bar (QA/Responsive brief §9-11).
 * Hidden entirely at tablet/desktop widths via CSS — see the media query
 * in MobileBottomNav.module.css, which is the single source of truth for
 * when this renders; no JS width-detection needed.
 *
 * "Menu" drives the exact same drawer as the header's hamburger (state
 * lives in PublicLayout and is passed to both), rather than introducing a
 * second, independent menu implementation.
 */
export default function MobileBottomNav({
    menuOpen,
    onToggleMenu,
}: {
    menuOpen: boolean;
    onToggleMenu: () => void;
}) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <nav className={styles.bar} aria-label="Mobile quick navigation">
            <Link
                href="/"
                className={`${styles.item} ${isHome ? styles.itemActive : ''}`}
                aria-current={isHome ? 'page' : undefined}
            >
                <HomeIcon size={22} />
                <span>Home</span>
            </Link>

            <a
                href={waLink("Hi, I'd like to know more about your services.")}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
            >
                <WhatsAppIcon size={22} />
                <span>WhatsApp</span>
            </a>

            <Link href="/book-online" className={`${styles.item} ${styles.itemPrimary}`}>
                <CarIcon size={22} />
                <span>Book Now</span>
            </Link>

            <button
                type="button"
                className={styles.item}
                onClick={onToggleMenu}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
            >
                {menuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
                <span>Menu</span>
            </button>
        </nav>
    );
}
