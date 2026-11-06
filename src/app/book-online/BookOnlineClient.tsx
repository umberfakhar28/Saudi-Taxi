'use client';

import { useEffect, useMemo, useRef, useState } from "react";
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
import { trackFormSubmit, FORM_EVENTS } from "@/lib/analytics";
import { ui, SERVICE_LABELS_AR, bookingErrorMessage, type Locale } from "@/lib/i18n";
import { BOOKING_SERVICES } from "@/lib/bookingServices";
import { bookingRef } from "@/lib/bookingRef";
import { riyadhToday, isPastDate, isValidPhone, PASSENGERS_MAX } from "@/lib/bookingValidation";
import styles from "./BookOnlineClient.module.css";

/**
 * Two steps, not three.
 *
 * "Select service" and "trip details" were separate steps, which meant two
 * screens and two Next clicks before a customer had described a journey the
 * business could actually quote. They are now one step: a compact service
 * grid above the trip fields. Contact details and submission are step two.
 *
 * The service list moved to src/lib/bookingServices.ts so the booking API
 * can validate `service_type` against the same nine ids — it previously
 * accepted any string at all.
 */
const services = BOOKING_SERVICES;

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
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [reference, setReference] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    // Spam protection: the Turnstile token, and a honeypot only a bot fills.
    const [spamToken, setSpamToken] = useState('');
    const [honeypot, setHoneypot] = useState('');
    /** Guards against a double submit that slips past the disabled button
     *  (a double-tap firing before React has re-rendered). */
    const submitLock = useRef(false);

    /** Earliest selectable travel date, in Riyadh's civil date rather than
     *  the visitor's: a customer in Los Angeles must still be able to pick
     *  today in Saudi Arabia. Computed once per mount. */
    const minDate = useMemo(() => riyadhToday(), []);

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
            // Clamp: saved state may predate the two-step flow, where 3 was
            // the contact step. Anything past step 2 is step 2 now.
            setStep(savedStep >= 2 ? 2 : 1);
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
        // left blank on purpose so the customer confirms it themselves on
        // Step 1; the vehicle choice is retained regardless (below).

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

        /**
         * Skipping ahead, adapted to the two-step flow.
         *
         * The old flow had three steps and could land on 2 (trip) or 3
         * (contact). Service and trip are now the same step, so there is
         * only one thing left to skip to: a customer who arrived with a
         * complete trip *and* their name already goes straight to Step 2.
         * Everything that previously jumped to Step 2 now simply stays on
         * Step 1 with the fields prefilled — which is where those fields
         * live. No query parameter changed meaning, and no existing link
         * needs updating.
         *
         * Still gated on a concrete service: landing on the contact step
         * with an empty service was how a booking once reached the database
         * with no service recorded. Gated on the name alone, not the email —
         * the homepage bar does not demand an address.
         */
        const tripComplete = !!(from.trim() && to.trim() && date && time);
        if (service && tripComplete && nameParam) {
            setStep(2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((f) => ({ ...f, [name]: value }));
        // Clear this field's error as soon as it is touched, rather than
        // leaving a stale message under a field the customer has just fixed.
        setErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));
    };

    const setField = (name: keyof FormData, value: string) => {
        setFormData((f) => ({ ...f, [name]: value }));
        setErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));
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

    /** Step 1 — service plus the trip itself. */
    const validateStep1 = (): boolean => {
        const e: Record<string, string> = {};
        if (!formData.service) e.service = t.errServiceRequired;
        if (!formData.from.trim()) e.from = t.errPickupRequired;
        if (!formData.to.trim()) e.to = t.errDropoffRequired;
        if (!formData.date) e.date = t.errDateRequired;
        else if (isPastDate(formData.date)) e.date = t.errDatePast;
        if (!formData.time) e.time = t.errTimeRequired;
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    /** Step 2 — who to call back. Mirrors the server's rules so a customer
     *  is told what is wrong before a round trip, not after one. */
    const validateStep2 = (): boolean => {
        const e: Record<string, string> = {};
        if (!formData.name.trim()) e.name = t.errNameRequired;
        if (!formData.phone.trim()) e.phone = t.errPhoneRequired;
        else if (!isValidPhone(formData.phone)) e.phone = t.errPhoneInvalid;
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const goToStep2 = () => {
        if (validateStep1()) {
            setStep(2);
            setErrors({});
        }
    };

    const backToStep1 = () => {
        // Nothing is cleared: formData is the single source for both steps,
        // so Edit Trip always returns to a fully populated Step 1.
        setStep(1);
        setErrors({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (submitLock.current) return;
        if (!validateStep2()) return;
        submitLock.current = true;
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Redeemed once per submission; the resulting pass accompanies
            // all three calls below (a Turnstile token is single-use).
            const gate = await getSpamPass(spamToken, honeypot);
            if (!gate.ok) {
                setSubmitError(gate.message ?? t.verificationNeeded);
                setIsSubmitting(false);
                submitLock.current = false;
                return;
            }
            const headers = submissionHeaders(gate.pass);

            // 1. Create/update the customer record (Admin Portal audit §10 —
            // the `customers` table existed but nothing ever wrote to it).
            // Done before the booking insert so the booking can be linked to
            // a real row. The id it returns is no longer passed through to
            // the booking: /api/bookings/create resolves the association
            // itself from the phone number, because a client-supplied
            // customer id could have attached this booking to someone
            // else's customer record.
            const custRes = await fetch('/api/customers/upsert', {
                method: 'POST',
                headers,
                body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone }),
            });
            const custJson = await custRes.json().catch(() => ({}));
            if (!custRes.ok) throw new Error(bookingErrorMessage(custJson.code, t) || t.errSaveContact);

            // Luggage and the return leg have no columns of their own, so the
            // stored notes carry them ahead of the customer's own note — the
            // admin panel shows the whole request in one place.
            const storedNotes = [
                formData.luggage !== '' ? `Luggage: ${formData.luggage} bag(s)` : '',
                formData.returnTrip ? `Return: ${formData.returnTrip}` : '',
                formData.notes.trim(),
            ].filter(Boolean).join(' | ');

            const bookingData = {
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
            const bookingJson = await bookingRes.json().catch(() => ({}));
            if (!bookingRes.ok) throw new Error(bookingErrorMessage(bookingJson.code, t) || t.errSaveBooking);
            const insertedBooking = bookingJson.booking;

            // Counted here, the moment the booking row exists — not after
            // the emails below, and not at setSubmitted. The customer
            // upsert in step 1 is an intermediate step and is deliberately
            // not counted: only this insert means a real enquiry was saved.
            // `service` is a radio value from a fixed list; nothing the
            // customer typed is sent.
            trackFormSubmit(FORM_EVENTS.booking, {
                formType: 'booking',
                pagePath: window.location.pathname,
                detail: formData.service || undefined,
            });

            // The customer-facing reference, derived from the row that now
            // exists rather than generated alongside it. Shown below even
            // when no email address was given, which is the case this used
            // to leave with nothing to quote.
            setReference(bookingRef(insertedBooking?.id ?? bookingJson.id));

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
            setSubmitError(error instanceof Error ? error.message : t.errGeneric);
            submitLock.current = false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [t.stepYourTrip, t.stepInfo];

    return (
        <section className="section-lg">
            <div className="container" style={{ maxWidth: '860px' }}>

                {submitted ? (
                    /* role=status so the outcome is announced, not only shown. */
                    <div className="card" role="status" aria-live="polite" style={{ textAlign: 'center', padding: 'var(--space-10) var(--space-6)' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: 'var(--space-5)' }} aria-hidden="true">✅</div>
                        <h2 style={{ color: 'var(--navy)' }}>{t.bookingReceived}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: 'var(--space-6)' }}>
                            {t.bookingReceivedBody(formData.name)}
                        </p>
                        {reference && (
                            <div className={styles.refBox}>
                                <span className={styles.refLabel}>{t.bookingRefLabel}</span>
                                <strong className={styles.refValue} dir="ltr">{reference}</strong>
                                <span className={styles.refHint}>{t.bookingRefHint}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href={isAr ? "/ar" : "/"} className="btn btn-primary">{t.backToHome}</Link>
                            <a data-wa-cta="booking-success" href={waLink(whatsappText)} className="btn btn-outline-gold" target="_blank" rel="noopener noreferrer">{t.sendDetailsWhatsApp}</a>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Progress — an ordered list with aria-current, so the
                            position in the flow is conveyed, not just drawn. */}
                        <ol className={styles.progress} aria-label={t.stepYourTrip + ' / ' + t.stepInfo}>
                            {steps.map((label, i) => {
                                const n = i + 1;
                                const state = step > n ? 'done' : step === n ? 'current' : 'todo';
                                return (
                                    <li
                                        key={label}
                                        /* 'todo' has no class of its own — the base
                                           .progressStep/.progressDot styling *is* the
                                           not-yet-reached look, and emitting
                                           styles.todo would print "undefined". */
                                        className={`${styles.progressStep}${state === 'todo' ? '' : ` ${styles[state]}`}`}
                                        aria-current={step === n ? 'step' : undefined}
                                    >
                                        <span className={styles.progressDot} aria-hidden="true">{step > n ? '✓' : n}</span>
                                        <span className={styles.progressLabel}>{label}</span>
                                    </li>
                                );
                            })}
                        </ol>

                        <form onSubmit={handleSubmit} noValidate>
                            {/* ───────── Step 1 — Your Trip ───────── */}
                            {step === 1 && (
                                <div className="card">
                                    <h2 className={styles.stepHeading} id="svc-heading">{t.selectService}</h2>

                                    {/*
                                        A real radiogroup. The old markup hid each
                                        radio with `display: none`, which took the
                                        whole service step out of the tab order and
                                        out of the accessibility tree — it could not
                                        be completed by keyboard at all. The inputs
                                        are now visually hidden but focusable, so
                                        arrow keys move between options and the
                                        focus ring lands on the card.
                                    */}
                                    <div
                                        className={styles.serviceGrid}
                                        role="radiogroup"
                                        aria-labelledby="svc-heading"
                                        aria-describedby={errors.service ? 'svc-error' : undefined}
                                    >
                                        {services.map((svc) => (
                                            <label
                                                key={svc.id}
                                                className={`${styles.serviceCard} ${formData.service === svc.id ? styles.serviceCardActive : ''}`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="service"
                                                    value={svc.id}
                                                    checked={formData.service === svc.id}
                                                    onChange={handleChange}
                                                    className={styles.srOnlyInput}
                                                />
                                                <span className={styles.serviceIcon} aria-hidden="true">{svc.icon}</span>
                                                <span className={styles.serviceLabel}>{serviceLabelFor(svc)}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.service && <p id="svc-error" className={styles.fieldError} role="alert">{errors.service}</p>}

                                    <h2 className={styles.stepHeading} style={{ marginTop: 'var(--space-8)' }}>{t.stepTrip}</h2>
                                    <p className={styles.requiredNote}>{t.requiredFieldsNote}</p>

                                    <div className={styles.locationRow} style={{ marginBottom: 'var(--space-6)' }}>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <SearchAutocomplete
                                                variant="field"
                                                label={`${t.pickupLocation} *`}
                                                placeholder={t.pickupPlaceholder}
                                                value={formData.from}
                                                onChange={(v) => setField('from', v)}
                                                required
                                                invalid={!!errors.from}
                                            />
                                            {errors.from && <p className={styles.fieldError} role="alert">{errors.from}</p>}
                                        </div>
                                        <button
                                            type="button"
                                            className={styles.swapBtn}
                                            onClick={swapLocations}
                                            aria-label={t.swapLocationsLabel}
                                            title={t.swapLocationsLabel}
                                        >
                                            ⇄
                                        </button>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                            <SearchAutocomplete
                                                variant="field"
                                                label={`${t.dropoffLocation} *`}
                                                placeholder={t.dropoffPlaceholder}
                                                value={formData.to}
                                                onChange={(v) => setField('to', v)}
                                                required
                                                invalid={!!errors.to}
                                            />
                                            {errors.to && <p className={styles.fieldError} role="alert">{errors.to}</p>}
                                        </div>
                                    </div>

                                    <div className="grid-2">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="bk-date">{t.travelDate} *</label>
                                            <input
                                                id="bk-date"
                                                type="date"
                                                name="date"
                                                className="form-input"
                                                value={formData.date}
                                                onChange={handleChange}
                                                /* Riyadh's civil date, not the browser's — and the
                                                   server re-checks it, because `min` is a hint. */
                                                min={minDate}
                                                aria-invalid={!!errors.date}
                                                aria-describedby={errors.date ? 'bk-date-error' : undefined}
                                                style={errors.date ? { borderColor: 'var(--error)' } : undefined}
                                            />
                                            {errors.date && <p id="bk-date-error" className={styles.fieldError} role="alert">{errors.date}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="bk-time">{t.pickupTime} *</label>
                                            <input
                                                id="bk-time"
                                                type="time"
                                                name="time"
                                                className="form-input"
                                                value={formData.time}
                                                onChange={handleChange}
                                                aria-invalid={!!errors.time}
                                                aria-describedby={errors.time ? 'bk-time-error' : undefined}
                                                style={errors.time ? { borderColor: 'var(--error)' } : undefined}
                                            />
                                            {errors.time && <p id="bk-time-error" className={styles.fieldError} role="alert">{errors.time}</p>}
                                        </div>
                                    </div>

                                    <div className="grid-2">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="bk-passengers">{t.numberOfPassengers}</label>
                                            <select id="bk-passengers" name="passengers" className="form-select" value={formData.passengers} onChange={handleChange}>
                                                {Array.from({ length: PASSENGERS_MAX }, (_, i) => i + 1).map((n) => (
                                                    <option key={n} value={n}>{isAr ? `${n} ${t.passenger}` : `${n} passenger${n > 1 ? 's' : ''}`}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="bk-luggage">{t.luggage}</label>
                                            <select id="bk-luggage" name="luggage" className="form-select" value={formData.luggage} onChange={handleChange}>
                                                <option value="">{t.luggageNotSure}</option>
                                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                                    <option key={n} value={String(n)}>{isAr ? `${n} ${t.bags}` : `${n} bag${n === 1 ? '' : 's'}`}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="bk-vehicle">
                                            {t.vehicle} <span className={styles.optionalTag}>{t.vehicleOptional}</span>
                                        </label>
                                        {formData.vehicleName ? (
                                            <div className={styles.vehicleChosen}>
                                                <span>🚗 {formData.vehicleName}</span>
                                                <button type="button" onClick={clearVehicle}>{t.changeVehicle}</button>
                                            </div>
                                        ) : (
                                            <select id="bk-vehicle" name="vehicleName" className="form-select" value={formData.vehicleName} onChange={handleChange}>
                                                <option value="">{t.noPreference}</option>
                                                {VEHICLE_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                                            </select>
                                        )}
                                    </div>

                                    <div className={`${styles.actions} ${styles.actionsEnd}`} style={{ marginTop: 'var(--space-6)' }}>
                                        <button type="button" className={`btn btn-primary btn-lg ${styles.confirmBtn}`} onClick={goToStep2}>
                                            {t.continueToInfo}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ───────── Step 2 — Your Information ───────── */}
                            {step === 2 && (
                                <div className="card">
                                    <h2 className={styles.stepHeading}>{t.yourInformation}</h2>

                                    {/* Editable recap of everything from Step 1. */}
                                    <div className={styles.tripSummary}>
                                        <dl>
                                            {selectedService && (
                                                <div><dt>{t.serviceLabel}</dt><dd>{selectedService.icon} {serviceLabelFor(selectedService)}</dd></div>
                                            )}
                                            <div><dt>{t.route}</dt><dd><bdi>{formData.from}</bdi> → <bdi>{formData.to}</bdi></dd></div>
                                            <div><dt>{t.when}</dt><dd><bdi>{formatWhen(formData.date, formData.time)}</bdi></dd></div>
                                            {formData.returnTrip && <div><dt>{t.returnLabel}</dt><dd><bdi>{formData.returnTrip}</bdi></dd></div>}
                                            <div><dt>{t.passengers}</dt><dd>{formData.passengers}{formData.luggage !== '' ? ` · ${formData.luggage} ${isAr ? t.bags : `bag${formData.luggage === '1' ? '' : 's'}`}` : ''}</dd></div>
                                            {formData.vehicleName && <div><dt>{t.vehicle}</dt><dd>{formData.vehicleName}</dd></div>}
                                        </dl>
                                        <button type="button" onClick={backToStep1}>{t.editTrip}</button>
                                    </div>

                                    {submitError && (
                                        <div className={styles.submitError} role="alert">
                                            {submitError} {t.errorRetry}
                                        </div>
                                    )}

                                    <p className={styles.requiredNote}>{t.requiredFieldsNote}</p>

                                    <div className="grid-2">
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="bk-name">{t.fullName} *</label>
                                            <input
                                                id="bk-name"
                                                type="text"
                                                name="name"
                                                className="form-input"
                                                placeholder={t.fullNamePlaceholder}
                                                autoComplete="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                aria-invalid={!!errors.name}
                                                aria-describedby={errors.name ? 'bk-name-error' : undefined}
                                                style={errors.name ? { borderColor: 'var(--error)' } : undefined}
                                            />
                                            {errors.name && <p id="bk-name-error" className={styles.fieldError} role="alert">{errors.name}</p>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="bk-phone">{t.phoneWhatsApp} *</label>
                                            {/* inputMode=tel keeps the phone keypad on mobile while
                                                still accepting "+", spaces and dashes; the country
                                                code is invited rather than assumed. */}
                                            <input
                                                id="bk-phone"
                                                type="tel"
                                                inputMode="tel"
                                                name="phone"
                                                className="form-input"
                                                placeholder="+966 50 123 4567"
                                                autoComplete="tel"
                                                dir="ltr"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                aria-invalid={!!errors.phone}
                                                aria-describedby={errors.phone ? 'bk-phone-error' : undefined}
                                                style={errors.phone ? { borderColor: 'var(--error)' } : undefined}
                                            />
                                            {errors.phone && <p id="bk-phone-error" className={styles.fieldError} role="alert">{errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="bk-email">
                                            {t.emailAddress} <span className={styles.optionalTag}>{t.vehicleOptional}</span>
                                        </label>
                                        {/* Optional: a customer who books by phone or WhatsApp
                                            often has no email, and the confirmation they care
                                            about reaches them on WhatsApp anyway. The field
                                            stays so an address is captured when one is given. */}
                                        <input
                                            id="bk-email"
                                            type="email"
                                            name="email"
                                            className="form-input"
                                            placeholder="your@email.com"
                                            autoComplete="email"
                                            dir="ltr"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" htmlFor="bk-notes">
                                            {t.specialRequirements} <span className={styles.optionalTag}>{t.vehicleOptional}</span>
                                        </label>
                                        <textarea
                                            id="bk-notes"
                                            name="notes"
                                            className="form-textarea"
                                            placeholder={t.specialRequirementsPlaceholder}
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={4}
                                        />
                                    </div>

                                    <input {...honeypotFieldProps} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                                    <TurnstileWidget onToken={setSpamToken} />

                                    {/* Payment, immediately before the CTA — the wording is the
                                        approved FAQ copy (see i18n paymentBody). The page
                                        previously said nothing about payment at all, so the
                                        strongest fact here, that no advance payment is required,
                                        never reached the point of decision. Information only:
                                        no method is selected, nothing is stored. */}
                                    <div className={styles.paymentBox}>
                                        <p className={styles.paymentTitle}>{t.paymentTitle}</p>
                                        <p className={styles.paymentBody}>{t.paymentBody}</p>
                                    </div>

                                    <div className={styles.actions} style={{ marginTop: 'var(--space-5)' }}>
                                        <button type="button" className="btn btn-outline-gold" onClick={backToStep1}>{t.back}</button>
                                        <button type="submit" className={`btn btn-primary btn-lg ${styles.confirmBtn}`} disabled={isSubmitting}>
                                            {isSubmitting ? t.processing : t.submitBookingRequest}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>
                    </>
                )}

                {/* WhatsApp Alternative */}
                <div className={styles.whatsappAlt}>
                    <p>{t.preferWhatsApp}</p>
                    <a data-wa-cta="booking-form-alternative" href={waLink(whatsappText)} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                        {t.bookViaWhatsApp}
                    </a>
                </div>
            </div>
        </section>
    );
}
