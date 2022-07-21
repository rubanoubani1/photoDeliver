const mongoose = require('mongoose');
const { commentSchema } = require('./comment')
const { userSchema } = require('./user')

const schema = mongoose.Schema({
    owner: userSchema, //{ index: true, type: String },
    urlsafe: { unique:true, type:String },
    url: String,
    title: String,
    description: String,
    altText:String,
    tags: [String],
    bookmarkedBy: [String],
    comments: [commentSchema],
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

module.exports = mongoose.model("Picture", schema);