'use client';

import Link from 'next/link';
import {
    ShieldIcon,
    ClockIcon,
    TagIcon,
    UserIcon,
    CarIcon,
    PlaneIcon,
    MapPinIcon,
    CalendarIcon,
    MessageIcon,
} from './Icons';
import styles from './Hero.module.css';
import { waLink } from '@/lib/contact';

const Hero = () => {
    return (
        <section className={styles.hero}>
            {/* TOP — Headline, subtitle, primary CTAs (full width) */}
            <div className={styles.content}>
                <div className={styles.badge}>
                    <ShieldIcon size={14} className={styles.badgeIcon} />
                    Trusted by 15,000+ Travelers
                </div>

                <h1 className={styles.title}>
                    Saudi Arabia&apos;s Most Trusted<br />
                    <em>Luxury Transfer Service</em>
                </h1>

                <p className={styles.subtitle}>
                    Airport transfers, intercity travel, Umrah &amp; Hajj transport —
                    across all of Saudi Arabia. Professional chauffeurs, fixed rates,
                    zero hidden fees. Available 24/7.
                </p>

                <div className={styles.ctaGroup}>
                    <a
                        href={waLink("Hi, I'd like to book a ride")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.ctaButton}
                    >
                        <MessageIcon size={16} />
                        Book Your Ride
                    </a>
                    <Link href="/quote" className={styles.ctaSecondary}>
                        <TagIcon size={16} />
                        Get Instant Quote
                    </Link>
                </div>
            </div>

            {/* MIDDLE — Horizontal booking search bar (full width, booking.com-style) */}
            <div className={styles.searchWrap}>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.target as typeof e.target & {
                            pickup: HTMLInputElement;
                            dropoff: HTMLInputElement;
                            datetime: HTMLInputElement;
                            vehicle: HTMLSelectElement;
                        };
                        const message = `Assalamu Alaikum, I would like to book a ride.\nPickup: ${target.pickup.value}\nDestination: ${target.dropoff.value}\nDate & Time: ${target.datetime.value}\nVehicle: ${target.vehicle.value}`;
                        window.open(waLink(message), '_blank');
                    }}
                    className={styles.searchBar}
                >
                    <div className={styles.searchField}>
                        <label className={styles.searchLabel} htmlFor="hero-pickup">
                            <MapPinIcon size={14} /> Pickup Point
                        </label>
                        <input id="hero-pickup" name="pickup" type="text" placeholder="Airport, Hotel, etc." required />
                    </div>

                    <div className={styles.searchField}>
                        <label className={styles.searchLabel} htmlFor="hero-dropoff">
                            <MapPinIcon size={14} /> Destination
                        </label>
                        <input id="hero-dropoff" name="dropoff" type="text" placeholder="Where are you headed?" required />
                    </div>

                    <div className={styles.searchField}>
                        <label className={styles.searchLabel} htmlFor="hero-datetime">
                            <CalendarIcon size={14} /> Date &amp; Time
                        </label>
                        <input id="hero-datetime" name="datetime" type="datetime-local" required />
                    </div>

                    <div className={styles.searchField}>
                        <label className={styles.searchLabel} htmlFor="hero-vehicle">
                            <CarIcon size={14} /> Vehicle Type
                        </label>
                        <select id="hero-vehicle" name="vehicle" defaultValue="Sedan" required>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                            <option value="Van">Van</option>
                            <option value="Luxury">Luxury</option>
                        </select>
                    </div>

                    <button type="submit" className={styles.searchSubmit}>
                        Check Rates
                    </button>
                </form>
            </div>

            {/* BOTTOM — Trust strip */}
            <div className={styles.trustStrip}>
                <span className={styles.trustItem}>
                    <PlaneIcon size={15} /> Flight Tracking
                </span>
                <span className={styles.trustItem}>
                    <ClockIcon size={15} /> 24/7 Service
                </span>
                <span className={styles.trustItem}>
                    <TagIcon size={15} /> Fixed Pricing
                </span>
                <span className={styles.trustItem}>
                    <ShieldIcon size={15} /> Licensed Fleet
                </span>
                <span className={styles.trustItem}>
                    <UserIcon size={15} /> 15,000+ Customers
                </span>
            </div>
        </section>
    );
};

export default Hero;
