'use strict';

const { app, start, stop } = require('../');

const listen = jest.spyOn(app, 'listen');
const log = jest.spyOn(global.console, 'log').mockImplementation(() => {});
const error = jest.spyOn(global.console, 'error').mockImplementation(() => {});

const port = Math.floor(Math.random() * 65536).toString(); // Generate a random number >= 0 and < 65536

describe('`start` function', () => {
  it('should call `app.listen` with a given `port` and a callback', () => {
    start(port);
    expect(listen).toHaveBeenCalledWith(port); //, expect.any(Function));
    stop();

    log.mockClear();
  });

  it('should log the `port` on which is it listening', () => {
    start(port);
    expect(log).toHaveBeenCalledWith(expect.stringContaining(port));
    stop();

    log.mockClear();
  });

  it('should log an error if `stop` is called while the server is not running', () => {
    stop();
    expect(error).toHaveBeenCalledWith(expect.any(String));

    error.mockClear();
  });
});
