'use strict';

/**
 * Server module - Integrates the logic of the application
 * and exports the Express `app` instance and `start` method.
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

// Documentation
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require(`${cwd}/config/swagger.json`);
app.use('/docs', express.static(`${cwd}/docs`));
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// API Router
const router = require('./routes'); // General api routes
app.use(router);

// Catchalls
app.use('*', notFound);
app.use(serverError);

let isRunning = false;

/**
 * Exported function to start the Express server
 * @param port {number} Port used for the server
 */
module.exports = {
  server: app,
  start: port => {
    if (!isRunning) {
      app.listen(port, () => {
        console.log(`Server up on port ${port}...`);
      });
    } else {
      console.log('Server is already running...');
    }
  },
};
