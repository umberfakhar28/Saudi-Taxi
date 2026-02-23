import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cart | Saudi Taxi Service",
    description: "Review your selected Saudi Taxi services before checkout.",
};

export default function Cart() {
    return (
        <main>
            <section className="page-hero">
                <h1>Your Cart</h1>
                <p>Review your selected services before proceeding to checkout.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Cart</span>
                </div>
            </section>

            <section className="section-lg">
                <div className="container" style={{ maxWidth: '700px' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🛒</div>
                        <h2 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>Your Cart is Empty</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem' }}>
                            You haven&apos;t added any services yet. Browse our transport options and book your ride.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/our-services" className="btn btn-primary">Browse Services</Link>
                            <Link href="/book-online" className="btn btn-outline-gold">Book Now</Link>
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Our Services</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { icon: "✈️", name: "Airport Transfers", link: "/airport-transfers" },
                                { icon: "🏨", name: "Hotel Transfers", link: "/hotel-transfers" },
                                { icon: "🕌", name: "Umrah Transport Package", link: "/umrah-transport-package" },
                                { icon: "🌙", name: "Ziyarat Tours", link: "/ziyarat-services-in-saudi-arabia" },
                                { icon: "🚗", name: "Private Taxi", link: "/private-taxi" },
                            ].map((svc, i) => (
                                <Link key={i} href={svc.link} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                                    padding: '0.75rem 1rem', background: 'var(--white)',
                                    borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)',
                                    color: 'var(--text-dark)', fontWeight: 500, fontSize: '0.95rem',
                                    transition: 'all 0.2s',
                                }}>
                                    <span style={{ fontSize: '1.4rem' }}>{svc.icon}</span>
                                    {svc.name}
                                    <span style={{ marginLeft: 'auto', color: 'var(--secondary)', fontWeight: 700 }}>→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
