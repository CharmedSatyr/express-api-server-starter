'use strict';

const supertest = require('supertest');

const cwd = process.cwd();

const { app } = require(`${cwd}/server`);
const serverErr = require('../500');

const request = supertest(app);
const err = 'Mock server error!';
const send = jest.fn();
const status = jest.fn().mockImplementation(() => ({ send }));
const res = { setHeader: jest.fn(), status };
const next = jest.fn();

jest.spyOn(global.console, 'log').mockImplementation(() => {});
const error = jest.spyOn(global.console, 'error').mockImplementation(() => {});

beforeAll(() => {
  serverErr(err, request, res, next);
});

describe('`500` error handler', () => {
  describe('Unit tests', () => {
    it('should have a status of 500', () => {
      const status = 500;
      expect(res.status).toHaveBeenCalledWith(status);

      expect.assertions(1);
    });

    it('should have its header Content Type set', () => {
      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        expect.any(String)
      );

      expect.assertions(1);
    });

    it('should send a string that includes a `status` and `message`', () => {
      const sent = JSON.stringify({ status: 500, message: err });

      expect(send).toHaveBeenCalledWith(sent);

      expect.assertions(1);
    });

    it('should send a string that includes a `status` and `message` even if no message is provided', async () => {
      await serverErr(null, request, res, next);
      const fallbackMessage = 'Server Error';
      const sent = JSON.stringify({ status: 500, message: fallbackMessage });

      expect(send).toHaveBeenCalledWith(sent);

      expect.assertions(1);
    });
  });

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
