'use strict';

const passport = require('passport');
const router = require('express').Router();

const c = require('../controllers/auth');
const authorize = require('../controllers/oauth/mastodon');

router.get('/user', c.user);

// Used without Auth0
router.get('/skallback', (req, res) => {
  authorize(req).then(user => {
    console.log('user:', user);
    res.redirect('/user');
  });
}); // User is redirected here with code

// Used with Auth0
router.get(
  '/fogin',
  passport.authenticate('auth0', {
    failureRedirect: '/',
    scope: 'openid email profile',
  }),
  (req, res) => {
    res.redirect('http://127.0.0.1:3000');
  }
);

router.get('/auth0-cb', (req, res, next) => {
  passport.authenticate('auth0', (err, user /*, info*/) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login');
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
