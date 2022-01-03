// bring in ALL models
const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');
const { populate } = require('../src/comment');

// test associations
describe('associations', () => {
    // create inst of all classes to use in before each
    let starbz, blogPost, comment;
    beforeEach((done) => {
        // create all new insts
        starbz = new User({ name: 'Starbz' });
        blogPost = new BlogPost({
            title: 'new blog',
             content: 'Welcome to my first blog!'
            });
        comment = new Comment({ content: 'great blog!' });
        // set the blog post to be starbz
        // NOTE: mongo automatically reads the model and sets the id ONLY for us!
        // we do not need to specify that the blog post user is only an array of ids
        starbz.blogPosts.push(blogPost);
        // set comment to be for the blog post
        blogPost.comments.push(comment);
        // set author of comment to be starbz
        comment.user = starbz;
        // save ALL changes to db
        // since we have multiple inst to save, one done can only be right 1/3 of the time
        // i.e we will never know which .save will be the last to complete
        // instead...
        Promise.all([starbz.save(), blogPost.save(), comment.save()]) // this will ensure all inst are saved before moving onto the .then callback
            .then(() => done());
        // test if starbz has a blogPost we want
        // TIP: call .only on it block so it is the only test run instead of all of them running
        it('saves a relation between a user and a blog post', (done) => {
            // find user starbz
            User.findOne({ name: 'Starbz' })
                .populate('blogPosts')
                    .then((user) => {
                        console.log(user);
                        assert(user.blogPosts[0].title === 'new blog');
                        done();
                    });
        });
        it('saves full relational graph', (done) => {
            // find user
            User.find({ name: 'Starbz' })
            // find user starbz's blogpost(s)
                .populate({
                    // all users have blogPosts property
                    path: 'blogPosts',
                    populate: {
                    // find comments for the blog posts
                        path: 'comments',
                        // specify the comment model by name
                        model: 'comment',
                        populate: {
                            // find associated users for each comment
                            path: 'user',
                            model: 'user'
                        }
                    }
                })
                .then((user) => {
                    const { title } = user.blogPosts[0];
                    const { content } = user.blogPosts[0].comments[0];
                    const { name } = user.blogPosts[0].comments[0].user;
                    // test all relations
                    // i.e assert comments are for blogpost and comments have the right users
                    // test blog title
                    assert(title === 'new blog');
                    assert(content === 'Welcome to my first blog!');
                    // make sure comment is from Starbz (name below refers to author of comment)
                    assert(name === 'Starbz');
                    done();
                })
        });
    });
});
