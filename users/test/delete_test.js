// bring in assert and User model
const assert = require('assert');
const User = require('../src/user');

describe('check if user is deleted', () => {
    let starbz;

    // since db is always cleared before running tests, create an instance of user db
    // and then save the user to db
    beforeEach((done) => {
        starbz = User({ name: 'Starbz' });
        // save starbz instance to db
        starbz.save() // this is async so its promise based
            .then(() => done());
    });

    it('model instance remove', (done) => {
        // remove starbz instance from db (this is the scenario where we ALREADY have the starbz instance and want to delete it)
        starbz.remove() // remove operation is promise based
        // try to find one user with name starbz, and test to make sure it DNE
            .then(() => User.findOne({ name: 'Starbz' })) // this operation async so promise based
            // you MUST wait for the findOne operation to complete BEFORE testing to see if the return is null
            .then((user) => {
                // once the first then completes, THEN we run our assert/test
                assert(user === null);
                done();
            })

    });

    it('class method remove', (done) => {
        // removes a bunch of records with the specified criteria
        User.remove({ name: 'Starbz' })
            .then(() => User.findOne({ name: 'Starbz' }))
            .then((user) => {
                assert(user == null);
                done();
            });

    });

    it('class method findOneAndRemove', (done) => {
        // find one collection where name is Starbz and remove it from the db
        User.findOneAndRemove({ name: 'Starbz' })
            // find Starbz in db
            .then(() => User.findOne({ name: 'Starbz' }))
            .then((user) => {
                // test to make sure that Starbz is for sure deleted
                assert(user === null);
                done();
            });

    });

    it('class method findByIdAndRemove', (done) => {
        // find delete user where id is Starbz's instance id
        User.findByIdAndRemove(starbz._id)
        // try to find starbz by id and test to make sure it is deleted
            .then(() => User.findOne({ name: 'Starbz' }))
            .then((user) => {
                assert(user == null);
                done();
            })
    });
});