const request = require('supertest');
const app = require('../../src/app.js');

const movie = {
    title: 'Toy Story',
    image: 'Aquí va una imagen',
    created: '2003 04 12',
    quality: 4
}
describe('/movies/create', () => {
    it('Deberia devolver un status code 201 cuando se crea', done => {
        request(app)
        .post('/movies/create')
        .send({lele:2})
        .expect(201, done())
    });
    
})