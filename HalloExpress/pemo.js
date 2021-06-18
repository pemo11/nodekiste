// file: pemo.js
// Soll ein Middleware-Objekt mit einer Function sein

// Der Name GetLucky spielt keine Rolle
module.exports = function GetLucky (req, res, next) {
        console.log(`*** GetLucky is calling SOS for luck ${req.path} ***`);
        var z = Math.floor(Math.random() * 10) + 1;
        // Interessant: Wenn z bei next() übergeben wird, wird z an den Browser geschickt,
        // aber es geht nicht weiter
        // Erklärung: Als Argument kann nur ein error-Objekt übergeben werden
        // Und dann muss es eine function mit err,req,resp,next-Parameter geben, die dann aufgerufen wird
        next(z);
}

