// File: HalloPromise04.cs
// Erstellt: 01/06/21 - ein eigenes Beispiel
// Hat wunderbar funktioniert - damit bin ich was Promises angeht einen Schritt weiter
// Gibt eine Methode einen Promise  zurück, folgt immer ein then/catch-Paar
// Was mir noch nicht klar ist - wenn ein Promise im State "Pending" ist - ist dann die Abfrage noch nicht ausgeführt worden?
function getNumbers() {
    return new Promise((resolve, reject) => {
        var zahlen = [];
        for(var i=0;i<10;i++) {
            zahlen.push(Math.floor(Math.random() * 100) + 1);
        }
        var ok = true;
        if (ok) {
            resolve(zahlen);
        } else {
            reject({
                message: "Die Zahlen konnten nicht generiert werden.",
                code: 1,
            });
        }
    });
};

// Gibt ein Promise mit PromiseState = fullfilled zurück
zahlen = getNumbers();
console.log(zahlen);

zahlen
.then((liste) => {
    liste.forEach((z,i) => {
        console.log(z);
    })
})
.catch((error) => {
    console.log(`!!! Es trat leider ein Fehler auf ${error}`);
 });