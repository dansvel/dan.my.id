import { build, version } from '$service-worker'
const CACHE_NAME = `hana.rip-cache-${version}`

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(build)))
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(async cacheNames => {
      for (const cacheName of cacheNames) {
        if (cacheName !== CACHE_NAME) {
          await caches.delete(cacheName)
        }
      }
      await self.clients.claim()
    })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    (async function () {
      const cache = await caches.open(CACHE_NAME)
      const cachedResponse = await cache.match(event.request)
      try {
        const fetchPromise = fetch(event.request)
        const networkResponse = await fetchPromise
        await cache.put(event.request, networkResponse.clone())
        return networkResponse || cachedResponse
      } catch (e) {
        return cachedResponse
      }
    })()
  )
})
