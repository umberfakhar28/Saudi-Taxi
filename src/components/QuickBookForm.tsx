"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, ClockIcon, UserIcon, ArrowRightIcon, WhatsAppIcon, CarIcon, ShieldCheckIcon } from "./Icons";
import SearchAutocomplete from "./SearchAutocomplete";
import { waLink } from "@/lib/contact";
import { ui, type Locale } from "@/lib/i18n";
import styles from "./QuickBookForm.module.css";

interface QuickBookFormProps {
    /** Pre-filled, still-editable — booking-flow revision brief §3. */
    defaultFrom?: string;
    defaultTo?: string;
    /** A known Book Online Step-1 service id (e.g. "airport-transfer",
     * "private-taxi") — when the page context already makes this obvious,
     * so the customer doesn't have to re-pick it on Step 1. */
    service?: string;
    heading?: string;
    subheading?: string;
    /** Defaults to English; 'ar' renders the Arabic labels. The booking
     * flow it hands off to is the same one in both languages. */
    locale?: Locale;
    /** Optional vehicle choice, e.g. with the route's fare in the label.
     *  The value is passed to Book Online as `vehicleName`. */
    vehicles?: { value: string; label: string }[];
    /** Highest passenger count offered. Defaults to 8. */
    maxPassengers?: number;
    /** A short reassurance strip shown at the bottom of the card. */
    footerNote?: string;
    /** Heading level for the card title. Defaults to h3. */
    headingAs?: "h2" | "h3";
}

/**
 * Compact quick-booking form for high-intent commercial pages (route,
 * airport, service pages — booking-flow revision brief §2). Deliberately
 * thin: it collects just enough to prefill Book Online (pickup, drop-off,
 * date, time, passengers) and hands off to the existing multi-step flow
 * for everything else (vehicle, contact details) — one booking system,
 * not a second parallel one that also has to write to Supabase.
 */
export default function QuickBookForm({ defaultFrom = "", defaultTo = "", service, heading, subheading, locale = 'en', vehicles, maxPassengers = 8, footerNote, headingAs: Heading = 'h3' }: QuickBookFormProps) {
    const t = ui(locale);
    const title = heading ?? t.quickQuoteHeading;
    const router = useRouter();
    const [from, setFrom] = useState(defaultFrom);
    const [to, setTo] = useState(defaultTo);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [passengers, setPassengers] = useState("1");
    const [vehicle, setVehicle] = useState("");
    // Labels point at their fields, so screen readers announce each one.
    const uid = useId();

    const buildParams = () => {
        const qs = new URLSearchParams({ from, to, passengers });
        if (date) qs.set("date", date);
        if (time) qs.set("time", time);
        if (vehicle) qs.set("vehicleName", vehicle);
        if (service) qs.set("service", service);
        else qs.set("mode", "transfers");
        return qs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/book-online?${buildParams().toString()}`);
    };

    // Arabic pages build the message in Arabic: the customer sends this text
    // under their own name, and an English sentence with Arabic place names
    // dropped into it reads as broken.
    const whatsappMessage = () => {
        const ar = locale === 'ar';
        const parts = [
            ar ? "السلام عليكم، أرغب في حجز رحلة." : "Assalamu Alaikum, I'd like to book a ride.",
            from ? `${ar ? 'من' : 'From'}: ${from}` : null,
            to ? `${ar ? 'إلى' : 'To'}: ${to}` : null,
            date ? `${ar ? 'التاريخ' : 'Date'}: ${date}` : null,
            time ? `${ar ? 'الوقت' : 'Time'}: ${time}` : null,
            `${ar ? 'عدد الركاب' : 'Passengers'}: ${passengers}`,
            vehicle ? `${ar ? 'السيارة' : 'Vehicle'}: ${vehicle}` : null,
        ].filter(Boolean);
        return parts.join("\n");
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <Heading className={styles.title}>{title}</Heading>
                {subheading && <p className={styles.subtitle}>{subheading}</p>}
            </div>

            <form onSubmit={handleSubmit} className={vehicles ? `${styles.grid} ${styles.gridWithVehicle}` : styles.grid}>
                <div className={styles.field}>
                    <SearchAutocomplete
                        variant="field"
                        label={t.pickup}
                        placeholder={t.pickupPlaceholder}
                        value={from}
                        onChange={setFrom}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <SearchAutocomplete
                        variant="field"
                        label={t.dropoff}
                        placeholder={t.dropoffPlaceholder}
                        value={to}
                        onChange={setTo}
                        required
                    />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor={`${uid}-date`}><CalendarIcon size={14} /> {t.date}</label>
                    <input id={`${uid}-date`} type="date" className={styles.input} value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor={`${uid}-time`}><ClockIcon size={14} /> {t.time}</label>
                    <input id={`${uid}-time`} type="time" className={styles.input} value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor={`${uid}-passengers`}><UserIcon size={14} /> {t.passengers}</label>
                    <select id={`${uid}-passengers`} className={styles.input} value={passengers} onChange={(e) => setPassengers(e.target.value)}>
                        {Array.from({ length: maxPassengers }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>
                {vehicles && (
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor={`${uid}-vehicle`}><CarIcon size={14} /> {locale === 'ar' ? 'السيارة' : 'Vehicle'}</label>
                        <select id={`${uid}-vehicle`} className={styles.input} value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                            <option value="">{locale === 'ar' ? 'بدون تفضيل' : 'No preference'}</option>
                            {vehicles.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
                        </select>
                    </div>
                )}

                <div className={styles.actions}>
                    <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                        {t.bookNow} <ArrowRightIcon size={16} />
                    </button>
                    <a
                        href={waLink(whatsappMessage())}
                        data-wa-cta="quick-book-form"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn btn-whatsapp ${styles.submitBtn}`}
                    >
                        <WhatsAppIcon size={16} /> {locale === 'ar' ? 'احجز عبر واتساب' : 'Book on WhatsApp'}
                    </a>
                </div>
            </form>
            {footerNote && (
                <p className={styles.footerNote}>
                    <span aria-hidden="true" style={{ display: "inline-flex" }}><ShieldCheckIcon size={16} /></span> {footerNote}
                </p>
            )}
        </div>
    );
}
