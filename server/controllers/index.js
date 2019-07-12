'use strict';

/**
 * Display a home page
 *
 * @function
 * @name home
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
exports.home = (req, res, next) => {
  res.status(200).send('Welcome to the home page!');
};

/**
 * Get all or one record
 *
 * @function
 * @name getAll
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
exports.getRecords = (req, res, next) => {
  const { id } = req.params;

  req.model
    .get(id)
    .then(results => res.status(200).send(results))
    .catch(next);
};

/**
 * Create a new record
 *
 * @function
 * @name createRecord
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
exports.createRecord = (req, res, next) => {
  const { body } = req;

  req.model
    .post(body)
    .then(result => res.status(200).send(result))
    .catch(next);
};

/**
 * Update a record - upserts if the record does not exist
 *
 * @function
 * @name updateRecord
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
exports.updateRecord = (req, res, next) => {
  const { body } = req;
  const { id } = req.params;

  req.model
    .put(id, body)
    .then(result => res.status(200).send(result))
    .catch(next);
};

/**
 * Patch a new record - does not upsert
 *
 * @function
 * @name patchRecord
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
exports.patchRecord = (req, res, next) => {
  const { body } = req;
  const { id } = req.params;

  req.model
    .patch(id, body)
    .then(result => res.status(200).send(result))
    .catch(next);
};

/**
 * Delete a record
 *
 * @function
 * @name deleteRecord
 * @param req {object} Express request object
 * @param res {object} Express response object
 * @param next {function} Express middleware function
 */
exports.deleteRecord = (req, res, next) => {
  const { id } = req.params;

  req.model
    .delete(id)
    .then(result => res.status(200).send(result))
    .catch(next);
};
