'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Tooltip.module.css';

interface Props {
    /** Optional bold first line, e.g. the icon's name ("Unpaid"). */
    label?: string;
    /** The explanation itself. */
    text: string;
    children: React.ReactNode;
}

/**
 * Accessible tooltip for the admin portal's icons.
 *
 * The native `title` attribute was being used for these, which is invisible
 * on touch devices, ignored by keyboard navigation, and appears after a long
 * unconfigurable delay. This shows on hover AND on keyboard focus, and is
 * rendered through a portal with fixed positioning so a table's overflow or
 * a modal's clipping cannot cut it off.
 */
export default function Tooltip({ label, text, children }: Props) {
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
    const triggerRef = useRef<HTMLSpanElement>(null);
    const tooltipId = useId();

    const show = useCallback(() => {
        const el = triggerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Above the trigger by default; below it when there is no room, so
        // rows near the top of the viewport stay readable.
        const preferAbove = rect.top > 60;
        setPos({
            top: preferAbove ? rect.top - 8 : rect.bottom + 8,
            left: Math.min(Math.max(8, rect.left + rect.width / 2), window.innerWidth - 8),
        });
    }, []);

    const hide = useCallback(() => setPos(null), []);

    // A tooltip anchored to viewport coordinates would otherwise stay put
    // while the page moves underneath it.
    useEffect(() => {
        if (!pos) return;
        const onScroll = () => hide();
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') hide(); };
        window.addEventListener('scroll', onScroll, true);
        window.addEventListener('resize', onScroll);
        document.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('scroll', onScroll, true);
            window.removeEventListener('resize', onScroll);
            document.removeEventListener('keydown', onKey);
        };
    }, [pos, hide]);

    const anchoredAbove = pos ? pos.top < (triggerRef.current?.getBoundingClientRect().top ?? 0) + 1 : true;

    return (
        <>
            <span
                ref={triggerRef}
                className={styles.trigger}
                tabIndex={0}
                role="button"
                aria-describedby={pos ? tooltipId : undefined}
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={hide}
            >
                {children}
            </span>

            {pos &&
                typeof document !== 'undefined' &&
                createPortal(
                    <div
                        id={tooltipId}
                        role="tooltip"
                        className={styles.bubble}
                        style={{
                            top: pos.top,
                            left: pos.left,
                            transform: `translate(-50%, ${anchoredAbove ? '-100%' : '0'})`,
                        }}
                    >
                        {label && <strong className={styles.label}>{label}</strong>}
                        {text}
                    </div>,
                    document.body
                )}
        </>
    );
}
