const { alphaNumeric, word } = require('faker').random;

const cwd = process.cwd();
const supergoose = require(`${cwd}/server/__tests__/supergoose`);
const { server } = require(`${cwd}/server`);

const request = supergoose.mockRequest(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('router', () => {
  xit('should respond with a 404 on an invalid route', async () => {
    const response = await request.get('/foo');
    expect(response.status).toBe(404);
  });

  xit('responds with a 200 status to a GET for the root', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  xit('responds with a 200 status to a GET for /api/v1/book', async () => {
    const response = await request.get('/api/v1/book');
    expect(response.status).toBe(200);
  });

  xit('responds with a 200 status to a GET for /api/v1/book/:id', async () => {
    const book = {
      title: word(),
      author: word(),
      isbn: alphaNumeric(),
      image_url: word(),
      description: word(),
      bookshelf: word(),
    };

    const response = await request.post('/api/v1/book').send(book);
    const id = response.body._id;
    const results = await request.get(`/api/v1/book/${id}`);
    expect(results.status).toBe(200);
  });

  xit('responds with a 200 status to a POST to /api/v1/book', async () => {
    const obj = { name: 'demo', description: 'good', url: 'https://demo.com' };
    const response = await request.post('/api/v1/book').send(obj);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(obj);
  });

  xit('responds with a 200 status to a PUT to /api/v1/book/:id', async () => {
    const obj = { description: 'good', name: 'demo', url: 'https://demo.com' };
    const response = await request.post('/api/v1/book').send(obj);
    const id = response.body._id;
    const update = {
      description: 'good',
      name: 'update',
      url: 'https://demo.com',
    };
    const results = await request.put(`/api/v1/book/${id}`).send(update);
    expect(results.status).toBe(200);
    expect(results.body).toMatchObject(update);
  });

  xit('responds with a 200 status to a PATCH to /api/v1/book/:id', async () => {
    const obj = { name: 'demo', description: 'good', url: 'https://demo.com' };
    const response = await request.post('/api/v1/book').send(obj);
    const id = response.body._id;
    const update = {
      description: 'good',
      name: 'update',
      url: 'https://demo.com',
    };
    const result = await request.patch(`/api/v1/book/${id}`).send(update);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(update);
  });

  xit('responds with a 200 status to a DELETE to /api/v1/book/:id', async () => {
    const obj = { name: 'demo', description: 'good', url: 'https://demo.com' };
    const response = await request.post('/api/v1/book').send(obj);
    const id = response.body._id;
    const result = await request.delete(`/api/v1/book/${id}`);
    expect(result.status).toBe(200);
    expect(result.body).toMatchObject(obj);
  });
});
