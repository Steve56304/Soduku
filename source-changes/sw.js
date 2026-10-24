// Offline support: cache the whole app so it opens with no internet.
// Every page URL (with or without ?s=...) is served from the cached app shell.
const CACHE = 'sudoku-offline-__VERSION__';
const PRECACHE = __PRECACHE__;

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(PRECACHE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;
    if (url.pathname.endsWith('/recently-shared')) return;  // online-only feature

    if (req.mode === 'navigate') {
        // Cache first, so the app opens instantly and never hangs on bad plane wifi
        event.respondWith(
            caches.match('./index.html', { ignoreSearch: true })
                .then(cached => cached || fetch(req))
        );
        return;
    }
    event.respondWith(
        caches.match(req, { ignoreSearch: true })
            .then(cached => cached || fetch(req))
    );
});
