'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [toursOpen, setToursOpen] = useState(false);

    const close = () => { setMenuOpen(false); setServicesOpen(false); setToursOpen(false); };

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>🕌</span>
                    SAUDI TAXI
                </Link>

                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
                    <Link href="/" className={styles.link} onClick={close}>Home</Link>

                    {/* Services Dropdown */}
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setServicesOpen(true)}
                        onMouseLeave={() => setServicesOpen(false)}
                    >
                        <button className={styles.link} onClick={() => setServicesOpen(!servicesOpen)}>
                            Services <span className={styles.arrow}>▾</span>
                        </button>
                        <div className={`${styles.dropdownMenu} ${servicesOpen ? styles.dropdownMenuOpen : ''}`}>
                            <Link href="/our-services" className={styles.dropdownItem} onClick={close}>All Services</Link>
                            <Link href="/airport-transfers" className={styles.dropdownItem} onClick={close}>Airport Transfers</Link>
                            <Link href="/hotel-transfers" className={styles.dropdownItem} onClick={close}>Hotel Transfers</Link>
                            <Link href="/private-taxi" className={styles.dropdownItem} onClick={close}>Private Taxi</Link>
                            <Link href="/umrah-transport-package" className={styles.dropdownItem} onClick={close}>Umrah Transport Package</Link>
                            <Link href="/ziyarat-services-in-saudi-arabia" className={styles.dropdownItem} onClick={close}>Ziyarat Services</Link>
                        </div>
                    </div>

                    {/* Tours Dropdown */}
                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setToursOpen(true)}
                        onMouseLeave={() => setToursOpen(false)}
                    >
                        <button className={styles.link} onClick={() => setToursOpen(!toursOpen)}>
                            Tours <span className={styles.arrow}>▾</span>
                        </button>
                        <div className={`${styles.dropdownMenu} ${toursOpen ? styles.dropdownMenuOpen : ''}`}>
                            <Link href="/jeddah-city-tour-services-in-saudi-arabia" className={styles.dropdownItem} onClick={close}>Jeddah City Tour</Link>
                            <Link href="/reliable-alula-tour-taxi-service-in-saudi-arabia" className={styles.dropdownItem} onClick={close}>AlUla Tour</Link>
                            <Link href="/taif-ziyarat-taxi-service" className={styles.dropdownItem} onClick={close}>Taif Ziyarat Tour</Link>
                        </div>
                    </div>

                    <Link href="/our-gallery" className={styles.link} onClick={close}>Gallery</Link>
                    <Link href="/about-us" className={styles.link} onClick={close}>About</Link>
                    <Link href="/contact-us" className={styles.link} onClick={close}>Contact</Link>
                    <Link href="/book-online" className={styles.cta} onClick={close}>Book Now</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
