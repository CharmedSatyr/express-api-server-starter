'use strict';

const router = require('express').Router();

const c = require('../controllers/auth');

router.get('/login', c.login);
router.get('/user', c.user);
router.get('/callback', c.callback);

module.exports = router;
