'use client';

import { useState } from "react";
import Link from "next/link";
import { PhoneIcon, MessageIcon, MailIcon, MapPinIcon, ClockIcon, GlobeIcon, CalendarIcon, ChevronRightIcon } from "@/components/Icons";
import styles from "./contact.module.css";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { WHATSAPP_URL, TEL_URL, PHONE_DISPLAY, waLink } from "@/lib/contact";
import { getSpamPass, submissionHeaders, honeypotFieldProps } from "@/lib/antiSpamClient";
import { normalizeContactInput, validateContact, contactMessageText, type ContactErrors } from "@/lib/contactMessage";

const schemas = [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact-us" }]),
];

const contactInfo = [
    {
        icon: <PhoneIcon size={32} />,
        title: "Phone",
        details: [PHONE_DISPLAY, PHONE_DISPLAY],
        action: TEL_URL,
        linkText: "Call Now",
    },
    {
        icon: <MessageIcon size={32} />,
        title: "WhatsApp",
        details: [PHONE_DISPLAY, "Available 24/7"],
        action: WHATSAPP_URL,
        linkText: "Chat Now",
    },
    {
        icon: <MailIcon size={32} />,
        title: "Email",
        details: ["info@gulftripservice.com", "booking@gulftripservice.com"],
        action: "mailto:info@gulftripservice.com",
        linkText: "Send Email",
    },
    {
        icon: <MapPinIcon size={32} />,
        title: "Office",
        details: ["Makkah, Saudi Arabia", "Al-Aziziyah District"],
        action: "#",
        linkText: "View Map",
    },
];

