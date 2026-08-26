'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNotifications } from './NotificationProvider';
import { pushSupported, pushPromptDismissed, dismissPushPrompt, subscribeToPush } from '@/lib/push-client';
import styles from './NotificationBell.module.css';

export default function NotificationBell() {
    const { notifications, unreadCount, connectionState, markRead, markAllRead } = useNotifications();
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);
    const [pushOffer, setPushOffer] = useState<'hidden' | 'offer' | 'enabling' | 'enabled' | 'error'>('hidden');

    useEffect(() => {
        if (!pushSupported() || pushPromptDismissed()) return;
        if (Notification.permission === 'default') setPushOffer('offer');
    }, []);

    const handleEnablePush = async () => {
        setPushOffer('enabling');
        try {
            const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
            if (!key) throw new Error('missing VAPID key');
            await subscribeToPush(key);
            setPushOffer('enabled');
        } catch {
            setPushOffer('error');
        }
    };

    const handleDismissPush = () => {
        dismissPushPrompt();
        setPushOffer('hidden');
    };

    useEffect(() => {
        if (!open) return;
        const onClickOutside = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', onClickOutside);
        return () => document.removeEventListener('mousedown', onClickOutside);
    }, [open]);

    const statusLabel = connectionState === 'connected' ? 'Connected' : connectionState === 'reconnecting' ? 'Reconnecting…' : 'Connecting…';

    return (
        <div className={styles.wrap} ref={wrapRef}>
            <button
                type="button"
                className="admin-icon-btn"
                onClick={() => setOpen((v) => !v)}
                aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
                aria-expanded={open}
            >
                <Bell size={18} />
                {unreadCount > 0 && <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>}
                <span className={`${styles.connectionDot} ${styles[connectionState]}`} />
            </button>

            {open && (
                <div className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <span className={styles.panelTitle}>Notifications</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span className={styles.panelStatus}>{statusLabel}</span>
                            {unreadCount > 0 && (
                                <button type="button" className={styles.markAllBtn} onClick={markAllRead}>
                                    Mark all read
                                </button>
                            )}
                        </div>
                    </div>

                    <div className={styles.list}>
                        {notifications.length === 0 ? (
                            <div className={styles.empty}>No notifications yet.</div>
                        ) : (
                            notifications.map((n) => (
                                <Link
                                    key={n.id}
                                    href={n.booking_id ? `/admin/bookings?view=${n.booking_id}` : '/admin/bookings'}
                                    className={`${styles.item} ${!n.is_read ? styles.unread : ''}`}
                                    onClick={() => {
                                        markRead(n.id);
                                        setOpen(false);
                                    }}
                                >
                                    {!n.is_read && <span className={styles.unreadDot} />}
                                    <div className={styles.itemTop}>
                                        <span className={styles.itemTitle}>{n.title}</span>
                                        <span className={styles.itemTime}>{formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}</span>
                                    </div>
                                    {n.summary && <div className={styles.itemSummary}>{n.summary}</div>}
                                </Link>
                            ))
                        )}
                    </div>

                    {pushOffer === 'offer' && (
                        <div className={styles.pushOffer}>
                            <p>Get notified even when this tab isn&apos;t open?</p>
                            <div className={styles.pushOfferActions}>
                                <button type="button" className={styles.pushEnableBtn} onClick={handleEnablePush}>
                                    Enable
                                </button>
                                <button type="button" className={styles.pushDismissBtn} onClick={handleDismissPush}>
                                    Not now
                                </button>
                            </div>
                        </div>
                    )}
                    {pushOffer === 'enabling' && <div className={styles.pushOffer}><p>Requesting permission…</p></div>}
                    {pushOffer === 'enabled' && <div className={styles.pushOffer}><p>Browser notifications enabled for this device.</p></div>}
                    {pushOffer === 'error' && <div className={styles.pushOffer}><p>Couldn&apos;t enable browser notifications. You can allow this from your browser&apos;s site settings instead.</p></div>}
                </div>
            )}
        </div>
    );
}
