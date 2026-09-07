'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useNotifications } from './NotificationProvider';
import styles from './NotificationToast.module.css';
import { displayDateTime } from '@/lib/datetime';

const AUTO_DISMISS_MS = 12000;

export default function NotificationToast() {
    const { toast, dismissToast, markRead } = useNotifications();

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(dismissToast, AUTO_DISMISS_MS);
        return () => clearTimeout(timer);
    }, [toast, dismissToast]);

    if (!toast) return null;

    return (
        <div className={styles.toast} role="status">
            <div className={styles.top}>
                <span className={styles.title}>🔔 {toast.title}</span>
                <button type="button" className={styles.closeBtn} onClick={dismissToast} aria-label="Dismiss">
                    <X size={14} />
                </button>
            </div>

            <div className={styles.details}>
                {(toast.pickup_location || toast.dropoff_location) && (
                    <div className={styles.detailRow}>
                        <strong>{toast.pickup_location}</strong> → <strong>{toast.dropoff_location}</strong>
                    </div>
                )}
                {(toast.travel_date || toast.travel_time) && (
                    <div className={styles.detailRow}>
                        {displayDateTime(toast.travel_date, toast.travel_time)}
                    </div>
                )}
                {toast.passengers_count != null && (
                    <div className={styles.detailRow}>{toast.passengers_count} passenger(s)</div>
                )}
            </div>

            <div className={styles.actions}>
                <Link
                    href={toast.booking_id ? `/admin/bookings?view=${toast.booking_id}` : '/admin/bookings'}
                    className={styles.viewBtn}
                    onClick={() => {
                        markRead(toast.id);
                        dismissToast();
                    }}
                >
                    View Booking
                </Link>
            </div>
        </div>
    );
}
