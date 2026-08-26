const SW_URL = '/admin-push-sw.js';
const DISMISS_KEY = 'gts_admin_push_prompt_dismissed';

export function pushSupported(): boolean {
    return typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

export function pushPromptDismissed(): boolean {
    try {
        return localStorage.getItem(DISMISS_KEY) === '1';
    } catch {
        return false;
    }
}

export function dismissPushPrompt(): void {
    try {
        localStorage.setItem(DISMISS_KEY, '1');
    } catch {
        // Non-fatal — worst case the prompt reappears next session.
    }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

/** Registers the SW, requests permission, and stores the subscription server-side. Throws on any failure — callers decide how to surface that. */
export async function subscribeToPush(vapidPublicKey: string): Promise<void> {
    const registration = await navigator.serviceWorker.register(SW_URL);
    await navigator.serviceWorker.ready;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') throw new Error('Permission not granted');

    const existing = await registration.pushManager.getSubscription();
    const subscription =
        existing ??
        (await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
        }));

    const json = subscription.toJSON();
    await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: json.endpoint, keys: json.keys }),
    });
}
