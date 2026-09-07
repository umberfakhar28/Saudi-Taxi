'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface AdminNotification {
    id: string;
    type: 'new_booking' | 'new_enquiry';
    booking_id: string | null;
    title: string;
    summary: string | null;
    customer_name: string | null;
    pickup_location: string | null;
    dropoff_location: string | null;
    travel_date: string | null;
    travel_time: string | null;
    passengers_count: number | null;
    service_type: string | null;
    is_read: boolean;
    created_at: string;
}

export type ConnectionState = 'connecting' | 'connected' | 'reconnecting';

interface NotificationContextValue {
    notifications: AdminNotification[];
    unreadCount: number;
    connectionState: ConnectionState;
    /** Set when the initial history fetch failed, so the bell can say so
     *  instead of showing an empty list that looks like "no notifications". */
    loadError: boolean;
    toast: AdminNotification | null;
    dismissToast: () => void;
    markRead: (id: string) => void;
    markAllRead: () => void;
}

export const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotifications() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
    return ctx;
}

const MAX_HISTORY = 30;

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<AdminNotification[]>([]);
    const [connectionState, setConnectionState] = useState<ConnectionState>('connecting');
    const [loadError, setLoadError] = useState(false);
    const [toast, setToast] = useState<AdminNotification | null>(null);
    // Every id we've ever shown, so a reconnect's initial replay (or a
    // duplicate realtime event) never produces a second toast/row for the
    // same booking (Admin Portal audit §6).
    const seenIds = useRef<Set<string>>(new Set());
    const channelRef = useRef<RealtimeChannel | null>(null);

    const addNotification = useCallback((row: AdminNotification, showToast: boolean) => {
        if (seenIds.current.has(row.id)) return;
        seenIds.current.add(row.id);
        setNotifications((prev) => [row, ...prev].slice(0, MAX_HISTORY));
        if (showToast) setToast(row);
    }, []);

    useEffect(() => {
        const supabase = createClient();
        let mounted = true;

        // Seed recent history on mount so the bell isn't empty after a full
        // page reload, without replaying them as toasts.
        supabase
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(MAX_HISTORY)
            .then(({ data, error }) => {
                if (!mounted) return;
                if (error) {
                    // Most often an RLS/permission problem or a dropped
                    // connection. Log it rather than failing silently, and
                    // let the bell show a real message.
                    console.error('[NOTIFICATIONS] Failed to load history', error);
                    setLoadError(true);
                    return;
                }
                if (!data) return;
                setLoadError(false);
                data.forEach((row) => seenIds.current.add(row.id));
                setNotifications(data as AdminNotification[]);
            });

        function subscribe() {
            setConnectionState((prev) => (prev === 'connecting' ? 'connecting' : 'reconnecting'));

            const channel = supabase
                .channel('admin-notifications')
                .on(
                    'postgres_changes',
                    { event: 'INSERT', schema: 'public', table: 'notifications' },
                    (payload) => {
                        addNotification(payload.new as AdminNotification, true);
                    }
                )
                .subscribe((status) => {
                    if (!mounted) return;
                    if (status === 'SUBSCRIBED') setConnectionState('connected');
                    else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
                        setConnectionState('reconnecting');
                        // Supabase's own client retries the socket automatically;
                        // re-subscribing the channel handles the rarer case where
                        // the channel itself needs to be rebuilt (e.g. after the
                        // tab wakes from sleep with a stale channel state).
                        setTimeout(() => {
                            if (!mounted) return;
                            channel.unsubscribe();
                            subscribe();
                        }, 3000);
                    }
                });

            channelRef.current = channel;
        }

        subscribe();

        // Browser tab regains focus/network after sleep — Supabase's socket
        // reconnects on its own, but nudging connection state back to
        // "connected" here keeps the UI honest if the underlying socket
        // silently recovered without firing SUBSCRIBED again.
        const onOnline = () => setConnectionState('connected');
        window.addEventListener('online', onOnline);

        return () => {
            mounted = false;
            window.removeEventListener('online', onOnline);
            channelRef.current?.unsubscribe();
        };
    }, [addNotification]);

    const markRead = useCallback((id: string) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
        const supabase = createClient();
        supabase.from('notifications').update({ is_read: true }).eq('id', id).then();
    }, []);

    const markAllRead = useCallback(() => {
        const unreadIds = notifications.filter((n) => !n.is_read).map((n) => n.id);
        if (unreadIds.length === 0) return;
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
        const supabase = createClient();
        supabase.from('notifications').update({ is_read: true }).in('id', unreadIds).then();
    }, [notifications]);

    const dismissToast = useCallback(() => setToast(null), []);

    const unreadCount = notifications.filter((n) => !n.is_read).length;

    return (
        <NotificationContext.Provider
            value={{ notifications, unreadCount, connectionState, loadError, toast, dismissToast, markRead, markAllRead }}
        >
            {children}
        </NotificationContext.Provider>
    );
}
