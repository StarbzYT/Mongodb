const assert = require('assert');
const User = require('../src/user'); // bring in user model to create instances in db
// the purpose of this file is to test that our users db
// can create a new user with a name properly
// use describe block/func to make a test
// use it blocks so mocha can run assertions to test our db
// first arg to describe is a description (same thing for it blocks)
describe('creating records', () => {
    // all it blocks have access to done callback
    it('save a user', (done) => {
        // create user instance starbz
        const starbz = new User({ name: 'Starbz' });
        // save instance starbz to users db
        // starbz instance then becomes an object with multiple methods/functions attached to it
        // one of which is the save method to save the starbz instance to our db    
        starbz.save()
        // save is promise based, so we must wait for it to complete and THEN run our tests
            .then(() => {
                // check if starbz has been saved successfully
                // all instances of our model have an isNew
                // .isNew is True when our instance is not in the db
                // .isNew will become false once our instance is saved in the db
                assert(!starbz.isNew);
                // then call done to move onto next tests
                done();
            });
    });
});

// note: must import assert library which is automatically provided when we installed mocha
// also change script in package json to be "mocha"
// in terminal: npm run test