'use client';

import { useState, useEffect } from 'react';
import styles from './AnnouncementSlider.module.css';

const MESSAGES = [
    "Travel Plans Changed? We're Here to Help with Alternative Airport Transfers.",
    "Need a Private Transfer? Contact Us to Check Current Vehicle Availability.",
    "Flexible Airport Transfers Across Saudi Arabia and the Gulf Region.",
    "Planning a Journey? Contact Our Team for Your Transfer Quote."
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
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className={styles.messageWrapper}>
                {MESSAGES.map((msg, idx) => (
                    <div 
                        key={idx} 
                        className={`${styles.message} ${idx === currentIndex ? styles.active : ''}`}
                        aria-hidden={idx !== currentIndex}
                    >
                        {msg}
                    </div>
                ))}
            </div>
        </div>
    );
}
