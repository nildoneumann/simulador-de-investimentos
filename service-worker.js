self.addEventListener("install", event => {
  self.skipWaiting(); // ativa imediatamente
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim()); // assume controle imediato
});

/* Estratégia: Network First */
self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(response => {

        const clone = response.clone();

        caches.open("dynamic-cache")
          .then(cache => cache.put(event.request, clone));

        return response;

      })
      .catch(() => caches.match(event.request))
  );

});




