// file: service-worker.js

const CACHE_NAME = "PWA2";

const files2Cache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/images/Armenia.png",
  "/images/France.png",
  "/images/Congo.png",
  "/images/UnitedKingdom.png"
];

self.addEventListener("install", event => {
    console.log("*** Server-Worker-Install Event ***");
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(files2Cache)
        })
        .then(self.skipWaiting())
    )
})

self.addEventListener("fetch", event => {
    console.log("*** Server-Worker-Fetch Event ***");
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if(response){
                return response
            }
            // not in cache, return from network
            return fetch(event.request, {credentials: "include"});
        })
    );
});

/*
self.addEventListener("fetch", function(even) {
    console.log("*** Server-Worker-Fetch Event ***");
    fetch(event.request)
    .catch(() => {
        return caches.open(CACHE_NAME)
        .then(cache =>{
            return cache.match(event.request)}
        )
    })
})
*/

self.addEventListener("activate", event => {
    console.log("*** Server-Worker-Activate Event ***");
    event.waitUntil(
        caches.keys()
        .then(keylist => {
            return Promise.all(keylist.map(key => {
                if (key !== CACHE_NAME) {
                    console.log("*** [ServiceWorker] Der alte Cache wird entfernt ***");
                    return caches.delete(key);
                }
            }))
        })
        .then(() => self.clients.claim())
    )
})

