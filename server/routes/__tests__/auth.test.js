'use strict';

const supertest = require('supertest');

const cwd = process.cwd();
const { app } = require(`${cwd}/server`);

const request = supertest(app);

describe('auth router', () => {
  xit('responds with a 200 status to a GET for /login', async () => {
    const response = await request.get('/login');
    expect(response.status).toBe(200);
  });

  it('responds with a 200 status to a GET for /user', async () => {
    const response = await request.get('/user');
    expect(response.status).toBe(200);
  });
});
