'use client';

import { useState } from "react";
import Link from "next/link";

const bookingSummary = {
    service: "Airport Transfer — Jeddah Airport → Makkah",
    date: "To be selected during booking",
    passengers: "1-4",
    price: "150 SAR",
};

export default function Checkout() {
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '',
        cardNumber: '', expiry: '', cvv: '',
        notes: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <main>
                <section style={{
                    minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '6rem 1rem', textAlign: 'center',
                }}>
                    <div style={{ maxWidth: '500px' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✅</div>
                        <h1 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Order Confirmed!</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                            Your booking has been confirmed. A confirmation will be sent to <strong>{formData.email}</strong>.
                        </p>
                        <Link href="/" className="btn btn-primary btn-lg">Back to Home</Link>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main>
            <section className="page-hero">
                <h1>Checkout</h1>
                <p>Complete your booking by providing your details and payment information.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <Link href="/cart">Cart</Link> / <span>Checkout</span>
                </div>
            </section>

            <section className="section-lg bg-light">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', alignItems: 'start' }}>

                        {/* Left: Checkout Form */}
                        <form onSubmit={handleSubmit} className="card">
                            <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Your Details</h2>

                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input type="text" name="name" className="form-input" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address *</label>
                                <input type="email" name="email" className="form-input" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone / WhatsApp *</label>
                                <input type="tel" name="phone" className="form-input" placeholder="+966 50 123 4567" value={formData.phone} onChange={handleChange} required />
                            </div>

                            <div style={{ height: '1px', background: 'var(--gray-200)', margin: '1.5rem 0' }} />
                            <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '1rem' }}>Payment Details</h3>

                            <div className="form-group">
                                <label className="form-label">Card Number *</label>
                                <input type="text" name="cardNumber" className="form-input" placeholder="1234 5678 9012 3456" maxLength={19} value={formData.cardNumber} onChange={handleChange} required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Expiry (MM/YY) *</label>
                                    <input type="text" name="expiry" className="form-input" placeholder="MM/YY" maxLength={5} value={formData.expiry} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">CVV *</label>
                                    <input type="text" name="cvv" className="form-input" placeholder="123" maxLength={4} value={formData.cvv} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Special Requests (Optional)</label>
                                <textarea name="notes" className="form-textarea" placeholder="Any special requirements..." value={formData.notes} onChange={handleChange} rows={3} />
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                🔒 Complete Booking
                            </button>
                        </form>

                        {/* Right: Order Summary */}
                        <div>
                            <div className="card">
                                <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Order Summary</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ padding: '1rem', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)' }}>
                                        <p style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.25rem', fontSize: '0.95rem' }}>{bookingSummary.service}</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>Passengers: {bookingSummary.passengers}</p>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Service Fee</span>
                                        <span style={{ fontWeight: 600 }}>{bookingSummary.price}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>VAT (15%)</span>
                                        <span style={{ fontWeight: 600 }}>22.5 SAR</span>
                                    </div>
                                    <div style={{ height: '1px', background: 'var(--gray-200)' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Total</span>
                                        <span style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>172.5 SAR</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '1rem', padding: '1rem 1.25rem', background: 'rgba(212,175,55,0.1)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--secondary)' }}>
                                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                    🔒 Secure, encrypted checkout. Your info is never shared.
                                </p>
                            </div>

                            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Questions? Contact us:</p>
                                <a href="https://wa.me/966501234567" className="btn btn-outline-gold btn-sm" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
