'use strict';

const cwd = process.cwd();
const { server } = require(`${cwd}/server`);
const supergoose = require(`${cwd}/server/__tests__/supergoose`);
const request = supergoose.mockRequest(server);

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

jest.spyOn(global.console, 'log').mockImplementation(() => {});
const error = jest.spyOn(global.console, 'error').mockImplementation(() => {});

// TODO: Below are end-to-end tests;
// we could add unit tests that require the notFound import
// const errorHandler = require('../500');

describe('`500` error handler', () => {
  describe(`End-to-end tests`, () => {
    it('should return status `500` on a server error', async () => {
      const doesNotSatisfySchema = {};
      const result = await request
        .post('/api/v1/book')
        .send(doesNotSatisfySchema);

      expect(result.status).toBe(500);
      expect(error).toHaveBeenCalled();

      expect.assertions(2);
    });

    it('should not return a 500 status on a good request', async () => {
      const result = await request.get('/');

      expect(result.status).not.toBe(500);

      expect.assertions(1);
    });
  });
});
