'use strict';

/**
 * Server module - Integrates the logic of the application
 * and exports the Express `app` instance and `start` method.
 * @module src/server
 **/

// Path
const cwd = process.cwd();

// 3rd party resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('method-override');

// Catchalls
const notFound = require('./middleware/404');
const serverError = require('./middleware/500');

// Prepare the Express app
const app = express();

// App level middleware
app.use(cors());
app.use(morgan('dev'));

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Method Override Middleware
app.use(
  methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete `_method`
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Documentation
app.use('/docs', express.static(`${cwd}/docs`));
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require(`${cwd}/config/swagger.json`);
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// API Routers
const authAdminRouter = require('./auth/auth-admin.router'); // Auth routes intended for admin use
app.use(authAdminRouter);

const authRouter = require('./auth/auth.router'); // General auth routes
app.use(authRouter);

const v1AdminRouter = require('./routes/v1-admin.router'); // API routes intended for admin use
app.use(v1AdminRouter);

const v1Router = require('./routes/v1.router'); // General api routes
app.use(v1Router);

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
