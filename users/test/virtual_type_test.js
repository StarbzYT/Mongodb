const assert = require('assert');
const User = require('../src/user');
// a virtual type is a property of our model that is not directly saved to the db
// instead, it is directly/closely associated to another property in our model
// ex: postCount is highly associated with posts property
describe('virtual types test', () => {
    // postCount should accurately reflect the len of posts array
    it('post count is equal to number of posts', (done) => {
        const starbz = new User({
            name: 'Starbz',
            posts: [{ title: 'new post' }]
        });
        // save to db and test if postCount is 1
        starbz.save()
        .then(() => User.findOne({ name: 'Starbz' }))
        .then((user) => {
            // assert starbz inst postCount is 1
            assert(user.postCount === 1);
            done();
        })
    });
});
