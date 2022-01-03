const DriversController = require('../controllers/drivers_controller')
// this dir is where we define our routes for incoming requests

module.exports = (app) => {
    // watch for incoming requests of method GET
    // to the route https://localhost:3050/api
    // get method means that our app is listening for requests of method GET!
    app.get('/api', DriversController.greeting); // do NOT invoke greeting function (dont want to run func when app boots up)
    // route to create a driver
    app.post('/api/drivers', DriversController.create);
};
