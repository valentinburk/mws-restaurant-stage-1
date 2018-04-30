const CACHE_NAME = 'restaurant-reviews-cache';

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (response.ok) {
              caches.open(CACHE_NAME).then(cache => {
                cache.add(event.request);
              });
            }
            return response;
          });
      })
  );
});