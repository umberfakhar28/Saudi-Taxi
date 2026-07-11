'use client';

import { useState } from 'react';
import styles from './FAQSection.module.css';
import { ChevronDownIcon } from './Icons';
import { homeFaqs as faqs } from '@/lib/homeFaqs';

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
