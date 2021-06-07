self.addEventListener('install', function (e) {
    console.log('install offline')
    e.waitUntil(
        caches.open('offlineFiles').then(function (cache) {
            return cache.add('offline.html');
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    console.log('fetch offline')
    return event.respondWith(
        fetch(event.request).catch(() =>
            caches.match('offline.html').then(function (response) {
                return response || fetch(event.request);
            })
        )
    );
});