const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username: { unique: true, type: String },
    password: String
});

module.exports = mongoose.model("LoginUser", schema);