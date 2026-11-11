"use client";

import { useEffect, useRef } from "react";

/**
 * Marks its element `data-reveal="in"` once it scrolls into view, so CSS
 * can animate the children (e.g. a staggered fade-up).
 *
 * Content is never hidden without this script: the hidden starting state
 * only applies after mount sets `data-reveal="pending"`, and nothing is
 * set at all when the visitor prefers reduced motion or the browser has
 * no IntersectionObserver. Opacity and transform only, so no layout shift.
 */
export default function Reveal({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.reveal = "pending";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "in";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}
