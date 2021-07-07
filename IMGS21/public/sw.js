// file: sw.js - Der Script Worker

const CACHE_NAME = "IMGS21";

var cacheFiles = [
    "/",                        
    "images/IMGS21Logo.png",
    "images/IMGS21Logo_192.png",
    "images/IMGS21Logo_512.png",
    "images/OfflineButton.png",
    "favicon.ico",
    "styles/bootstrap.min.css",
    "styles/style.css",
    "pwa.webmanifest",
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

})

// ==================== Fetch ====================
self.addEventListener("fetch", event => {
    console.log(`*** ServiceWorker - Fetch-Event - ${event.request.url} wird angefordert ***`);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request);
        })
    )
})

