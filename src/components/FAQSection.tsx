import styles from './FAQSection.module.css';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQSection = () => {
    const faqs = [
        {
            question: "How much is a taxi from Jeddah Airport to Makkah?",
            answer: "Our fixed price for a standard taxi from Jeddah Airport (KAIA) to Makkah starts from 150 SAR. This is an all-inclusive price with no hidden fees or surge pricing."
        },
        {
            question: "What happens if my flight is delayed?",
            answer: "We track your flight in real-time. If there is a delay, your driver will automatically adjust the pickup time at no extra cost to you. Your driver will be waiting in the arrival hall with your name on a board."
        },
        {
            question: "Can I book a taxi for Umrah inter-city travel?",
            answer: "Yes, we specialize in Umrah transport between Makkah and Madinah, as well as Ziyarat tours to historical sites. You can book a one-way trip or a full package for your entire stay."
        },
        {
            question: "Are child seats available in your vehicles?",
            answer: "Yes, we prioritize family safety. Child seats are available upon request during the booking process to ensure a safe journey for your little ones."
        }
    ];

    return (
        <section className="section-lg bg-light">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="section-title">Common Questions</h2>
                    <p className="section-subtitle">Everything you need to know about our Saudi taxi services.</p>
                </div>
                <div className={styles.grid}>
                    {faqs.map((faq, index) => (
                        <div key={index} className={styles.faqCard}>
                            <h3 className={styles.question}>
                                <HelpCircle size={20} className={styles.icon} />
                                {faq.question}
                            </h3>
                            <p className={styles.answer}>{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
