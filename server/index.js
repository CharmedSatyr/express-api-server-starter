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

// Import environmental variables
require('dotenv').config();

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

// Authentication
const session = require('express-session');

// Config express-session
const sess = {
  secret: 'AUTH0_IS-mY-FAVE',
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true; // serve secure cookies, requires https
}

app.use(session(sess));

// Load Passport
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
    domain: process.env.AUTH0_DOMAIN || 'charmed-social.auth0.com',
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

// You can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

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
