'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import styles from './AdminFeedback.module.css';

export type ToastKind = 'success' | 'error' | 'info';

interface Toast {
    id: number;
    kind: ToastKind;
    message: string;
}

interface ConfirmOptions {
    title: string;
    body: string;
    /** Label for the confirming button. */
    confirmLabel?: string;
    /**
     * 'danger' (default) paints the confirm button red, for deletions.
     * 'primary' is for consequential-but-not-destructive choices, where red
     * would overstate what is about to happen.
     */
    tone?: 'danger' | 'primary';
}

interface FeedbackValue {
    /** Non-blocking success/error/info notice. Replaces window.alert(). */
    showToast: (kind: ToastKind, message: string) => void;
    /**
     * Promise-based confirmation. Replaces window.confirm() so destructive
     * actions get a real, styled, keyboard-accessible dialog.
     */
    confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const FeedbackContext = createContext<FeedbackValue>({
    showToast: () => {},
    confirm: async () => false,
});

export function useFeedback() {
    return useContext(FeedbackContext);
}

const ICONS = { success: CheckCircle2, error: AlertCircle, info: Info } as const;

/** Errors stay up longer — they usually carry something worth reading. */
const DURATION: Record<ToastKind, number> = { success: 3500, info: 4000, error: 7000 };

/**
 * Portal-wide success / error / confirmation UX.
 *
 * The admin pages previously used window.alert() and window.confirm() for
 * every outcome, which blocks the page, cannot be styled, and reads as a
 * browser fault rather than a result of the action. This keeps the same call
 * sites honest — every create/edit/delete/status/send still reports what
 * happened — while looking like the rest of the portal.
 */
export default function AdminFeedbackProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [pending, setPending] = useState<(ConfirmOptions & { resolve: (v: boolean) => void }) | null>(null);
    const nextId = useRef(1);

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback(
        (kind: ToastKind, message: string) => {
            const id = nextId.current++;
            setToasts((prev) => [...prev, { id, kind, message }]);
            setTimeout(() => dismiss(id), DURATION[kind]);
        },
        [dismiss]
    );

    const confirm = useCallback((options: ConfirmOptions) => {
        return new Promise<boolean>((resolve) => setPending({ ...options, resolve }));
    }, []);

    const settle = useCallback(
        (result: boolean) => {
            pending?.resolve(result);
            setPending(null);
        },
        [pending]
    );

    const value = useMemo<FeedbackValue>(() => ({ showToast, confirm }), [showToast, confirm]);

    return (
        <FeedbackContext.Provider value={value}>
            {children}

            <div className={styles.stack} role="status" aria-live="polite">
                {toasts.map((toast) => {
                    const Icon = ICONS[toast.kind];
                    return (
                        <div key={toast.id} className={`${styles.toast} ${styles[toast.kind]}`}>
                            <Icon size={17} className={styles.icon} />
                            <span className={styles.message}>{toast.message}</span>
                            <button
                                type="button"
                                className={styles.close}
                                onClick={() => dismiss(toast.id)}
                                aria-label="Dismiss notification"
                            >
                                <X size={15} />
                            </button>
                        </div>
                    );
                })}
            </div>

            {pending && (
                <div
                    className={styles.backdrop}
                    role="dialog"
                    aria-modal="true"
                    aria-label={pending.title}
                    onClick={() => settle(false)}
                    onKeyDown={(e) => { if (e.key === 'Escape') settle(false); }}
                >
                    <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.dialogTitle}>{pending.title}</div>
                        <div className={styles.dialogBody}>{pending.body}</div>
                        <div className={styles.dialogActions}>
                            <button type="button" className="admin-btn-secondary" onClick={() => settle(false)}>
                                Cancel
                            </button>
                            <button
                                type="button"
                                className={pending.tone === 'primary' ? 'admin-btn-primary' : styles.danger}
                                autoFocus
                                onClick={() => settle(true)}
                            >
                                {pending.confirmLabel ?? 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </FeedbackContext.Provider>
    );
}
