// file: logger.js
// ein einfaches Logging-Modul, das nooger verwendet

var logParams = {
    consoleOutput : true,
    consoleOutputLevel: ["DEBUG","ERROR","WARNING"],
    
    dateTimeFormat: "DD-MM-YYYY HH:mm:ss.S",
    outputPath: "logs/",
    fileNameDateFormat: "DDMMYYYY",
    fileNamePrefix:"imgs21-"
};

var logger = require("noogger").init(logParams);

module.exports = logger;