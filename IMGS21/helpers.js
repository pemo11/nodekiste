// file: helpers.js
// Allgemeine Helper-Functions

const zeroPad =  (num, places) => String(num).padStart(places, "0");

exports.getTime = () => {
    let curDate = new Date();
    let curTime = zeroPad(curDate.getHours(),2) + ":" + zeroPad(curDate.getMinutes(),0) + ":" + zeroPad(curDate.getSeconds(),2);
    return curTime;
}

exports.zeroPad = zeroPad;

exports.capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
}