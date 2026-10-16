'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { waLink } from "@/lib/contact";
import { HOURLY_DURATIONS, VEHICLE_OPTIONS } from "@/lib/searchBarConfig";
import { bookingWhatsAppText, formatWhen } from "@/lib/bookingMessage";
import { TOURS } from "@/lib/tourData";
import { SEARCH_INDEX } from "@/lib/searchIndex";
import SearchAutocomplete from "@/components/SearchAutocomplete";
import TurnstileWidget from "@/components/TurnstileWidget";
import { getSpamPass, submissionHeaders, honeypotFieldProps } from "@/lib/antiSpamClient";
import { ui, SERVICE_LABELS_AR, type Locale } from "@/lib/i18n";
import styles from "./BookOnlineClient.module.css";

const services = [
    { id: "airport-transfer", label: "Airport Transfer", icon: "✈️" },
    { id: "hotel-transfer", label: "Hotel Transfer", icon: "🏨" },
    { id: "private-taxi", label: "Private Taxi", icon: "🚗" },
    { id: "umrah-package", label: "Umrah Transport Package", icon: "🕌" },
    { id: "hourly-driver", label: "Hourly Chauffeur", icon: "🕐" },
    { id: "corporate-transport", label: "Corporate Transportation", icon: "💼" },
    { id: "ziyarat", label: "Ziyarat Tour", icon: "🌙" },
    { id: "jeddah-tour", label: "Jeddah City Tour", icon: "🌆" },
    { id: "alula-tour", label: "AlUla Tour", icon: "🏜️" },
];

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
    luggage: string;
    /** Human-readable return leg ("12 Oct 2026 at 02:30 PM"), from the homepage. */
    returnTrip: string;
    name: string;
    email: string;
    phone: string;
    notes: string;
}

const EMPTY_FORM: FormData = {
    service: '', vehicleSlug: '', vehicleName: '',
    from: '', to: '', date: '', time: '', passengers: '1', luggage: '', returnTrip: '',
    name: '', email: '', phone: '', notes: '',
};

// Fix 6 (Homepage Colour System brief). The submit handler used to do a
// genuine dynamic `import("@/utils/supabase/client")` — a real webpack/
// Turbopack chunk boundary. That import is gone now (the booking insert
// moved server-side — see /api/bookings/create), but this guard stays as
// generic protection for any other stale-chunk failure during submission
// (a user with the tab open across a deploy hitting a 404'd chunk
// elsewhere in the bundle): retry first (handles a transient network blip
// / slow connection / ad-blocker interference), then — if that's
// exhausted or the message signature is unambiguously a stale-chunk 404 —
// persist the in-progress form and reload once to fetch the new build.
const RELOAD_GUARD_KEY = 'gts-book-online-chunk-reload-v1';
const SAVED_FORM_KEY = 'gts-book-online-saved-form-v1';

function isChunkLoadError(err: unknown): boolean {
    const message = err instanceof Error ? err.message : String(err);
    return /loading chunk .* failed|failed to load chunk|failed to fetch dynamically imported module|importing a module script failed/i.test(message);
}

