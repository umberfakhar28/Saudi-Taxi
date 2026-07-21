'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    MenuIcon, XIcon, ChevronDownIcon,
    PlaneIcon, HotelIcon, CarIcon, PackageIcon, CompassIcon,
    MapIcon, MountainIcon, TreePineIcon,
    UserIcon, EyeIcon, MailIcon, GlobeIcon,
} from './Icons';
import Logo from './Logo';
import { arabicPathFor } from '@/lib/bilingualPages';
import styles from './Navbar.module.css';

/*
  NAVBAR — 5 Design Principles:
  Balance:    Logo (left) | Services / Cross Border / Company (center) | Language + Book Now (right)
  Alignment:  All links baseline-aligned; dropdown items strictly left-aligned
  Proximity:  Services + Tours grouped under "Services"; GCC routes under "Cross Border"; info pages under "Company"
  Repetition: Identical .link class for every nav item; identical .dropdownItem for every dropdown entry
  Contrast:   Light links on dark blue header bg; gold CTA vs surrounding chrome
*/

const serviceLinks = [
    { href: '/our-services',               icon: <CarIcon size={14} />,     label: 'All Services' },
    { href: '/airport-transfers',          icon: <PlaneIcon size={14} />,   label: 'Airport Transfers' },
    { href: '/hotel-transfers',            icon: <HotelIcon size={14} />,   label: 'Hotel Transfers' },
    { href: '/private-taxi',               icon: <CarIcon size={14} />,     label: 'Private Taxi' },
    { href: '/umrah-transport-package',    icon: <PackageIcon size={14} />, label: 'Umrah Transport' },
    { href: '/ziyarat-services-in-saudi-arabia', icon: <CompassIcon size={14} />, label: 'Ziyarat Services' },
];

const tourLinks = [
    { href: '/jeddah-city-tour-services-in-saudi-arabia',         icon: <MapIcon size={14} />,      label: 'Jeddah City Tour' },
    { href: '/reliable-alula-tour-taxi-service-in-saudi-arabia',  icon: <MountainIcon size={14} />, label: 'AlUla Tour' },
    { href: '/taif-ziyarat-taxi-service',                         icon: <TreePineIcon size={14} />, label: 'Taif Ziyarat Tour' },
];

const borderRouteLinks = [
    { href: '/border-crossing',                          icon: <MapIcon size={14} />, label: 'All Border Crossings' },
    { href: '/dammam-airport-to-bahrain-taxi-service',    icon: <PlaneIcon size={14} />, label: 'Dammam Airport → Bahrain' },
    { href: '/dammam-airport-to-qatar-taxi-service',      icon: <PlaneIcon size={14} />, label: 'Dammam Airport → Qatar' },
    { href: '/dammam-airport-to-riyadh-taxi-service',      icon: <PlaneIcon size={14} />, label: 'Dammam Airport → Riyadh' },
    { href: '/dammam-airport-to-khafji-taxi-service',      icon: <PlaneIcon size={14} />, label: 'Dammam Airport → Khafji' },
    { href: '/bahrain-to-dammam-taxi-service',             icon: <MapIcon size={14} />, label: 'Bahrain → Dammam' },
    { href: '/qatar-to-riyadh-taxi-service',               icon: <MapIcon size={14} />, label: 'Qatar → Riyadh' },
    { href: '/khafji-to-kuwait-taxi-service',              icon: <MapIcon size={14} />, label: 'Khafji → Kuwait' },
];

const aboutLinks = [
    { href: '/about-us',    icon: <UserIcon size={14} />, label: 'About Us' },
    { href: '/our-gallery', icon: <EyeIcon size={14} />,  label: 'Gallery' },
    { href: '/contact-us',  icon: <MailIcon size={14} />, label: 'Contact Us' },
];

const Navbar = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [borderOpen, setBorderOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    const close = () => {
        setMenuOpen(false);
        setServicesOpen(false);
        setBorderOpen(false);
        setAboutOpen(false);
    };

    return (
        <nav className={`${styles.navbar} ${styles.navbarShifted}`}>
            <div className={styles.container}>

                {/* ---- LOGO (Balance: anchors the left side; also serves as the Home link) ---- */}
                <Link href="/" className={styles.logo} onClick={close} aria-label="Gulf Trip Service — Home">
                    <Logo size={38} variant="white" />
                </Link>

                {/* ---- NAV LINKS (Balance: centered between logo and language/CTA actions) ---- */}
                <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>

                    {/* SERVICES DROPDOWN — Proximity: services + day tours grouped together */}
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                    >
                        <button
                            className={styles.link}
                            onClick={() => setServicesOpen(!servicesOpen)}
                            aria-expanded={servicesOpen}
                        >
                            Services
                            <ChevronDownIcon
                                className={`${styles.arrow} ${servicesOpen ? styles.arrowRotate : ''}`}
                                size={14}
                            />
                        </button>
                        <div className={`${styles.dropdownMenu} ${servicesOpen ? styles.dropdownMenuOpen : ''}`}>
                            <div className={styles.dropdownLabel}>Transport Services</div>
                            {serviceLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={styles.dropdownItem}
                                    onClick={close}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}
                            <div className={styles.dropdownLabel}>Day Tours</div>
                            {tourLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={styles.dropdownItem}
                                    onClick={close}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CROSS BORDER DROPDOWN — Proximity: GCC route links grouped separately */}
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setBorderOpen(true)}
                        onMouseLeave={() => setBorderOpen(false)}
                    >
                        <button
                            className={styles.link}
                            onClick={() => setBorderOpen(!borderOpen)}
                            aria-expanded={borderOpen}
                        >
                            Cross Border
                            <ChevronDownIcon
                                className={`${styles.arrow} ${borderOpen ? styles.arrowRotate : ''}`}
                                size={14}
                            />
                        </button>
                        <div className={`${styles.dropdownMenu} ${borderOpen ? styles.dropdownMenuOpen : ''}`}>
                            <div className={styles.dropdownLabel}>GCC Routes</div>
                            {borderRouteLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={styles.dropdownItem}
                                    onClick={close}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ABOUT US DROPDOWN — Proximity: informational pages grouped together */}
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setAboutOpen(true)}
                        onMouseLeave={() => setAboutOpen(false)}
                    >
                        <button
                            className={styles.link}
                            onClick={() => setAboutOpen(!aboutOpen)}
                            aria-expanded={aboutOpen}
                        >
                            Company
                            <ChevronDownIcon
                                className={`${styles.arrow} ${aboutOpen ? styles.arrowRotate : ''}`}
                                size={14}
                            />
                        </button>
                        <div className={`${styles.dropdownMenu} ${aboutOpen ? styles.dropdownMenuOpen : ''}`}>
                            {aboutLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={styles.dropdownItem}
                                    onClick={close}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

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

                {/* ---- RIGHT GROUP — hamburger (mobile) + actions (language switcher + CTA), anchored top-right ---- */}
                <div className={styles.rightGroup}>
                    <div className={styles.navActions}>
                        <Link href={arabicPathFor(pathname)} className={styles.langSwitcher} lang="ar">
                            <GlobeIcon size={14} />
                            العربية
                        </Link>
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
