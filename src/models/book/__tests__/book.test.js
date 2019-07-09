'use strict';

const path = require('path');
const RestyWrapper = require(path.resolve('src/models/resty-wrapper.js'));

describe('`RestyWrapper` class', () => {
  it('should be alive', () => {
    expect(RestyWrapper).toBeDefined();
    expect(true).toBeTruthy();
  });
});
