// File: usercontroller.js

const { user } = require("../database");
var userModel = require("../models/usermodel");

module.exports = {

    userForm: (request, response) => {
        response.render("userform");
    },
    userList: (request, response) => {
        var userData = userModel.getData((data)=>{
            response.render("userlist", {users:data});
        });
    },
    createData: (request, response) => {
        var inputData = request.body;
        userModel.createData(inputData, (data) => {
            response.render("userform");
            console.log("*** User was created (hurray) ***");
        });
    }
}
