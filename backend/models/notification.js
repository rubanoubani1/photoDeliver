
const mongoose = require("mongoose");

const schema = mongoose.Schema({
    receiver: { index: true, type: String }, //FK to loginuser/user
    message: String,
    seen: Boolean,
    profilePictureUrl: String,
    bio: String,
    following: [String] //user ids?
},{
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

module.exports = mongoose.model("Notification", schema);