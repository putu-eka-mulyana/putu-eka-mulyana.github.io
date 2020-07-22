importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
if (workbox) {
    console.log('Workbox berhasil dimuat');
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '1' },
        { url: '/index.html', revision: '1' },
        { url: '/pages/nav.html', revision: '1' },
        { url: '/pages/team.html', revision: '1' },
        { url: '/pages/favorit.html', revision: '1' },
        { url: '/pages/competition.html', revision: '1' },
        { url: '/css/materialize.min.css', revision: '1' },
        { url: '/css/main.css', revision: '1' },
        { url: '/js/idb.js', revision: '1' },
        { url: '/js/db.js', revision: '1' },
        { url: '/js/api.js', revision: '1' },
        { url: '/js/HandleDB.js', revision: '1' },
        { url: '/js/script.js', revision: '1' },
        { url: '/js/materialize.min.js', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/icon.png', revision: '1' },
        { url: '/images/icons/icon-72x72.png', revision: '1' },
        { url: '/images/icons/icon-96x96.png', revision: '1' },
        { url: '/images/icons/icon-128x128.png', revision: '1' },
        { url: '/images/icons/icon-144x144.png', revision: '1' },
        { url: '/images/icons/icon-152x152.png', revision: '1' },
        { url: '/images/icons/icon-192x192.png', revision: '1' },
        { url: '/images/icons/icon-384x384.png', revision: '1' },
        { url: '/images/icons/icon-512x512.png', revision: '1' },
    ]);
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'dibola-api',
        })
    );
    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'dibola-img',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );
    workbox.routing.registerRoute(
        /^https:\/\/fonts\.googleapis\.com/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'google-fonts-stylesheets',
        })
    );
    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static-asset',
        })
    );
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'static-pages'
        })
    );
} else {
    console.log(`Workbox gagal dimuat`);
}
self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Ada Jadwal Compotensi Baru!';
    }
    var options = {
        body: body,
        icon: 'icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});