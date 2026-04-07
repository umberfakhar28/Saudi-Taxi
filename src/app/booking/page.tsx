
"use client";

import styles from './booking.module.css';
import { useState } from 'react';

export default function BookingPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        passengers: 1,
        date: '',
        time: '',
        pickup: '',
        dropoff: '',
        service: 'transfer'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Booking Request Submitted! \nName: ${formData.name} \nService: ${formData.service}`);
        // Here you would integrate with an API
    };

    return (
        <main>
            <div className={styles.header}>
                <h1 className={styles.title}>Book Your Ride</h1>
                <p>Secure specific transport for your next journey</p>
            </div>

            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                className={styles.input}
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Passengers</label>
                            <input
                                type="number"
                                name="passengers"
                                className={styles.input}
                                min="1"
                                max="10"
                                value={formData.passengers}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Service Type</label>
                            <select
                                name="service"
                                className={styles.select}
                                value={formData.service}
                                onChange={handleChange}
                            >
                                <option value="transfer">Airport Transfer</option>
                                <option value="hourly">Hourly Chauffeur</option>
                                <option value="city_tour">City Tour</option>
                                <option value="hajj">Hajj & Umrah Transport</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Date & Time</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="date"
                                    name="date"
                                    className={styles.input}
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    type="time"
                                    name="time"
                                    className={styles.input}
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Pickup Location</label>
                        <input
                            type="text"
                            name="pickup"
                            className={styles.input}
                            placeholder="Enter hotel, airport, or address"
                            value={formData.pickup}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Dropoff Location</label>
                        <input
                            type="text"
                            name="dropoff"
                            className={styles.input}
                            placeholder="Enter destination"
                            value={formData.dropoff}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Confirm Booking Request
                    </button>
                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: '1rem' }}>
                        *Payment will be processed after confirmation.
                    </p>
                </form>
            </div>
        </main>
    );
}
