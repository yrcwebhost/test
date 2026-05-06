// China 2026 — Service Worker
// Strategy:
//   - App shell (HTML, JS, CSS, fonts, icons) → precache on install (cache-first)
//   - Images (photos, maps) → runtime cache (cache-first, lazy)
//   - Everything else → network-first with cache fallback

const VERSION = 'cn26-v1';
const SHELL_CACHE = `${VERSION}-shell`;
const IMAGE_CACHE = `${VERSION}-images`;

// Precache the app shell. Keep this list tight — anything that always loads.
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './components/ios-frame.jsx',
  './src/theme.jsx',
  './src/data/raw.js',
  './src/data.jsx',
  './src/ui.jsx',
  './src/home.jsx',
  './src/city.jsx',
  './src/story.jsx',
  './src/story_body.jsx',
  './src/extras.jsx',
  './src/itinerary.jsx',
  './src/search.jsx',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) =>
      cache.addAll(SHELL).catch((err) => {
        // Don't fail install if one file is missing — log and continue
        console.warn('[SW] precache partial fail:', err);
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(VERSION))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isImage = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url.pathname);
  const isFont = /\.(woff2?|ttf|otf)$/i.test(url.pathname) || url.host.includes('gstatic');
  const isShell = url.origin === location.origin && !isImage;

  // Images & fonts → cache-first, lazy populate
  if (isImage || isFont) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        } catch (e) {
          // Image not cached and offline — return a transparent fallback
          if (isImage) {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="#F4ECDA"/></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
          throw e;
        }
      })
    );
    return;
  }

  // App shell → cache-first (so it works offline immediately)
  if (isShell) {
    event.respondWith(
      caches.open(SHELL_CACHE).then(async (cache) => {
        const hit = await cache.match(req);
        if (hit) {
          // Refresh in background
          fetch(req).then((res) => {
            if (res && res.status === 200) cache.put(req, res.clone());
          }).catch(() => {});
          return hit;
        }
        try {
          const res = await fetch(req);
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        } catch (e) {
          // Offline navigation fallback → serve the index
          if (req.mode === 'navigate') {
            return cache.match('./index.html');
          }
          throw e;
        }
      })
    );
    return;
  }

  // External (CDN scripts: react, babel) → network-first, cache fallback
  event.respondWith(
    caches.open(SHELL_CACHE).then(async (cache) => {
      try {
        const res = await fetch(req);
        if (res && res.status === 200) cache.put(req, res.clone());
        return res;
      } catch (e) {
        const hit = await cache.match(req);
        if (hit) return hit;
        throw e;
      }
    })
  );
});
