// File: HalloPromise01.js
// Erstellt: 01/06/21 - einfach zum Kennenlernen
// https://www.youtube.com/watch?v=DHvZLI7Db8E

let p = new Promise((resolve, reject) => {
    let a = 0
    a += 2
    if (a == 1) {
        resolve("Versprechen erfüllt...");
    } else {
        reject("Versprechen nicht erfüllt!");
    }
})
.then((message) => {
    console.log(message);
})
.catch((err) => {
    console.log(`!!! Fehler ${err} !!!`);
});