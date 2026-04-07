import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Saudi Taxi Service",
    description: "Read our privacy policy to understand how Saudi Taxi Service collects, uses and protects your personal information.",
};

export default function PrivacyPolicy() {
    return (
        <main>
            <section className="page-hero">
                <h1>Privacy Policy</h1>
                <p>Your privacy matters to us. This policy explains how we handle your personal data.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Privacy Policy</span>
                </div>
            </section>

            <section className="section-lg">
                <div className="container" style={{ maxWidth: '860px' }}>
                    <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: '3rem' }}>

                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            <strong>Last Updated:</strong> January 7, 2024
                        </p>

                        {[
                            {
                                title: "1. Introduction",
                                content: "Welcome to Saudi Taxi Service ('we,' 'our,' or 'us'). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services or visit our website at saudiataxi.com."
                            },
                            {
                                title: "2. Information We Collect",
                                content: "We may collect personal information that you voluntarily provide to us when you book a service, contact us, or register on our website. This may include: your full name, email address, phone number (including WhatsApp), travel dates and destinations, number of passengers, payment information, and any special requirements or preferences. We also collect usage data such as your IP address, browser type, pages visited, and cookies for analytical purposes."
                            },
                            {
                                title: "3. How We Use Your Information",
                                content: "We use the information we collect to: process and confirm your bookings, communicate with you regarding your reservations, improve our services and website experience, send promotional communications (with your consent), comply with legal obligations, and resolve disputes and troubleshoot issues."
                            },
                            {
                                title: "4. Sharing Your Information",
                                content: "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may share your information with trusted third parties who assist us in operating our services — such as payment processors and booking platforms — provided those parties agree to keep this information confidential. We may also disclose your information when required by law or to protect our rights."
                            },
                            {
                                title: "5. Cookies",
                                content: "Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our website may not function properly without cookies."
                            },
                            {
                                title: "6. Data Security",
                                content: "We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure."
                            },
                            {
                                title: "7. Data Retention",
                                content: "We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. Booking records are typically retained for 7 years to comply with financial and legal requirements."
                            },
                            {
                                title: "8. Your Rights",
                                content: "Depending on your location, you may have the right to access, update, or delete the personal information we hold about you. To exercise these rights, please contact us using the details below. We will respond to all legitimate requests within 30 days."
                            },
                            {
                                title: "9. Third-Party Links",
                                content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or the content of those websites. We encourage you to review the privacy policy of any site you visit."
                            },
                            {
                                title: "10. Changes to This Privacy Policy",
                                content: "We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated date. We encourage you to review this policy periodically."
                            },
                            {
                                title: "11. Contact Us",
                                content: "If you have any questions or concerns about this Privacy Policy, please contact us at: Email: info@saudiataxi.com | Phone: +966 50 123 4567 | Address: Saudi Arabia"
                            },
                        ].map((section, i) => (
                            <div key={i} style={{ marginBottom: '2.5rem' }}>
                                <h2 style={{ fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '0.75rem', fontFamily: 'var(--font-heading)' }}>
                                    {section.title}
                                </h2>
                                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', margin: 0 }}>{section.content}</p>
                            </div>
                        ))}

                        <div style={{
                            background: 'var(--gray-100)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.5rem',
                            borderLeft: '4px solid var(--secondary)',
                        }}>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                By using Saudi Taxi Service, you consent to the terms of this Privacy Policy. If you do not agree with this policy, please do not use our services.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-3">
                        <Link href="/contact-us" className="btn btn-primary">Have Questions? Contact Us</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
