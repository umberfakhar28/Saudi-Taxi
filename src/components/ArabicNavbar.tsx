'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon, XIcon } from './Icons';
import Logo from './Logo';
import { englishPathFor } from '@/lib/bilingualPages';
import styles from './Navbar.module.css';
import { WHATSAPP_URL } from '@/lib/contact';
import { scrollToTopIfOn } from '@/lib/scrollToTop';

const links = [
    { href: '/ar', label: 'الرئيسية' },
    { href: '/ar/border-crossing', label: 'عبور الحدود' },
    { href: '/ar/dammam-airport-to-bahrain-taxi-service', label: 'الدمام إلى البحرين' },
    { href: '/ar/dammam-airport-to-qatar-taxi-service', label: 'الدمام إلى قطر' },
    { href: '/ar/contact-us', label: 'اتصل بنا' },
];

const ArabicNavbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const close = () => setMenuOpen(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                {/* Stays on /ar — the Arabic homepage — rather than sending
                    Arabic visitors to the English one. Same already-here
                    scroll fix as the English navbar. */}
                <Link href="/ar" className={styles.logo} onClick={(e) => { close(); scrollToTopIfOn('/ar', pathname, e); }} aria-label="Gulf Trip Service — الصفحة الرئيسية">
                    <Logo size={38} variant="white" />
                </Link>

                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <XIcon size={26} /> : <MenuIcon size={26} />}
                </button>

                <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
                    {links.map((item) => (
                        <Link key={item.href} href={item.href} className={styles.link} onClick={close}>
                            {item.label}
                        </Link>
                    ))}

                    {/* Language switcher */}
                    <Link href={englishPathFor(pathname)} className={styles.link} onClick={close} lang="en">
                        English
                    </Link>

                    {/* This said "احجز الآن" ("Book Now") and opened WhatsApp, so the
                        Arabic navbar had no route to the booking form at all, while
                        the English one has both. WhatsApp keeps its own button
                        beside this, matching the English navbar, and is also still
                        on the floating action and the mobile bottom nav. */}
                    <a data-wa-cta="navbar" href={WHATSAPP_URL} className={styles.ctaWhatsapp} target="_blank" rel="noopener noreferrer" onClick={close}>
                        واتساب
                    </a>
                    <Link href="/ar/book-online" className={styles.cta} onClick={close}>
                        احجز الآن
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default ArabicNavbar;
