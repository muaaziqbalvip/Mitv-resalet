/* MITV Network — Service Worker v5 */
const CV = 'mitv-v5';
const STATIC = ['/index.html', '/dashboard.html', '/admin.html', '/manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CV).then(c => c.addAll(STATIC).catch(() => {})));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== CV).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (['firebase', 'googleapis', 'groq', 'gstatic', 'fonts', 'ibb'].some(h => url.hostname.includes(h))) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          caches.open(CV).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
