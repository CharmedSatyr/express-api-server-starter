'use strict';

const RestyWrapper = require('../rest-wrapper.js');
const BookModel = require('./books.schema.js');

// Export an instance of a class that uses RESTy methods
// to perform CRUD operations on Book documents
module.exports = new RestyWrapper(BookModel);
