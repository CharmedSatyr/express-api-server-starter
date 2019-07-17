'use strict';

// Create a router instance
const router = require('express').Router();

// Import middleware
const modelFinder = require('../middleware/model-finder');

// Import controllers
const c = require('../controllers/api');

// Dynamically evaluate the model
router.param('model', modelFinder);

// Declare API routes
router.get('/api/v1/:model', c.getRecords);
router.get('/api/v1/:model/:id', c.getRecords);
router.post('/api/v1/:model', c.createRecord);
router.put('/api/v1/:model/:id', c.updateRecord);
router.patch('/api/v1/:model/:id', c.patchRecord);
router.delete('/api/v1/:model/:id', c.deleteRecord);

module.exports = router;
