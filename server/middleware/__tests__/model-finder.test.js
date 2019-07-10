'use strict';

const modelFinder = require('../model-finder');

const req = { params: { model: 'book' } };
const res = {};
const next = jest.fn();

beforeAll(() => {
  modelFinder(req, res, next);
});

describe('model-finder', () => {
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
