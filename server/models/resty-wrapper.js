'use strict';

/**
 * The class takes a Mongoose model as its constructor.
 * It wraps it in methods with RESTy names. The RESTy
 * methods are used to access the model's documents.
 *
 * @class RESTyWrapper
 * @param model {object} Mongoose model
 */
class RESTyWrapper {
  constructor(schema) {
    this.schema = schema;
  }

  get(id) {
    return id ? this.schema.findById(id) : this.schema.find();
  }

  post(obj) {
    return new this.schema(obj).save();
  }

  // `patch` doesn't upsert; `put` does
  patch(id, obj) {
    return this.schema.findByIdAndUpdate(id, obj, { new: true });
  }

  put(id, obj) {
    return this.schema.findByIdAndUpdate(id, obj, { new: true, upsert: true });
  }

  delete(id) {
    return this.schema.findByIdAndDelete(id);
  }
}

module.exports = RESTyWrapper;
