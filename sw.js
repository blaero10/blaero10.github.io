const CACHE_NAME = "recordatorios-ios-v2";
const ASSETS_TO_CACHE = [
  "/iphone.html",
  "/manifest.json",
  "/biblia_data.js",
  "/assets_pc/img_cross_emblem.png",
  "/assets_pc/img_apple_icon.png",
  "/assets_pc/img_bible_hero.jpg",
  "/assets_pc/img_promise_sunrise.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
