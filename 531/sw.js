// Offline support: serve the app from cache when the network is slow or gone.
// Network first (with a short timeout) so a new deploy shows up on the next visit.
const CACHE = 't531-v2';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return; // GitHub API calls go straight to the network
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const network = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; });
    const timeout = new Promise(resolve => setTimeout(resolve, 3500));
    const first = await Promise.race([network.catch(() => null), timeout]);
    if (first) return first;
    const cached = await cache.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await cache.match('./index.html') : null);
    return cached || network;
  })());
});
