'use client';

import { useId, useState } from 'react';
import { UserIcon, PackageIcon, ChevronDownIcon } from './Icons';
import {
    MAX_PASSENGERS, MAX_LUGGAGE,
    VAN_HINT_THRESHOLD_PASSENGERS, VAN_HINT_THRESHOLD_LUGGAGE,
} from '@/lib/searchBarConfig';
import styles from './PassengerLuggageStepper.module.css';

interface PassengerLuggageStepperProps {
    passengers: number;
    luggage: number;
    onChange: (next: { passengers: number; luggage: number }) => void;
}

/**
 * Single "Passengers + Luggage" control (Homepage Hero + Multi-Mode Search
 * addendum §2.2) — a button showing both counts that opens a popover with
 * steppers. The van hint is informational only (aria-live, not a blocking
 * error) since a van is a suggestion, not a requirement.
 */
export default function PassengerLuggageStepper({ passengers, luggage, onChange }: PassengerLuggageStepperProps) {
    const [open, setOpen] = useState(false);
    const baseId = useId();

    const showVanHint = passengers > VAN_HINT_THRESHOLD_PASSENGERS || luggage > VAN_HINT_THRESHOLD_LUGGAGE;

    const Stepper = ({
        label, icon, value, max, onDec, onInc, describedBy,
    }: {
        label: string; icon: React.ReactNode; value: number; max: number;
        onDec: () => void; onInc: () => void; describedBy?: string;
    }) => (
        <div className={styles.stepperRow}>
            <span className={styles.stepperLabel}>{icon}{label}</span>
            <div className={styles.stepperControls}>
                <button
                    type="button"
                    className={styles.stepperBtn}
                    onClick={onDec}
                    disabled={value <= 1}
                    aria-label={`Decrease ${label.toLowerCase()}`}
                >
                    −
                </button>
                <span className={styles.stepperValue} aria-live="polite" aria-describedby={describedBy}>{value}</span>
                <button
                    type="button"
                    className={styles.stepperBtn}
                    onClick={onInc}
                    disabled={value >= max}
                    aria-label={`Increase ${label.toLowerCase()}`}
                >
                    +
                </button>
            </div>
        </div>
    );

    return (
        <div className={styles.wrap}>
            <span className={styles.label}>Passengers &amp; Luggage</span>
            <button
                type="button"
                className={styles.trigger}
                aria-expanded={open}
                aria-controls={`${baseId}-panel`}
                onClick={() => setOpen((o) => !o)}
            >
                <span className={styles.triggerCounts}>
                    <UserIcon size={14} /> {passengers}
                    <PackageIcon size={14} /> {luggage}
                </span>
                <ChevronDownIcon size={14} className={open ? styles.arrowOpen : undefined} />
            </button>
            {open && (
                <div id={`${baseId}-panel`} className={styles.panel} role="group" aria-label="Passengers and luggage">
                    <Stepper
                        label="Passengers"
                        icon={<UserIcon size={14} />}
                        value={passengers}
                        max={MAX_PASSENGERS}
                        onDec={() => onChange({ passengers: Math.max(1, passengers - 1), luggage })}
                        onInc={() => onChange({ passengers: Math.min(MAX_PASSENGERS, passengers + 1), luggage })}
                        describedBy={showVanHint ? `${baseId}-hint` : undefined}
                    />
                    <Stepper
                        label="Luggage"
                        icon={<PackageIcon size={14} />}
                        value={luggage}
                        max={MAX_LUGGAGE}
                        onDec={() => onChange({ passengers, luggage: Math.max(0, luggage - 1) })}
                        onInc={() => onChange({ passengers, luggage: Math.min(MAX_LUGGAGE, luggage + 1) })}
                        describedBy={showVanHint ? `${baseId}-hint` : undefined}
                    />
                    <p id={`${baseId}-hint`} className={styles.hint} aria-live="polite">
                        {showVanHint ? 'A van may suit this group better than a sedan or SUV — we’ll confirm the right vehicle with you.' : ''}
                    </p>
                    <button type="button" className={styles.doneBtn} onClick={() => setOpen(false)}>
                        Done
                    </button>
                </div>
            )}
        </div>
    );
}
