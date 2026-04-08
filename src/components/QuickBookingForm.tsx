"use client";

import { useState } from "react";
import { CarIcon, MapPinIcon, CalendarIcon, PhoneIcon, ArrowRightIcon } from "./Icons";

export default function QuickBookingForm() {
    const [formData, setFormData] = useState({
        pickup: "",
        dropoff: "",
        date: "",
        phone: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Construct WhatsApp message or redirect to booking page
        const message = `Assalamu Alaikum, I would like to book a ride.%0AFrom: ${formData.pickup}%0ATo: ${formData.dropoff}%0ADate: ${formData.date}%0APhone: ${formData.phone}`;
        window.open(`https://wa.me/966501234567?text=${message}`, '_blank');
    };

    return (
        <section className="section-lg bg-subtle" id="booking">
            <div className="container">
                <div className="section-header centered">
                    <span className="section-eyebrow">Quick Booking</span>
                    <h2 className="section-title">Get a Quote Instantly</h2>
                    <p className="section-subtitle">
                        Fill in basic details to get an immediate fare estimate and book your professional taxi service.
                    </p>
                </div>

                <div className="card" style={{ 
                    padding: '3rem', 
                    maxWidth: '1000px', 
                    margin: '0 auto',
                    background: 'var(--white)',
                    boxShadow: 'var(--shadow-xl)',
                    borderRadius: 'var(--radius-xl)'
                }}>
                    <form onSubmit={handleSubmit} style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                        gap: '1.5rem',
                        alignItems: 'end'
                    }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPinIcon size={14} style={{ color: 'var(--secondary)' }} /> Pickup Location
                            </label>
                            <input 
                                type="text" 
                                className="form-input" 
                                placeholder="e.g. Jeddah Airport" 
                                required 
                                value={formData.pickup}
                                onChange={(e) => setFormData({...formData, pickup: e.target.value})}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPinIcon size={14} style={{ color: 'var(--accent)' }} /> Dropoff Location
                            </label>
                            <input 
                                type="text" 
                                className="form-input" 
                                placeholder="e.g. Makkah Hotel" 
                                required 
                                value={formData.dropoff}
                                onChange={(e) => setFormData({...formData, dropoff: e.target.value})}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CalendarIcon size={14} style={{ color: 'var(--secondary)' }} /> Travel Date
                            </label>
                            <input 
                                type="date" 
                                className="form-input" 
                                required 
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <PhoneIcon size={14} style={{ color: 'var(--accent)' }} /> Phone Number
                            </label>
                            <input 
                                type="tel" 
                                className="form-input" 
                                placeholder="+966..." 
                                required 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', height: '52px', padding: 0 }}>
                            Get Quote <ArrowRightIcon size={18} style={{ marginLeft: '10px' }} />
                        </button>
                    </form>
                    
                    <div style={{ 
                        marginTop: '2rem', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '2rem',
                        flexWrap: 'wrap',
                        borderTop: '1px solid var(--gray-100)',
                        paddingTop: '1.5rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span> Instant Fare
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span> 24/7 Availability
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span> Professional Drivers
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
