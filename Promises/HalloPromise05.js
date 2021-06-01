// File: HalloPromise05.cs
// Erstellt: 02/06/21 - so einfach wie möglich

function test(status) {
    return new Promise((resolve, reject) => {
        if (status) {
            resolve("*** Resolve-Aktion ***");
        } else {
            reject("!!! Reject-Aktion !!!");
        }
    });
}

// Promise kommt zur Anwendung
// Einmal wird der resolve-Teil ausgelöst
test(true)
 .then((m)=> {
    console.log(m);
 })
 .catch((m) => {
     console.log(m);
});

// Jetzt wird der reject-Teil ausgelöst
test(false)
 .then((m)=> {
    console.log(m);
 })
 .catch((m) => {
     console.log(m);
});
