// File: app.js

var express = require("express");
var path = require("path");
var http = require("http"); 
var createError = require("http-errors");
var morgan = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// http-Logging aktivieren
app.use(morgan("tiny"));

// Diese Function wird immer aufgerufen - wichtig ist der next-Parameter
// ansonsten bleibt die Pipeline hängen und es geht nicht weiter
// interessant - die Fehlermeldungsseit wird offenbar nur aufgerufen, wenn ein Fehler vorliegt!
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // error page anzeigen
    res.status(err.status || 500);
    res.render("error");
});

// Pfadschreibweise stimmt so
var indexRouter = require("./routes/indexroute");
var userRouter = require("./routes/userroute");

app.use("/", indexRouter);
app.use("/user", userRouter);

const portNr = 8004;

const server = http.createServer(app);

server.listen(portNr);

server.on("error", (err)=> {
    console.log(`!!! Oh je, ein error ${error} !!!`);
});

server.on("listening", ()=>{
    var adr = server.address();
    console.log(`*** Horche auf ${adr.address}/${portNr} ***`)
});



