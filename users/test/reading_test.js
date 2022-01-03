// bring in assert and User model
const assert = require('assert');
const User = require('../src/user');

describe('reading users out of db', () => {
    let starbz, alexa, mark, joe; // init user instance starbz so we can use it in ALL funcs/blocks
    // since test_helper clears db before each test, we must create a new user instance to run our read tests on
    beforeEach((done) => {
        starbz = new User({ name: 'Starbz'} );
        alexa = new User({ name: 'Alexa' });
        mark = new User({ name: 'Mark' });
        joe = new User({ name: 'Joe' });
        // save all instances
        Promise.all([starbz.save(), alexa.save(), mark.save(), joe.save()])
            .then(() => done());
    });
    // pass it block the done callback
    it('finds all users with name starbz ', (done) => {
        // use find method from User class to recieve an array of all collections matching properties
        User.find({ name: 'Starbz' })
        // then callback is passed the users array
            .then((users) => {
                // NOTE: you CANNOT just reference ._id to compare the raw ids of collections.
                // ._id is the OBJECT ID not the raw string we want to compare
                // so, call .toString() to compare raw strings instead
                assert(users[0]._id.toString() === starbz._id.toString());
                done();
            });
    });

    // create test to see if a user with a particular id has the name, starbz
    it('find one user with specific id', (done) => {
        // find user by id
        User.findOne({ _id: starbz._id })
            .then((user) => {
                // find returns one user! so arrow func is user singular
                assert(user.name === 'Starbz') // test to see if user with that id has name 'starbz' like its suppose to
                done(); // mongo is async to use done to tell it we have completed the test
            });
    });
    // skip and limit test case
    it('can limit and skip users set', (done) => {
        // find all users, skip 1, and limit to 2
        // -starbz-, [alexa, mark], joe
        // NOTE: We do NOT know which instance is going to be saved first
        // thus, we must first sort the users we find to ensure our test never fails!
        User.find({})
        .sort({ name: 1 }) // specify property you want to sort by. 1 means sort in ascending order and -1 means decending order
        .skip(1)
        .limit(2)
        .then((users) => {
            // test if limit worked
            assert(users.length === 2);
            // users has only 2 names, first should be Joe and second Mark
            assert(users[0] === 'Joe');
            assert(users[1] === 'Mark');
            done();
        });
    });
});