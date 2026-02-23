import Link from 'next/link';
import { Navigation, MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h4 className={styles.heading}>
                            <Navigation className={styles.logoIcon} size={20} /> Saudi Taxi Service
                        </h4>
                        <p className={styles.text}>
                            Your trusted partner for reliable taxi and transportation services across Saudi Arabia. Serving Umrah pilgrims, tourists and travelers with comfort, safety and dedication since 2014.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="https://wa.me/966501234567" className={styles.socialLink} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                                <MessageCircle size={18} />
                            </a>
                            <a href="tel:+966501234567" className={styles.socialLink} aria-label="Phone">
                                <Phone size={18} />
                            </a>
                            <a href="mailto:info@saudiataxi.com" className={styles.socialLink} aria-label="Email">
                                <Mail size={18} />
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
                                <MapPin className={styles.contactIcon} size={18} />
                                <span className={styles.link}>Makkah, Saudi Arabia</span>
                            </li>
                            <li className={styles.listItem}>
                                <Phone className={styles.contactIcon} size={18} />
                                <a href="tel:+966501234567" className={styles.link}>+966 50 123 4567</a>
                            </li>
                            <li className={styles.listItem}>
                                <MessageCircle className={styles.contactIcon} size={18} />
                                <a href="https://wa.me/966501234567" className={styles.link} target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
                            </li>
                            <li className={styles.listItem}>
                                <Mail className={styles.contactIcon} size={18} />
                                <a href="mailto:info@saudiataxi.com" className={styles.link}>info@saudiataxi.com</a>
                            </li>
                            <li className={styles.listItem}>
                                <Clock className={styles.contactIcon} size={18} />
                                <span className={styles.link}>Available 24/7</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Saudi Taxi Service. All Rights Reserved.
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
