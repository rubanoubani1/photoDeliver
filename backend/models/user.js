
const mongoose = require("mongoose");

const schema = mongoose.Schema({
    user: String, //{ unique: true, type: String }, //FK to loginuser
    urlsafe: String, //{ unique: true, type: String },
    firstname: String,
    lastname: String,
    userIconUrl: String,
    bio: String,
    following: [String], //user ids for filtering by followed people
    followers: [String], //user ids for sending notifications
    bookmarked: [String] //picture ids for filtering by saved pictures
});

module.exports = {
    userSchema: schema,
    userModel: mongoose.model("User", schema)
}