
const mongoose = require("mongoose");

const schema = mongoose.Schema({
    tag: { unique: true, type: String }
});

module.exports = mongoose.model("Tag", schema);