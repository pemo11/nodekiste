// File: Async03.js
// Asynchrone Functions als Teil einer Klasse

class AsyncFuncs
{

    static async getLucky() {
        return new Promise(resolve => {
            var z = Math.floor(Math.random()*10) + 1;
            resolve(z);
        });
    };
    
    static async f1() {
        var z = await AsyncFuncs.getLucky();
        console.log(`Deine neue Glückszahl: ${z}`);
    };
}

// Geht - Die neue Glückszahl wird ausgegeben
AsyncFuncs.f1();
