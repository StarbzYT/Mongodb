// bring in express
const express = require('express');
// bring in routes
const routes = require('./routes/routes');
// bring in bodyParser middleware to have a body property on post requests
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// create express app for our routes, code, etc
const app = express();
// set mongoose promise to use global and connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:3050/muber');
// call middleware before routes
app.use(bodyParser.json()); // we expect json data and want middleware to parse json into a json object we can use
// call our routes
routes(app)

module.exports = app;