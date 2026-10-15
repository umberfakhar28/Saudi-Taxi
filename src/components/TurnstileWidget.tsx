'use client';

import { useEffect, useRef } from 'react';

/**
 * Cloudflare Turnstile, rendered explicitly so React controls its lifecycle.
 *
 * `appearance: "interaction-only"` keeps it invisible for the great majority
 * of visitors — it only draws a widget when Cloudflare actually wants an
 * interaction. On a booking form that matters: a puzzle in front of every
 * customer costs real bookings.
 *
 * With NEXT_PUBLIC_TURNSTILE_SITE_KEY unset this renders nothing and reports
 * an empty token, so the form still works (the server fails open to match —
 * see src/lib/antiSpam.ts).
 */

declare global {
    interface Window {
        turnstile?: {
            render: (el: HTMLElement, opts: Record<string, unknown>) => string;
            remove: (id: string) => void;
            reset: (id?: string) => void;
        };
        __gtsTurnstileLoading?: Promise<void>;
    }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadScript(): Promise<void> {
    if (window.turnstile) return Promise.resolve();
    if (window.__gtsTurnstileLoading) return window.__gtsTurnstileLoading;

    window.__gtsTurnstileLoading = new Promise<void>((resolve, reject) => {
        const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
        if (existing) {
            existing.addEventListener('load', () => resolve());
            existing.addEventListener('error', () => reject(new Error('Turnstile failed to load')));
            return;
        }
        const script = document.createElement('script');
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Turnstile failed to load'));
        document.head.appendChild(script);
    });
    return window.__gtsTurnstileLoading;
}

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

export default function TurnstileWidget({ onToken }: { onToken: (token: string) => void }) {
    const hostRef = useRef<HTMLDivElement | null>(null);
    // Kept in a ref so re-renders of the parent form never re-run the render
    // effect below and rebuild the widget underneath the visitor.
    const callbackRef = useRef(onToken);
    useEffect(() => { callbackRef.current = onToken; }, [onToken]);

    useEffect(() => {
        const host = hostRef.current;
        if (!TURNSTILE_SITE_KEY || !host) return;

        let widgetId: string | null = null;
        let cancelled = false;

        loadScript()
            .then(() => {
                if (cancelled || !window.turnstile) return;
                widgetId = window.turnstile.render(host, {
                    sitekey: TURNSTILE_SITE_KEY,
                    appearance: 'interaction-only',
                    callback: (token: string) => callbackRef.current(token),
                    'expired-callback': () => callbackRef.current(''),
                    'timeout-callback': () => callbackRef.current(''),
                    'error-callback': () => {
                        // A blocked or failed challenge must not strand the
                        // customer: the token is cleared and the server
                        // decides, rather than the form refusing locally.
                        callbackRef.current('');
                    },
                });
            })
            .catch((err) => {
                console.warn('[TURNSTILE]', err);
                callbackRef.current('');
            });

        return () => {
            cancelled = true;
            if (widgetId && window.turnstile) {
                try { window.turnstile.remove(widgetId); } catch { /* already gone */ }
            }
        };
    }, []);

    if (!TURNSTILE_SITE_KEY) return null;

    return <div ref={hostRef} style={{ margin: 'var(--space-4) 0', minHeight: 0 }} />;
}
