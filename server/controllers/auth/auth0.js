'use strict';

const passport = require('passport');

// Login
exports.login = (req, res) => {
  passport.authenticate('auth0', {
    failureRedirect: '/',
    scope: 'openid email profile',
  })(req, res),
    (req, res) => {
      res.redirect('/');
    };
};

// Callback
exports.callback = (req, res, next) => {
  passport.authenticate('auth0', (err, user /* , info */) => {
    if (err) {
      req.session.isAuthenticated = false;
      return next(err);
    }

    if (!user) {
      req.session.isAuthenticated = false;
      return res.redirect('/');
    }

    req.logIn(user, err => {
      if (err) {
        req.session.isAuthenticated = false;
        return next(err);
      }

      req.session.user = user;
      req.session.isAuthenticated = true;
      res.status(200).redirect('/user');
    });
  })(req, res, next);
};

// Log Out
exports.logout = (req, res) => {
  req.logout();

  let returnTo = req.protocol + '://' + req.hostname;
  const port = req.connection.localPort;

  if (port !== undefined && port !== 80 && port !== 443) {
    returnTo += ':' + port;
  }

  let logoutURL = `https://${process.env.AUTH0_DOMAIN}/v2/logout`;

  const options = {
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo,
  };

  const queryString = Object.keys(options)
    .map(key => key + '=' + encodeURIComponent(options[key]))
    .join('&');

  logoutURL += '?' + queryString;

  res.redirect(logoutURL);
};
