const mongoose = require("mongoose");

const schema = mongoose.Schema({
    userid: { unique: true, type: String },
    username: { unique: true, type: String },
    password: String,
    salt: String,
});

module.exports = mongoose.model("LoginUser", schema);