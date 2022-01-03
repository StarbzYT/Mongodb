const mongoose = require('mongoose');
// bring in schema object from mongoose so we can create a schema for our db
const Schema = mongoose.Schema;
// bring in posts schema to use as subdocument
const postsSchema = require('./posts_schema');
// create user schema for our model
const UserSchema = new Schema({
    // an instance of user must have a name which is a string
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two characters.'
        },
        required: [true, 'Name is required.']
    },
    posts: [postsSchema],
    likes: Number,
    blogPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogPost'
    }]
});
// create virtual type postCount
UserSchema.virtual('postCount').get(function() {
    // NOTE: the lexical this for arrow functions is NOT the same as the regular function syntax
    // getter will auto run and return len of posts arr when postCount attr is accessed!
    return this.posts.length; // this refers to User model instance we create
});

// create pre mongoose middleware for removing records
// pre middleware for removing a user will do things before removing user in db
UserSchema.pre('remove', function(next) {
    // we are using function instead of fat arrow
    // because this === starbz (instance)
    // to avoid cyclical load, create blogPost model
    const BlogPost = mongoose.model('blogPost');
    // make query to go through array and find the records with those ids
    BlogPost.find({  _id: { $in: this.blogPosts }}) // note that this is async
        .then(() => next()); // call next to move onto other middlewares or if no more, complete the remove event
});
// reference a user model class (note this is not a single user, but the entire user model/class/collection)
const User = mongoose.model('user', UserSchema);
// 'user' here means that mongo will automatically create a 'user' model in the db if it doesnt exist

// export model so it can be used in the rest of the users directory/project
module.exports = User;