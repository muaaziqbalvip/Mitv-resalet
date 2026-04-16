/* MITV Network v4.0 — Service Worker */
const CACHE = 'mitv-v4-1';
const STATIC = ['/index.html','/dashboard.html','/admin.html','/manifest.json','/css/shared.css','/js/firebase-config.js','/js/groq-ai.js','/js/sounds.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC).catch(()=>{})).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname.includes('firebase')||url.hostname.includes('googleapis')||url.hostname.includes('firebaseio')||url.hostname.includes('groq')||url.hostname.includes('ibb.co')||url.protocol==='chrome-extension:') return;
  if (e.request.mode==='navigate') {
    e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c))}return r}).catch(()=>caches.match(e.request)||caches.match('/index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>{if(cached)return cached;return fetch(e.request).then(r=>{if(r&&r.ok&&e.request.method==='GET'){const c=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c))}return r}).catch(()=>cached)}));
});
