// File: m2.js

var feet = 0.33;

function round2(w) {
    return Math.round(w * 100) / 100;
}

exports.feet2Meter = function(f) {
    return round2(f * feet);
}

exports.meter2Feet = function(m) {
    return round2(m / feet);
}
