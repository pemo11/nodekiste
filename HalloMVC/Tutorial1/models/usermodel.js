// File: usermodel.js

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    city: String,
    country: String
});

userTable = mongoose.model("users", userSchema);

module.exports = {
    createData: (inputdata, callback) => {
        userData = new userTable(inputdata);
        userData.save((err,data) => {
            if (err) throw err;
            return callback(data);
        })},
    getData: (callback) => {
        userTable.find()
        .then((data) => {
            return callback(data);
        })
        .catch((err)=> {
            throw err;
        });
    }
};