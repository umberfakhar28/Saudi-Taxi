'use client';

import Image from 'next/image';
import { ShieldIcon } from './Icons';
import HeroSearchBar from './HeroSearchBar';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <Image
                src="/gulftripservice-heroimage.webp"
                alt="Professional chauffeur and taxi service in Saudi Arabia"
                fill
                priority
                sizes="100vw"
                className={styles.heroImage}
            />
            {/* Dark scrim over the photo so white headline text stays AA-compliant
                at every point in the image, not just wherever it happens to be
                dark already — same pattern as AirportPage.tsx's hero. */}
            <div className={styles.heroScrim} />

            {/* TOP — Headline, subtitle (CTAs removed — the search bar below is
                the hero's one primary action; see the Homepage Hero + Multi-Mode
                Search addendum, §1). */}
            <div className={styles.content}>
                <div className={styles.badge}>
                    <ShieldIcon size={14} className={styles.badgeIcon} />
                    Most Reliable Ride in Saudi Arabia
                </div>

                <h1 className={styles.title}>
                    Book Taxi Service Online <br />
                    <em> in Saudi Arabia </em>
                </h1>

                <p className={styles.subtitle}>
                    Airport transfers, intercity travel, Umrah &amp; Hajj transport —
                    across all of Saudi Arabia. Professional chauffeurs, fixed rates,
                    zero hidden fees. Available 24/7.
                </p>
            </div>

            {/* MIDDLE — Multi-mode search bar (Transfers / Hourly Driver / Day
                Trips) + trust row + WhatsApp instant-quote link. Replaces the
                old single-mode "Check Rates" row and the bottom trust strip —
                folded into one element directly below the bar per §2.5, so
                removing the CTAs doesn't just leave a gap above two separate
                trust rows. */}
            <div className={styles.searchWrap}>
                <HeroSearchBar />
            </div>
        </section>
    );
};

export default Hero;
