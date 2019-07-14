'use strict';

const router = require('express').Router();

const c = require('../controllers/auth');

router.get('/login', c.login);
router.get('/user', c.user);

module.exports = router;
