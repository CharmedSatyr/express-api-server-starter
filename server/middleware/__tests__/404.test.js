'use strict';
const supertest = require('supertest');

const notFound = require('../404');

const cwd = process.cwd();
const { server } = require(`${cwd}/server`);

const request = supertest(server);

const send = jest.fn();
const status = jest.fn().mockImplementation(() => ({ send }));
const res = { setHeader: jest.fn(), status };
const next = jest.fn();

beforeAll(() => {
  notFound(request, res, next);
});

describe('`404` error handler', () => {
  describe('Unit tests', () => {
    it('should have a status of 404', () => {
      const status = 404;
      expect(res.status).toHaveBeenCalledWith(status);
    });

    it('should have its header Content Type set', () => {
      expect(res.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        expect.any(String)
      );
    });

    it('should send a string', () => {
      expect(send).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe(`End-to-end tests`, () => {
    it('should not return at status on a good request', async () => {
      const result = await request.get('/');
      expect(result.status).not.toBe(404);
    });

    it('should return status `404` on a bad request', async () => {
      const result = await request.get('/foo');
      expect(result.status).toBe(404);
    });
  });
});
