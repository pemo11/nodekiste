// File: Async02.js

// Geht
function getLucky() {
    return new Promise(resolve => {
        var z = Math.floor(Math.random()*10) + 1;
        resolve(z);
    });
}


async function f1() {
    var z = await getLucky();
    console.log(`Deine neue Glückszahl: ${z}`);
};

// Geht auch
function f2() {
    getLucky()
    .then(z => {
        console.log(`Deine neue Glückszahl: ${z}`);
    });
}

f1();
f2();
