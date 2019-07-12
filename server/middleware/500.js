'use strict';

/**
 * Error 500 Middleware
 * @module middleware/error
 */

/**
 * Error 500 handler - Returns a JSON object on a server error
 *
 * @function
 * @param err {object} Express error object
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
module.exports = (err, req, res, next) => {
  console.error('__SERVER_ERROR__', err);
  const status = 500;
  const message =
    (err && err.message) || (err && err.statusMessage) || err || 'Server Error';

  res.setHeader('Content-Type', 'application/json');
  res.status(500).send(JSON.stringify({ status, message }));
};
