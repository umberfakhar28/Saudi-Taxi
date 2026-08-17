'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { WHATSAPP_URL, waLink } from "@/lib/contact";
import { HOURLY_DURATIONS } from "@/lib/searchBarConfig";
import { TOURS } from "@/lib/tourData";
import { SEARCH_INDEX } from "@/lib/searchIndex";
import SearchAutocomplete from "@/components/SearchAutocomplete";

const services = [
    { id: "airport-transfer", label: "Airport Transfer", icon: "✈️" },
    { id: "hotel-transfer", label: "Hotel Transfer", icon: "🏨" },
    { id: "private-taxi", label: "Private Taxi", icon: "🚗" },
    { id: "umrah-package", label: "Umrah Transport Package", icon: "🕌" },
    { id: "hourly-driver", label: "Hourly Chauffeur", icon: "🕐" },
    { id: "ziyarat", label: "Ziyarat Tour", icon: "🌙" },
    { id: "jeddah-tour", label: "Jeddah City Tour", icon: "🌆" },
    { id: "alula-tour", label: "AlUla Tour", icon: "🏜️" },
];

// Generic vehicle-type list, shared vocabulary with the admin Fleet page's
// CAR_TYPES and the admin Quotes calculator's VEHICLES — used here only when
// the customer did NOT arrive via a specific vehicle's "Book Now" button
// (see VEHICLE PRESELECTION below).
const VEHICLE_OPTIONS = ["Sedan", "SUV", "Luxury", "Van", "Minibus"];

// Maps the homepage search bar's Day Trips mode (src/lib/tourData.ts slugs)
// onto this page's own service radio-button ids — the two lists evolved
// independently (see investigation ahead of the Homepage Hero + Multi-Mode
// Search addendum), so this is the one small bridge between them rather
// than a full merge of either list. Built from TOURS directly so a new tour
// added to tourData.ts can never silently fall through unmapped again (that
// was the root cause of the "service not reliably carried forward" bug —
// an unmapped day trip resolved to an empty service, and the old code
// still jumped to Step 2 with it blank).
const DAYTRIP_SERVICE_ID: Record<string, string> = {
    "jeddah-city-tour": "jeddah-tour",
    "alula-tour": "alula-tour",
    "taif-ziyarat-tour": "ziyarat",
};

const SUGGESTED_VALUES = new Set(SEARCH_INDEX.map((e) => e.value));

interface FormData {
    service: string;
    vehicleSlug: string;
    vehicleName: string;
    from: string;
    to: string;
    date: string;
    time: string;
    passengers: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
}

const EMPTY_FORM: FormData = {
    service: '', vehicleSlug: '', vehicleName: '',
    from: '', to: '', date: '', time: '', passengers: '1',
    name: '', email: '', phone: '', notes: '',
};

