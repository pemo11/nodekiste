// file: async01.js
// Ganz einfache Beispiele

async function f1() {
    // Wird automatisch in einen Promise konvertiert
    console.log("*** f1 ***");
    // Rückgabe ist ein Promise
    return 1234;
}

async function f2() {
    console.log("*** f2 ***");
    // Rückgabe ist ein Promise
    return Promise.resolve(5678);
}

// f1 entspricht f2

// Damit eine Function asynchron ausgeführt wird, muss sie ein await enthalten

async function f3() {
    console.log("*** f3 ***");
    await 1;
}

async function f4() {
    console.log("*** f4 ***");
    return Promise.resolve(9123);
}

async function f4A() {
    console.log("*** f4A ***");
    return Promise.resolve(9123)
    .then(z=> {
        console.log(z);
    });
}

function f4B() {
    console.log("*** f4B ***");
    return Promise.resolve(9123);
}

async function get4BValue() {
    var a = await f4B();
    // hier ist a dann die Zahl
    console.log(`a=${a}`);
    // hier wird aber wieder ein Promise zurückgegeben?
    return a;
    // .then(z => { return  z;});
}

// Der return-Wert ist immer ein Promise, auch wenn z.B. ein Wert zurückgegeben wird

// Ausgabe ist Promise mit state=fullfilled
// console.log(f1());

// Ausgabe ist Promise mit state=pending
// console.log(f2());

// Ausgabe ist Promise mit state=pending
// console.log(f3());

// Ausgabe ist Promise mit state=pending
console.log(f4());

async function getf4(){
    var z = await f4();
    return z;
    //return await f4().then(z => {
    //    return z;
    //});
}

// so erhalte ich nur einen Promise
z = getf4();
console.log(`z=${z}`);

// so dann doch endlich die Zahl?
z = 0;

getf4()
.then(z1 => {
    z = z1;
    // Wird nach 2) ausgeführt mit z=9123
    console.log(`1) z=${z1}`);
});
// Wird zuerst ausgeführt mit z=0
console.log(`2) z=${z}`);

var z2 = get4BValue();
console.log(`z2= ${ z2}`)

var zGlobal;
// der letzte verzweifelte Versuch
zGlobal = get4BValue()
.then(z3 => {
    zGlobal = z3;
    console.log(`z3= ${ z3}`)
    // Hier wird der Wert richtig zugewiesen
    console.log(`1) zGlobal= ${ zGlobal}`)
});

// Diese Ausgabe wird vor dem Aufruf von get4BValue ausgeführt!
console.log(`2) zGlobal= ${ zGlobal}`)

