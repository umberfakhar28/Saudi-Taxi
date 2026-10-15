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
    // On the Arabic side of the site this bar must stay in Arabic and point
    // at the Arabic pages; it is rendered by the shared layout, so it reads
    // the path rather than taking a prop.
    const isAr = pathname === '/ar' || pathname.startsWith('/ar/');
    const isHome = pathname === '/' || pathname === '/ar';
    const homeHref = isAr ? '/ar' : '/';
    const bookHref = isAr ? '/ar/book-online' : '/book-online';
    const label = {
        home: isAr ? 'الرئيسية' : 'Home',
        whatsapp: isAr ? 'واتساب' : 'WhatsApp',
        book: isAr ? 'احجز الآن' : 'Book Now',
        menu: isAr ? 'القائمة' : 'Menu',
    };

    return (
        <nav className={styles.bar} aria-label="Mobile quick navigation">
            <Link
                href={homeHref}
                className={`${styles.item} ${isHome ? styles.itemActive : ''}`}
                aria-current={isHome ? 'page' : undefined}
            >
                <HomeIcon size={22} />
                <span>{label.home}</span>
            </Link>

            <a
                href={waLink(isAr ? 'مرحباً، أود معرفة المزيد عن خدماتكم.' : "Hi, I'd like to know more about your services.")}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.item}
            >
                <WhatsAppIcon size={22} />
                <span>{label.whatsapp}</span>
            </a>

            <Link href={bookHref} className={`${styles.item} ${styles.itemPrimary}`}>
                <CarIcon size={22} />
                <span>{label.book}</span>
            </Link>

            <button
                type="button"
                className={styles.item}
                onClick={onToggleMenu}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
            >
                {menuOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
                <span>{label.menu}</span>
            </button>
        </nav>
    );
}