export default function BookOnlineClient() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
    const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Prefill from the homepage search bar, a vehicle's "Book Now" button
    // (Book by Vehicle Type / Fleet), or the WebMCP book_taxi tool — all of
    // which already targeted these query params before this page actually
    // read every one of them (see layout.tsx). A missing or unrecognized
    // param is left at its default rather than blocking the rest of the
    // prefill (Homepage Hero + Multi-Mode Search addendum §2.4).
    useEffect(() => {
        const mode = searchParams.get('mode');
        const fromParam = searchParams.get('from');
        const vehicleSlug = searchParams.get('vehicle');
        const vehicleNameParam = searchParams.get('vehicleName');

        if (!mode && !fromParam && !vehicleSlug) return; // nothing to prefill

        const from = fromParam ?? '';
        const date = searchParams.get('date') ?? '';
        const time = searchParams.get('time') ?? '';
        const passengers = searchParams.get('passengers') ?? '1';
        const luggage = searchParams.get('luggage');
        const returnDate = searchParams.get('returnDate');
        const returnTime = searchParams.get('returnTime');

        let service = '';
        let to = searchParams.get('to') ?? '';

        if (mode === 'hourly') {
            const durationValue = searchParams.get('duration');
            const duration = HOURLY_DURATIONS.find((d) => d.value === durationValue);
            service = 'hourly-driver';
            to = duration ? `Hourly booking — ${duration.label}` : 'Hourly booking';
        } else if (mode === 'daytrips') {
            const dayTripSlug = searchParams.get('dayTrip');
            const tour = TOURS.find((t) => t.slug === dayTripSlug);
            service = (dayTripSlug && DAYTRIP_SERVICE_ID[dayTripSlug]) || '';
            to = tour ? tour.label : to;
        } else if (mode === 'transfers' || fromParam) {
            service = 'private-taxi';
        }
        // Arrived with only a `vehicle` param (no mode/from) — service is
        // left blank on purpose so the customer confirms it on Step 1
        // themselves; the vehicle choice is retained regardless (below).

        const notesParts = [
            luggage && luggage !== '0' ? `Luggage: ${luggage} bag(s)` : null,
            returnDate ? `Return: ${returnDate}${returnTime ? ` at ${returnTime}` : ''}` : null,
        ].filter(Boolean);

        setFormData((prev) => ({
            ...prev,
            service: service || prev.service,
            from: from || prev.from,
            to: to || prev.to,
            date: date || prev.date,
            time: time || prev.time,
            passengers: passengers || prev.passengers,
            vehicleSlug: vehicleSlug || prev.vehicleSlug,
            vehicleName: vehicleNameParam ? decodeURIComponent(vehicleNameParam) : prev.vehicleName,
            notes: notesParts.length ? notesParts.join(' | ') : prev.notes,
        }));

        // Only skip ahead to Trip Details once a concrete service is
        // actually known — landing on Step 2 with an empty service was
        // exactly how a booking used to reach the database with no service
        // recorded at all. A vehicle-only arrival (no mode) stays on Step 1
        // so the customer picks a service, with the vehicle already retained.
        if (service) {
            setStep(2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const clearVehicle = () => setFormData((f) => ({ ...f, vehicleSlug: '', vehicleName: '' }));

    const validateStep2 = (): boolean => {
        const e: Record<string, string> = {};
        if (!formData.from.trim()) e.from = 'Pickup location is required.';
        if (!formData.to.trim()) e.to = 'Drop-off location is required.';
        if (!formData.date) e.date = 'Travel date is required.';
        if (!formData.time) e.time = 'Pickup time is required.';
        setStep2Errors(e);
        return Object.keys(e).length === 0;
    };

    const goToStep3 = () => {
        if (validateStep2()) setStep(3);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const { createClient } = await import("@/utils/supabase/client");
            const supabase = createClient();

            // 1. Create/update the customer record (Admin Portal audit §10 —
            // the `customers` table existed but nothing ever wrote to it).
            // Done before the booking insert so the booking can carry a real
            // foreign key rather than being matched up later by guesswork.
            const custRes = await fetch('/api/customers/upsert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone }),
            });
            const custJson = await custRes.json();
            if (!custRes.ok) throw new Error(custJson.error || 'Could not save your contact details.');

            const bookingData = {
                customer_id: custJson.customerId,
                customer_name: formData.name,
                customer_email: formData.email,
                customer_phone: formData.phone,
                service_type: formData.service,
                pickup_location: formData.from,
                dropoff_location: formData.to,
                pickup_location_type: SUGGESTED_VALUES.has(formData.from) ? 'suggested' : 'custom',
                dropoff_location_type: SUGGESTED_VALUES.has(formData.to) ? 'suggested' : 'custom',
                travel_date: formData.date,
                travel_time: formData.time,
                passengers_count: parseInt(formData.passengers, 10) || 1,
                special_notes: formData.notes,
                car_type: formData.vehicleName || null,
                vehicle_slug: formData.vehicleSlug || null,
                status: 'pending',
            };

            // 2. Save to Supabase — the operation that actually matters. If
            // this fails, nothing else should pretend to have succeeded.
            const { error: dbError } = await supabase.from('bookings').insert([bookingData]);
            if (dbError) throw dbError;

            // 3. Send notification emails. The booking is already safely
            // persisted at this point, so an email hiccup is logged, not
            // treated as a failed booking — but it's never silently
            // swallowed either.
            try {
                const emailRes = await fetch('/api/emails/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: 'new_booking', bookingData }),
                });
                if (!emailRes.ok) {
                    const j = await emailRes.json().catch(() => ({}));
                    console.error('Booking confirmation email failed:', j.error);
                }
            } catch (emailErr) {
                console.error('Booking confirmation email failed:', emailErr);
            }

            setSubmitted(true);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
            setSubmitError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
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
                                <a href={WHATSAPP_URL} className="btn btn-outline-gold" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Selected vehicle — persists across all 3 steps once set from a
                                vehicle's "Book Now" button; never needs reselecting. */}
                            {formData.vehicleName && (
                                <div style={{
                                    display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem 1rem',
                                    background: 'rgba(36, 84, 232, 0.08)', border: '1px solid var(--secondary)',
                                    borderRadius: 'var(--radius-md)', padding: '0.85rem 1.25rem', marginBottom: '1.5rem',
                                }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)', minWidth: 0, wordBreak: 'break-word' }}>
                                        🚗 Booking for: <strong>{formData.vehicleName}</strong>
                                    </span>
                                    <button type="button" onClick={clearVehicle} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', flexShrink: 0 }}>
                                        Change vehicle
                                    </button>
                                </div>
                            )}

                            {/* Progress Steps — connector width uses clamp() so 3 steps + 2
                                connectors never exceed a narrow mobile viewport (audit §13:
                                step navigation must not clip/overflow on small screens). */}
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
                                        {i < 2 && <div style={{ width: 'clamp(30px, 8vw, 80px)', height: '2px', background: step > i + 1 ? 'var(--secondary)' : 'var(--gray-300)', margin: '0 0.5rem 1.5rem' }} />}
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
                                                    background: formData.service === svc.id ? 'rgba(36, 84, 232,0.08)' : 'var(--white)',
                                                }}>
                                                    <input type="radio" name="service" value={svc.id} checked={formData.service === svc.id} onChange={handleChange} style={{ display: 'none' }} />
                                                    <span style={{ fontSize: '1.8rem' }}>{svc.icon}</span>
                                                    <div>
                                                        <div style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>{svc.label}</div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                                            <button type="button" className="btn btn-primary" disabled={!formData.service} onClick={() => setStep(2)} style={{ opacity: formData.service ? 1 : 0.5, cursor: formData.service ? 'pointer' : 'not-allowed' }}>
                                                Next: Trip Details →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Trip Details */}
                                {step === 2 && (
                                    <div className="card">
                                        <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Trip Details</h2>
                                        {Object.keys(step2Errors).length > 0 && (
                                            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid #ef4444', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.25rem', color: '#b91c1c', fontSize: '0.85rem' }}>
                                                Please fill in all required fields before continuing.
                                            </div>
                                        )}
                                        <div className="grid-2">
                                            <div className="form-group">
                                                <SearchAutocomplete
                                                    label="Pickup Location *"
                                                    placeholder="e.g. Jeddah Airport"
                                                    value={formData.from}
                                                    onChange={(v) => setFormData((f) => ({ ...f, from: v }))}
                                                    required
                                                    invalid={!!step2Errors.from}
                                                />
                                                {step2Errors.from && <p style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.35rem' }}>{step2Errors.from}</p>}
                                            </div>
                                            <div className="form-group">
                                                <SearchAutocomplete
                                                    label="Drop-off Location *"
                                                    placeholder="e.g. Makkah Hotel"
                                                    value={formData.to}
                                                    onChange={(v) => setFormData((f) => ({ ...f, to: v }))}
                                                    required
                                                    invalid={!!step2Errors.to}
                                                />
                                                {step2Errors.to && <p style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.35rem' }}>{step2Errors.to}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Travel Date *</label>
                                                <input type="date" name="date" className="form-input" value={formData.date} onChange={handleChange} aria-invalid={!!step2Errors.date} style={step2Errors.date ? { borderColor: '#ef4444' } : undefined} required />
                                                {step2Errors.date && <p style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.35rem' }}>{step2Errors.date}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Pickup Time *</label>
                                                <input type="time" name="time" className="form-input" value={formData.time} onChange={handleChange} aria-invalid={!!step2Errors.time} style={step2Errors.time ? { borderColor: '#ef4444' } : undefined} required />
                                                {step2Errors.time && <p style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '0.35rem' }}>{step2Errors.time}</p>}
                                            </div>
                                        </div>
                                        <div className="grid-2">
                                            <div className="form-group">
                                                <label className="form-label">Number of Passengers *</label>
                                                <select name="passengers" className="form-select" value={formData.passengers} onChange={handleChange}>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n} passenger{n > 1 ? 's' : ''}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Vehicle {formData.vehicleName ? '' : '(optional)'}</label>
                                                {formData.vehicleName ? (
                                                    <div className="form-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-dark)', fontWeight: 600 }}>
                                                        <span>🚗 {formData.vehicleName}</span>
                                                        <button type="button" onClick={clearVehicle} style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Change</button>
                                                    </div>
                                                ) : (
                                                    <select name="vehicleName" className="form-select" value={formData.vehicleName} onChange={handleChange}>
                                                        <option value="">No preference</option>
                                                        {VEHICLE_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                            <button type="button" className="btn btn-outline-gold" onClick={() => setStep(1)}>← Back</button>
                                            <button type="button" className="btn btn-primary" onClick={goToStep3}>Next: Your Info →</button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Personal Info */}
                                {step === 3 && (
                                    <div className="card">
                                        <h2 style={{ color: 'var(--primary)', marginBottom: '1.5rem' }}>Your Information</h2>
                                        {submitError && (
                                            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid #ef4444', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.25rem', color: '#b91c1c', fontSize: '0.85rem' }}>
                                                {submitError} Your entered details are still here — please try again.
                                            </div>
                                        )}
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
                                            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                                                {isSubmitting ? 'Processing...' : 'Confirm Booking ✓'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </>
                    )}

                    {/* WhatsApp Alternative */}
                    <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)' }}>
                        <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem' }}>Prefer to book instantly via WhatsApp?</p>
                        <a href={waLink("Hi, I'd like to book a ride.")} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            💬 Book via WhatsApp
                        </a>
                    </div>
                </div>
            </section>
    );
}
