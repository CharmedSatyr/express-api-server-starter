# Express API Server Template

[![Build Status](https://travis-ci.com/CharmedSatyr/express-server-template.svg?branch=master)](https://travis-ci.com/CharmedSatyr/express-server-template)
[![Codacy coverage](https://img.shields.io/codacy/coverage/ade4867bae464dfda77c41c94f40cec2.svg)](https://app.codacy.com/project/CharmedSatyr/express-server-template/dashboard)
[![Known Vulnerabilities](https://dev.snyk.io/test/github/CharmedSatyr/express-server-template/badge.svg)](https://dev.snyk.io/test/github/CharmedSatyr/express-server-template/)
[![Greenkeeper badge](https://badges.greenkeeper.io/CharmedSatyr/express-server-template.svg)](https://greenkeeper.io/)

An extensible REST server template

**Author:** [CharmedSatyr](https://keybase.io/charmedsatyr)

[GitHub Repository](https://github.com/CharmedSatyr/express-server-template)

## Summary

This

- [swagger]()
- [jsdoc]()

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

<details>
  <summary>
    <b>Environmental Variables</b>
  </summary>

- `MONGODB_URI` - URL to the running mongo instance/db
- `PORT` - Port number
- `SECRET` - The key the application uses for JWT token signing

</details>

<details>
  <summary>
    <b>Running the app</b>
  </summary>

- Ensure you have appropriate environmental variables set and that a `data` folder exists at the project root.
- Start a MongoDB database on your local machine that uses the `data` folder. If you have MongoB installed, this command will probably look like `mongod --dbpath=./data --port 27017`.
- Start the server on your local machine with `npm run start` or `npm run watch`.

</details>

<details>
  <summary>
    <b>Running Tests</b>
  </summary>

- `npm run test`
- `npm run test-watch`
- `npm run lint`

  </details>
