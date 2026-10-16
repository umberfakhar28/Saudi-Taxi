'use client';

import { Suspense, useEffect, useId, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    CarIcon, ClockIcon, CompassIcon, CalendarIcon,
    ShieldIcon, UserIcon, WhatsAppIcon,
} from './Icons';
import SearchAutocomplete from './SearchAutocomplete';
import PassengerLuggageStepper from './PassengerLuggageStepper';
import { HOURLY_DURATIONS, DEFAULT_PASSENGERS, DEFAULT_LUGGAGE, VEHICLE_OPTIONS } from '@/lib/searchBarConfig';
import { TOURS } from '@/lib/tourData';
import { waLink } from '@/lib/contact';
import { bookingWhatsAppText, formatWhen } from '@/lib/bookingMessage';
import styles from './HeroSearchBar.module.css';

type Mode = 'transfers' | 'hourly' | 'daytrips';

const MODE_TABS: { key: Mode; label: string; icon: React.ReactNode }[] = [
    { key: 'transfers', label: 'Transfers', icon: <CarIcon size={16} /> },
    { key: 'hourly', label: 'Hourly Drive', icon: <ClockIcon size={16} /> },
    { key: 'daytrips', label: 'Day Trips', icon: <CompassIcon size={16} /> },
];
const MODE_INDEX: Record<Mode, number> = { transfers: 0, hourly: 1, daytrips: 2 };

function todayISO() {
    return new Date().toISOString().slice(0, 10);
}

/** Neither of the two values below ever changes after hydration, so there is
 * nothing to subscribe to — the store is read once per render, with a server
 * snapshot that keeps the markup identical on both sides. */
const noSubscribe = () => () => { };

/** The tab indicator's transform is physical (translateX), so it's the one
 * piece of this component that needs an explicit RTL flip rather than a
 * logical CSS property — everything else uses margin-inline/inset-inline-*
 * so the browser mirrors it for free. */
function useIsRtl() {
    return useSyncExternalStore(
        noSubscribe,
        () => document.documentElement.dir === 'rtl',
        () => false,
    );
}

function HeroSearchBarInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlMode = searchParams.get('mode');
    const initialMode: Mode = urlMode === 'hourly' || urlMode === 'daytrips' ? urlMode : 'transfers';

    const [mode, setMode] = useState<Mode>(initialMode);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [duration, setDuration] = useState(HOURLY_DURATIONS[1].value);
    const [dayTrip, setDayTrip] = useState(TOURS[0]?.slug ?? '');
    const [dayTripCustom, setDayTripCustom] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [addReturn, setAddReturn] = useState(false);
    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [passengers, setPassengers] = useState(DEFAULT_PASSENGERS);
    const [luggage, setLuggage] = useState(DEFAULT_LUGGAGE);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

    // Step 2 — the customer's details, collected here on the homepage
    // instead of redirecting straight after the trip details. Step 3 is the
    // existing Book Online confirmation, which opens with all of this filled.
    const [step, setStep] = useState<1 | 2>(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [note, setNote] = useState('');

    // The sheet is portaled straight to <body> (see the render below) so it
    // escapes .wrap/.searchWrap's own stacking context — both set
    // `position: relative` + `z-index: 10`, which previously trapped the
    // sheet's z-index:1200 inside that lower-ranked context, making the
    // "full-screen" sheet render behind the fixed header instead of above
    // it (hiding its close button and mode tabs under the nav bar).
    // `document` doesn't exist during SSR, hence the mount check.
    const mounted = useSyncExternalStore(noSubscribe, () => true, () => false);

    // Lock body scroll while the sheet is open, and close on Escape —
    // same pattern as the mobile nav drawer (Navbar.tsx).
    useEffect(() => {
        if (!mobileSheetOpen) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileSheetOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [mobileSheetOpen]);

    const tabsId = useId();
    const isRtl = useIsRtl();
    const indicatorTransform = `translateX(${MODE_INDEX[mode] * 100 * (isRtl ? -1 : 1)}%)`;

    function selectMode(next: Mode) {
        setMode(next);
        setStep(1);
        setErrors({});
        const params = new URLSearchParams(window.location.search);
        params.set('mode', next);
        router.replace(`?${params.toString()}`, { scroll: false });
    }

    function onTabKeyDown(e: React.KeyboardEvent, idx: number) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const dir = e.key === 'ArrowRight' ? 1 : -1;
            const nextIdx = (idx + dir + MODE_TABS.length) % MODE_TABS.length;
            selectMode(MODE_TABS[nextIdx].key);
            const el = document.getElementById(`${tabsId}-tab-${MODE_TABS[nextIdx].key}`);
            el?.focus();
        }
    }

    function validate(): boolean {
        const e: Record<string, string> = {};
        if (!from.trim()) e.from = 'Enter a pickup location';
        if (mode === 'transfers' && !to.trim()) e.to = 'Enter a destination';
        if (mode === 'daytrips' && !dayTrip) e.dayTrip = 'Choose a day trip';
        if (mode === 'daytrips' && dayTrip === 'other' && !dayTripCustom.trim()) e.dayTripCustom = 'Enter your destination';
        if (!date) e.date = 'Choose a date';
        else if (date < todayISO()) e.date = "Date can't be in the past";
        if (!time) e.time = 'Choose a time';
        if (mode === 'transfers' && addReturn && !returnDate) e.returnDate = 'Choose a return date';
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function buildParams(): URLSearchParams {
        const params = new URLSearchParams();
        params.set('mode', mode);
        params.set('from', from);
        if (mode === 'transfers') params.set('to', to);
        if (mode === 'hourly') params.set('duration', duration);
        if (mode === 'daytrips') {
            params.set('dayTrip', dayTrip);
            // A custom destination (not one of the listed day trips) rides
            // along in the generic `to` param — BookOnlineClient already
            // falls back to it whenever the `dayTrip` slug doesn't match a
            // known tour, so no special-casing is needed on that end.
            if (dayTrip === 'other' && dayTripCustom.trim()) params.set('to', dayTripCustom.trim());
        }
        params.set('date', date);
        params.set('time', time);
        if (mode === 'transfers' && addReturn) {
            params.set('returnDate', returnDate);
            if (returnTime) params.set('returnTime', returnTime);
        }
        params.set('passengers', String(passengers));
        params.set('luggage', String(luggage));
        if (name.trim()) params.set('name', name.trim());
        if (email.trim()) params.set('email', email.trim());
        if (vehicle) params.set('vehicleName', vehicle);
        if (note.trim()) params.set('notes', note.trim());
        return params;
    }

    function validateDetails(): boolean {
        const e: Record<string, string> = {};
        if (!name.trim()) e.name = 'Enter your name';
        // Email is optional — customers are reached on WhatsApp. An address
        // that *was* typed still has to be a real one, so a typo is caught
        // rather than quietly producing a booking nobody can email.
        if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            e.email = 'Enter a valid email address';
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    /** Step 1 → Step 2, in place. No navigation. */
    function handleTripSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        setStep(2);
    }

    /** Step 2 → Book Online's confirmation step. Returns whether it was
     * valid — the sheet needs this to decide whether to close itself, and
     * reading `errors` right after calling validate would see the stale
     * pre-update value (React state setters aren't synchronous). */
    function handleDetailsSubmit(e: React.FormEvent): boolean {
        e.preventDefault();
        if (!validateDetails()) return false;
        router.push(`/book-online?${buildParams().toString()}`);
        return true;
    }

    function backToTrip() {
        setErrors({});
        setStep(1);
    }

    const tripTypeLabel = MODE_TABS.find((t) => t.key === mode)?.label ?? '';
    const destinationText =
        mode === 'transfers' ? to
            : mode === 'hourly' ? (HOURLY_DURATIONS.find((d) => d.value === duration)?.label ?? '')
                : dayTrip === 'other' ? dayTripCustom
                    : (TOURS.find((t) => t.slug === dayTrip)?.label ?? '');
    const returnText = mode === 'transfers' && addReturn && returnDate ? formatWhen(returnDate, returnTime) : '';

    const tripSummary = [
        [from, destinationText].filter(Boolean).join(mode === 'hourly' ? ' · ' : ' → '),
        formatWhen(date, time),
        `${passengers} passenger${passengers === 1 ? '' : 's'}`,
    ].filter(Boolean).join(' · ');

    // The WhatsApp shortcut carries whatever has been entered so far.
    const whatsappText = bookingWhatsAppText({
        tripType: tripTypeLabel,
        from,
        to: destinationText,
        date,
        time,
        returnTrip: returnText,
        passengers: from ? passengers : '',
        luggage: from ? luggage : '',
        name,
        email,
        vehicle,
        notes: note,
    });

    const middleField = (idPrefix: string) => {
        if (mode === 'transfers') {
            return (
                <SearchAutocomplete
                    label="To"
                    placeholder="City, hotel, airport"
                    value={to}
                    onChange={setTo}
                    required
                    invalid={!!errors.to}
                />
            );
        }
        if (mode === 'hourly') {
            return (
                <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor={`${idPrefix}-duration`}>Duration</label>
                    <select
                        id={`${idPrefix}-duration`}
                        className={styles.select}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    >
                        {HOURLY_DURATIONS.map((d) => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                    </select>
                </div>
            );
        }
        return (
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor={`${idPrefix}-daytrip`}>Day Trip</label>
                {dayTrip === 'other' ? (
                    <input
                        id={`${idPrefix}-daytrip-custom`}
                        type="text"
                        className={styles.select}
                        style={{ cursor: 'text' }}
                        placeholder="Type your destination"
                        value={dayTripCustom}
                        onChange={(e) => setDayTripCustom(e.target.value)}
                        aria-invalid={!!errors.dayTripCustom || undefined}
                    />
                ) : (
                    <select
                        id={`${idPrefix}-daytrip`}
                        className={styles.select}
                        value={dayTrip}
                        onChange={(e) => setDayTrip(e.target.value)}
                        aria-invalid={!!errors.dayTrip || undefined}
                    >
                        {TOURS.map((t) => (
                            <option key={t.slug} value={t.slug}>{t.label}</option>
                        ))}
                        <option value="other">Other (type your own)…</option>
                    </select>
                )}
                {dayTrip === 'other' && (
                    <button
                        type="button"
                        onClick={() => { setDayTrip(TOURS[0]?.slug ?? ''); setDayTripCustom(''); }}
                        className={styles.backToListBtn}
                    >
                        ← Choose from list instead
                    </button>
                )}
            </div>
        );
    };

    const errorList = Object.values(errors);

    // The sheet renders its own trailing .sheetSubmit after the return-trip
    // fields (a better position — after "Add return trip", not before it),
    // so it opts out of this shared helper's own inline .submit button
    // rather than ending up with two "Search" buttons stacked in one form.
    const barContent = (idPrefix: string, showInlineSubmit = true) => (
        <>
            <div className={styles.field}>
                <SearchAutocomplete
                    label="From"
                    placeholder="City, hotel, airport"
                    value={from}
                    onChange={setFrom}
                    required
                    invalid={!!errors.from}
                />
            </div>

            <div className={styles.field}>{middleField(idPrefix)}</div>

            <div className={styles.field}>
                <span className={styles.fieldLabel}>
                    <CalendarIcon size={14} /> Departure
                </span>
                <div className={styles.departureInputs}>
                    <label className={styles.srOnly} htmlFor={`${idPrefix}-date`}>Departure date</label>
                    <input
                        id={`${idPrefix}-date`}
                        type="date"
                        className={styles.dateInput}
                        value={date}
                        min={todayISO()}
                        onChange={(e) => setDate(e.target.value)}
                        aria-invalid={!!errors.date || undefined}
                        required
                    />
                    <label className={styles.srOnly} htmlFor={`${idPrefix}-time`}>Departure time</label>
                    <input
                        id={`${idPrefix}-time`}
                        type="time"
                        className={styles.timeInput}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        aria-invalid={!!errors.time || undefined}
                        required
                    />
                </div>
            </div>

            <div className={styles.field}>
                <PassengerLuggageStepper
                    passengers={passengers}
                    luggage={luggage}
                    onChange={({ passengers: p, luggage: l }) => { setPassengers(p); setLuggage(l); }}
                />
            </div>

            {showInlineSubmit && (
                <button type="submit" className={styles.submit}>
                    Next
                </button>
            )}
        </>
    );

    const detailsContent = (idPrefix: string, showInlineSubmit = true) => (
        <>
            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor={`${idPrefix}-name`}>Name</label>
                <input
                    id={`${idPrefix}-name`}
                    type="text"
                    className={styles.textInput}
                    placeholder="Your full name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={!!errors.name || undefined}
                    required
                />
            </div>

            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor={`${idPrefix}-email`}>Email <span className={styles.optionalHint}>(optional)</span></label>
                <input
                    id={`${idPrefix}-email`}
                    type="email"
                    className={styles.textInput}
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!errors.email || undefined}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor={`${idPrefix}-vehicle`}>Vehicle</label>
                <select
                    id={`${idPrefix}-vehicle`}
                    className={styles.select}
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                >
                    <option value="">No preference</option>
                    {VEHICLE_OPTIONS.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
            </div>

            <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor={`${idPrefix}-note`}>Note</label>
                {showInlineSubmit ? (
                    <input
                        id={`${idPrefix}-note`}
                        type="text"
                        className={styles.textInput}
                        placeholder="Flight number, child seats…"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                ) : (
                    <textarea
                        id={`${idPrefix}-note`}
                        className={styles.textInput}
                        placeholder="Flight number, child seats, stops on the way…"
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                )}
            </div>

            {showInlineSubmit && (
                <button type="submit" className={styles.submit}>
                    Continue
                </button>
            )}
        </>
    );

    // Trip summary shown above Step 2, with a way back to edit it.
    const stepHeader = (
        <div className={styles.stepHeader}>
            <div className={styles.stepText}>
                <span className={styles.stepBadge}>Step 2 of 3 · Your details</span>
                <span className={styles.stepSummary}>{tripTypeLabel}: {tripSummary}</span>
            </div>
            <button type="button" className={styles.stepBack} onClick={backToTrip}>
                ← Edit trip
            </button>
        </div>
    );

    return (
        <div className={styles.wrap}>
            {/* Tab control — own design, real ARIA tablist */}
            <div role="tablist" aria-label="Search mode" className={styles.tablist}>
                <span
                    className={styles.tabIndicator}
                    style={{ transform: indicatorTransform }}
                    aria-hidden="true"
                />
                {MODE_TABS.map((t, idx) => (
                    <button
                        key={t.key}
                        id={`${tabsId}-tab-${t.key}`}
                        role="tab"
                        type="button"
                        aria-selected={mode === t.key}
                        aria-controls={`${tabsId}-panel`}
                        tabIndex={mode === t.key ? 0 : -1}
                        className={`${styles.tab} ${mode === t.key ? styles.tabActive : ''}`}
                        onClick={() => selectMode(t.key)}
                        onKeyDown={(e) => onTabKeyDown(e, idx)}
                    >
                        {t.icon}
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Desktop / tablet: Step 2 swaps into the same bar, in place */}
            {step === 2 && <div className={styles.desktopOnly}>{stepHeader}</div>}
            <form
                id={`${tabsId}-panel`}
                role="tabpanel"
                aria-labelledby={`${tabsId}-tab-${mode}`}
                onSubmit={step === 1 ? handleTripSubmit : handleDetailsSubmit}
                className={styles.bar}
                noValidate
            >
                {step === 1 ? barContent('bar') : detailsContent('bar')}
            </form>

            {/* Mobile collapsed summary — opens the full-screen sheet (<768px) */}
            <button
                type="button"
                className={styles.mobileSummary}
                onClick={() => setMobileSheetOpen(true)}
            >
                <CompassIcon size={16} />
                {step === 2 ? 'Add your details' : from && destinationText ? 'Edit your search' : 'Where are you going?'}
            </button>

            {mounted && mobileSheetOpen && createPortal(
                <div className={styles.sheetOverlay} role="dialog" aria-modal="true" aria-label="Search">
                    <div className={styles.sheet}>
                        <div className={styles.sheetHeader}>
                            <div role="tablist" aria-label="Search mode" className={styles.tablist}>
                                <span
                                    className={styles.tabIndicator}
                                    style={{ transform: indicatorTransform }}
                                    aria-hidden="true"
                                />
                                {MODE_TABS.map((t, idx) => (
                                    <button
                                        key={t.key}
                                        role="tab"
                                        type="button"
                                        aria-selected={mode === t.key}
                                        tabIndex={mode === t.key ? 0 : -1}
                                        className={`${styles.tab} ${mode === t.key ? styles.tabActive : ''}`}
                                        onClick={() => selectMode(t.key)}
                                        onKeyDown={(e) => onTabKeyDown(e, idx)}
                                    >
                                        {t.icon}
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                className={styles.sheetClose}
                                onClick={() => setMobileSheetOpen(false)}
                                aria-label="Close search"
                            >
                                ✕
                            </button>
                        </div>
                        <form
                            onSubmit={(e) => {
                                if (step === 1) handleTripSubmit(e);
                                else if (handleDetailsSubmit(e)) setMobileSheetOpen(false);
                            }}
                            className={styles.sheetForm}
                            noValidate
                        >
                            {step === 2 && stepHeader}
                            {step === 1 ? barContent('sheet', false) : detailsContent('sheet', false)}

                            {step === 1 && mode === 'transfers' && (
                                <label className={styles.returnToggle}>
                                    <input type="checkbox" checked={addReturn} onChange={(e) => setAddReturn(e.target.checked)} />
                                    Add return trip
                                </label>
                            )}
                            {step === 1 && mode === 'transfers' && addReturn && (
                                <div className={styles.returnFields}>
                                    <div className={styles.field}>
                                        <label className={styles.fieldLabel} htmlFor="sheet-return-date">Return date</label>
                                        <input id="sheet-return-date" type="date" className={styles.dateInput} value={returnDate} min={date || todayISO()} onChange={(e) => setReturnDate(e.target.value)} />
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.fieldLabel} htmlFor="sheet-return-time">Return time</label>
                                        <input id="sheet-return-time" type="time" className={styles.timeInput} value={returnTime} onChange={(e) => setReturnTime(e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {errorList.length > 0 && (
                                <div className={styles.errorBox} role="alert">
                                    {errorList.map((msg) => <p key={msg}>{msg}</p>)}
                                </div>
                            )}

                            <button type="submit" className={styles.sheetSubmit}>{step === 1 ? 'Next' : 'Continue'}</button>
                        </form>
                    </div>
                </div>,
                document.body
            )}

            {/* Transfers-only add-return toggle, sits below the desktop bar */}
            {step === 1 && mode === 'transfers' && (
                <div className={styles.returnRow}>
                    <label className={styles.returnToggle}>
                        <input type="checkbox" checked={addReturn} onChange={(e) => setAddReturn(e.target.checked)} />
                        Add return trip
                    </label>
                    {addReturn && (
                        <div className={styles.returnFields}>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel} htmlFor="bar-return-date">Return date</label>
                                <input id="bar-return-date" type="date" className={styles.dateInput} value={returnDate} min={date || todayISO()} onChange={(e) => setReturnDate(e.target.value)} aria-invalid={!!errors.returnDate || undefined} />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.fieldLabel} htmlFor="bar-return-time">Return time</label>
                                <input id="bar-return-time" type="time" className={styles.timeInput} value={returnTime} onChange={(e) => setReturnTime(e.target.value)} />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {errorList.length > 0 && (
                <div className={styles.errorBoxDesktop} role="alert">
                    {errorList.map((msg) => <p key={msg}>{msg}</p>)}
                </div>
            )}

            {/* Trust row + WhatsApp (spec §2.5) */}
            <div className={styles.trustRow}>
                <div className={styles.trustItems}>
                    <span className={styles.trustItem}><ShieldIcon size={15} /> Licensed Drivers</span>
                    <span className={styles.trustItem}><UserIcon size={15} /> 15,000+ Travelers</span>
                </div>
                <a
                    href={from ? waLink(whatsappText) : waLink("Hi, I'd like an instant quote.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.whatsappLink}
                >
                    <WhatsAppIcon size={16} /> Instant quote on WhatsApp
                </a>
            </div>
        </div>
    );
}

export default function HeroSearchBar() {
    return (
        <Suspense fallback={<div className={styles.wrap} style={{ minHeight: 180 }} />}>
            <HeroSearchBarInner />
        </Suspense>
    );
}
