const express = require("express");

router = express.Router();

//DATABASE

const database = [];
const userdatabase =[];
let testuser = {
	email:'user@user.com',
	password:'user123'
}
userdatabase.push(testuser);
console.log(userdatabase);
let id = 100;

module.exports = router;
