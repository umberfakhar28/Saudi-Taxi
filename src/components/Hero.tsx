'use client';

import Link from 'next/link';
import { ShieldIcon, WhatsAppIcon } from './Icons';
import HeroSearchBar from './HeroSearchBar';
import HeroImageSlider from './HeroImageSlider';
import { waLink } from '@/lib/contact';
import { HERO_SLIDES } from '@/lib/heroSliderConfig';
import styles from './Hero.module.css';

const Hero = () => {
    return (
        <>
            <section className={styles.hero}>
                {/* Fills exactly one viewport (see .hero) — the navbar/topbar float
                    over this as a transparent overlay (PublicLayout passes
                    `transparent` on "/") instead of sitting above it, so the photo
                    starts at the very top of the page. */}
                <div className={styles.photoFrame}>
                    {/* Crossfading background slider (Saudi Arabia, then the wider
                        Gulf/GCC) — see src/lib/heroSliderConfig.ts for the slide
                        list and HeroImageSlider.tsx for the autoplay/crossfade/dots
                        mechanics. The badge/H1/paragraph/CTAs below never change
                        with the slide. */}
                    <HeroImageSlider slides={HERO_SLIDES} imageClassName={styles.heroImage} />
                    {/* Dark scrim over the photo so white headline text stays AA-compliant
                        at every point in the image, not just wherever it happens to be
                        dark already — same pattern as AirportPage.tsx's hero. Shared
                        across every slide (not per-slide) so the overlay treatment reads
                        as one consistent premium look rather than shifting per photo. */}
                    <div className={styles.heroScrim} />

                    {/* Headline, subtitle, and the two primary CTAs — the search bar
                        lives in its own section below so the hero photo stays fully
                        visible instead of the bar sitting on top of it. Wrapped in the
                        same global .container the navbar's logo uses (not a hardcoded
                        left offset), so they share one horizontal alignment edge at
                        every viewport width. */}
                    <div className={styles.contentOuter}>
                        <div className="container">
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

                                {/* Book Now leads — it's the primary conversion action;
                                    WhatsApp follows as the secondary green CTA. */}
                                <div className={styles.ctaRow}>
                                    <Link href="/book-online" className="btn btn-primary btn-lg">
                                        Book Now
                                    </Link>
                                    <a
                                        href={waLink("Hi, I'd like to book a ride.")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-whatsapp btn-lg"
                                    >
                                        <WhatsAppIcon size={18} /> WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Multi-mode search bar (Transfers / Hourly Driver / Day Trips), in
                its own section directly below the hero photo — see the Homepage
                Hero + Multi-Mode Search addendum, §1/§2.5. */}
            <section className={styles.searchSection}>
                <div className={styles.searchWrap}>
                    <HeroSearchBar />
                </div>
            </section>
        </>
    );
};

export default Hero;
