// File: HalloPromise02.js
// Erstellt: 01/06/21 -Beispiel 2 - Promise statt Callback
// https://www.youtube.com/watch?v=DHvZLI7Db8E

var globaleState = true;

function testCallback(callback, errorCallback) {
    if (globaleState) {
        callback("Alles in Ordung");
    } else {
        errorCallback("Es gibt da ein Problem");
    }
}

testCallback((message) => {
    console.log(`*** ${message} ***`);
}, (error) => {
    console.log(`!!! ${error} !!!`);
});

// Jetzt mit Promise statt Callback
function testPromise() {
    return new Promise((resolve, reject) => {
        if (globaleState) {
           resolve("Alles in Ordung");
        } else {
            reject({
                message: "Es gibt da ein Problem",
                code: 1,
            });
        }
    })
};

globaleState = false;

testPromise()
 .then((message) => {
    console.log(`*** ${message} ***`);
 })
 .catch((error) => {
    console.log(`!!! ${error.message} (${error.code}) !!!`);
})

/* Beispiel ist wirklich super-anschaulich (Danke an den jungen Autor) */