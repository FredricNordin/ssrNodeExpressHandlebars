import server from '../index.js'
import request from 'supertest';

test('Main page to display a list of movies', async () => {
    const response = await request(server)
    .get('/')
    .expect(200);
});