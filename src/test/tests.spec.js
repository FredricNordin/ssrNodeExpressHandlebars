import server from '../js/server.js'
import request from 'supertest';

test('Main page to give status 200 OK and check if all movie titles are correct.', async () => {
    const response = await request(server)
    .get('/')
    .expect(200);

    expect(response.text.includes('The Shawshank Redemption')).toBeTruthy();
    expect(response.text.includes('The Godfather')).toBeTruthy();
    expect(response.text.includes('Threat Level Midnight')).toBeTruthy();
    expect(response.text.includes('The Dark Knight')).toBeTruthy();
    expect(response.text.includes('Idiocracy')).toBeTruthy();
    expect(response.text.includes('12 Angry Men')).toBeTruthy();
});

test('Movie page to give status 200 OK and check correct info about the movie', async () => {
    const response = await request(server)
    .get('/movies/1')
    .expect(200);

    expect(response.text.includes('Shawshank')).toBeTruthy();
});