'use client';

import { useState } from "react";
import Link from "next/link";
import { PhoneIcon, MessageIcon, MailIcon, MapPinIcon, ClockIcon, GlobeIcon, CalendarIcon, ChevronRightIcon } from "@/components/Icons";
import styles from "@/app/contact-us/contact.module.css";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";

const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/ar" }, { name: "اتصل بنا", path: "/ar/contact-us" }]),
];

const contactInfo = [
    {
        icon: <PhoneIcon size={32} />,
        title: "الهاتف",
        details: ["+966 12 345 6789", "+966 50 123 4567"],
        action: "tel:+966123456789",
        linkText: "اتصل الآن",
    },
    {
        icon: <MessageIcon size={32} />,
        title: "واتساب",
        details: ["+966 50 123 4567", "متوفرون على مدار الساعة"],
        action: "https://wa.me/966501234567",
        linkText: "تواصل الآن",
    },
    {
        icon: <MailIcon size={32} />,
        title: "البريد الإلكتروني",
        details: ["info@gulftripservice.com", "booking@gulftripservice.com"],
        action: "mailto:info@gulftripservice.com",
        linkText: "أرسل بريداً",
    },
    {
        icon: <MapPinIcon size={32} />,
        title: "المكتب",
        details: ["مكة المكرمة، السعودية", "حي العزيزية"],
        action: "#",
        linkText: "عرض الخريطة",
    },
];

export default function ArabicContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        service: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('شكراً لرسالتك! سنتواصل معك خلال 24 ساعة.');
        setFormData({ name: '', email: '', phone: '', subject: '', service: '', message: '' });
    };

    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>اتصل بنا</h1>
                <p>
                    لديك سؤال أو مستعد للحجز؟ نحن هنا لمساعدتك على مدار الساعة. تواصل معنا عبر أي قناة أدناه.
                </p>
                <div className="breadcrumb">
                    <Link href="/ar">الرئيسية</Link> / <span>اتصل بنا</span>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="section-lg">
                <div className="container">
                    <div className="grid-4">
                        {contactInfo.map((info, i) => (
                            <div key={i} className={styles.contactCard}>
                                <div className={styles.contactIcon}>{info.icon}</div>
                                <h3 className={styles.contactTitle}>{info.title}</h3>
                                {info.details.map((detail, j) => (
                                    <p key={j} className={styles.contactDetail} dir="ltr">{detail}</p>
                                ))}
                                <a href={info.action} className={styles.contactLink} target={info.action.startsWith('http') ? '_blank' : undefined} rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}>
                                    {info.linkText} <ChevronRightIcon size={16} style={{ transform: 'scaleX(-1)' }} />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="section-lg bg-light">
                <div className="container">
                    <div className={styles.formGrid}>
                        <div className={styles.formInfo}>
                            <h2>أرسل لنا رسالة</h2>
                            <p>
                                املأ النموذج وسيتواصل معك فريقنا خلال 24 ساعة. للاستفسارات العاجلة، يرجى الاتصال بنا أو التواصل عبر واتساب مباشرة.
                            </p>
                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIconWrapper}><ClockIcon size={20} /></div>
                                    <div>
                                        <strong>وقت الاستجابة</strong>
                                        <p>خلال 30 دقيقة (ساعات العمل)</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIconWrapper}><GlobeIcon size={20} /></div>
                                    <div>
                                        <strong>اللغات</strong>
                                        <p>العربية، الإنجليزية، الأردية، الهندية</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIconWrapper}><CalendarIcon size={20} /></div>
                                    <div>
                                        <strong>التوفر</strong>
                                        <p>على مدار الساعة، طوال أيام السنة</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">الاسم الكامل *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        placeholder="اسمك الكامل"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">البريد الإلكتروني *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label htmlFor="phone" className="form-label">الهاتف / واتساب *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="form-input"
                                        placeholder="+966 ..."
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="service" className="form-label">الخدمة المطلوبة</label>
                                    <select
                                        id="service"
                                        name="service"
                                        className="form-select"
                                        value={formData.service}
                                        onChange={handleChange}
                                    >
                                        <option value="">اختر خدمة</option>
                                        <option value="airport-transfer">النقل من المطار</option>
                                        <option value="jeddah-makkah">جدة إلى مكة</option>
                                        <option value="makkah-madinah">مكة إلى المدينة</option>
                                        <option value="umrah-package">باقة العمرة</option>
                                        <option value="ziyarat-tour">جولة زيارة</option>
                                        <option value="other">أخرى / مخصص</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">الموضوع *</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-input"
                                    placeholder="كيف يمكننا مساعدتك؟"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">الرسالة *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    placeholder="يرجى تقديم تفاصيل استفسارك، شاملة تواريخ السفر وعدد المسافرين وأي متطلبات خاصة..."
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                إرسال الرسالة
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Quick Booking CTA */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
                padding: '4rem 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>جاهز للحجز؟</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', margin: '0 auto 2rem', maxWidth: '500px' }}>
                        تخطَّ النموذج — احجز مباشرة عبر صفحة الحجز السريع أو واتساب.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">
                            احجز الآن
                        </Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                            <MessageIcon size={20} style={{ marginInlineEnd: '8px' }} /> واتساب
                        </a>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}
