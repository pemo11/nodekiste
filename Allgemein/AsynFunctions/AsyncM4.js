// File: AsyncM4.js
// Asynchrone Functions aber ohne eine Klasse

async function getLucky(mode) {
    return new Promise(resolve => {
        var max = mode ? 100 : 10;
        var z = Math.floor(Math.random()*max) + Math.floor(max / 10);
        resolve(z);
    });
}

module.exports = {

    async f1() {
        var z = await getLucky();
        console.log(`Deine asynchrone Glückszahl: ${z}`);
    },

    async f2(mode) {
        var z = await getLucky(mode);
        console.log(`Deine XXL Glückszahl: ${z}`);
    }
    
}

