const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

// test to make sure that when a user is deleted, their associated blog posts are too
describe('middleware', () => {
    // create instances of user and blogPost
    let starbz, blogPost;
    beforeEach((done) => {
        starbz = new User({ name: 'Starbz' });
        blogPost = new BlogPost({
            title: 'my first blog!',
            content: 'welcome to my first blog!'
        });
        // associate blog post with starbz's user
        starbz.blogPosts.push(blogPost);
        // save all to db
        Promise.all([starbz.save(), blogPost.save()])
            .then(() => done());
    // make sure blogpost is deleted when user is deleted
    it('user blog posts are removed when user is removed', (done) => {
        // remove starbz from db
        starbz.remove()
            .then(() => {
                // find user
                starbz.count()
            })
            .then((count) => {
                assert(count === 0);
            });
        });
    })
});