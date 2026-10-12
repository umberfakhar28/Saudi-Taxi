'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './AnnouncementSlider.module.css';

// `short` is shown on phones, where the bar must stay a single line (its
// height is a fixed CSS variable that the TopBar/Navbar offsets depend on).
const MESSAGES: { text: string; short: string; href: string }[] = [
    {
        text: "Travel Plans Changed? We're Here to Help with Alternative Airport Transfers.",
        short: 'Plans changed? Alternative airport transfers',
        href: '/riyadh-alternative-airports',
    },
    {
        text: 'Need a Private Transfer? Contact Us to Check Current Vehicle Availability.',
        short: 'Check current vehicle availability',
        href: '/contact',
    },
    {
        text: 'Flexible Airport Transfers Across Saudi Arabia and the Gulf Region.',
        short: 'Airport transfers across Saudi & the Gulf',
        href: '/airport-transfers',
    },
    {
        text: 'Planning a Journey? Contact Our Team for Your Transfer Quote.',
        short: 'Planning a journey? Get your quote',
        href: '/contact',
    },
];

export default function AnnouncementSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        // Respect reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % MESSAGES.length);
        }, 4500);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div
            className={styles.sliderContainer}
            data-announcement-bar
            role="region"
            aria-label="Announcements"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
        >
            <div className={styles.messageWrapper}>
                {MESSAGES.map((msg, idx) => {
                    const active = idx === currentIndex;
                    return (
                        <Link
                            key={idx}
                            href={msg.href}
                            className={`${styles.message} ${active ? styles.active : ''}`}
                            aria-hidden={!active}
                            tabIndex={active ? 0 : -1}
                        >
                            <span className={styles.full}>{msg.text}</span>
                            <span className={styles.short}>{msg.short}</span>
                            <span className={styles.arrow} aria-hidden="true">&rarr;</span>
                        </Link>
                    );
                })}
            </div>
            <div className={styles.dots} aria-hidden="true">
                {MESSAGES.map((_, idx) => (
                    <span key={idx} className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`} />
                ))}
            </div>
        </div>
    );
}
