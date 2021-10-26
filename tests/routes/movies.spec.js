const request = require('supertest');
const app = require('../../src/app.js');

describe('/movies/create', () => {
    it('responde con un status code 200', done => {
        request(app)
        .post()
    })
})