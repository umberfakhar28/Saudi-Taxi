import Link from 'next/link';
import { MessageIcon, PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from './Icons';
import Logo from './Logo';
import styles from './Footer.module.css';
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY, waLink } from '@/lib/contact';

const ArabicFooter = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <Logo size={32} variant="white" />
                        </div>
                        <p className={styles.text}>
                            شريكك الموثوق لخدمات النقل والتاكسي في جميع أنحاء المملكة العربية السعودية. نخدم معتمري العمرة والسياح والمسافرين براحة وأمان منذ عام 2014.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href={WHATSAPP_URL} className={styles.socialLink} aria-label="واتساب" target="_blank" rel="noopener noreferrer">
                                <MessageIcon size={18} />
                            </a>
                            <a href={TEL_URL} className={styles.socialLink} aria-label="هاتف">
                                <PhoneIcon size={18} />
                            </a>
                            <a href="mailto:info@gulftripservice.com" className={styles.socialLink} aria-label="بريد إلكتروني">
                                <MailIcon size={18} />
                            </a>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>خدماتنا</h4>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><Link href="/ar/border-crossing" className={styles.link}>عبور الحدود</Link></li>
                            <li className={styles.listItem}><Link href="/airport-transfers" className={styles.link}>النقل من المطار</Link></li>
                            <li className={styles.listItem}><Link href="/umrah-transport-package" className={styles.link}>باقة نقل العمرة</Link></li>
                            <li className={styles.listItem}><Link href="/hotel-transfers" className={styles.link}>النقل من الفندق</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>الرحلات عبر الحدود</h4>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><Link href="/ar/dammam-airport-to-bahrain-taxi-service" className={styles.link}>مطار الدمام ← البحرين</Link></li>
                            <li className={styles.listItem}><Link href="/ar/dammam-airport-to-qatar-taxi-service" className={styles.link}>مطار الدمام ← قطر</Link></li>
                            <li className={styles.listItem}><Link href="/bahrain-to-dammam-taxi-service" className={styles.link}>البحرين ← الدمام</Link></li>
                            <li className={styles.listItem}><Link href="/qatar-to-riyadh-taxi-service" className={styles.link}>قطر ← الرياض</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.heading}>معلومات الاتصال</h4>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <MapPinIcon className={styles.contactIcon} size={18} />
                                <span className={styles.link}>مكة المكرمة، المملكة العربية السعودية</span>
                            </li>
                            <li className={styles.listItem}>
                                <PhoneIcon className={styles.contactIcon} size={18} />
                                <a href={TEL_URL} className={styles.link} dir="ltr">{PHONE_DISPLAY}</a>
                            </li>
                            <li className={styles.listItem}>
                                <MessageIcon className={styles.contactIcon} size={18} />
                                <a href={WHATSAPP_URL} className={styles.link} target="_blank" rel="noopener noreferrer">تواصل عبر واتساب</a>
                            </li>
                            <li className={styles.listItem}>
                                <MailIcon className={styles.contactIcon} size={18} />
                                <a href="mailto:info@gulftripservice.com" className={styles.link} dir="ltr">info@gulftripservice.com</a>
                            </li>
                            <li className={styles.listItem}>
                                <ClockIcon className={styles.contactIcon} size={18} />
                                <span className={styles.link}>متوفرون على مدار الساعة طوال أيام الأسبوع</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={styles.copyright}>
                        &copy; {new Date().getFullYear()} Gulf Trip Service. جميع الحقوق محفوظة.
                    </div>
                    <div className={styles.bottomLinks}>
                        <Link href="/ar/contact-us" className={styles.bottomLink}>اتصل بنا</Link>
                        <span className={styles.divider}>|</span>
                        <Link href="/book-online" className={styles.bottomLink}>احجز الآن</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ArabicFooter;
