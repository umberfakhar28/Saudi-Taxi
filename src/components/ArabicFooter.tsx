import Link from 'next/link';
import { MessageIcon, PhoneIcon, MailIcon, MapPinIcon, ClockIcon, InstagramIcon, FacebookIcon } from './Icons';
import Logo from './Logo';
import styles from './Footer.module.css';
import CookieSettingsLink from './CookieSettingsLink';
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY, waLink, INSTAGRAM_URL, FACEBOOK_URL } from '@/lib/contact';

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
                            <a data-wa-cta="footer-social" href={WHATSAPP_URL} className={styles.socialLink} aria-label="واتساب" target="_blank" rel="noopener noreferrer">
                                <MessageIcon size={18} />
                            </a>
                            <a data-wa-cta="footer-social" href={TEL_URL} className={styles.socialLink} aria-label="هاتف">
                                <PhoneIcon size={18} />
                            </a>
                            <a href="mailto:info@gulftripservice.com" className={styles.socialLink} aria-label="بريد إلكتروني">
                                <MailIcon size={18} />
                            </a>
                            <a href={INSTAGRAM_URL} className={styles.socialLink} aria-label="إنستغرام" target="_blank" rel="noopener noreferrer">
                                <InstagramIcon size={17} />
                            </a>
                            <a href={FACEBOOK_URL} className={styles.socialLink} aria-label="فيسبوك" target="_blank" rel="noopener noreferrer">
                                <FacebookIcon size={17} />
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
                            <li className={styles.listItem}><Link href="/ar/bahrain-to-dammam-taxi-service" className={styles.link}>البحرين ← الدمام</Link></li>
                            {/* Label corrected: it read "قطر ← الرياض" (Qatar →
                                Riyadh) while linking to the Riyadh → Qatar page.
                                The three entries above it all put the origin
                                first, so this one contradicted both its own
                                href and its neighbours. Only the text changed —
                                the link target is untouched. */}
                            <li className={styles.listItem}><Link href="/ar/riyadh-to-qatar-taxi-service" className={styles.link}>الرياض ← قطر</Link></li>
                            {/* The three below were missing, and they were the
                                three least-visible Arabic pages in Search
                                Console for Oct 1 – Nov 3 2026: 114 impressions
                                for الرياض ← البحرين, 1 for الدوحة ← الرياض and 0
                                for الرياض ← الكويت, against 523 for the
                                footer-linked الرياض ← قطر and 162 for البحرين ←
                                الدمام. /ar/qatar-to-riyadh-taxi-service had no
                                inbound internal link at all — see the note in
                                routeDataAr.ts, where Google derived the URL
                                from the hreflang pair rather than from a link.
                                Reaching an Arabic route page only through the
                                language switcher on its English twin leaves the
                                Arabic section with no path between its own
                                pages. Labels are the reviewed breadcrumbLabel
                                strings from routeDataAr.ts, not new wording. */}
                            <li className={styles.listItem}><Link href="/ar/qatar-to-riyadh-taxi-service" className={styles.link}>الدوحة ← الرياض</Link></li>
                            <li className={styles.listItem}><Link href="/ar/riyadh-to-bahrain-taxi-service" className={styles.link}>الرياض ← البحرين</Link></li>
                            <li className={styles.listItem}><Link href="/ar/riyadh-to-kuwait-taxi-service" className={styles.link}>الرياض ← الكويت</Link></li>
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
                                <a data-wa-cta="footer-contact" href={TEL_URL} className={styles.link} dir="ltr">{PHONE_DISPLAY}</a>
                            </li>
                            <li className={styles.listItem}>
                                <MessageIcon className={styles.contactIcon} size={18} />
                                <a data-wa-cta="footer-contact" href={WHATSAPP_URL} className={styles.link} target="_blank" rel="noopener noreferrer">تواصل عبر واتساب</a>
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
                        <Link href="/ar/book-online" className={styles.bottomLink}>احجز الآن</Link>
                        <span className={styles.divider}>|</span>
                        <CookieSettingsLink className={styles.bottomLink} label="إعدادات ملفات تعريف الارتباط" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ArabicFooter;
