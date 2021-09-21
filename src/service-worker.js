import { build, files, timestamp } from '$service-worker';
const CACHE_NAME = `dan.my.id-cache-${timestamp}`;

const to_cache = build.concat(files);

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(to_cache)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(async (cacheNames) => {
      for (const cacheName of cacheNames) {
        if (cacheName !== CACHE_NAME) {
          await caches.delete(cacheName);
        }
      }
      await self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async function () {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(event.request);
      try {
        const fetchPromise = fetch(event.request);
        const networkResponse = await fetchPromise;
        await cache.put(event.request, networkResponse.clone());
        return cachedResponse || networkResponse;
      } catch (e) {
        return cachedResponse;
      }
    })()
  );
});
