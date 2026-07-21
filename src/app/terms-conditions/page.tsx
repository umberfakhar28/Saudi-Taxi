import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { PHONE_DISPLAY } from "@/lib/contact";

export const metadata = generatePageMetadata({
    title: "Terms & Conditions | Gulf Trip Service",
    description: "Read the terms and conditions for booking with Gulf Trip Service, including our free 24-hour cancellation policy, pricing, and passenger responsibilities.",
    path: "/terms-conditions",
});

const sections = [
    {
        title: "1. Booking & Confirmation",
        content: "A booking is confirmed once you receive confirmation via WhatsApp, phone, or email from Gulf Trip Service. Please review your pickup point, destination, date and time carefully before confirming — it is your responsibility to ensure these details are accurate.",
    },
    {
        title: "2. Cancellation Policy",
        content: "You may cancel your booking free of charge up to 24 hours before the scheduled pickup time, with a full refund of any amount paid in advance. Cancellations made less than 24 hours before pickup may be subject to a cancellation fee to cover driver allocation. No-shows without prior notice are non-refundable.",
    },
    {
        title: "3. Pricing & Payment",
        content: "All fares are fixed and agreed upon at the time of booking — there is no surge pricing and no hidden fees. Additional charges may apply only for confirmed route changes, extra stops, or waiting time beyond the agreed grace period. We accept cash, card, and online payment.",
    },
    {
        title: "4. Passenger Responsibilities",
        content: "Passengers are responsible for providing accurate flight/travel details, being ready at the agreed pickup time and location, and complying with local laws (including seatbelt and child-seat requirements where applicable). Gulf Trip Service is not liable for delays caused by incorrect information provided by the passenger.",
    },
    {
        title: "5. Vehicle & Driver Conduct",
        content: "All vehicles are licensed, insured, and regularly maintained. All drivers are professionally vetted. If you experience an issue with a vehicle or driver, please contact us immediately so we can resolve it.",
    },
    {
        title: "6. Liability",
        content: "Gulf Trip Service is not liable for delays or losses caused by circumstances beyond our reasonable control, including but not limited to traffic, weather, border-crossing delays, or force majeure events.",
    },
    {
        title: "7. Changes to These Terms",
        content: "We may update these Terms & Conditions from time to time. Any changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the revised terms.",
    },
    {
        title: "8. Contact Us",
        content: `Questions about these terms or a cancellation? Contact us at: Email: info@gulftripservice.com | Phone: ${PHONE_DISPLAY} | Address: Saudi Arabia`,
    },
];

export default function TermsConditionsPage() {
    return (
        <main>
            <section className="page-hero">
                <h1>Terms &amp; Conditions</h1>
                <p>Please read these terms carefully before booking a ride with Gulf Trip Service.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Terms &amp; Conditions</span>
                </div>
            </section>

            <section className="section-lg">
                <div className="container" style={{ maxWidth: '860px' }}>
                    <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: '3rem' }}>

                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            <strong>Last Updated:</strong> July 21, 2026
                        </p>

                        {sections.map((section, i) => (
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
                                By booking with Gulf Trip Service, you agree to these Terms &amp; Conditions. If you do not agree, please do not use our services.
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
