'use client';

import { useState } from 'react';
import { MapPinIcon, CalendarIcon, UserIcon, PackageIcon, CarIcon, WhatsAppIcon, CheckCircleIcon } from './Icons';
import { WHATSAPP_URL, waLink } from '@/lib/contact';
import { FLEET_TIERS } from '@/lib/fleetConfig';
import styles from './DestinationEnquiryForm.module.css';

interface DestinationEnquiryFormProps {
    /** Destination name — shown locked/preselected, per the Popular
     * Destinations brief §8: "the destination field should already show
     * Riyadh. The user should not need to select it again." */
    destinationName: string;
    countryName: string;
    /** e.g. "/destinations/dubai" — included in the enquiry so the team
     * knows which page generated it. */
    sourcePage: string;
}

function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

export default function DestinationEnquiryForm({ destinationName, countryName, sourcePage }: DestinationEnquiryFormProps) {
    const [form, setForm] = useState({
        pickup: '',
        dropoff: '',
        date: '',
        time: '',
        passengers: '2',
        luggage: '2',
        vehicle: FLEET_TIERS[0]?.id ?? '',
        notes: '',
        name: '',
        email: '',
        phone: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        const vehicleLabel = FLEET_TIERS.find((t) => t.id === form.vehicle)?.name || form.vehicle;
        const destinationLabel = `${destinationName}, ${countryName}`;

        const notesLines = [
            `Destination: ${destinationLabel}`,
            `Vehicle preference: ${vehicleLabel}`,
            form.luggage ? `Luggage: ${form.luggage} bag(s)` : null,
            form.notes ? `Additional requirements: ${form.notes}` : null,
            `Source page: ${sourcePage}`,
        ].filter(Boolean).join(' | ');

        // Same shape BookOnlineClient.tsx inserts into Supabase's `bookings`
        // table — reusing the existing booking/email pipeline rather than a
        // parallel one, per the Popular Destinations brief §9. Only real
        // table columns go into this object (destination/vehicle context is
        // folded into special_notes instead of a new column).
        const dbPayload = {
            customer_name: form.name,
            customer_email: form.email,
            customer_phone: form.phone,
            service_type: 'destination-enquiry',
            pickup_location: form.pickup || `${destinationLabel} (pickup TBD)`,
            dropoff_location: form.dropoff || destinationLabel,
            travel_date: form.date,
            travel_time: form.time,
            passengers_count: parseInt(form.passengers, 10) || 1,
            special_notes: notesLines,
            status: 'pending',
        };

        try {
            const { createClient } = await import('@/utils/supabase/client');
            const supabase = createClient();

            const { error: dbError } = await supabase.from('bookings').insert([dbPayload]);
            if (dbError) throw dbError;

            await fetch('/api/emails/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'destination_enquiry',
                    bookingData: { ...dbPayload, destination_name: destinationLabel },
                }),
            });

            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong — please try again or message us on WhatsApp.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className={styles.success}>
                <div className={styles.successIcon}><CheckCircleIcon size={40} /></div>
                <h3 className={styles.successTitle}>Your request has been submitted successfully.</h3>
                <p className={styles.successText}>
                    Our travel team will review your request and get back to you shortly.
                </p>
                <a
                    href={waLink(`Hi, I just submitted a travel enquiry for ${destinationName}. Could you help with an instant reply?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                >
                    <WhatsAppIcon size={18} /> Need an instant reply? Chat with us on WhatsApp
                </a>
            </div>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.destinationChip}>
                <MapPinIcon size={16} />
                Destination: <strong>{destinationName}, {countryName}</strong>
            </div>

            <div className={styles.grid}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="deq-pickup">Pickup location</label>
                    <input id="deq-pickup" name="pickup" className="form-input" placeholder="Airport, hotel, or address" value={form.pickup} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="deq-dropoff">Drop-off location</label>
                    <input id="deq-dropoff" name="dropoff" className="form-input" placeholder={`e.g. ${destinationName} hotel or address`} value={form.dropoff} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="deq-date"><CalendarIcon size={13} style={{ verticalAlign: 'middle', marginInlineEnd: 4 }} />Date</label>
                    <input id="deq-date" name="date" type="date" className="form-input" min={todayISO()} value={form.date} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="deq-time">Time</label>
                    <input id="deq-time" name="time" type="time" className="form-input" value={form.time} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="deq-passengers"><UserIcon size={13} style={{ verticalAlign: 'middle', marginInlineEnd: 4 }} />Passengers</label>
                    <input id="deq-passengers" name="passengers" type="number" min={1} max={50} className="form-input" value={form.passengers} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="deq-luggage"><PackageIcon size={13} style={{ verticalAlign: 'middle', marginInlineEnd: 4 }} />Luggage / items</label>
                    <input id="deq-luggage" name="luggage" type="number" min={0} max={50} className="form-input" value={form.luggage} onChange={handleChange} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="deq-vehicle"><CarIcon size={13} style={{ verticalAlign: 'middle', marginInlineEnd: 4 }} />Vehicle preference</label>
                    <select id="deq-vehicle" name="vehicle" className="form-select" value={form.vehicle} onChange={handleChange}>
                        {FLEET_TIERS.map((tier) => (
                            <option key={tier.id} value={tier.id}>{tier.name} — up to {tier.maxPassengers} passengers</option>
                        ))}
                    </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="deq-name">Full name</label>
                    <input id="deq-name" name="name" className="form-input" placeholder="Your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="deq-email">Email</label>
                    <input id="deq-email" name="email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="deq-phone">Phone / WhatsApp</label>
                    <input id="deq-phone" name="phone" type="tel" className="form-input" placeholder="+966..." value={form.phone} onChange={handleChange} required />
                </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0, marginTop: 'var(--space-5)' }}>
                <label className="form-label" htmlFor="deq-notes">Additional requirements (optional)</label>
                <textarea id="deq-notes" name="notes" className="form-textarea" placeholder="Child seat, extra stop, flight number, meet-and-greet sign name, etc." value={form.notes} onChange={handleChange} />
            </div>

            {error && <p className={styles.error} role="alert">{error}</p>}

            <div className={styles.actions}>
                <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Submit Enquiry'}
                </button>
                <a href={WHATSAPP_URL} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon size={18} /> Ask on WhatsApp
                </a>
            </div>
        </form>
    );
}
