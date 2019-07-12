'use strict';

// Import environmental variables
require('dotenv').config();

// Import the server's `start` method
const { start } = require('./server');

// Start up database server with options
const mongoose = require('mongoose');

// These options opt out of deprecations in the
// MongoDB Node.js driver that Mongoose is phasing out
const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
};

mongoose.connect(process.env.MONGODB_URI, options, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Mongoose connected...`);
  }
});

// Start the web server
start(process.env.PORT);
