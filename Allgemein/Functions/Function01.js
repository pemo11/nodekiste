// Function01.js
// Erstellt: 01/06/21
// Moderne Function-Definitionen

// So modern ist JavaScript inzwischen
const f1 = () => {
    console.log("*** Das ist f1 ***");
}

f1();

const f2 = (n) => {
    for (var i=0;i<n;i++) {
        console.log("*** Das ist f2 ***");
    }
}

f2(10);

// Diese Schreibweise ist vor allem für die Anwendung von async/await wichtig