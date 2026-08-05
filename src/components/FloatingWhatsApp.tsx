'use client';

import { useEffect, useState } from 'react';
import { WhatsAppIcon } from './Icons';
import { waLink } from '@/lib/contact';
import styles from './FloatingWhatsApp.module.css';

/**
 * Site-wide floating WhatsApp button (Homepage Hero + Multi-Mode Search
 * addendum §3). Own design — circular, --accent-green, soft halo — not a
 * copy of the reference screenshot's styling.
 *
 * Context-aware prefill: there's no existing per-page "context" mechanism
 * to reuse (the header's own WhatsApp CTA is a generic message, not
 * context-aware either), so this reads `document.title` on mount — every
 * page already has a distinct, accurate title via generatePageMetadata —
 * rather than inventing a path-parsing heuristic that could produce a
 * wrong or garbled destination name.
 *
 * No notification dot: a permanent "we're online" badge with no real
 * signal behind it is a dark pattern the spec explicitly warns against,
 * and there's no verified operating-hours data source to make it truthful.
 */
export default function FloatingWhatsApp() {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("Hi, I'd like some help with my booking.");

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const title = document.title.split('|')[0].trim();
        if (title) setMessage(`Hi, I'm interested in: ${title}. Could you help me with a quote?`);
    }, []);

    if (!visible) return null;

    return (
        <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
            aria-label="Chat with us on WhatsApp"
        >
            <span className={styles.halo} aria-hidden="true" />
            <WhatsAppIcon size={26} className={styles.icon} />
            <span className={styles.label}>Chat with us</span>
        </a>
    );
}
