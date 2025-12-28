const CACHE_NAME = "enodis-pv-cache-v1";

const FILES_TO_CACHE = [
  "index.html",
  "style.css",
  "app.js",
  "signature.js",
  "pdf-export.js",
  "mapping-coordonnées.js",
  "pdf/pv_modele.pdf",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// Installation : mise en cache initiale
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activation : suppression anciens caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Stratégie : network first + fallback cache
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Mise en cache dynamique
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});