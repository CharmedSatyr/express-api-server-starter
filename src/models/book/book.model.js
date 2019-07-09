'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const { model, Schema } = mongoose;

const BookSchema = Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  image_url: { type: String, required: true },
  description: { type: String, required: true },
  bookshelf: { type: String, required: true },
});

const BookModel = model('books', BookSchema);

module.exports = BookModel;
