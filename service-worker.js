const cacheName = 'maksalina-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/catalog.html',
  '/product.html',
  '/favorites.html',
  '/style.css',
  '/scripts/app.js',
  '/scripts/search.js',
  '/scripts/menu.js',
  '/scripts/favorites.js',
  '/scripts/config.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
