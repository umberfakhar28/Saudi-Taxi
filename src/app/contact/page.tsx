
import styles from './contact.module.css';
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Contact Us",
    description: "Contact Gulf Trip Service via phone, WhatsApp, or email. Get a quote, book a ride, or ask questions. Available 24/7 for all your transport needs.",
    path: "/contact",
    keywords: ["contact Gulf Trip Service", "Saudi taxi customer support", "Makkah taxi phone number"],
    noindex: true,
});

export default function ContactPage() {
    return (
        <main>
            <div className={styles.header}>
                <h1 className={styles.title}>Contact Us</h1>
                <p>We are here to assist you 24/7</p>
            </div>

            <section className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.info}>
                        <h2>Get In Touch</h2>
                        <p>For bookings, inquiries, or support, please reach out to us using the details below.</p>

                        <div className={styles.contactItem}>
                            <strong>📍 Address:</strong>
                            <p>King Fahd Road, Olaya District, Riyadh, Saudi Arabia</p>
                        </div>

                        <div className={styles.contactItem}>
                            <strong>📞 Phone:</strong>
                            <p>+966 12 345 6789</p>
                        </div>

                        <div className={styles.contactItem}>
                            <strong>✉️ Email:</strong>
                            <p>support@gulftripservice.com</p>
                        </div>

                        <div className={styles.map}>
                            {/* Placeholder for Google Map */}
                            <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Google Map Placeholder
                            </div>
                        </div>
                    </div>

                    <form className={styles.form}>
                        <h3>Send us a Message</h3>
                        <div className={styles.inputGroup}>
                            <label>Name</label>
                            <input type="text" className={styles.input} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <input type="email" className={styles.input} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Subject</label>
                            <input type="text" className={styles.input} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Message</label>
                            <textarea className={styles.textarea} rows={5} required></textarea>
                        </div>
                        <button type="submit" className={styles.submitBtn}>Send Message</button>
                    </form>
                </div>
            </section>
        </main>
    );
}
