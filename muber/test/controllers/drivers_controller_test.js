const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
// get access to drivers model to avoid issues with express
const Driver = mongoose.model('driver'); // make sure it is the same name as in the model

describe('drivers controller', () => {
    it('POST request to /api/drivers creates a new user', (done) => {
        // get count of drivers in drivers model (its async!)
        Driver.count().then((count) => {
            request(app)
            // post request
            .post('/api/drivers')
            // send along some data WITH request (note: we are NOT sending back data to the user like res.send())
            .send({ email: 'test@test.com' })
            .end(() => {
                // get count again. it should be 1 greater after request
                Driver.count().then((newCount) => {
                    assert(count + 1 === newCount);
                    done();
                })
            });
        });

    })
});