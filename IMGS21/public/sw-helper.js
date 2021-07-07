// file: sw-helper.js

// Es kommt auf die Groß-/Kleinschreibung an
// !!! Ohne Https muss der Host über localhost angesprochen werden, nicht über die IP-Adresse !!!
if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("sw.js")
    .then(registration => {
        console.log("*** Service Worker wurde registriert ***");
        console.log("Registration für Scope=" + registration.scope);
    })
    .catch(err => {
        console.log("!!! Fehler bei der Service Worker-Registrierung " + err + "!!!");
    });
} else {
    console.info("!!! ServiceWorker werden leider nicht unterstützt !!!");
}
