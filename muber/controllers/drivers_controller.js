const Driver = require('../models/driver');
// this dir is where we define our model controllers once we receive requests on our routes
// handles requests given to routes
module.exports = {
    // es6 enhances object literal syntax
    greeting(req, res) {
        // send back a response object
        res.send({ hi: 'there' });
    },
    // function to make a driver
    create(req, res) {
        // create a user in the db with the email in the req body
        const driverProps = req.body;
        // create new driver
        Driver.create(driverProps)
            .then((driver) => {
                // send back driver creation
                res.send(driver);
            });
    }
};