export default function ContactUsClient() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        service: '',
        message: '',
    });

    // Submission state. `submitted` carries the reference the customer can
    // quote on WhatsApp, so the success screen says something useful rather
    // than just "thanks".
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState<{ reference: string } | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
    const [honeypot, setHoneypot] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear only the field being corrected, so the rest of the summary
        // stays on screen while the customer works through it.
        if (fieldErrors[e.target.name as keyof ContactErrors]) {
            setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
        }
    };

    /**
     * Submits the enquiry to /api/contact/create.
     *
     * This used to be `alert()` + reset state — no request, no storage, no
     * email, nobody notified, while telling the customer to expect a reply
     * within 24 hours. Every message through this page was lost.
     *
     * Two rules the old version got wrong and this one keeps:
     *  · The success message appears only after the server confirms the
     *    enquiry was SAVED. Email is best-effort and never gates it.
     *  · On failure nothing is cleared. The customer's typed message is the
     *    most valuable thing on the page and reproducing it is the thing
     *    they are least willing to do.
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitting) return; // double-click guard

        setFormError(null);

        const input = normalizeContactInput({ ...formData, locale: 'en' });
        const errors = validateContact(input);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setFormError(contactMessageText('en', 'fix_fields_below'));
            return;
        }
        setFieldErrors({});
        setSubmitting(true);

        try {
            const gate = await getSpamPass('', honeypot);
            if (!gate.ok) {
                setFormError(gate.message ?? 'Verification failed. Please try again.');
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
                // Field-level problems the server found come back keyed, so
                // they land next to the right input in the right language.
                if (json.error === 'validation_failed' && json.fieldErrors) {
                    const resolved: ContactErrors = {};
                    for (const [field, key] of Object.entries(json.fieldErrors as Record<string, string>)) {
                        resolved[field as keyof ContactErrors] = contactMessageText('en', key);
                    }
                    setFieldErrors(resolved);
                    setFormError('Please check the highlighted fields.');
                } else {
                    setFormError(json.error || 'Your message could not be sent. Please try again, or message us on WhatsApp.');
                }
                return; // values deliberately preserved
            }

            // Saved. Only now is it safe to say so and clear the form.
            setSubmitted({ reference: json.reference ?? '' });
            setFormData({ name: '', email: '', phone: '', subject: '', service: '', message: '' });
        } catch {
            setFormError('We could not reach the server. Please check your connection and try again, or message us on WhatsApp.');
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
                <h1>Contact Us</h1>
                <p>
                    Have a question or ready to book? We&apos;re here to help 24/7. Reach out through any channel below.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Contact Us</span>
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
                                    <p key={j} className={styles.contactDetail}>{detail}</p>
                                ))}
                                <a href={info.action} className={styles.contactLink} data-wa-cta={info.action.startsWith('http') ? 'contact-info-card' : undefined} target={info.action.startsWith('http') ? '_blank' : undefined} rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}>
                                    {info.linkText} <ChevronRightIcon size={16} />
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
                            <h2>Send Us a Message</h2>
                            <p>
                                Fill out the form and our team will get back to you as soon as possible. For urgent inquiries, please call or WhatsApp us directly.
                            </p>
                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIconWrapper}><ClockIcon size={20} /></div>
                                    <div>
                                        {/* Two different promises used to sit on this one
                                            screen — "within 24 hours" above and "within 30
                                            minutes" here. Neither was a commitment anyone
                                            had made, so both were replaced with what is
                                            actually true. 24/7 availability below is about
                                            the service, not a guaranteed reply time. */}
                                        <strong>Response Time</strong>
                                        <p>As soon as possible</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIconWrapper}><GlobeIcon size={20} /></div>
                                    <div>
                                        <strong>Languages</strong>
                                        <p>Arabic, English, Urdu, Hindi</p>
                                    </div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIconWrapper}><CalendarIcon size={20} /></div>
                                    <div>
                                        <strong>Availability</strong>
                                        <p>24/7, 365 days a year</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {submitted ? (
                        <div className={styles.form} role="status" aria-live="polite" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                            <div style={{ fontSize: '2.5rem', lineHeight: 1, marginBottom: '1rem' }} aria-hidden="true">✅</div>
                            <h3 style={{ marginBottom: '0.75rem' }}>Message received</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                                Thank you — your message has reached our team and we will get back to you.
                                For a faster reply, message us on WhatsApp.
                            </p>
                            {submitted.reference && (
                                <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                    Your reference:{' '}
                                    <strong style={{ fontFamily: 'monospace', letterSpacing: '0.5px' }}>{submitted.reference}</strong>
                                </p>
                            )}
                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <a
                                    href={waLink(`Hi, I have just sent a message through your website${submitted.reference ? ` (ref ${submitted.reference})` : ''}.`)}
                                    data-wa-cta="contact-form-success"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-whatsapp"
                                >
                                    Continue on WhatsApp
                                </a>
                                <button type="button" className="btn btn-secondary" onClick={() => setSubmitted(null)}>
                                    Send another message
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
                            {/* Hidden from people, irresistible to bots. */}
                            <input
                                {...honeypotFieldProps}
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                            />
                            <div className="grid-2">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        aria-invalid={!!fieldErrors.name}
                                        required
                                    />
                                    {fieldErrors.name && <p className={styles.fieldError}>{fieldErrors.name}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder="your@email.com"
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
                                    <label htmlFor="phone" className="form-label">Phone / WhatsApp *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="form-input"
                                        placeholder="+966 ..."
                                        value={formData.phone}
                                        onChange={handleChange}
                                        aria-invalid={!!fieldErrors.phone}
                                        required
                                    />
                                    {fieldErrors.phone && <p className={styles.fieldError}>{fieldErrors.phone}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="service" className="form-label">Service Required</label>
                                    <select
                                        id="service"
                                        name="service"
                                        className="form-select"
                                        value={formData.service}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a service</option>
                                        <option value="airport-transfer">Airport Transfer</option>
                                        <option value="jeddah-makkah">Jeddah to Makkah</option>
                                        <option value="makkah-madinah">Makkah to Madinah</option>
                                        <option value="umrah-package">Umrah Package</option>
                                        <option value="ziyarat-tour">Ziyarat Tour</option>
                                        <option value="other">Other / Custom</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject" className="form-label">Subject *</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-input"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    aria-invalid={!!fieldErrors.subject}
                                    required
                                />
                                {fieldErrors.subject && <p className={styles.fieldError}>{fieldErrors.subject}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    placeholder="Please provide details about your inquiry, including travel dates, number of passengers, and any special requirements..."
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
                                {submitting ? 'Sending…' : 'Send Message'}
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
                    <h2 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>Ready to Book?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', margin: '0 auto 2rem', maxWidth: '500px' }}>
                        Skip the form — book directly through our quick booking page or WhatsApp.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/book-online" className="btn btn-primary btn-lg">
                            Book Now
                        </Link>
                        <a data-wa-cta="closing-cta" href={WHATSAPP_URL} className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                            <MessageIcon size={20} style={{ marginRight: '8px' }} /> WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}
