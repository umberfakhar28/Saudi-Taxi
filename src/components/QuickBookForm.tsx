"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, ClockIcon, UserIcon, ArrowRightIcon, WhatsAppIcon } from "./Icons";
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
}

/**
 * Compact quick-booking form for high-intent commercial pages (route,
 * airport, service pages — booking-flow revision brief §2). Deliberately
 * thin: it collects just enough to prefill Book Online (pickup, drop-off,
 * date, time, passengers) and hands off to the existing multi-step flow
 * for everything else (vehicle, contact details) — one booking system,
 * not a second parallel one that also has to write to Supabase.
 */
export default function QuickBookForm({ defaultFrom = "", defaultTo = "", service, heading, subheading, locale = 'en' }: QuickBookFormProps) {
    const t = ui(locale);
    const title = heading ?? t.quickQuoteHeading;
    const router = useRouter();
    const [from, setFrom] = useState(defaultFrom);
    const [to, setTo] = useState(defaultTo);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [passengers, setPassengers] = useState("1");

    const buildParams = () => {
        const qs = new URLSearchParams({ from, to, passengers });
        if (date) qs.set("date", date);
        if (time) qs.set("time", time);
        if (service) qs.set("service", service);
        else qs.set("mode", "transfers");
        return qs;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/book-online?${buildParams().toString()}`);
    };

    const whatsappMessage = () => {
        const parts = [
            "Assalamu Alaikum, I'd like to book a ride.",
            from ? `From: ${from}` : null,
            to ? `To: ${to}` : null,
            date ? `Date: ${date}` : null,
            time ? `Time: ${time}` : null,
            `Passengers: ${passengers}`,
        ].filter(Boolean);
        return parts.join("\n");
    };

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
                {subheading && <p className={styles.subtitle}>{subheading}</p>}
            </div>

            <form onSubmit={handleSubmit} className={styles.grid}>
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
                    <label className={styles.label}><CalendarIcon size={14} /> {t.date}</label>
                    <input type="date" className={styles.input} value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}><ClockIcon size={14} /> {t.time}</label>
                    <input type="time" className={styles.input} value={time} onChange={(e) => setTime(e.target.value)} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}><UserIcon size={14} /> {t.passengers}</label>
                    <select className={styles.input} value={passengers} onChange={(e) => setPassengers(e.target.value)}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                </div>

                <div className={styles.actions}>
                    <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                        {t.bookNow} <ArrowRightIcon size={16} />
                    </button>
                    <a
                        href={waLink(whatsappMessage())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn btn-whatsapp ${styles.submitBtn}`}
                    >
                        <WhatsAppIcon size={16} /> {locale === 'ar' ? 'احجز عبر واتساب' : 'Book on WhatsApp'}
                    </a>
                </div>
            </form>
        </div>
    );
}
