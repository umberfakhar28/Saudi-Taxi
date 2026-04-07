'use client';

import { useState } from "react";
import Link from "next/link";
import styles from "./faqs.module.css";

const faqCategories = [
    {
        category: "General",
        icon: "ℹ️",
        faqs: [
            {
                question: "What areas do you serve?",
                answer: "We provide taxi services across Saudi Arabia with a primary focus on Makkah, Madinah, and Jeddah. We cover all routes between these cities, airports, and holy sites. We also serve other cities like Riyadh, Dammam, and Taif upon request.",
            },
            {
                question: "Are your drivers licensed and professional?",
                answer: "Absolutely! All our drivers are licensed by the Saudi Transport Authority, fully background-checked, and trained in customer service. Many of our drivers have been serving pilgrims for over 5 years and are fluent in multiple languages including Arabic, English, and Urdu.",
            },
            {
                question: "What types of vehicles do you offer?",
                answer: "We offer a range of vehicles to suit your needs: Standard Sedans (Toyota Camry, Hyundai Sonata) for up to 3 passengers, Premium Sedans (Mercedes, BMW) for luxury transfers, SUVs (Toyota Fortuner) for families, and Large Vans (Hyundai H1, Toyota HiAce) for groups of up to 10 passengers.",
            },
            {
                question: "Do you operate 24/7?",
                answer: "Yes! We operate round the clock, 365 days a year. Whether your flight lands at 2 AM or you need a ride during Hajj season, we are always available. Our customer support team is also available 24/7 via phone and WhatsApp.",
            },
            {
                question: "What languages do your drivers speak?",
                answer: "Our drivers primarily speak Arabic and English. Many also speak Urdu, Hindi, Turkish, and Malay. When booking, you can request a driver who speaks your preferred language, and we will do our best to accommodate.",
            },
        ],
    },
    {
        category: "Booking & Payment",
        icon: "💳",
        faqs: [
            {
                question: "How do I book a taxi?",
                answer: "You can book through multiple channels: (1) Fill out our online booking form, (2) Send us a message on WhatsApp, (3) Call us directly, or (4) Email us with your travel details. We respond to all inquiries within 30 minutes during business hours and within 2 hours outside business hours.",
            },
            {
                question: "What payment methods do you accept?",
                answer: "We accept Cash (SAR), credit and debit cards (Visa, Mastercard), bank transfers, and mobile payments (Apple Pay, STC Pay, mada). You can pay in advance online or pay the driver directly in cash — your choice!",
            },
            {
                question: "Do I need to pay a deposit?",
                answer: "For standard bookings, no deposit is required. For multi-day packages or bookings during peak Hajj/Umrah season, we may request a small deposit (usually 20%) which is fully refundable if you cancel at least 24 hours before pickup.",
            },
            {
                question: "Can I modify or cancel my booking?",
                answer: "Yes! You can modify or cancel your booking free of charge up to 24 hours before the scheduled pickup time. For cancellations within 24 hours, a small administration fee may apply. Contact our support team to make any changes.",
            },
            {
                question: "Are your prices fixed or metered?",
                answer: "All our prices are fixed and agreed upon at the time of booking. There are no meters, no surge pricing, and no hidden charges. The price you see is the price you pay, regardless of traffic or route changes.",
            },
        ],
    },
    {
        category: "Airport Transfers",
        icon: "✈️",
        faqs: [
            {
                question: "Where will my driver meet me at the airport?",
                answer: "Your driver will be waiting in the arrivals hall with a name board displaying your name. After you collect your luggage, simply look for the board. If you can't find the driver, call or WhatsApp the number we provide in your booking confirmation — the driver will guide you.",
            },
            {
                question: "What if my flight is delayed?",
                answer: "Don't worry at all! We track all incoming flights in real-time. If your flight is delayed, your driver will automatically adjust their arrival time. There is absolutely no extra charge for flight delays — we wait for you at no additional cost.",
            },
            {
                question: "Can you handle large amounts of luggage?",
                answer: "Yes! Our standard sedans can accommodate 2-3 suitcases. If you have more luggage, please let us know when booking so we can arrange a larger vehicle (SUV or van) that can comfortably fit all your belongings.",
            },
            {
                question: "What if I have a connecting flight?",
                answer: "If you have a domestic connection, we can arrange inter-terminal transfers. If you're arriving internationally and then transferring to a domestic flight to Madinah, we can assist with both the transfer between terminals and any city-to-city service afterward.",
            },
        ],
    },
    {
        category: "Umrah & Hajj",
        icon: "🕌",
        faqs: [
            {
                question: "Do you offer special packages for Umrah pilgrims?",
                answer: "Yes! We offer comprehensive Umrah packages that include airport pickup, transfers between Makkah and Madinah, daily hotel-to-Haram transfers, and Ziyarat tours. Multi-day packages offer significant savings compared to individual bookings.",
            },
            {
                question: "Can you arrange Ziyarat tours?",
                answer: "Absolutely! We offer guided Ziyarat tours in both Makkah and Madinah. Visit historically significant Islamic sites with a knowledgeable driver who can share information about each location. Tours typically last 3-4 hours and include stops at all major sites.",
            },
            {
                question: "Is there a service for elderly or disabled pilgrims?",
                answer: "Yes, we are committed to serving all pilgrims. We offer wheelchair-accessible vehicles, extra assistance with mobility, patient and caring drivers experienced with elderly passengers, and flexible scheduling to accommodate special needs. Please let us know your requirements when booking.",
            },
            {
                question: "How far in advance should I book during Hajj season?",
                answer: "During Hajj season (Dhul Hijjah), we recommend booking at least 2-4 weeks in advance to ensure availability. For Ramadan and peak Umrah season, 1-2 weeks advance booking is sufficient. For regular periods, 24-48 hours notice is usually enough.",
            },
        ],
    },
];

export default function FAQs() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Frequently Asked Questions</h1>
                <p>
                    Find answers to common questions about our taxi services, booking process, pricing, and more.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>FAQs</span>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section-lg">
                <div className="container">
                    {/* Category Tabs */}
                    <div className={styles.categoryTabs}>
                        {faqCategories.map((cat, i) => (
                            <button
                                key={i}
                                className={`${styles.categoryTab} ${activeCategory === i ? styles.categoryTabActive : ''}`}
                                onClick={() => { setActiveCategory(i); setOpenFaq(null); }}
                            >
                                <span className={styles.tabIcon}>{cat.icon}</span>
                                {cat.category}
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className={styles.faqContainer}>
                        {faqCategories[activeCategory].faqs.map((faq, i) => (
                            <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ''}`}>
                                <button
                                    className={styles.faqQuestion}
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <span className={styles.questionText}>{faq.question}</span>
                                    <span className={styles.toggleIcon}>{openFaq === i ? '−' : '+'}</span>
                                </button>
                                {openFaq === i && (
                                    <div className={styles.faqAnswer}>
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Have Questions */}
            <section className="section-lg bg-light">
                <div className="container text-center">
                    <h2 className="section-title">Still Have Questions?</h2>
                    <p className="section-subtitle">
                        Can&apos;t find the answer you&apos;re looking for? Our friendly team is here to help you 24/7.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/contact-us" className="btn btn-primary">
                            Contact Us
                        </Link>
                        <a href="https://wa.me/966123456789" className="btn btn-outline-gold" target="_blank" rel="noopener noreferrer">
                            💬 WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
