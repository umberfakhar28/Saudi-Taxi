'use client';

import { useState } from "react";
import Link from "next/link";
import { PhoneIcon, MessageIcon, MailIcon, MapPinIcon, ClockIcon, GlobeIcon, CalendarIcon, ChevronRightIcon } from "@/components/Icons";
import styles from "@/app/contact-us/contact.module.css";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY, waLink } from "@/lib/contact";
import { getSpamPass, submissionHeaders, honeypotFieldProps } from "@/lib/antiSpamClient";
import { normalizeContactInput, validateContact, contactMessageText, type ContactErrors } from "@/lib/contactMessage";

const schemas = [
    breadcrumbSchema([{ name: "الرئيسية", path: "/ar" }, { name: "اتصل بنا", path: "/ar/contact-us" }]),
];

const contactInfo = [
    {
        icon: <PhoneIcon size={32} />,
        title: "الهاتف",
        details: [PHONE_DISPLAY, PHONE_DISPLAY],
        action: TEL_URL,
        linkText: "اتصل الآن",
    },
    {
        icon: <MessageIcon size={32} />,
        title: "واتساب",
        details: [PHONE_DISPLAY, "متوفرون على مدار الساعة"],
        action: WHATSAPP_URL,
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

export default function ArContactUsClient() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        service: '',
        message: '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState<{ reference: string } | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
    const [honeypot, setHoneypot] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (fieldErrors[e.target.name as keyof ContactErrors]) {
            setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
        }
    };

    /**
     * Arabic twin of the English handler in
     * src/app/contact-us/ContactUsClient.tsx — same endpoint, same guards,
     * same "only say it was received once it is saved" rule.
     *
     * The one difference that matters: `locale: 'ar'` is sent with the
     * payload. It is stored on the row and shown in the admin email, so
     * whoever replies knows to reply in Arabic. Validation messages are
     * resolved through contactMessageText('ar', …), so an Arabic visitor
     * never sees an English error.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return; // double-click guard

        setFormError(null);

        const input = normalizeContactInput({ ...formData, locale: 'ar' });
        const errors = validateContact(input);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setFormError(contactMessageText('ar', 'fix_fields_below'));
            return;
        }
        setFieldErrors({});
        setSubmitting(true);

        try {
            const gate = await getSpamPass('', honeypot);
            if (!gate.ok) {
                setFormError(gate.message ?? 'تعذّر التحقق. يرجى المحاولة مرة أخرى.');
                setSubmitting(false);
                return;
            }

            const res = await fetch('/api/contact/create', {
                method: 'POST',
                headers: submissionHeaders(gate.pass),
                body: JSON.stringify({ ...input, website: honeypot }),
            });
            const json = await res.json().catch(() => ({}));

            if (!res.ok) {
                if (json.error === 'validation_failed' && json.fieldErrors) {
                    const resolved: ContactErrors = {};
                    for (const [field, key] of Object.entries(json.fieldErrors as Record<string, string>)) {
                        resolved[field as keyof ContactErrors] = contactMessageText('ar', key);
                    }
                    setFieldErrors(resolved);
                    setFormError(contactMessageText('ar', 'fix_fields_below'));
                } else {
                    setFormError('تعذّر إرسال رسالتك. يرجى المحاولة مرة أخرى أو مراسلتنا عبر واتساب.');
                }
                return; // values deliberately preserved
            }

            setSubmitted({ reference: json.reference ?? '' });
            setFormData({ name: '', email: '', phone: '', subject: '', service: '', message: '' });
        } catch {
            setFormError('تعذّر الوصول إلى الخادم. يرجى التحقق من اتصالك والمحاولة مرة أخرى، أو مراسلتنا عبر واتساب.');
        } finally {
            setSubmitting(false);
        }
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
                                <a href={info.action} className={styles.contactLink} data-wa-cta={info.action.startsWith('http') ? 'contact-info-card' : undefined} target={info.action.startsWith('http') ? '_blank' : undefined} rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}>
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
                                املأ النموذج وسيتواصل معك فريقنا في أقرب وقت ممكن. للاستفسارات العاجلة، يرجى الاتصال بنا أو التواصل عبر واتساب مباشرة.
                            </p>
                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIconWrapper}><ClockIcon size={20} /></div>
                                    <div>
                                        {/* Mirrors the English page: both the "24 hours"
                                            and "30 minutes" promises were removed, since
                                            neither was confirmed. */}
                                        <strong>وقت الاستجابة</strong>
                                        <p>في أقرب وقت ممكن</p>
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

                        {submitted ? (
                        <div className={styles.form} role="status" aria-live="polite" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                            <div style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '1rem' }} aria-hidden="true">✅</div>
                            <h3 style={{ marginBottom: '0.75rem' }}>تم استلام رسالتك</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                                شكراً لك — وصلت رسالتك إلى فريقنا وسنعاود التواصل معك.
                                للحصول على رد أسرع، راسلنا عبر واتساب.
                            </p>
                            {submitted.reference && (
                                <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    رقم المرجع:{' '}
                                    <strong dir="ltr" style={{ fontFamily: 'monospace', letterSpacing: '0.5px', display: 'inline-block' }}>
                                        {submitted.reference}
                                    </strong>
                                </p>
                            )}
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <a
                                    href={waLink(`مرحباً، لقد أرسلت للتو رسالة عبر موقعكم${submitted.reference ? ` (المرجع ${submitted.reference})` : ''}.`)}
                                    data-wa-cta="contact-form-success"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-whatsapp"
                                >
                                    المتابعة عبر واتساب
                                </a>
                                <button type="button" className="btn btn-secondary" onClick={() => setSubmitted(null)}>
                                    إرسال رسالة أخرى
                                </button>
                            </div>
                        </div>
                        ) : (
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            {formError && (
                                <div
                                    role="alert"
                                    style={{
                                        background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b',
                                        borderRadius: 8, padding: '0.85rem 1rem', marginBottom: '1.25rem', fontSize: '0.9rem',
                                    }}
                                >
                                    {formError}
                                </div>
                            )}
                            {/* مخفي عن المستخدم — لاصطياد الروبوتات */}
                            <input
                                {...honeypotFieldProps}
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                            />
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
                                        aria-invalid={!!fieldErrors.name}
                                        required
                                    />
                                    {fieldErrors.name && <p className={styles.fieldError}>{fieldErrors.name}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">البريد الإلكتروني *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="your@email.com"
                                        dir="ltr"
                                        value={formData.email}
                                        onChange={handleChange}
                                        aria-invalid={!!fieldErrors.email}
                                        required
                                    />
                                    {fieldErrors.email && <p className={styles.fieldError}>{fieldErrors.email}</p>}
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
                                        dir="ltr"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        aria-invalid={!!fieldErrors.phone}
                                        required
                                    />
                                    {fieldErrors.phone && <p className={styles.fieldError}>{fieldErrors.phone}</p>}
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
                                    aria-invalid={!!fieldErrors.subject}
                                    required
                                />
                                {fieldErrors.subject && <p className={styles.fieldError}>{fieldErrors.subject}</p>}
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
                                    aria-invalid={!!fieldErrors.message}
                                    required
                                />
                                {fieldErrors.message && <p className={styles.fieldError}>{fieldErrors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                style={{ width: '100%' }}
                                disabled={submitting}
                                aria-busy={submitting}
                            >
                                {submitting ? 'جارٍ الإرسال…' : 'إرسال الرسالة'}
                            </button>
                        </form>
                        )}
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
                        <Link href="/ar/book-online" className="btn btn-primary btn-lg">
                            احجز الآن
                        </Link>
                        <a data-wa-cta="closing-cta" href={WHATSAPP_URL} className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                            <MessageIcon size={20} style={{ marginInlineEnd: '8px' }} /> واتساب
                        </a>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}
