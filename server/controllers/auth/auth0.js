'use strict';

const passport = require('passport');

exports.login = (req, res) => {
  passport.authenticate('auth0', {
    failureRedirect: '/',
    scope: 'openid email profile',
  })(req, res),
    (req, res) => {
      res.redirect('/');
    };
};

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
