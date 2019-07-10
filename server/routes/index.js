'use strict';

// Create a router instance
const router = require('express').Router();

// Import middleware
const auth = require('../auth/middleware');
const modelFinder = require('../middleware/model-finder');

// Import controllers
const c = require('../controllers');

// Dynamically evaluate the model
router.param('model', modelFinder);

// Declare routes
router.get('/', c.home);
router.get(`/api/v1/:model`, c.getRecords);
router.get(`/api/v1/:model/:id`, c.getRecords);
router.post(`/api/v1/:model`, auth('create'), c.createRecord);
router.put(`/api/v1/:model/:id`, auth('update'), c.updateRecord);
router.patch(`/api/v1/:model/:id`, auth('update'), c.patchRecord);
router.delete(`/api/v1/:model/:id`, auth('delete'), c.deleteRecord);

module.exports = router;
