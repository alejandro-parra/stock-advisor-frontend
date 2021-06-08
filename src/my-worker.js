self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('offlineFiles').then(function (cache) {
            createCards(cache);
            cache.add(`assets/cards/2B.svg`);
            return cache.add('offline.html');
        })
    );
});

self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    return event.respondWith(
        fetch(event.request).catch(() => {
            if (event.request.url.includes('assets')) {
                return caches.match(event.request).then(function (response) {
                    return response || fetch(event.request);
                })
            }
            return caches.match('offline.html').then(function (response) {
                return response || fetch(event.request);
            })
        })
    );
});

const createCards = (cache) => {
    const tiers = ['H', 'D', 'C', 'S'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    for (let value of values) {
        for (let tier of tiers) {
            cache.add(`assets/cards/${value}${tier}.svg`);
        }
    }
};