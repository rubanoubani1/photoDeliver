const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userid: { unique: true, type: String },
    username: { unique: true, type: String },
    hash: String,
    salt: String,
    version: Number,//in case bcrypt breaks and we need to change the hashing algorithm
});

module.exports = mongoose.model("LoginUser", schema);