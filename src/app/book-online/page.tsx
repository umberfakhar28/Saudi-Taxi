'use client';

import { useState } from "react";
import Link from "next/link";

const services = [
    { id: "airport-transfer", label: "Airport Transfer", icon: "✈️", price: "150 SAR" },
    { id: "hotel-transfer", label: "Hotel Transfer", icon: "🏨", price: "80 SAR" },
    { id: "private-taxi", label: "Private Taxi", icon: "🚗", price: "200 SAR" },
    { id: "umrah-package", label: "Umrah Transport Package", icon: "🕌", price: "350 SAR" },
    { id: "ziyarat", label: "Ziyarat Tour", icon: "🌙", price: "300 SAR" },
    { id: "jeddah-tour", label: "Jeddah City Tour", icon: "🌆", price: "250 SAR" },
];

export default function BookOnline() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: '',
        from: '',
        to: '',
        date: '',
        time: '',
        passengers: '1',
        name: '',
        email: '',
        phone: '',
        notes: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main>
            <section className="page-hero">
                <h1>Book Online</h1>
                <p>Reserve your taxi or transport service in Saudi Arabia quickly and easily. Instant confirmation.</p>
                <div className="breadcrumb">
                    <Link href="/">Home</Link> / <span>Book Online</span>
                </div>
            </section>

            <section className="section-lg">
                <div className="container" style={{ maxWidth: '800px' }}>

                    {submitted ? (
                        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✅</div>
                            <h2 style={{ color: 'var(--primary)' }}>Booking Request Received!</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                                Thank you, <strong>{formData.name}</strong>! We&apos;ll confirm your booking within 30 minutes via WhatsApp or email.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href="/" className="btn btn-primary">Back to Home</Link>
                                <a href="https://wa.me/966501234567" className="btn btn-outline-gold" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Progress Steps */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', gap: '0' }}>
                                {['Select Service', 'Trip Details', 'Your Info'].map((label, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '40px', height: '40px', borderRadius: '50%',
                                                background: step > i + 1 ? 'var(--success)' : step === i + 1 ? 'linear-gradient(135deg, var(--secondary), var(--secondary-light))' : 'var(--gray-300)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem',
                                                color: step >= i + 1 ? 'var(--primary)' : 'var(--gray-500)', fontWeight: 700,
                                                fontSize: '0.9rem',
                                            }}>
                                                {step > i + 1 ? '✓' : i + 1}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: step === i + 1 ? 'var(--primary)' : 'var(--text-muted)', fontWeight: step === i + 1 ? 600 : 400, whiteSpace: 'nowrap' }}>{label}</div>
                                        </div>
                                        {i < 2 && <div style={{ width: '80px', height: '2px', background: step > i + 1 ? 'var(--secondary)' : 'var(--gray-300)', margin: '0 0.5rem 1.5rem' }} />}
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Step 1: Select Service */}
                                {step === 1 && (
                                    <div className="card">
                                        <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Select Your Service</h2>
                                        <div className="grid-2">
                                            {services.map((svc) => (
                                                <label key={svc.id} style={{
                                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                                    padding: '1.2rem 1.5rem', borderRadius: 'var(--radius-md)',
                                                    border: `2px solid ${formData.service === svc.id ? 'var(--secondary)' : 'var(--gray-300)'}`,
                                                    cursor: 'pointer', transition: 'all 0.2s',
                                                    background: formData.service === svc.id ? 'rgba(212,175,55,0.08)' : 'var(--white)',
                                                }}>
                                                    <input type="radio" name="service" value={svc.id} checked={formData.service === svc.id} onChange={handleChange} style={{ display: 'none' }} />
                                                    <span style={{ fontSize: '1.8rem' }}>{svc.icon}</span>
                                                    <div>
                                                        <div style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>{svc.label}</div>
                                                        <div style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '0.85rem' }}>From {svc.price}</div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                                            <button type="button" className="btn btn-primary" onClick={() => formData.service && setStep(2)} style={{ opacity: formData.service ? 1 : 0.5 }}>
                                                Next: Trip Details →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Trip Details */}
                                {step === 2 && (
                                    <div className="card">
                                        <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Trip Details</h2>
                                        <div className="grid-2">
                                            <div className="form-group">
                                                <label className="form-label">Pickup Location *</label>
                                                <input type="text" name="from" className="form-input" placeholder="e.g. Jeddah Airport" value={formData.from} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Drop-off Location *</label>
                                                <input type="text" name="to" className="form-input" placeholder="e.g. Makkah Hotel" value={formData.to} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Travel Date *</label>
                                                <input type="date" name="date" className="form-input" value={formData.date} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Pickup Time *</label>
                                                <input type="time" name="time" className="form-input" value={formData.time} onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Number of Passengers *</label>
                                            <select name="passengers" className="form-select" value={formData.passengers} onChange={handleChange}>
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} passenger{n > 1 ? 's' : ''}</option>)}
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                            <button type="button" className="btn btn-outline-gold" onClick={() => setStep(1)}>← Back</button>
                                            <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Next: Your Info →</button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Personal Info */}
                                {step === 3 && (
                                    <div className="card">
                                        <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Your Information</h2>
                                        <div className="grid-2">
                                            <div className="form-group">
                                                <label className="form-label">Full Name *</label>
                                                <input type="text" name="name" className="form-input" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Email Address *</label>
                                                <input type="email" name="email" className="form-input" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Phone / WhatsApp *</label>
                                            <input type="tel" name="phone" className="form-input" placeholder="+966 50 123 4567" value={formData.phone} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Special Requirements / Notes</label>
                                            <textarea name="notes" className="form-textarea" placeholder="Any special requests, wheelchair access, extra luggage, etc." value={formData.notes} onChange={handleChange} rows={4} />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                                            <button type="button" className="btn btn-outline-gold" onClick={() => setStep(2)}>← Back</button>
                                            <button type="submit" className="btn btn-primary btn-lg">Confirm Booking ✓</button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </>
                    )}

                    {/* WhatsApp Alternative */}
                    <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)' }}>
                        <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem' }}>Prefer to book instantly via WhatsApp?</p>
                        <a href="https://wa.me/966501234567" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            💬 Book via WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