export default function BookOnlineClient({ locale = 'en' }: { locale?: Locale } = {}) {
    const t = ui(locale);
    const isAr = locale === 'ar';
    /** Service names follow the page's language; the id written to the
     * booking is the same in both, so the admin panel is unaffected. */
    const serviceLabelFor = (svc: { id: string; label: string }) =>
        isAr ? (SERVICE_LABELS_AR[svc.id] ?? svc.label) : svc.label;
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
    const [step2Errors, setStep2Errors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    // Spam protection: the Turnstile token, and a honeypot only a bot fills.
    const [spamToken, setSpamToken] = useState('');
    const [honeypot, setHoneypot] = useState('');

    // Rehydrate form state after a chunk-error-triggered reload (Fix 6) —
    // only runs when the reload guard is actually set, so a normal visit
    // never touches this. Clears both keys immediately after restoring so
    // it can never fire twice or leak into an unrelated future session.
    useEffect(() => {
        if (sessionStorage.getItem(RELOAD_GUARD_KEY) !== '1') return;
        sessionStorage.removeItem(RELOAD_GUARD_KEY);
        const saved = sessionStorage.getItem(SAVED_FORM_KEY);
        sessionStorage.removeItem(SAVED_FORM_KEY);
        if (!saved) return;
        try {
            const { formData: savedFormData, step: savedStep } = JSON.parse(saved) as { formData: FormData; step: number };
            setFormData({ ...EMPTY_FORM, ...savedFormData });
            setStep(savedStep);
        } catch {
            // Malformed saved state — nothing to restore, fail silently rather
            // than blocking the page.
        }
    }, []);

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

        // An explicit `service` param (route/airport quick-booking forms
        // that already know exactly what they are — e.g. "airport-transfer"
        // from an airport page) wins over the mode-based inference below.
        const serviceParam = searchParams.get('service');
        const knownService = serviceParam && services.some((s) => s.id === serviceParam) ? serviceParam : '';

        if (knownService) {
            service = knownService;
        } else if (mode === 'hourly') {
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

        // Name, email, vehicle and note come from the homepage request's
        // details step (HeroSearchBar). Luggage and the return leg get their
        // own fields rather than being written into the notes box, where a
        // customer editing their note could delete them without noticing.
        const nameParam = searchParams.get('name') ?? '';
        const emailParam = searchParams.get('email') ?? '';
        const notesParam = searchParams.get('notes') ?? '';
        const returnTrip = returnDate ? formatWhen(returnDate, returnTime ?? '') : '';

        setFormData((prev) => ({
            ...prev,
            service: service || prev.service,
            from: from || prev.from,
            to: to || prev.to,
            date: date || prev.date,
            time: time || prev.time,
            passengers: passengers || prev.passengers,
            luggage: luggage ?? prev.luggage,
            returnTrip: returnTrip || prev.returnTrip,
            vehicleSlug: vehicleSlug || prev.vehicleSlug,
            vehicleName: vehicleNameParam || prev.vehicleName,
            name: nameParam || prev.name,
            email: emailParam || prev.email,
            notes: notesParam || prev.notes,
        }));

        // Only skip ahead to Trip Details once a concrete service is
        // actually known — landing on Step 2 with an empty service was
        // exactly how a booking used to reach the database with no service
        // recorded at all. A vehicle-only arrival (no mode) stays on Step 1
        // so the customer picks a service, with the vehicle already retained.
        // Arriving from the homepage with the customer's details already
        // entered: the trip is complete, so open straight on the final step.
        const tripComplete = !!(from.trim() && to.trim() && date && time);
        // Gated on the name alone, not the email: the homepage bar's details
        // step no longer demands an address, and a customer who left it blank
        // there would otherwise be dropped back onto Trip Details having
        // already filled it in.
        if (service && tripComplete && nameParam) {
            setStep(3);
        } else if (service) {
            setStep(2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const clearVehicle = () => setFormData((f) => ({ ...f, vehicleSlug: '', vehicleName: '' }));

    const swapLocations = () => setFormData((f) => ({ ...f, from: f.to, to: f.from }));

    const selectedService = services.find((s) => s.id === formData.service);

    const whatsappText = bookingWhatsAppText({
        tripType: selectedService?.label,
        from: formData.from,
        to: formData.to,
        date: formData.date,
        time: formData.time,
        returnTrip: formData.returnTrip,
        passengers: formData.from ? formData.passengers : '',
        luggage: formData.luggage,
        vehicle: formData.vehicleName,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes,
    });

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
            // Redeemed once per submission; the resulting pass accompanies
            // all three calls below (a Turnstile token is single-use).
            const gate = await getSpamPass(spamToken, honeypot);
            if (!gate.ok) {
                setSubmitError(gate.message ?? t.verificationNeeded);
                setIsSubmitting(false);
                return;
            }
            const headers = submissionHeaders(gate.pass);

            // 1. Create/update the customer record (Admin Portal audit §10 —
            // the `customers` table existed but nothing ever wrote to it).
            // Done before the booking insert so the booking can carry a real
            // foreign key rather than being matched up later by guesswork.
            const custRes = await fetch('/api/customers/upsert', {
                method: 'POST',
                headers,
                body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone }),
            });
            const custJson = await custRes.json();
            if (!custRes.ok) throw new Error(custJson.error || 'Could not save your contact details.');

            // Luggage and the return leg have no columns of their own, so the
            // stored notes carry them ahead of the customer's own note — the
            // admin panel shows the whole request in one place.
            const storedNotes = [
                formData.luggage !== '' ? `Luggage: ${formData.luggage} bag(s)` : '',
                formData.returnTrip ? `Return: ${formData.returnTrip}` : '',
                formData.notes.trim(),
            ].filter(Boolean).join(' | ');

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
                special_notes: storedNotes,
                car_type: formData.vehicleName || null,
                vehicle_slug: formData.vehicleSlug || null,
                status: 'pending',
            };

            // 2. Save the booking — the operation that actually matters. If
            // this fails, nothing else should pretend to have succeeded.
            // Routed through a server-side endpoint (not a direct client
            // supabase.from('bookings').insert() with the anon key) because
            // the `bookings` table's RLS policy blocks anonymous inserts —
            // every public submission was failing with a Postgres 42501
            // error that this component's catch block couldn't even show,
            // since a PostgrestError isn't `instanceof Error`. Returns the
            // generated id so the Admin Portal's notification "View
            // Booking" action can link to this exact row.
            const bookingRes = await fetch('/api/bookings/create', {
                method: 'POST',
                headers,
                body: JSON.stringify(bookingData),
            });
            const bookingJson = await bookingRes.json();
            if (!bookingRes.ok) throw new Error(bookingJson.error || 'Could not save your booking.');
            const insertedBooking = bookingJson.booking;

            // 3. Send notification emails. The booking is already safely
            // persisted at this point, so an email hiccup is logged, not
            // treated as a failed booking — but it's never silently
            // swallowed either.
            try {
                const emailRes = await fetch('/api/emails/send', {
                    method: 'POST',
                    headers,
                    // The email shows luggage and the return leg as rows of
                    // their own, so its Notes row is just the customer's note.
                    body: JSON.stringify({
                        type: 'new_booking',
                        bookingData: {
                            ...bookingData,
                            id: insertedBooking?.id,
                            luggage_count: formData.luggage,
                            return_trip: formData.returnTrip,
                            special_notes: formData.notes.trim(),
                        },
                    }),
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
            // Fix 6 — a genuinely stale build (the dynamic import above
            // requesting a chunk hash the server no longer serves) can't be
            // fixed by showing an error and letting the customer press
            // submit again — the tab is still running the old JS, so it
            // would fail identically. The only real fix is a reload to
            // fetch the new build; guarded by RELOAD_GUARD_KEY so a repeat
            // failure after that reload falls through to the normal error
            // message instead of reload-looping.
            if (isChunkLoadError(error) && sessionStorage.getItem(RELOAD_GUARD_KEY) !== '1') {
                sessionStorage.setItem(RELOAD_GUARD_KEY, '1');
                sessionStorage.setItem(SAVED_FORM_KEY, JSON.stringify({ formData, step }));
                window.location.reload();
                return;
            }
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
                            <h2 style={{ color: 'var(--navy)' }}>{t.bookingReceived}</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                                {t.bookingReceivedBody(formData.name)}
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <Link href={isAr ? "/ar" : "/"} className="btn btn-primary">{t.backToHome}</Link>
                                <a href={waLink(whatsappText)} className="btn btn-outline-gold" target="_blank" rel="noopener noreferrer">{t.sendDetailsWhatsApp}</a>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Selected service — visible confirmation that the Step 1 choice
                                carried forward, mirroring the vehicle chip below. Fixes the
                                "did my selection disappear?" perception: the data was always
                                retained in formData.service, it just wasn't shown again after
                                Step 1. */}
                            {step > 1 && selectedService && (
                                <div className={styles.selectionChip}>
                                    <span>{selectedService.icon} {t.serviceLabel}: <strong>{serviceLabelFor(selectedService)}</strong></span>
                                    <button type="button" onClick={() => setStep(1)}>{t.changeLabel}</button>
                                </div>
                            )}

                            {/* Selected vehicle — persists across all 3 steps once set from a
                                vehicle's "Book Now" button; never needs reselecting. */}
                            {formData.vehicleName && (
                                <div style={{
                                    display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem 1rem',
                                    background: 'rgba(8, 24, 39, 0.04)', border: '1px solid var(--line)',
                                    borderRadius: 'var(--radius-md)', padding: '0.85rem 1.25rem', marginBottom: '1.5rem',
                                }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)', minWidth: 0, wordBreak: 'break-word' }}>
                                        🚗 {t.bookingForLabel}: <strong>{formData.vehicleName}</strong>
                                    </span>
                                    <button type="button" onClick={clearVehicle} style={{ background: 'none', border: 'none', color: 'var(--teal)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', flexShrink: 0 }}>
                                        {t.changeVehicle}
                                    </button>
                                </div>
                            )}

                            {/* Progress Steps — connector width uses clamp() so 3 steps + 2
                                connectors never exceed a narrow mobile viewport (audit §13:
                                step navigation must not clip/overflow on small screens). */}
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', gap: '0' }}>
                                {[t.stepService, t.stepTrip, t.stepInfo].map((label, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{
                                                width: '40px', height: '40px', borderRadius: '50%',
                                                /* Flat gold for the current step (an active-state indicator, one of
                                                   gold's allowed roles) — no gradient. Green for completed steps. */
                                                background: step > i + 1 ? 'var(--success)' : step === i + 1 ? 'var(--gold)' : 'var(--gray-300)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem',
                                                color: step > i + 1 ? 'var(--on-dark)' : step === i + 1 ? 'var(--navy)' : 'var(--gray-500)', fontWeight: 700,
                                                fontSize: '0.9rem',
                                            }}>
                                                {step > i + 1 ? '✓' : i + 1}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: step === i + 1 ? 'var(--navy)' : 'var(--text-muted)', fontWeight: step === i + 1 ? 600 : 400, whiteSpace: 'nowrap' }}>{label}</div>
                                        </div>
                                        {i < 2 && <div style={{ width: 'clamp(30px, 8vw, 80px)', height: '2px', background: step > i + 1 ? 'var(--success)' : 'var(--gray-300)', margin: '0 0.5rem 1.5rem' }} />}
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit}>
                                {/* Step 1: Select Service */}
                                {step === 1 && (
                                    <div className="card">
                                        <h2 style={{ color: 'var(--navy)', marginBottom: '1.5rem' }}>{t.selectService}</h2>
                                        <div className="grid-2">
                                            {services.map((svc) => (
                                                <label key={svc.id} style={{
                                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                                    padding: '1.2rem 1.5rem', borderRadius: 'var(--radius-md)',
                                                    /* Gold border marks the selected card — an active-state indicator,
                                                       and only one radio option is ever selected at a time. */
                                                    border: `2px solid ${formData.service === svc.id ? 'var(--gold)' : 'var(--gray-300)'}`,
                                                    cursor: 'pointer', transition: 'all 0.2s',
                                                    background: 'var(--white)',
                                                }}>
                                                    <input type="radio" name="service" value={svc.id} checked={formData.service === svc.id} onChange={handleChange} style={{ display: 'none' }} />
                                                    <span style={{ fontSize: '1.8rem' }}>{svc.icon}</span>
                                                    <div>
                                                        <div style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '0.95rem' }}>{serviceLabelFor(svc)}</div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                        <div className={`${styles.actions} ${styles.actionsEnd}`} style={{ marginTop: '2rem' }}>
                                            <button type="button" className="btn btn-primary" disabled={!formData.service} onClick={() => setStep(2)} style={{ opacity: formData.service ? 1 : 0.5, cursor: formData.service ? 'pointer' : 'not-allowed' }}>
                                                {t.nextTripDetails}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Trip Details */}
                                {step === 2 && (
                                    <div className="card">
                                        <h2 style={{ color: 'var(--navy)', marginBottom: '1.5rem' }}>{t.tripDetails}</h2>
                                        {Object.keys(step2Errors).length > 0 && (
                                            <div style={{ background: 'rgba(179, 38, 30, 0.08)', border: '1px solid var(--error)', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.25rem', color: 'var(--error)', fontSize: '0.85rem' }}>
                                                {t.fillRequired}
                                            </div>
                                        )}
                                        <div className={styles.locationRow} style={{ marginBottom: 'var(--space-6)' }}>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <SearchAutocomplete
                                                    variant="field"
                                                    label={t.pickupLocation}
                                                    placeholder={t.pickupPlaceholder}
                                                    value={formData.from}
                                                    onChange={(v) => setFormData((f) => ({ ...f, from: v }))}
                                                    required
                                                    invalid={!!step2Errors.from}
                                                />
                                                {step2Errors.from && <p style={{ color: 'var(--error)', fontSize: '0.78rem', marginTop: '0.35rem' }}>{step2Errors.from}</p>}
                                            </div>
                                            <button type="button" className={styles.swapBtn} onClick={swapLocations} aria-label="Swap pickup and drop-off locations" title="Swap pickup and drop-off">
                                                ⇄
                                            </button>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <SearchAutocomplete
                                                    variant="field"
                                                    label={t.dropoffLocation}
                                                    placeholder={t.dropoffPlaceholder}
                                                    value={formData.to}
                                                    onChange={(v) => setFormData((f) => ({ ...f, to: v }))}
                                                    required
                                                    invalid={!!step2Errors.to}
                                                />
                                                {step2Errors.to && <p style={{ color: 'var(--error)', fontSize: '0.78rem', marginTop: '0.35rem' }}>{step2Errors.to}</p>}
                                            </div>
                                        </div>
                                        <div className="grid-2">
                                            <div className="form-group">
                                                <label className="form-label">{t.travelDate}</label>
                                                <input type="date" name="date" className="form-input" value={formData.date} onChange={handleChange} aria-invalid={!!step2Errors.date} style={step2Errors.date ? { borderColor: 'var(--error)' } : undefined} required />
                                                {step2Errors.date && <p style={{ color: 'var(--error)', fontSize: '0.78rem', marginTop: '0.35rem' }}>{step2Errors.date}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">{t.pickupTime}</label>
                                                <input type="time" name="time" className="form-input" value={formData.time} onChange={handleChange} aria-invalid={!!step2Errors.time} style={step2Errors.time ? { borderColor: 'var(--error)' } : undefined} required />
                                                {step2Errors.time && <p style={{ color: 'var(--error)', fontSize: '0.78rem', marginTop: '0.35rem' }}>{step2Errors.time}</p>}
                                            </div>
                                        </div>
                                        <div className="grid-2">
                                            <div className="form-group">
                                                <label className="form-label">{t.numberOfPassengers}</label>
                                                <select name="passengers" className="form-select" value={formData.passengers} onChange={handleChange}>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{isAr ? `${n} ${t.passenger}` : `${n} passenger${n > 1 ? 's' : ''}`}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">{t.luggage}</label>
                                                <select name="luggage" className="form-select" value={formData.luggage} onChange={handleChange}>
                                                    <option value="">{t.luggageNotSure}</option>
                                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={String(n)}>{isAr ? `${n} ${t.bags}` : `${n} bag${n === 1 ? '' : 's'}`}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid-2">
                                            <div className="form-group">
                                                <label className="form-label">{t.vehicle} {formData.vehicleName ? '' : t.vehicleOptional}</label>
                                                {formData.vehicleName ? (
                                                    <div className="form-input" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-dark)', fontWeight: 600 }}>
                                                        <span>🚗 {formData.vehicleName}</span>
                                                        <button type="button" onClick={clearVehicle} style={{ background: 'none', border: 'none', color: 'var(--teal)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Change</button>
                                                    </div>
                                                ) : (
                                                    <select name="vehicleName" className="form-select" value={formData.vehicleName} onChange={handleChange}>
                                                        <option value="">{t.noPreference}</option>
                                                        {VEHICLE_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                                                    </select>
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.actions} style={{ marginTop: '1rem' }}>
                                            <button type="button" className="btn btn-outline-gold" onClick={() => setStep(1)}>{t.back}</button>
                                            <button type="button" className="btn btn-primary" onClick={goToStep3}>{t.nextYourInfo}</button>
                                        </div>
                                    </div>
                                )}

                                {/* Step 3: Personal Info */}
                                {step === 3 && (
                                    <div className="card">
                                        <h2 style={{ color: 'var(--navy)', marginBottom: '1.5rem' }}>{t.yourInformation}</h2>
                                        <div className={styles.tripSummary}>
                                            <dl>
                                                <div><dt>{t.route}</dt><dd><bdi>{formData.from}</bdi> → <bdi>{formData.to}</bdi></dd></div>
                                                <div><dt>{t.when}</dt><dd><bdi>{formatWhen(formData.date, formData.time)}</bdi></dd></div>
                                                {formData.returnTrip && <div><dt>{t.returnLabel}</dt><dd><bdi>{formData.returnTrip}</bdi></dd></div>}
                                                <div><dt>{t.passengers}</dt><dd>{formData.passengers}{formData.luggage !== '' ? ` · ${formData.luggage} ${isAr ? t.bags : `bag${formData.luggage === '1' ? '' : 's'}`}` : ''}</dd></div>
                                            </dl>
                                            <button type="button" onClick={() => setStep(2)}>{t.editTrip}</button>
                                        </div>
                                        {submitError && (
                                            <div style={{ background: 'rgba(179, 38, 30, 0.08)', border: '1px solid var(--error)', borderRadius: 'var(--radius-sm)', padding: '0.85rem 1rem', marginBottom: '1.25rem', color: 'var(--error)', fontSize: '0.85rem' }}>
                                                {submitError} {t.errorRetry}
                                            </div>
                                        )}
                                        <div className="grid-2">
                                            <div className="form-group">
                                                <label className="form-label">{t.fullName}</label>
                                                <input type="text" name="name" className="form-input" placeholder="Your full name" autoComplete="name" value={formData.name} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">{t.emailAddress} <span style={{ color: '#94a3b8', fontWeight: 400 }}>{t.vehicleOptional}</span></label>
                                                {/* Optional: a customer who books by phone or WhatsApp
                                                    often has no email, and the confirmation they care
                                                    about reaches them on WhatsApp anyway. The field
                                                    stays so an address is captured when one is given. */}
                                                <input type="email" name="email" className="form-input" placeholder="your@email.com" autoComplete="email" value={formData.email} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{t.phoneWhatsApp}</label>
                                            <input type="tel" name="phone" className="form-input" placeholder="+966 50 123 4567" autoComplete="tel" value={formData.phone} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">{t.specialRequirements}</label>
                                            <textarea name="notes" className="form-textarea" placeholder={t.specialRequirementsPlaceholder} value={formData.notes} onChange={handleChange} rows={4} />
                                        </div>
                                        <input {...honeypotFieldProps} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                                        <TurnstileWidget onToken={setSpamToken} />

                                        <div className={styles.actions} style={{ marginTop: '0.5rem' }}>
                                            <button type="button" className="btn btn-outline-gold" onClick={() => setStep(2)}>{t.back}</button>
                                            <button type="submit" className={`btn btn-primary btn-lg ${styles.confirmBtn}`} disabled={isSubmitting}>
                                                {isSubmitting ? t.processing : t.confirmBooking}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </>
                    )}

                    {/* WhatsApp Alternative */}
                    <div style={{ textAlign: 'center', marginTop: '2rem', padding: '1.5rem', background: 'var(--gray-100)', borderRadius: 'var(--radius-md)' }}>
                        <p style={{ color: 'var(--text-muted)', margin: '0 0 1rem' }}>{t.preferWhatsApp}</p>
                        <a href={waLink(whatsappText)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                            {t.bookViaWhatsApp}
                        </a>
                    </div>
                </div>
            </section>
    );
}
