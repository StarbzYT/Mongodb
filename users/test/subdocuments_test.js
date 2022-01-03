const assert = require('assert');
const User = require('../src/user');

describe('subdocument test', () => {
    // instance with posts title testcase
    it('user has post title', (done) => {
        // create instance of User model
        const starbz = new User({ name: 'Starbz', posts: [{ title: 'myBlog' }] });
        // save instance to db
        starbz.save()
        // find one collection in users with name Starbz
        .then(User.findOne({ name: 'Starbz' }))
        // test to see if user has post with name myBlog
        .then((user) => {
            assert(user.posts[0].title === 'myBlog');
            done();
        })
    });
    // user without posts can add one even after being saved in the db
    it('can add subdocuments to an existing record', (done) => {
        // first create instance of User model (with no posts)
        const starbz = new User({
            name: 'Starbz',
            // be explicit about test and show posts is empty for user
            posts: [] 
        });
        // save user to db
        starbz.save()
        // update user's posts list
        .then(() => User.findOne({ name: 'Starbz' }))
        .then((user) => {
            // update user posts (create new post)
            user.posts.push({ title: 'First post' })
            // save user to db again
            // NOTE: must call return because using {} does not have an implicit return!
            return user.save();
        })
        // find user with name and check if post title is as expected
        .then(() => User.findOne({ name: 'Starbz' }))
        .then((user) => {
            // now post title should be First Post
            assert(user.posts[0].title === 'First post');
            done();
        });
    });
    // users already with posts can delete their posts
    it('can remove subdocuments from an existing record', (done) => {
        // create new instance of user model WITH post
        const starbz = new User({ name: 'Starbz', posts: [{ title: 'New post' }] });
        // save inst to db
        starbz.save()
        // find user with a particular name
        .then(() => User.findOne({ name: 'Starbz' }))
        // delete subdocument for that user
        .then((user) => {
            // declare post we want to remove in the subdocument
            const post = user.posts[0]
            // remove post using remove method from mongoose
            post.remove();
            // save to db again (remember to return!)
            return user.save();
        })
        // test to make sure that the user no longer has any posts
        .then(() => User.findOne({ name: 'Starbz' }))
        .then((user) => {
            assert(user.posts.length === 0);
            done();
        });
    });
});