'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { StarIcon } from "./Icons";
import styles from "./TestimonialsSection.module.css";

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  service: string;
  date: string;
  text: string;
}

/**
 * Deliberately empty.
 *
 * Four testimonials used to sit here — Ahmad Al-Farsi, Fatima Binti Hassan,
 * Sarah Johnson, Khadija Osman — carried over from /testimonials, where they
 * had also been invented. No such customers left that feedback, and the
 * five-star ratings attached to them were not measurements of anything.
 *
 * The slider below is kept intact and renders nothing while this array is
 * empty, so the day there are genuine reviews they go in here and the
 * section comes back on its own. Do not seed it with samples: anything in
 * this array is published to customers as a real person's words.
 */
const testimonials: Testimonial[] = [];

const AUTOPLAY_MS = 2600;

// A TrustpilotBadge used to render here claiming "Rated on Trustpilot" with
// a five-star row — removed because there's no live Trustpilot profile
// behind it, so it was presenting an unbacked rating claim. Re-add once a
// real profile exists.

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotionRef = useRef(false);
  const touchStartX = useRef<number | null>(null);
  const count = testimonials.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = () => { reducedMotionRef.current = mq.matches; };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % count) + count) % count);
  }, [count]);

  // Restarts on every index change so a manual click/swipe resets the
  // countdown instead of the next auto-tick landing moments later — same
  // rhythm as the homepage hero's image slider.
  useEffect(() => {
    if (paused || reducedMotionRef.current || count === 0) return undefined;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [activeIndex, paused, count]);

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
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(activeIndex + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(activeIndex - 1); }
  }

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>★</span>
    ));

  // No reviews, no section. Placed after every hook so the hook order stays
  // identical whether or not there is anything to show.
  if (count === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Section header */}
        <div className="section-header centered">
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="section-title">Real Stories From Our Riders</h2>
          <div className="divider-gold" style={{ margin: "1rem auto 1.5rem" }} />
          <p className="section-subtitle">
            Genuine feedback from pilgrims and travelers who trusted us with their journey.
          </p>
        </div>

        {/* Slider */}
        <div
          className={styles.sliderWrap}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous testimonial"
            onClick={() => goTo(activeIndex - 1)}
          >
            ‹
          </button>

          <div className={styles.card}>
            <span className={styles.quoteMark} aria-hidden="true">&ldquo;</span>

            {/* All slides render stacked in the same grid cell so the card
                auto-sizes to the tallest one and the crossfade never causes
                a layout jump between reviews of different lengths. */}
            <div className={styles.slidesStack}>
              {testimonials.map((t, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={t.name}
                    className={`${styles.slide} ${isActive ? styles.slideActive : ""}`}
                    aria-hidden={!isActive}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Review ${i + 1} of ${count}`}
                  >
                    <div className={styles.reviewerRow}>
                      <div className={styles.avatar}>{t.name.charAt(0)}</div>
                      <div className={styles.reviewerInfo}>
                        <p className={styles.name}>{t.name}</p>
                        <p className={styles.location}>{t.location}</p>
                      </div>
                      <div className={styles.meta}>
                        <div className={styles.stars}>{renderStars(t.rating)}</div>
                        <p className={styles.date}>{t.date}</p>
                      </div>
                    </div>

                    <p className={styles.text}>{t.text}</p>

                    <span className={styles.badge}>{t.service}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className={styles.arrow}
            aria-label="Next testimonial"
            onClick={() => goTo(activeIndex + 1)}
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className={styles.dots} role="tablist" aria-label="Testimonial slides" onKeyDown={onDotsKeyDown}>
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show review from ${t.name}`}
              tabIndex={i === activeIndex ? 0 : -1}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
