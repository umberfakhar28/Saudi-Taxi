'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import type { HeroSlide } from '@/lib/heroSliderConfig';
import styles from './HeroImageSlider.module.css';

const AUTOPLAY_MS = 5500;
const NEXT_SLIDE_PRELOAD_DELAY_MS = 1200;

interface HeroImageSliderProps {
    slides: HeroSlide[];
    /** Shared object-fit/positioning class from Hero.module.css, kept in
     * sync with the rest of the hero's photo treatment. */
    imageClassName?: string;
}

/**
 * Background image slider for the homepage hero — crossfades between
 * slides, autoplays, and exposes pagination dots. The hero's text content
 * (badge/H1/paragraph/CTAs) lives in Hero.tsx and never re-renders when
 * slides change; this component only owns the photo stack + dots.
 *
 * Only the first slide loads eagerly (priority). Later slides mount into
 * the DOM (and start downloading) one at a time, a little ahead of when
 * they're due to display — not all five upfront — see ensureLoaded below.
 */
export default function HeroImageSlider({ slides, imageClassName }: HeroImageSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
    const [paused, setPaused] = useState(false);
    const reducedMotionRef = useRef(false);
    const touchStartX = useRef<number | null>(null);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        reducedMotionRef.current = mq.matches;
        const onChange = () => { reducedMotionRef.current = mq.matches; };
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, []);

    const ensureLoaded = useCallback((i: number) => {
        setLoaded((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
    }, []);

    // Warm the second slide shortly after mount so the first autoplay
    // transition doesn't stall on a cold fetch — deliberately delayed so it
    // doesn't compete with the hero's own LCP image.
    useEffect(() => {
        if (slides.length < 2) return;
        const t = setTimeout(() => ensureLoaded(1), NEXT_SLIDE_PRELOAD_DELAY_MS);
        return () => clearTimeout(t);
    }, [ensureLoaded, slides.length]);

    const goTo = useCallback((index: number) => {
        const next = ((index % slides.length) + slides.length) % slides.length;
        ensureLoaded(next);
        ensureLoaded((next + 1) % slides.length);
        setActiveIndex(next);
    }, [ensureLoaded, slides.length]);

    // Autoplay — restarts on every index change, so a manual dot click (or
    // swipe) resets the countdown instead of the next auto-tick landing
    // moments later.
    useEffect(() => {
        if (slides.length < 2 || paused || reducedMotionRef.current) return undefined;
        const id = setInterval(() => {
            setActiveIndex((prev) => {
                const next = (prev + 1) % slides.length;
                ensureLoaded(next);
                ensureLoaded((next + 1) % slides.length);
                return next;
            });
        }, AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [activeIndex, paused, slides.length, ensureLoaded]);

    function onTouchStart(e: React.TouchEvent) {
        touchStartX.current = e.touches[0].clientX;
        setPaused(true);
    }

    function onTouchEnd(e: React.TouchEvent) {
        const startX = touchStartX.current;
        touchStartX.current = null;
        setPaused(false);
        if (startX === null) return;
        const delta = e.changedTouches[0].clientX - startX;
        const SWIPE_THRESHOLD = 40;
        if (delta > SWIPE_THRESHOLD) goTo(activeIndex - 1);
        else if (delta < -SWIPE_THRESHOLD) goTo(activeIndex + 1);
    }

    function onDotsKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(activeIndex + 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(activeIndex - 1); }
    }

    return (
        <div
            className={styles.root}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {slides.map((slide, i) => {
                if (!loaded.has(i)) return null;
                const isActive = i === activeIndex;
                const focalStyle = {
                    '--obj-desktop': slide.objectPosition,
                    '--obj-mobile': slide.mobileObjectPosition,
                } as CSSProperties;
                return (
                    <div
                        key={slide.image}
                        className={`${styles.slide} ${isActive ? styles.slideActive : ''}`}
                        aria-hidden={!isActive}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            priority={slide.priority}
                            sizes="100vw"
                            className={`${styles.slideImage} ${imageClassName ?? ''}`}
                            style={focalStyle}
                        />
                    </div>
                );
            })}

            {slides.length > 1 && (
                <div
                    className={styles.dots}
                    role="tablist"
                    aria-label="Hero image slides"
                    onKeyDown={onDotsKeyDown}
                >
                    {slides.map((slide, i) => (
                        <button
                            key={slide.image}
                            type="button"
                            role="tab"
                            aria-selected={i === activeIndex}
                            aria-label={`Go to slide ${i + 1}`}
                            tabIndex={i === activeIndex ? 0 : -1}
                            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
