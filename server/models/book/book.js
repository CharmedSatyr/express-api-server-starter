'use strict';

const RESTyWrapper = require('../resty-wrapper');
const BookModel = require('./book.model');

// Export an instance of a class that uses RESTy methods
// to perform CRUD operations on Book documents
const book = new RESTyWrapper(BookModel);
module.exports = book;
