/* ============================================================
   MITV Network PWA — Service Worker
   Project: MUSLIM ISLAM | Founder: Muaaz Iqbal
   ============================================================ */

const CACHE_NAME   = 'mitv-v3-cache-v1';
const STATIC_ASSETS = [
  '/index.html',
  '/dashboard.html',
  '/admin.html',
  '/register.html',
  '/manifest.json',
  '/js/firebase-config.js',
  '/js/groq-ai.js',
  '/js/sounds.js',
  '/js/utils.js',
  '/css/shared.css'
];

// Install: cache static files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for Firebase, cache-first for assets
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Firebase & external APIs — always network
  if (url.hostname.includes('firebase') ||
      url.hostname.includes('googleapis') ||
      url.hostname.includes('groq') ||
      url.hostname.includes('anthropic')) {
    return;
  }

  // Static assets — cache first, network fallback
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      }).catch(() => cached);
    })
  );
});

// Background sync placeholder
self.addEventListener('sync', e => {
  console.log('[SW] Background sync:', e.tag);
});
