const assert = require('assert');
// supertest allows us to make fake http requests to our server
// name supertest as request (its a convention to call it request)
const request = require('supertest');
const app = require('../app');

describe('the express app', () => {
    it('handles GET requests to /api', (done) => {
        request(app)
            .get('/api')
            .end((err, response) => {
                // err is incase the request flat out fails
                assert(response.body.hi === 'there');
                done();
            });
    });
});