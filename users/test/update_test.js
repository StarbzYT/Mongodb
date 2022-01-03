// bring in assert and User model/class
const assert = require('assert');
const User = require('../src/user');

describe('updating records', () => {
   // create instance starbz
   let starbz;
   // set starbz var to a new User model instance
   beforeEach((done) => {
       starbz = new User({ name: 'Starbz', likes: 0 });
       starbz.save() // REMEMBER to save instance to db!!!
       .then(() => done()); // call done to tell mocha to move on to next tests
   })
   // create helper function that tests to see if the name updates
   // takes in async operation, and done callback from it block
   function assertName(operation, done) {
       operation
        .then(() => User.find({})) // find returns an array, and specifying "{}" arg returns everything in db
        // For tests, 1. make sure that the starbz name is gone
       // 2. Check that the new instance has a new name Steve
        .then((users) => {
            // make sure users array has only 1 item! (starbz inst should be updated not duplicated)
            assert(users.length === 1);
            // make sure name of inst is now Steve
            assert(users[0].name === 'Steve');
            // invoke done parameter
            done();
           });
   };
   // create model instance test (set and save)
   it('updated model instance using set and save', (done) => {
        // NOTE: Use set n save approach when you want to make multiple changes at different times
        // because at the end, you can call .save() to save the changes
        starbz.set('name', 'Steve'); // set name attr of starbz instance to STEVE
        assertName(starbz.save(), done); // make sure to save changes
            
   });
   // create model instance test (update inst method)
   it('updated model instance using update', (done) => {
       assertName(starbz.update({ name: 'Steve' }), done);
   });

   // model class test update
   it('updated using class model update', (done) => {
       assertName(
           // update ALL collections with name Starbz
           User.update({ name: 'Starbz' }, {name: 'Steve'}),
           done
       );
   });
   // model class findOneAndUpdate
   it('updated one using class model update one', (done) => {
       // update only one collection with name starbz
       assertName(
           User.findOneAndUpdate({ name: 'Starbz' }, {name: 'Steve'}),
           done
       );
   });
   // model class findByIdAndUpdate
   it('updated by id using class model find by id update', (done) => {
       assertName(
           // update collection by id
           User.findByIdAndUpdate(starbz._id, { name: 'Steve' }),
           done
       );
    });
    // test user likes increment
    it('updated user likes by 1', (done) => {
        // increment all users' likes with name Starbz by 1
        User.update({ name: 'Starbz' }, { $inc: { likes: 1 } })
        // find all users with name starbz and check is the post count is one
            .then(() => User.findOne({ name: 'Starbz'}))
            .then((user) => {
                assert(user.likes === 1);
                done();
            });
   });
});