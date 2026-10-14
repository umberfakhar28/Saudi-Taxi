'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon, XIcon, ChevronDownIcon, GlobeIcon, WhatsAppIcon } from './Icons';
import Logo from './Logo';
import { arabicPathFor } from '@/lib/bilingualPages';
import { WHATSAPP_URL } from '@/lib/contact';
import { scrollToTopIfOn } from '@/lib/scrollToTop';
import { serviceGroups, locationGroups, crossBorderGroups, companyGroups, type NavGroup } from '@/config/navigation';
import styles from './Navbar.module.css';

/*
  NAVBAR — 5 Design Principles:
  Balance:    Logo (left) | Services / Locations / Cross Border / Company (center) | Language + WhatsApp + Book Now (right)
  Alignment:  Column labels + links left-aligned within each column; columns sit side by side
  Proximity:  Each dropdown groups its links into labeled columns (Services: transport/airports/tours;
              Locations: major cities/Eastern & industrial/tourism; Cross Border: by country/popular routes)
  Repetition: Identical column layout and link style across every dropdown
  Contrast:   Light links on dark blue header bg; white dropdown panel; gold "Book Now" + green WhatsApp CTA

  Column data (serviceGroups/locationGroups/crossBorderGroups/companyGroups)
  lives in config/navigation.ts — Execution Brief v3 W9 — so a new W7 city/
  airport/route page shows up here without editing this file.
*/

type DropdownKey = 'services' | 'locations' | 'border' | 'company';

const DropdownPanel = ({ groups, open, onLinkClick }: { groups: NavGroup[]; open: boolean; onLinkClick: () => void }) => (
    <div className={`${styles.dropdownMenu} ${open ? styles.dropdownMenuOpen : ''}`}>
        {groups.map((group) => (
            <div key={group.label} className={styles.dropdownColumn}>
                <div className={styles.dropdownLabel}>{group.label}</div>
                {group.items.map((item) => (
                    <Link key={item.href} href={item.href} className={styles.dropdownItem} onClick={onLinkClick}>
                        {item.label}
                    </Link>
                ))}
            </div>
        ))}
    </div>
);

interface NavbarProps {
    transparent?: boolean;
    // Drawer open state now lives in PublicLayout so the mobile bottom
    // nav's "Menu" button can drive the exact same drawer as the
    // hamburger below, instead of each maintaining its own copy.
    menuOpen: boolean;
    onToggleMenu: () => void;
    onCloseMenu: () => void;
}

const Navbar = ({ transparent = false, menuOpen, onToggleMenu, onCloseMenu }: NavbarProps) => {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

    // Logo.tsx sizes its wordmark from an inline `fontSize: size * 0.5`
    // computed from this numeric prop — plain CSS `font-size` on `.logo`
    // has no effect on it, so shrinking it for mobile has to happen here.
    // A smaller logo is part of what makes room for the hamburger to
    // actually fit in the top bar below 900px (see the overflow root-cause
    // note in Navbar.module.css).
    const [logoSize, setLogoSize] = useState(44);
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 900px)');
        const apply = () => setLogoSize(mq.matches ? 32 : 44);
        apply();
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
    }, []);

    const close = () => {
        onCloseMenu();
        setOpenDropdown(null);
    };

    const toggle = (key: DropdownKey) => setOpenDropdown((cur) => (cur === key ? null : key));

    // Mobile drawer: lock body scroll while open, close on Escape, and
    // restore scroll on unmount so navigating away never leaves the page
    // stuck unscrollable.
    useEffect(() => {
        if (!menuOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (e: KeyboardEvent) => {
            // Inlined rather than calling close() — that function is
            // redefined every render, so putting it in the deps array
            // below would re-run this effect (and re-lock/re-listen) on
            // every render instead of only when menuOpen actually changes.
            if (e.key === 'Escape') {
                onCloseMenu();
                setOpenDropdown(null);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [menuOpen, onCloseMenu]);

    const navItems: { key: DropdownKey; label: string; groups: NavGroup[] }[] = [
        { key: 'services', label: 'Services', groups: serviceGroups },
        { key: 'locations', label: 'Locations', groups: locationGroups },
        { key: 'border', label: 'Cross Border', groups: crossBorderGroups },
        { key: 'company', label: 'Company', groups: companyGroups },
    ];

    return (
        <nav className={`${styles.navbar} ${styles.navbarShifted} ${transparent ? styles.navbarTransparent : ''}`}>
            {/* Backdrop — tapping outside the drawer closes it, matching the
                Escape-key/scroll-lock behaviour above. Mobile-only via CSS
                (only rendered/visible once the drawer itself can open). */}
            {menuOpen && <div className={styles.backdrop} onClick={close} aria-hidden="true" />}
            <div className={styles.container}>

                {/* ---- LOGO (Balance: anchors the left side; also serves as the Home link) ---- */}
                {/* Clicking it from a scrolled homepage has to return to the
                    top explicitly: the App Router only restores scroll when a
                    navigation actually happens, and clicking Home while
                    already on "/" is a no-op, so the page just sat where it
                    was. From any other page the normal navigation handles it. */}
                <Link href="/" className={styles.logo} onClick={(e) => { close(); scrollToTopIfOn('/', pathname, e); }} aria-label="Gulf Trip Service — Home">
                    <Logo size={logoSize} variant="white" />
                </Link>

                {/* ---- NAV LINKS (Balance: centered between logo and language/CTA actions) ---- */}
                <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
                    {navItems.map(({ key, label, groups }) => (
                        <div
                            key={key}
                            className={styles.dropdown}
                            onMouseEnter={() => setOpenDropdown(key)}
                            onMouseLeave={() => setOpenDropdown((cur) => (cur === key ? null : cur))}
                        >
                            <button
                                className={styles.link}
                                onClick={() => toggle(key)}
                                aria-expanded={openDropdown === key}
                            >
                                {label}
                                <ChevronDownIcon
                                    className={`${styles.arrow} ${openDropdown === key ? styles.arrowRotate : ''}`}
                                    size={14}
                                />
                            </button>
                            <DropdownPanel groups={groups} open={openDropdown === key} onLinkClick={close} />
                        </div>
                    ))}

                    {/* Language switcher — mobile only; desktop shows it in .navActions instead */}
                    <Link
                        href={arabicPathFor(pathname)}
                        className={`${styles.link} ${styles.mobileLangItem}`}
                        onClick={close}
                        lang="ar"
                    >
                        <GlobeIcon size={14} />
                        العربية
                    </Link>
                </div>

                {/* ---- RIGHT GROUP — hamburger (mobile) + actions (language switcher + CTAs), anchored top-right ---- */}
                <div className={styles.rightGroup}>
                    <div className={styles.navActions}>
                        <Link href={arabicPathFor(pathname)} className={styles.langSwitcher} lang="ar">
                            <GlobeIcon size={14} />
                            العربية
                        </Link>
                        <a href={WHATSAPP_URL} className={styles.ctaWhatsapp} target="_blank" rel="noopener noreferrer" onClick={close}>
                            <WhatsAppIcon size={16} />
                            <span className={styles.ctaWhatsappLabel}>WhatsApp</span>
                        </a>
                        <Link href="/book-online" className={styles.cta} onClick={close}>
                            Book Now
                        </Link>
                    </div>

                    {/* ---- HAMBURGER — mobile toggle ---- */}
                    <button
                        className={styles.hamburger}
                        onClick={onToggleMenu}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <XIcon size={26} /> : <MenuIcon size={26} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
