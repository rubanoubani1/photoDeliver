
const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user: { index: true, type: String }, //FK to loginuser
    urlsafe: { unique: true, type: String },
    firstname: String,
    lastname: String,
    profilePictureUrl: String,
    bio: String,
    following: [String], //user ids
    bookmarked: [String] //picture ids
});

module.exports = mongoose.model("User", schema);