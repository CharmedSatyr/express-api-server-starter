'use strict';

const router = require('express').Router();

const a = require('../controllers/auth');
const o = require('../controllers/auth/oauth');
const a0 = require('../controllers/auth/auth0');

// User Profile
router.get('/user', a.user);

// Login with local OAuth2 methods
router.get('/login', o.login);
router.get('/callback', o.callback);

// Login with Auth0
router.get('/login-auth0', a0.login);
router.get('/auth0-cb', a0.callback);

module.exports = router;
