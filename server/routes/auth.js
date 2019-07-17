'use strict';

const passport = require('passport');
const router = require('express').Router();

const c = require('../controllers/auth');

router.get('/user', c.user);

// Used without Auth0
router.get('/login', c.login);
router.get('/callback', c.callback);

// Used with Auth0
router.get(
  '/login-auth0',
  passport.authenticate('auth0', {
    failureRedirect: '/',
    scope: 'openid email profile',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/auth0-cb', (req, res, next) => {
  passport.authenticate('auth0', (err, user /*, info*/) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/');
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/user');
    });
  })(req, res, next);
});

module.exports = router;
