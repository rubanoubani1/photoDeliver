const mongoose = require('mongoose');

const schema = mongoose.Schema({
    owner: String,
    text: String
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
});

module.exports = {
    commentSchema: schema,
    commentModel: mongoose.model("Comment", schema)
};