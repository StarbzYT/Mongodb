// bring in express app
const app = require('./app');

// listen on port 3050
app.listen(3050, () => {
    console.log('running on port 3050');
});