
const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user: { unique: true, type: String }, //FK to loginuser
    urlsafe: { unique: true, type: String },
    firstname: String,
    lastname: String,
    profilePictureUrl: String,
    bio: String,
    following: [String], //user ids for filtering by followed people
    followers: [String], //user ids for sending notifications
    bookmarked: [String] //picture ids for filtering by saved pictures
});

module.exports = mongoose.model("User", schema);