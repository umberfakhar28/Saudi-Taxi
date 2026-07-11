'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    MenuIcon, XIcon, ChevronDownIcon,
    PlaneIcon, HotelIcon, CarIcon, PackageIcon, CompassIcon,
    MapIcon, MountainIcon, TreePineIcon,
    PhoneIcon,
} from './Icons';
import Logo from './Logo';
import styles from './Navbar.module.css';

/*
  NAVBAR — 5 Design Principles:
  Balance:    Logo (left) | Nav links (center) | Book Now CTA (right)
  Alignment:  All links baseline-aligned; dropdown items strictly left-aligned
  Proximity:  Services grouped under "Services"; Tours under "Tours"; related dropdowns separated by label
  Repetition: Identical .link class for every nav item; identical .dropdownItem for every dropdown entry
  Contrast:   White links on dark green; gold CTA vs dark background; gold top-border on dropdowns
*/

const serviceLinks = [
    { href: '/our-services',               icon: <CarIcon size={14} />,     label: 'All Services' },
    { href: '/airport-transfers',          icon: <PlaneIcon size={14} />,   label: 'Airport Transfers' },
    { href: '/hotel-transfers',            icon: <HotelIcon size={14} />,   label: 'Hotel Transfers' },
    { href: '/private-taxi',               icon: <CarIcon size={14} />,     label: 'Private Taxi' },
    { href: '/umrah-transport-package',    icon: <PackageIcon size={14} />, label: 'Umrah Transport' },
    { href: '/ziyarat-services-in-saudi-arabia', icon: <CompassIcon size={14} />, label: 'Ziyarat Services' },
    { href: '/border-crossing',            icon: <MapIcon size={14} />,     label: 'Border Crossing' },
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
    { href: '/bahrain-to-dammam-taxi-service',             icon: <MapIcon size={14} />, label: 'Bahrain → Dammam' },
    { href: '/qatar-to-riyadh-taxi-service',               icon: <MapIcon size={14} />, label: 'Qatar → Riyadh' },
    { href: '/khafji-to-kuwait-taxi-service',              icon: <MapIcon size={14} />, label: 'Khafji → Kuwait' },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [toursOpen, setToursOpen] = useState(false);
    const [borderOpen, setBorderOpen] = useState(false);

    const close = () => {
        setMenuOpen(false);
        setServicesOpen(false);
        setToursOpen(false);
        setBorderOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>

                {/* ---- LOGO (Balance: anchors the left side) ---- */}
                <Link href="/" className={styles.logo} onClick={close} aria-label="Gulf Trip Service — Home">
                    <Logo size={38} variant="color" />
                </Link>

                {/* ---- HAMBURGER — mobile toggle ---- */}
                <button
                    className={styles.hamburger}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <XIcon size={26} /> : <MenuIcon size={26} />}
                </button>

                {/* ---- NAV LINKS (Balance: centered between logo and CTA) ---- */}
                <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>

                    <Link href="/" className={styles.link} onClick={close}>Home</Link>

                    {/* SERVICES DROPDOWN — Proximity: all service links grouped */}
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
                            {/* Proximity: label groups the items below it */}
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
                        </div>
                    </div>

                    {/* TOURS DROPDOWN — Proximity: tour links grouped separately */}
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setToursOpen(true)}
                        onMouseLeave={() => setToursOpen(false)}
                    >
                        <button
                            className={styles.link}
                            onClick={() => setToursOpen(!toursOpen)}
                            aria-expanded={toursOpen}
                        >
                            Tours
                            <ChevronDownIcon
                                className={`${styles.arrow} ${toursOpen ? styles.arrowRotate : ''}`}
                                size={14}
                            />
                        </button>
                        <div className={`${styles.dropdownMenu} ${toursOpen ? styles.dropdownMenuOpen : ''}`}>
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

                    {/* CROSS-BORDER DROPDOWN — Proximity: GCC route links grouped separately */}
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
                            Cross-Border
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

                    <Link href="/quote" className={styles.link} onClick={close}>Quote</Link>
                    <Link href="/our-gallery" className={styles.link} onClick={close}>Gallery</Link>
                    <Link href="/about-us"  className={styles.link} onClick={close}>About</Link>
                    <Link href="/contact-us" className={styles.link} onClick={close}>
                        Contact
                    </Link>

                    {/* ---- CTA (Contrast: gold, rightmost = highest priority) ---- */}
                    <Link href="/book-online" className={styles.cta} onClick={close}>
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
