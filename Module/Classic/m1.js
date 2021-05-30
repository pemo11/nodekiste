// File: m1.js

module.exports = {
    MagicNum: 1234,

    GetLucky: () => {
        return Math.floor(Math.random() * 10) + 1;
    }
}