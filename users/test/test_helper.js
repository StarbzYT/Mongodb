// bring in mongoose package we installed using npm
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // tell mongoose to use ES6 implementation for its promises instead of default
// connect to mongo database on our machine (specify!)
// we tell mongo to connect specific user_test db
// create before HOOK to ensure that, if the connection to our mongo db takes longer than expected, we will not jump to our tests
// instead we will wait for the connection to complete
// pass in done callback we have access to to tell mongoose that we are done connecting, and move on to our mocha tests
before((done) => {
    mongoose.connect('mongodb://localhost/users_test');
    mongoose.connection
    // watch for 'open' and 'error' events
    // if mongo shows that event run the fat arrow
        .once('open', () => { done(); }) // call done once connnection is complete to tell mocha the test is done
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});
// create a HOOK that will clear the db before running our tests
// this hook will auto run before any of our mocha tests run
// beforeEach takes in a done callback
beforeEach((done) => {
    // get access to each model in mongoose connection
    const { users, comments, blogposts } = mongoose.connection.collections;
    // drop each of the collection models in the mongoose collection before running the tests
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});