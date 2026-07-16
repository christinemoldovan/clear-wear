/* ClearWear service worker — handles notification display & clicks */
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});

/* Optional: if you ever add a push server later, this will display pushes */
self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.title || 'ClearWear', {
    body: d.body || '',
    icon: 'apple-touch-icon.png',
    badge: 'favicon.png',
    tag: 'clearwear',
    renotify: true
  }));
});
