const assert = require('assert');
const User = require('../src/user');
// validate records
// (no need to use before each since we want to test records before they are inserted into the db)
describe('validating records', () => {
    // required username testcase
    it('requires a user name', () => {
        // create User model instance and set name to undef
        const user = new User({ name: undefined });
        // use method to return object of validation errors
        const validationResult = user.validateSync();
        // pluck off message from object
        const { message } = validationResult.errors.name;
        // check if name is undefined
        assert(message === 'Name is required.');
    });
    // username longer than 2 chars test case
    it('user\'s name must be longer than 2 chars', (done) => {
        const user = new User( { name: 'Al' } );
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than two characters.');
        done();
    });
    // disallow invalid records from being saved test case
    it('disallows invalid records from being saved to db', (done) => {
        // create user with invalid name
        const user = new User({ name: 'Al' });
        // mongoose will not allow user to be saved so we must use a catch since the promise will be unresolved
        user.save()
        .catch((error) => {
            // pluck off message from error and assert
            const { message } = error.errors.name;
            assert(message === 'Name must be longer than two characters.')
            done();
        })
        
    })
});