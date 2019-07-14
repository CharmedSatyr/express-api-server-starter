'use strict';

/**
 * Server module - Integrates the logic of the application
 * and exports the Express `app` instance and `start` and
 * `stop` methods.
 *
 * @module src/server
 */

// Path
const cwd = process.cwd();

// 3rd party resources
const express = require('express');
const morgan = require('morgan');

// Catchalls
const notFound = require('./middleware/404');
const serverError = require('./middleware/500');

// Prepare the Express app
const app = express();

// App level middleware
app.use(morgan('dev'));

// Parsers
// NOTE: body-parser was added back to Express in 4.16.0
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// View Engine
app.set('views', `${cwd}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${cwd}/public`));

// Documentation
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require(`${cwd}/config/swagger.json`);
app.use('/docs', express.static(`${cwd}/docs`));
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Routes
const router = require('./routes'); // General api routes
const authRouter = require('./routes/auth'); // Auth routes

app.use(router);
app.use(authRouter);

// Error handling
app.use('*', notFound);
app.use(serverError);

/**
 * Exports accumulated Express `app` with `start`, and `stop` functions
 */
module.exports = {
  app,
  /**
   * `start` method appends an `http.Server` instance to the `app` and logs the `port` detected
   *
   * @name start
   * @function
   * @param {integer} port The port the server should run on
   */
  start: port => {
    app._server = app.listen(port); // Append `http.Server` to `app._server`
    console.log(`Server up on port ${app._server.address().port}...`);
  },
  /**
   * @name start
   * @function
   * `stop` method programmatically shuts down the `http.Server` instance
   */
  stop: () => {
    if (app._server) {
      app._server.close();
      delete app._server; // Cleanup appended server
    } else {
      console.error('No server is running...');
    }
  },
};
