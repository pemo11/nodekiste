// File: HalloPromise03.js
// Erstellt: 01/06/21 - Beispiel 3 - Mehrere Promises
// https://www.youtube.com/watch?v=DHvZLI7Db8E

const Aufgabe1 = new Promise((resolve, reject) => {
    resolve("Aufgabe 1 ausgeführt");
});

const Aufgabe2 = new Promise((resolve, reject) => {
    resolve("Aufgabe 2 ausgeführt");
});

const Aufgabe3 = new Promise((resolve, reject) => {
    resolve("Aufgabe 3 ausgeführt");
});

Promise.all([
    Aufgabe1,
    Aufgabe2,
    Aufgabe3
    ]
)
.then((messages) => {
    messages.forEach((message,i) => {
        console.log(message);
    });
})
.catch((error) => {
    console.log(`!!! Es trat leider ein Fehler auf ${error}`);
})

// Alternativ: race, dann wird nur das erste Promise ausgeführt und then übergibt nur ein Objekt
Promise.race([
    Aufgabe1,
    Aufgabe2,
    Aufgabe3
    ]
)
.then((message) => {
    console.log(message);
})
.catch((error) => {
    console.log(`!!! Es trat leider ein Fehler auf ${error}`);
})

