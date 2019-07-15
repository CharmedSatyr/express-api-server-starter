'use strict';

const router = require('express').Router();

const c = require('../controllers/auth');
const authorize = require('../controllers/mastodon');

router.get('/login', c.login);
router.get('/user', c.user);
router.get('/callback', (req, res) => {
  authorize(req).then(user => {
    console.log('user:', user);
    res.redirect('/user');
  });
}); // User is redirected here with code

module.exports = router;
