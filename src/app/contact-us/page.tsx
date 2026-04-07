'use client';

import { useState } from "react";
import Link from "next/link";
import { PhoneIcon, MessageIcon, MailIcon, MapPinIcon, ClockIcon, GlobeIcon, CalendarIcon, ChevronRightIcon } from "@/components/Icons";
import styles from "./contact.module.css";

const contactInfo = [
    {
        icon: <PhoneIcon size={32} />,
        title: "Phone",
        details: ["+966 12 345 6789", "+966 50 123 4567"],
        action: "tel:+966123456789",
        linkText: "Call Now",
    },
    {
        icon: <MessageIcon size={32} />,
        title: "WhatsApp",
        details: ["+966 50 123 4567", "Available 24/7"],
        action: "https://wa.me/966501234567",
        linkText: "Chat Now",
    },
    {
        icon: <MailIcon size={32} />,
        title: "Email",
        details: ["info@makkahtaxiservice.com", "booking@makkahtaxiservice.com"],
        action: "mailto:info@makkahtaxiservice.com",
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

export default function ContactUs() {
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
        // Form submission logic
        alert('Thank you for your message! We will get back to you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', subject: '', service: '', message: '' });
    };

    return (
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
                                <a href={info.action} className={styles.contactLink} target={info.action.startsWith('http') ? '_blank' : undefined} rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}>
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
                                Fill out the form and our team will get back to you within 24 hours. For urgent inquiries, please call or WhatsApp us directly.
                            </p>
                            <div className={styles.infoList}>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoIconWrapper}><ClockIcon size={20} /></div>
                                    <div>
                                        <strong>Response Time</strong>
                                        <p>Within 30 minutes (business hours)</p>
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

                        <form className={styles.form} onSubmit={handleSubmit}>
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
                                        required
                                    />
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
                                        required
                                    />
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
                                        required
                                    />
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
                                    required
                                />
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
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                Send Message
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
                    <h2 style={{ color: 'var(--white)', marginBottom: '0.75rem' }}>Ready to Book?</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', margin: '0 auto 2rem', maxWidth: '500px' }}>
                        Skip the form — book directly through our quick booking page or WhatsApp.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/booking" className="btn btn-primary btn-lg">
                            Book Now
                        </Link>
                        <a href="https://wa.me/966501234567" className="btn btn-outline btn-lg" target="_blank" rel="noopener noreferrer">
                            <MessageIcon size={20} style={{ marginRight: '8px' }} /> WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
