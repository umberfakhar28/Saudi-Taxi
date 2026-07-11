'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon, XIcon } from './Icons';
import Logo from './Logo';
import { englishPathFor } from '@/lib/bilingualPages';
import styles from './Navbar.module.css';
import { WHATSAPP_URL } from '@/lib/contact';

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
                <Link href="/ar" className={styles.logo} onClick={close} aria-label="Gulf Trip Service — الصفحة الرئيسية">
                    <Logo size={38} variant="color" />
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

                    <a href={WHATSAPP_URL} className={styles.cta} onClick={close}>
                        احجز الآن
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default ArabicNavbar;
