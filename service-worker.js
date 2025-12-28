const CACHE_NAME = "pv-instal-enodis-v1";
const URLS_TO_CACHE = [
  "./",
  "./manifest.json",
  "./src/html/index.html",
  "./src/css/style.css",
  "./src/js/app.js",
  "./src/js/signature.js",
  "./src/js/pdf-mapping.js",
  "./src/js/pdf-export.js",
  "./src/js/csv-export.js",
  "./src/js/excel-export.js",
  "./src/js/pwa.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});