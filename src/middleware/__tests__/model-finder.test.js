'use strict';

const cwd = process.cwd();
const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const req = { params: { model: 'books' } };
const res = {};
const next = jest.fn();

beforeAll(() => {
  modelFinder(req, res, next);
});

describe('model-finder.js', () => {
  it('should append an object to the request as a `model` property', () => {
    expect(req.model).toBeDefined();
  });
  it('should call the `next` function', () => {
    modelFinder(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('should call the `next` function if the model does not exist', () => {
    const badReq = { params: { mode: 'dummy' } };
    modelFinder(badReq, res, next);
    expect(next).toHaveBeenCalled();
  });
});
