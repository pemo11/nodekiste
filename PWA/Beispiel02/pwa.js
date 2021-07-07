// file: pwa.js

var cacheName = "PWA2";

var cacheFiles = [
  "/",
  "/favicon.ico",
  "/images/splash-screen.png",
  "/images/Armenia.png",
  "/images/Congo.png",
  "/images/France.png",
  "/images/UnitedKingdom.png",
  "/scripts/script01.js",
];

// ================ Install ========================
self.addEventListener("install", function (event) {
    console.log("*** Service-Worker Install-Event ***", event);
    event.waitUntil(
      caches.open(cacheName)
      .then((cache) => {
        console.info("*** Alles im Cache ***");
        return cache.addAll(cacheFiles);
      })
    )
});

// ================ Activate ========================
self.addEventListener("activate", function (event) {
    console.log("*** Service-Worker Activate-Event ***", event);
    event.waitUntil(
      caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cName) => {
            if(cName != cacheNames) {
              return caches.delete(cName);
            }
        })
      );
    })
  );
});

// ================ Fetch ========================
self.addEventListener("fetch", function (event) {
    console.log("*** Service-Worker Fetch-Event ***", event);
    console.log("*** Angefragt wird: " + event.request.url + " ***");
    event.respondWith(
      caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        // Nicht im Cache, dann anfordern - aber was soll credentials?
        return fetch(event.request, {credentials: "include"});
      })
    );
});
