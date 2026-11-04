import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import styles from "./testimonials.module.css";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { waLink } from "@/lib/contact";

export const metadata = generatePageMetadata({
    title: "Customer Reviews | Gulf Trip Service",
    description: "Share your experience of Gulf Trip Service, or read reviews from customers who have travelled with us across Saudi Arabia and the Gulf.",
    path: "/testimonials",
    keywords: ["taxi testimonials", "customer reviews Saudi Arabia", "Umrah taxi reviews", "Saudi taxi reviews"],
});

const schemas = [
    breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Testimonials", path: "/testimonials" }]),
];

export interface Testimonial {
    name: string;
    location: string;
    rating: number;
    service: string;
    text: string;
    date: string;
}

/**
 * Deliberately empty.
 *
 * Ten testimonials used to sit here, each with a name, a city, a five-star
 * rating and a date. All ten were invented. A stats band above them claimed
 * a 4.9/5 average rating, 15,000+ happy customers and 98% would recommend --
 * none of which was a measurement of anything.
 *
 * The page, its URL and its card markup are kept so genuine reviews can be
 * dropped straight in. While this array is empty the page says so honestly
 * and asks for a review instead of showing an empty grid. Do not seed it
 * with samples: anything in this array is published as a real customer's words.
 */
const testimonials: Testimonial[] = [];

export default function Testimonials() {
    return (
        <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Customer Reviews</h1>
                <p>
                    Travelled with us? Tell us how it went — your feedback is read by the people who run the service.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Testimonials</span>
                </div>
            </section>

            {/* A stats band stood here showing "4.9/5 Average Rating", "15,000+
                Happy Customers", "98% Would Recommend" and "10+ Years of
                Service". The first three were invented, so the whole band was
                removed rather than left standing on one true number. */}

            {/* Reviews, when there are real ones. While the testimonials array
                is empty this renders the invitation below, never an empty grid. */}
            <section className="section-lg">
                <div className="container">
                    {testimonials.length > 0 ? (
                        <>
                            <h2 className="section-title">What Our Customers Say</h2>
                            <p className="section-subtitle">
                                Reviews left by customers who have travelled with us.
                            </p>
                            <div className={styles.testimonialGrid}>
                                {testimonials.map((testimonial, i) => (
                                    <div key={i} className={styles.testimonialCard}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.avatar}>
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className={styles.name}>{testimonial.name}</h4>
                                                <p className={styles.location}>{testimonial.location}</p>
                                            </div>
                                        </div>
                                        <div className={styles.rating}>
                                            {Array.from({ length: 5 }, (_, j) => (
                                                <span key={j} className={j < testimonial.rating ? styles.starFilled : styles.starEmpty}>
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <span className={styles.serviceBadge}>{testimonial.service}</span>
                                        <p className={styles.text}>&quot;{testimonial.text}&quot;</p>
                                        <p className={styles.date}>{testimonial.date}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
                            <h2 className="section-title">Share Your Experience</h2>
                            <p className="section-subtitle">
                                We are collecting reviews from customers who have travelled with us,
                                and we only publish feedback people have actually given us. If you
                                have used Gulf Trip Service, we would genuinely like to hear how it
                                went — the good and the bad.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
                                <a href={waLink('Hi, I would like to leave a review about my trip.')} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
                                    Leave a Review on WhatsApp
                                </a>
                                <Link href="/contact-us" className="btn btn-outline btn-lg">
                                    Send Us a Message
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
                padding: '5rem 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Book Your Next Trip</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        A price agreed before you travel, and a driver who tracks your flight. Not sure which vehicle fits your group? Check our <Link href="/fleet" style={{ color: 'white', textDecoration: 'underline', fontWeight: 600 }}>fleet</Link> or our <Link href="/faqs" style={{ color: 'white', textDecoration: 'underline', fontWeight: 600 }}>FAQs</Link> first.
                    </p>
                    <Link href="/book-online" className="btn btn-primary btn-lg">
                        Book Your Ride
                    </Link>
                </div>
            </section>
        </main>
        </>
    );
}
