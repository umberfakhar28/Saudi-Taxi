'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon, XIcon, ChevronDownIcon, GlobeIcon, WhatsAppIcon } from './Icons';
import Logo from './Logo';
import { arabicPathFor } from '@/lib/bilingualPages';
import { WHATSAPP_URL } from '@/lib/contact';
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

const Navbar = ({ transparent = false }: { transparent?: boolean }) => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

    const close = () => {
        setMenuOpen(false);
        setOpenDropdown(null);
    };

    const toggle = (key: DropdownKey) => setOpenDropdown((cur) => (cur === key ? null : key));

    const navItems: { key: DropdownKey; label: string; groups: NavGroup[] }[] = [
        { key: 'services', label: 'Services', groups: serviceGroups },
        { key: 'locations', label: 'Locations', groups: locationGroups },
        { key: 'border', label: 'Cross Border', groups: crossBorderGroups },
        { key: 'company', label: 'Company', groups: companyGroups },
    ];

    return (
        <nav className={`${styles.navbar} ${styles.navbarShifted} ${transparent ? styles.navbarTransparent : ''}`}>
            <div className={styles.container}>

                {/* ---- LOGO (Balance: anchors the left side; also serves as the Home link) ---- */}
                <Link href="/" className={styles.logo} onClick={close} aria-label="Gulf Trip Service — Home">
                    <Logo size={44} variant="white" />
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
                        onClick={() => setMenuOpen(!menuOpen)}
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
