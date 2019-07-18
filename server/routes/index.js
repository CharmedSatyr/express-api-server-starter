'use strict';

// Create a router instance
const router = require('express').Router();

// Import controller
const c = require('../controllers');

// Declare slash route
router.get('/', c.index);

module.exports = router;
