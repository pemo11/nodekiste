// file: callback01.js

function f1(Zahlen, callback)
{
    Zahlen.forEach((i, z) => {
        callback(i,z);
    });
}

cb1 = (i,z) => {
    console.log(`${i} = ${z}`);
}

var zahlen = [11,22,33,44,55,66];

f1(zahlen, cb1);

// cb2 = (z) => {
cb2 = z => {
    console.log(`${z}`);
}

f1(zahlen, cb2);
