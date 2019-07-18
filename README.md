# Express API Server Template

[![Build Status](https://travis-ci.com/CharmedSatyr/express-pug-server.svg?branch=master)](https://travis-ci.com/CharmedSatyr/express-pug-server)
[![Codacy coverage](https://img.shields.io/codacy/coverage/737076e62d8e4d65ac567f2ee77afd0b.svg)](https://app.codacy.com/project/CharmedSatyr/express-pug-server/dashboard)
[![Known Vulnerabilities](https://dev.snyk.io/test/github/CharmedSatyr/express-pug-server/badge.svg)](https://dev.snyk.io/test/github/CharmedSatyr/express-pug-server/)
[![Greenkeeper badge](https://badges.greenkeeper.io/CharmedSatyr/express-pug-server.svg)](https://greenkeeper.io/)

An extensible REST server template

## Author

[CharmedSatyr](https://keybase.io/charmedsatyr)

## Links

- [GitHub Repository](https://github.com/CharmedSatyr/express-pug-server)

- [Swagger]() (Pending deployment)

- [JSDoc]() (Pending deployment)

- [Example deployment]() (TODO)

## Summary

<details>
  <summary>
   <b>File Tree</b>
  </summary>

```
.
├── config
│   ├── jsdoc.config.json
│   └── swagger.json
├── .env
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── index.js
├── LICENSE
├── .nvmrc
├── package.json
├── package-lock.json
├── .prettierrc.js
├── Procfile
├── README.md
├── server
│   ├── controllers
│   │   └── index.js
│   ├── index.js
│   ├── middleware
│   │   ├── 404.js
│   │   ├── 500.js
│   │   ├── model-finder.js
│   │   └── __tests__
│   │       ├── 404.test.js
│   │       ├── 500.test.js
│   │       └── model-finder.test.js
│   ├── models
│   │   ├── book
│   │   │   ├── book.js
│   │   │   └── book.model.js
│   │   └── resty-wrapper.js
│   ├── routes
│   │   ├── index.js
│   │   └── __tests__
│   │       └── index.test.js
│   └── __tests__
│       ├── index.test.js
│       └── supergoose.js
└── .travis.yml

10 directories, 30 files

```

</details>

This is a vanilla Express server template. It is intended to be forked to provide a basis for more complex Express servers that include authentication, logging, or other features.

This project's most interesting feature is that it provides a mechanism for dynamically importing new Mongoose models into the project and wrapping them in basic controller methods. This feature makes the template imminently reusable.

Potential future features are listed in the **TODO** section below.

## Installation

<details>
  <summary>
    <b>Prerequisites</b>
  </summary>

1. [Node.js](https://nodejs.org/en/) version 11.8.0 (Recommended: use [nvm](https://github.com/nvm-sh/nvm) to manage Node installations)

1. [npm](https://www.npmjs.com/get-npm) (distributed with Node.js) or [yarn](https://yarnpkg.com/en/)

1. [MongoDB](https://docs.mongodb.com/manual/installation/index.html)

</details>

<details>
  <summary>
    <b>Downloads</b>
  </summary>

1. Fork this project to your GitHub account.

2. Clone the repo to you local filesystem using the appropriate links for your username.

Using **ssh**:

```bash
git clone git@github.com:[Your-Username]/express-pug-server.git
```

Using **https**:

```bash
git clone https://github.com/[Your-Username]/express-pug-server.git
```

You can also download and uppack the `zip` file.

2. Navigate into the project directory.

```bash
cd express-pug-server
```

3. Install the project's dependencies

Using **npm**:

```bash
npm i
```

Using **yarn**:

```bash
yarn install
```

</details>

<details>
  <summary>
    <b>Environment</b>
  </summary>

In the project folder, create a `.env` file to hold private environmental variables and an empty `data` folder to hold your local database. Do _not_ commit either to version control.

Create entries in your `.env` file for:

- `MONGODB_URI`

- `PORT`

Good default values for the current server (which uses a `books` model) are:

```bash
# .env

MONGODB_URI=mongodb://localhost:27017/books
PORT=3000
```

</details>

## Usage

<details>
  <summary>
    <b>Running the server</b>
  </summary>

1. Start the MongoDB database in your project root. The command will probably look like:

```bash
mongod --dbpath=./data --port 27017
```

2. Start the Node process with `npm run start` or `npm run watch:server`.

3. If you want to use BrowserSync, start it with `npm run watch:ui`.

Output in the terminal should confirm the processes are running.

</details>

<details>
  <summary>
    <b>REST API</b>
  </summary>

API routes for this server look like `/api/v1/{model}`.

```javascript
router.get('/', c.index);
router.get('/api/v1/:model', c.getRecords);
router.get('/api/v1/:model/:id', c.getRecords);
router.post('/api/v1/:model', c.createRecord);
router.put('/api/v1/:model/:id', c.updateRecord);
router.patch('/api/v1/:model/:id', c.patchRecord);
router.delete('/api/v1/:model/:id', c.deleteRecord);
```

The dynamic `:model` in these routes is automatically interpolated by the `model-finder` middleware at `./server/middleware/model-finder.js`.

The RESTy Wrapper at `./server/models/rest-wrapper.js`, when instantiated on the model `./server/models/{model}/{model}.js`, will allow a number of operations that correspond to the methods by which they are accessed in the API routes.

These methods are as follows:

- `get(id?)` → If an `id` argument is provided, this method will return a Promise that resolves to a single document object. If no `id` argument is provided, this method will return a Promise that resolves to an array of all the collection's documents.

- `post(obj)` → This method takes a document object and returns a Promise that resolves to the posted document, which has been added to the database.

- `patch(id, obj)` → This method takes `id` and `obj` arguments and updates a document with the given `id` with the `obj` in the collection. No new documents will be created. The method returns a Promise that resolves to the updated document.

- `put(id, obj)` → This method takes `id` and `obj` arguments and updates the document with the given `id` in the collection with the `obj`. If an object with the given `id` does not exist, it will be created. The method returns a Promise that resolves to the updated document.

- `delete(id)` → The method takes an `id` argument, deletes the document from the collection, and returns a Promise that resolves to the deleted document.

</details>

<details>
  <summary>
    <b>Customizing the server</b>
  </summary>

### Adding a model

Because routes interpolate the names of their models when accessed, it is necessary to name the model and its parent folder to match the intended routes.

**Example:** Adding a `book` model

1. Create a folder for your model inside `./server/models/`. It should be named for the route that should be used to access it. For example, a `book` model that should be accessed on the route `/api/v1/book` requires the folder `book` at `./server/models/book`.

1. Within the `book` folder, create a Mongoose schema and instantitate a Mongoose model from it. This might be done in a file named `./server/models/book/book.model.js`, but the name here isn't as important.

1. To wrap the model in Mongoose-ready controller methods named for the REST methods by which they are accessed, instantiate an instance of the RESTy wrapper (exported from `./server/models/resty-wrapper.js`) with the Mongoose model and export it. That will look like:

```javascript
const book = new RESTyWrapper(BookModel);

module.exports = book;
```

The `book` model can now be accessed at `/api/v1/book` and will respond to REST requests as described above.

</details>

<details>
  <summary>
    <b>Running tests</b>
  </summary>

The current setup with the `book` model can be tested with the following commands:

- `npm run test`
- `npm run watch:test`
- `npm run lint`

Custom models will require their own tests, but those tests will likely be very similar! It might be possible to make testing more modular or automatic (based on interpolation from the `./server/models/{model}`) in the future.

</details>

## TODO

These items might eventually be addressed in this or a fork of this project:

- Continue to build up and clarify this README.

- Move model-specific tests to `./server/models/{model}` for reusability.

- The project should be given a default view engine, particularly one that takes advantage of the `mongoose-schema-jsonschema` to dynamically create forms based on Mongoose schemas.

- Improve Swagger documentation

- Improve JSDoc documentation

- Enable event logging using Socket.io

- Consider use-cases/security implications of packages like `cors` and `method-override`.

- Add Basic and Bearer authentication via OAuth or Auth0

- Add an alternative RESTy Wrapper intended to work with a PostgreSQL database and an environmental variable to toggle which database type is used.
