'use client';

import { useState } from "react";
import Link from "next/link";

const paymentMethods = [
    { icon: "💳", name: "Credit / Debit Card", description: "Visa, Mastercard, American Express" },
    { icon: "🏦", name: "Bank Transfer", description: "Direct bank transfer to our Saudi account" },
    { icon: "📱", name: "Saudi Pay", description: "Pay via STC Pay, Mada or similar" },
    { icon: "💵", name: "Cash on Arrival", description: "Pay the driver in Saudi Riyals" },
];

export default function PayOnline() {
    const [formData, setFormData] = useState({
        bookingId: '',
        amount: '',
        name: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        cardName: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [payMethod, setPayMethod] = useState('card');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main>
            <section className="page-hero">
                <h1>Pay Online</h1>
                <p>Securely pay for your Saudi Taxi booking online. Quick, safe and convenient.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Pay Online</span>
                </div>
            </section>

            <section className="section-lg">
                <div className="container" style={{ maxWidth: '900px' }}>
                    {submitted ? (
                        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✅</div>
                            <h2 style={{ color: 'var(--primary)' }}>Payment Successful!</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                                Thank you, <strong>{formData.name}</strong>. Your payment has been received.
                            </p>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                A confirmation receipt will be sent to <strong>{formData.email}</strong>.
                            </p>
                            <Link href="/" className="btn btn-primary">Back to Home</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem', alignItems: 'start' }}>

                            {/* Left: Payment Methods */}
                            <div>
                                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Payment Methods</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {paymentMethods.map((method, i) => (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center', gap: '1rem',
                                            padding: '1rem 1.25rem', background: 'var(--white)',
                                            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)',
                                            cursor: 'pointer',
                                            border: (payMethod === 'card' && i === 0) || (payMethod === 'bank' && i === 1) ? '2px solid var(--secondary)' : '2px solid transparent',
                                        }} onClick={() => setPayMethod(i === 0 ? 'card' : i === 1 ? 'bank' : 'other')}>
                                            <span style={{ fontSize: '1.8rem' }}>{method.icon}</span>
                                            <div>
                                                <div style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>{method.name}</div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{method.description}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{
                                    marginTop: '2rem', padding: '1.25rem',
                                    background: 'rgba(212,175,55,0.1)', borderRadius: 'var(--radius-md)',
                                    borderLeft: '4px solid var(--secondary)',
                                }}>
                                    <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        🔒 <strong>Secure Payment</strong> — Your payment details are encrypted and processed securely. We never store card information.
                                    </p>
                                </div>
                            </div>

                            {/* Right: Payment Form */}
                            <div className="card">
                                <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Payment Details</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Booking Reference ID *</label>
                                        <input type="text" name="bookingId" className="form-input" placeholder="e.g. ST-2024-0001" value={formData.bookingId} onChange={handleChange} required />
                                    </div>
                                    <div className="grid-2">
                                        <div className="form-group">
                                            <label className="form-label">Amount *</label>
                                            <input type="number" name="amount" className="form-input" placeholder="0.00" value={formData.amount} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Your Name *</label>
                                            <input type="text" name="name" className="form-input" placeholder="Card holder name" value={formData.name} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email Address *</label>
                                        <input type="email" name="email" className="form-input" placeholder="For payment receipt" value={formData.email} onChange={handleChange} required />
                                    </div>

                                    <div style={{ height: '1px', background: 'var(--gray-200)', margin: '1.5rem 0' }} />

                                    <h3 style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '1rem' }}>Card Details</h3>
                                    <div className="form-group">
                                        <label className="form-label">Card Number *</label>
                                        <input type="text" name="cardNumber" className="form-input" placeholder="1234 5678 9012 3456" maxLength={19} value={formData.cardNumber} onChange={handleChange} required />
                                    </div>
                                    <div className="grid-2">
                                        <div className="form-group">
                                            <label className="form-label">Expiry Date *</label>
                                            <input type="text" name="expiry" className="form-input" placeholder="MM/YY" maxLength={5} value={formData.expiry} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">CVV *</label>
                                            <input type="text" name="cvv" className="form-input" placeholder="123" maxLength={4} value={formData.cvv} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                        🔒 Pay Securely
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="text-center mt-3">
                        <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Need help with payment? Contact us:</p>
                        <a href="https://wa.me/966501234567" className="btn btn-outline-gold" target="_blank" rel="noopener noreferrer">💬 WhatsApp Support</a>
                    </div>
                </div>
            </section>
        </main>
    );
}
