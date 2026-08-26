// Admin Portal push notifications only. Scoped to /admin/ so it never
// intercepts requests for the public site (no fetch handler at all —
// this worker exists purely to receive push events while the Admin Portal
// tab isn't focused, and to route a click back to the right booking).

self.addEventListener('push', (event) => {
    let data = { title: 'Gulf Trip Service Admin', body: 'You have a new notification.', url: '/admin/bookings' };
    try {
        if (event.data) data = { ...data, ...event.data.json() };
    } catch {
        // Ignore malformed payloads rather than crashing the worker.
    }

    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: '/favicon.svg',
            badge: '/favicon.svg',
            data: { url: data.url },
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const targetUrl = event.notification.data?.url || '/admin/bookings';

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('/admin') && 'focus' in client) {
                    client.navigate(targetUrl);
                    return client.focus();
                }
            }
            return self.clients.openWindow(targetUrl);
        })
    );
});
