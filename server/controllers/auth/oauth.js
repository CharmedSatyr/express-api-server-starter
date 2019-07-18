'use strict';

// Currently only Mastodon OAuth is supported
const { authorize, revoke } = require('./providers/mastodon');

// Login
exports.login = (req, res) => {
  const mastoURL = process.env.MASTODON_INSTANCE_URL + '/oauth/authorize';

  const options = {
    client_id: process.env.MASTODON_CLIENT_KEY,
    redirect_uri: process.env.MASTODON_REDIRECT_URI,
    response_type: 'code',
    scope: process.env.MASTODON_SCOPES,
  };

  const queryString = Object.keys(options)
    .map(key => key + '=' + encodeURIComponent(options[key]))
    .join('&');

  const authURL = mastoURL + '?' + queryString;
  res.redirect(authURL);
};

// Callback
exports.callback = (req, res) => {
  authorize(req)
    .then(user => {
      req.session.user = user;
      req.session.isAuthenticated = true;
      res.status(200).redirect('/user');
    })
    .catch(err => {
      req.session.isAuthenticated = false;
      console.error(err);

      res.redirect('/');
    });
};

// Logout
exports.logout = (req, res) => {
  revoke(req)
    .then(response => {
      console.log('response:', response);
      req.session.isAuthenticated = false;
      res.redirect('/');
    })
    .catch(err => {
      req.session.isAuthenticated = false;
      console.error(err);
      res.redirect('/');
    });
};
