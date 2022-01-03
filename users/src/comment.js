// create comment collection model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    content: String,
    user: {
        // user key does not have array because we only expect one user to be the author of a comment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
