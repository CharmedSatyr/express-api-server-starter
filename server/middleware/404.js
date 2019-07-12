'use strict';

/**
 * Error 404 Middleware
 * @module middleware/404
 */

/**
 * Sends a custom 404 response
 * Publishes the url as an `error` event to the
 * `database` namespace of the message queue
 * @function
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express next function
 */
module.exports = (req, res, next) => {
  const status = 404;
  const message = 'Not Found';

  res.setHeader('Content-Type', 'application/json');
  res.status(status).send(JSON.stringify({ status, message }));
};
