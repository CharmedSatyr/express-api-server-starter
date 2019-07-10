'use strict';

const cwd = process.cwd();
const { server } = require(`${cwd}/src/server.js`);
const supergoose = require(`${cwd}/__tests__/supergoose.js`);
const request = supergoose.server(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

const error = jest.spyOn(global.console, 'error').mockImplementation(() => {});

// TODO: Below are end-to-end tests;
// we could add unit tests that require the notFound import
// const errorHandler = require('../500.js');

describe('`500` error handler', () => {
  describe(`End-to-end tests`, () => {
    it('should return status `500` on a server error', async () => {
      expect.assertions(2);
      // This is the dummy error route
      const errorRoute = '/api/error';
      const result = await request.post(errorRoute);
      expect(result.status).toBe(500);
      expect(error).toHaveBeenCalled();
    });
    it('should not return at status on a good request', async () => {
      expect.assertions(1);
      const result = await request.get('/');
      expect(result.status).not.toBe(500);
    });
  });
});
