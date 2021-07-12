// file: sw.js - Der Script Worker

const CACHE_NAME = "IMGS21";

var cacheFiles = [
    "/catalog",
    "/images/IMGS21Logo.png",
    "/images/IMGS21Logo_192.png",
    "/images/IMGS21Logo_512.png",
    "/images/OfflineButton.png",
    "/images/OnlineButton.png",
    "/images/SmileyHelfer.png",
    "/images/StudiHelper_Logo.png",
    "/images/Resource_notavailable.png",
    "/scripts/bootstrap.min.js",
    "/scripts/jquery-3.6.0.js",
    "/styles/bootstrap.min.css",
    "/styles/style.css",
    "favicon.ico",
    "pwa.webmanifest",
    "sw-helper.js",
    "sw.js",   
]

// ==================== Install ====================

self.addEventListener("install", event => {
    console.log("*** ServiceWorker - Install-Event ***");
    event.waitUntil(
        caches.open("IMGS21")
        .then(cache => {
            console.log("*** Cache IMGS21 wurde geöffnet ***");
            return cache.addAll(cacheFiles);
        })
    )
})

// ==================== Activate ====================
self.addEventListener("activate", event => {
    console.log("*** ServiceWorker - Activate-Event ***");
    event.waitUntil(
        // Alten Cache vor der Aktivierung leeren
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cName => {
                    if (cName != CACHE_NAME) {
                        return caches.delete(cName);
                    }
                })
            )
        })
    )

})

// ==================== Fetch ====================

self.addEventListener("fetch", event => {
    console.log(`*** ServiceWorker - Fetch-Event - ${event.request.url} wird angefordert ***`);
    event.respondWith(
        // Ist die Ressource im Cache?
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request)
            .then(response => {
                caches.open(CACHE_NAME)
                .then(cache => {
                    cache.put(event.request, response.clone());
                })
                return response;
            })
        })
        .catch(err => {
            console.log(`!!! ServerWorker Fetch-Event - Fehler: ${err} !!!`);
            return caches.match("/images/resource_notavailable.png");
        })
    )
});
