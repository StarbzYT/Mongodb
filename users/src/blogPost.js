// create a new blogPost collection model
const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        // should be same as the comment model name!
        ref: 'comment'
    }]
});

const BlogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = BlogPost;