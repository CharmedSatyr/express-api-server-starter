'use strict';

const supertest = require('supertest');

const cwd = process.cwd();
const { app } = require(`${cwd}/server`);

const request = supertest(app);

describe('v1 router', () => {
  it('responds with a 200 status to a GET for the root', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);

    expect.assertions(1);
  });
});
