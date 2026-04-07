'use client';

import { useState } from 'react';
import styles from './FAQSection.module.css';
import { ChevronDownIcon } from './Icons';

const faqs = [
    {
        question: "How much is a taxi from Jeddah Airport to Makkah?",
        answer:
            "Our fixed price from Jeddah Airport (KAIA) to Makkah starts from 150 SAR — all-inclusive with no hidden fees or surge pricing.",
    },
    {
        question: "What happens if my flight is delayed?",
        answer:
            "We track your flight in real-time. If there is a delay, your driver automatically adjusts the pickup time at no extra cost. Your driver will be waiting in the arrivals hall with a name board.",
    },
    {
        question: "Can I book a taxi for Umrah inter-city travel?",
        answer:
            "Yes — we specialise in Umrah transport between Makkah and Madinah, and Ziyarat tours to historical sites. Book a one-way trip or a full package for your entire stay.",
    },
    {
        question: "Are child seats available in your vehicles?",
        answer:
            "Yes, child seats are available upon request during the booking process. We prioritise family safety on every journey.",
    },
    {
        question: "Can I pay in cash or by card?",
        answer:
            "We accept cash (SAR), card payments, and online bank transfer. Payment method can be selected when booking.",
    },
    {
        question: "How far in advance should I book?",
        answer:
            "We recommend booking at least 24 hours in advance, especially during Hajj and Umrah seasons. However, we also accept same-day bookings subject to availability.",
    },
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection}>
            <div className="container">

                {/* Section header */}
                <div className="section-header centered">
                    <span className="section-eyebrow">FAQ</span>
                    <h2 className="section-title">Common Questions</h2>
                    <p className="section-subtitle">
                        Everything you need to know about booking our Saudi taxi services.
                    </p>
                </div>

                {/* Accordion */}
                <div className={styles.accordion}>
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}
                            >
                                <button
                                    className={styles.accordionTrigger}
                                    onClick={() => toggle(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span className={styles.accordionQuestion}>{faq.question}</span>
                                    <ChevronDownIcon
                                        size={20}
                                        className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ''}`}
                                    />
                                </button>
                                <div className={`${styles.accordionBody} ${isOpen ? styles.accordionBodyOpen : ''}`}>
                                    <p className={styles.accordionAnswer}>{faq.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
