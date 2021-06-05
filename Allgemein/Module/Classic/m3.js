// File: m3.js
// Async-Functions

function resolveAfterNSeconds(n) {
    return new Promise(resolve => {
      setTimeout(() => {
        var z = Math.floor(Math.random() * 10) + 1;
        console.log(`z=${z}`);
        resolve(z);
      }, n * 1000);
    });
}

module.exports = class MyFun
{
    static async GetLucky()  {
        return await resolveAfterNSeconds(3); 
    }
}
