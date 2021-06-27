// file: cryptoHelper.js
const crypto = require("crypto");

exports.validatePassword = (password, hash, salt) => {
      var hashVerify = crypto
       .pbkdf2Sync(password, salt, 10000, 64, "sha512")
       .toString("hex");
      return hash === hashVerify;
   }

exports.generatePassword = (password) => {
    var salt = crypto.randomBytes(32).toString("hex");
    var genHash = crypto
     .pbkdf2Sync(password, salt, 10000, 64, "sha512")
     .toString("hex");
    return {
        hash: genHash,
        salt: salt,
    };
}
