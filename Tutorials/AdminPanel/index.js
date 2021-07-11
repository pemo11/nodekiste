// file: index.js
// Erstellt: 10/07/21 - Funktioniert nicht richtig, es sollte der Inhalt der UserInfo-Tabelle aufgelistet werden
// https://blog.logrocket.com/create-an-admin-panel-with-node-js-and-adminbro/

const express = require("express");
const app = express()
require(__dirname + "/models/userinfo");

const AdminBro = require("admin-bro")
const AdminBroExpress = require("@admin-bro/express")

const adminBro = new AdminBro ({
    Databases: [],
    rootPath: "/admin",
})

const router = AdminBroExpress.buildRouter (adminBro)

const mongoose = require("mongoose");

var conStr = "mongodb://localhost:27017/IMGS21";

const run = async () => {
    const connection = await mongoose.connect(conStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    //const AdminBro = new AdminBro ({
    //    Database: [connection]
    //})

};

run();

var portNr = 8056;
app.use(adminBro.options.rootPath, router)
app.listen(portNr, () => 
    console.log(`*** AdminBro lauscht auf PortNr ${portNr} ***`)
);
