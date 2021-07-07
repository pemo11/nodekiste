// file: pwa.js

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/service-worker.js")
        .then(request => {
            console.log("**** Service-Worker wurde registriert =>", request);
        }, err => {
            console.error("!!! Server-Worker konnte nicht registriert werden => ", err);
        });
    }
}