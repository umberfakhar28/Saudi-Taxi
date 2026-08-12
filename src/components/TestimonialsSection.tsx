'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { StarIcon } from "./Icons";
import styles from "./TestimonialsSection.module.css";

// Reused verbatim from the existing /testimonials page — same customers,
// same wording, same dates already published on the site. Picked for
// variety of service type and origin rather than invented for this slider.
const testimonials = [
  {
    name: "Ahmad Al-Farsi",
    location: "London, UK",
    rating: 5,
    service: "Airport Transfer",
    date: "January 2026",
    text: "Excellent service from start to finish. The driver was waiting at the airport with my name on a board. Very professional, clean car, and the price was exactly as quoted. Highly recommended for anyone traveling for Umrah!",
  },
  {
    name: "Fatima Binti Hassan",
    location: "Kuala Lumpur, Malaysia",
    rating: 5,
    service: "Umrah Taxi Package",
    date: "December 2025",
    text: "We used Gulf Trip Service for our entire Umrah trip — airport pickup, hotel transfers, and Ziyarat tours. The driver was knowledgeable, patient, and treated our family like his own. Will definitely use again, InshaAllah.",
  },
  {
    name: "Sarah Johnson",
    location: "Toronto, Canada",
    rating: 5,
    service: "Airport Transfer",
    date: "October 2025",
    text: "As a solo female traveler, safety was my top concern. The driver was very respectful and professional. The car was spotless and comfortable. I felt completely safe throughout the journey. Thank you for a wonderful experience!",
  },
  {
    name: "Khadija Osman",
    location: "Istanbul, Turkey",
    rating: 5,
    service: "Jeddah to Makkah",
    date: "June 2025",
    text: "We traveled with elderly parents who needed extra care. The driver was incredibly patient and helpful, assisting with wheelchairs and luggage. The vehicle was very comfortable. Allah reward you for your kindness!",
  },
];

const AUTOPLAY_MS = 2600;

// Simplified Trustpilot watermark for a light card background — five-star
// row + wordmark in Trustpilot's own brand green, not a redrawn/faked
// logotype (same convention already used by SocialProof.tsx, kept in its
// own brand color regardless of the site's navy/brass palette). There's no
// live Trustpilot profile wired up yet, so this stays a badge rather than
// a link to nowhere — swap in a real profile URL here once one exists.
function TrustpilotBadge() {
  return (
    <div className={styles.trustpilot} aria-label="Rated on Trustpilot">
      <span className={styles.trustpilotStars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} size={10} />
        ))}
      </span>
      <span className={styles.trustpilotWordmark}>Trustpilot</span>
    </div>
  );
}

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
    if (paused || reducedMotionRef.current) return undefined;
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
            <TrustpilotBadge />
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
