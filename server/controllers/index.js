'use strict';

/**
 * Display home page
 *
 * @function
 * @name index
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
exports.index = (req, res, next) => {
  res.status(200).render('index', { title: 'Home' });
};
