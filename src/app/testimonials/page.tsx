import Link from "next/link";
import type { Metadata } from "next";
import AnimatedCounter from "@/components/AnimatedCounter";
import styles from "./testimonials.module.css";

export const metadata: Metadata = {
    title: "Testimonials | What Our Customers Say | Saudi Taxi Service",
    description: "Read testimonials from satisfied customers who used our taxi services in Makkah, Jeddah & Madinah. Real reviews from real pilgrims.",
};

const testimonials = [
    {
        name: "Ahmad Al-Farsi",
        location: "London, UK",
        rating: 5,
        service: "Airport Transfer",
        text: "Excellent service from start to finish. The driver was waiting at the airport with my name on a board. Very professional, clean car, and the price was exactly as quoted. Highly recommended for anyone traveling for Umrah!",
        date: "January 2026",
    },
    {
        name: "Fatima Binti Hassan",
        location: "Kuala Lumpur, Malaysia",
        rating: 5,
        service: "Umrah Taxi Package",
        text: "We used Makkah Taxi Service for our entire Umrah trip — airport pickup, hotel transfers, and Ziyarat tours. The driver was knowledgeable, patient, and treated our family like his own. Will definitely use again, InshaAllah.",
        date: "December 2025",
    },
    {
        name: "Muhammad Yusuf",
        location: "Islamabad, Pakistan",
        rating: 5,
        service: "Jeddah to Makkah",
        text: "I was worried about transportation as it was my first Umrah. But the booking process was so simple via WhatsApp, and the driver arrived exactly on time. The journey from Jeddah to Makkah was very comfortable. JazakAllah Khair!",
        date: "November 2025",
    },
    {
        name: "Sarah Johnson",
        location: "Toronto, Canada",
        rating: 5,
        service: "Airport Transfer",
        text: "As a solo female traveler, safety was my top concern. The driver was very respectful and professional. The car was spotless and comfortable. I felt completely safe throughout the journey. Thank you for a wonderful experience!",
        date: "October 2025",
    },
    {
        name: "Abdullah bin Rashid",
        location: "Dubai, UAE",
        rating: 4,
        service: "Makkah to Madinah",
        text: "Very good service for our family trip from Makkah to Madinah. The SUV was spacious enough for our family of 5 with all luggage. Driver was excellent. Only minor issue was a slight delay at pickup, but overall very satisfied.",
        date: "September 2025",
    },
    {
        name: "Aisha Ahmed",
        location: "Cairo, Egypt",
        rating: 5,
        service: "Umrah Taxi Package",
        text: "Alhamdulillah, the best taxi service in Makkah! We booked a multi-day package and the driver was available whenever we needed. He even helped us find a good restaurant near our hotel. Five stars without hesitation!",
        date: "August 2025",
    },
    {
        name: "Ibrahim Dembélé",
        location: "Paris, France",
        rating: 5,
        service: "Airport Transfer",
        text: "Ponctuel et professionnel! The driver spoke both Arabic and English which was very helpful. Flight was delayed by 2 hours but they tracked it and were still there waiting. Exceptional service!",
        date: "July 2025",
    },
    {
        name: "Khadija Osman",
        location: "Istanbul, Turkey",
        rating: 5,
        service: "Jeddah to Makkah",
        text: "We traveled with elderly parents who needed extra care. The driver was incredibly patient and helpful, assisting with wheelchairs and luggage. The vehicle was very comfortable. Allah reward you for your kindness!",
        date: "June 2025",
    },
    {
        name: "Bilal Memmon",
        location: "Mumbai, India",
        rating: 4,
        service: "Ziyarat Tour",
        text: "Booked a Ziyarat tour in Madinah. The driver was very knowledgeable about all the historical sites and gave us useful information. Good value for money. Would recommend to friends and family.",
        date: "May 2025",
    },
];

const stats = [
    { number: "4.9/5", label: "Average Rating" },
    { number: "15,000+", label: "Happy Customers" },
    { number: "98%", label: "Would Recommend" },
    { number: "10+", label: "Years of Service" },
];

export default function Testimonials() {
    return (
        <main>
            {/* Hero */}
            <section className="page-hero">
                <h1>Customer Testimonials</h1>
                <p>
                    Don&apos;t just take our word for it — hear from the thousands of pilgrims and travelers who trust our service.
                </p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Testimonials</span>
                </div>
            </section>

            {/* Stats */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
                padding: '4rem 0',
                borderBottom: '1px solid var(--gray-200)',
            }}>
                <div className="container">
                    <div className="grid-4" style={{ textAlign: 'center' }}>
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <div style={{
                                    fontSize: '2.8rem',
                                    fontWeight: 700,
                                    color: 'var(--secondary)',
                                    fontFamily: 'var(--font-heading)',
                                    lineHeight: 1,
                                    marginBottom: '0.75rem',
                                }}>
                                    <AnimatedCounter end={stat.number} />
                                </div>
                                <div style={{
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    fontWeight: 600,
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <section className="section-lg">
                <div className="container">
                    <h2 className="section-title">What Our Customers Say</h2>
                    <p className="section-subtitle">
                        Real reviews from real customers. Every testimonial represents a genuine experience with our service.
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
                </div>
            </section>

            {/* CTA */}
            <section style={{
                background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
                padding: '5rem 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <h2 style={{ color: 'var(--white)', marginBottom: '1rem' }}>Join Our Satisfied Customers</h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        Experience the service that thousands of pilgrims trust. Book your ride today.
                    </p>
                    <Link href="/booking" className="btn btn-primary btn-lg">
                        Book Your Ride
                    </Link>
                </div>
            </section>
        </main>
    );
}
