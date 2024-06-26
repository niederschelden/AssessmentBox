const cacheName = 'v0.1.8';
const cacheAssets = [
    'app.js',
    'balanceErrorScoringSystem.html',
    'bergBalanceScale.html',
    'dynamicGaitIndex.html'
    'browserCheck.js',
    'einbeinigeKniebeuge.html',
    'favicon.ico',
    'heelRiseTest.html',
    'icon-120x120.png',
    'icon-152x152.png',
    'icon-167x167.png',
    'icon-180x180.png',
    'icon-192x192.png',
    'icon-512x512.png',
    'index.html',
    'knieToWallTest.html',
    'list.txt',
    'logo.png',
    'manifest.json',
    'meinCountdown.js',
    'meinMetronom.js',
    'meineStoppUhr.js',
    'service-worker.js',
    'sideHopTest.html',
    'style.css',
    'tugTest.html',
    'yBalanceTest.html',
    'CKCUEST.html'
];


// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
