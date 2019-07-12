'use strict';

const { server, start } = require('../');

const listen = jest.spyOn(server, 'listen'); // .mockImplementation(() => {});
const log = jest.spyOn(global.console, 'log').mockImplementation(() => {});

const port = Math.floor(Math.random() * 65536).toString(); // Generate a random number >= 0 and < 65536

// beforeAll(async () => start(port));

describe('server `start` function', () => {
  xit('should call `app.listen` with a given `port` and a callback', () => {
    expect(listen).toHaveBeenCalledWith(port); //, expect.any(Function));
  });

  xit('should log the `port` on which is it listening', () => {
    expect(log).toHaveBeenCalledWith(expect.stringContaining(port));
  });
});
