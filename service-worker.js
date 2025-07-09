self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('maksalina-store').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/catalog.html',
        '/product.html',
        '/style.css',
        '/scripts/app.js',
        '/scripts/menu.js',
        '/scripts/search.js',
        '/scripts/favorites.js',
        '/scripts/config.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
