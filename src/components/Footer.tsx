import Link from 'next/link';
import { MessageIcon, PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from './Icons';
import Logo from './Logo';
import styles from './Footer.module.css';
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY, waLink } from '@/lib/contact';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <Logo size={32} variant="white" />
                        </div>
                        <p className={styles.text}>
                            Your trusted partner for reliable taxi and transportation services across Saudi Arabia. Serving Umrah pilgrims, tourists and travelers with comfort, safety and dedication since 2014.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href={WHATSAPP_URL} className={styles.socialLink} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                                <MessageIcon size={18} />
                            </a>
                            <a href={TEL_URL} className={styles.socialLink} aria-label="Phone">
                                <PhoneIcon size={18} />
                            </a>
                            <a href="mailto:info@gulftripservice.com" className={styles.socialLink} aria-label="Email">
                                <MailIcon size={18} />
                            </a>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Our Services</h4>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><Link href="/airport-transfers" className={styles.link}>Airport Transfers</Link></li>
                            <li className={styles.listItem}><Link href="/hotel-transfers" className={styles.link}>Hotel Transfers</Link></li>
                            <li className={styles.listItem}><Link href="/private-taxi" className={styles.link}>Private Taxi</Link></li>
                            <li className={styles.listItem}><Link href="/umrah-transport-package" className={styles.link}>Umrah Transport Package</Link></li>
                            <li className={styles.listItem}><Link href="/ziyarat-services-in-saudi-arabia" className={styles.link}>Ziyarat Services</Link></li>
                            <li className={styles.listItem}><Link href="/border-crossing" className={styles.link}>Border Crossing</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Cross-Border Routes</h4>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><Link href="/dammam-airport-to-bahrain-taxi-service" className={styles.link}>Dammam Airport → Bahrain</Link></li>
                            <li className={styles.listItem}><Link href="/dammam-airport-to-qatar-taxi-service" className={styles.link}>Dammam Airport → Qatar</Link></li>
                            <li className={styles.listItem}><Link href="/dammam-airport-to-riyadh-taxi-service" className={styles.link}>Dammam Airport → Riyadh</Link></li>
                            <li className={styles.listItem}><Link href="/dammam-airport-to-khafji-taxi-service" className={styles.link}>Dammam Airport → Khafji</Link></li>
                            <li className={styles.listItem}><Link href="/bahrain-to-dammam-taxi-service" className={styles.link}>Bahrain → Dammam</Link></li>
                            <li className={styles.listItem}><Link href="/qatar-to-riyadh-taxi-service" className={styles.link}>Qatar → Riyadh</Link></li>
                            <li className={styles.listItem}><Link href="/khafji-to-kuwait-taxi-service" className={styles.link}>Khafji → Kuwait</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Tours & Quick Links</h4>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><Link href="/jeddah-city-tour-services-in-saudi-arabia" className={styles.link}>Jeddah City Tour</Link></li>
                            <li className={styles.listItem}><Link href="/reliable-alula-tour-taxi-service-in-saudi-arabia" className={styles.link}>AlUla Tour</Link></li>
                            <li className={styles.listItem}><Link href="/taif-ziyarat-taxi-service" className={styles.link}>Taif Ziyarat Tour</Link></li>
                            <li className={styles.listItem}><Link href="/our-gallery" className={styles.link}>Our Gallery</Link></li>
                            <li className={styles.listItem}><Link href="/about-us" className={styles.link}>About Us</Link></li>
                            <li className={styles.listItem}><Link href="/contact-us" className={styles.link}>Contact Us</Link></li>
                            <li className={styles.listItem}><Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>Contact Info</h4>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <MapPinIcon className={styles.contactIcon} size={18} />
                                <span className={styles.link}>Makkah, Makkah Province, Saudi Arabia</span>
                            </li>
                            <li className={styles.listItem}>
                                <PhoneIcon className={styles.contactIcon} size={18} />
                                <a href={TEL_URL} className={styles.link}>{PHONE_DISPLAY}</a>
                            </li>
                            <li className={styles.listItem}>
                                <MessageIcon className={styles.contactIcon} size={18} />
                                <a href={WHATSAPP_URL} className={styles.link} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
                            </li>
                            <li className={styles.listItem}>
                                <MailIcon className={styles.contactIcon} size={18} />
                                <a href="mailto:info@gulftripservice.com" className={styles.link}>info@gulftripservice.com</a>
                            </li>
                            <li className={styles.listItem}>
                                <ClockIcon className={styles.contactIcon} size={18} />
                                <span className={styles.link}>Available 24/7</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Gulf Trip Service. All Rights Reserved.
                    </div>
                    <div className={styles.bottomLinks}>
                        <Link href="/privacy-policy" className={styles.bottomLink}>Privacy Policy</Link>
                        <span className={styles.divider}>|</span>
                        <Link href="/contact-us" className={styles.bottomLink}>Contact</Link>
                        <span className={styles.divider}>|</span>
                        <Link href="/about-us" className={styles.bottomLink}>About</Link>
                        <span className={styles.divider}>|</span>
                        <Link href="/book-online" className={styles.bottomLink}>Book Now</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
