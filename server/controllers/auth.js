'use strict';

const authorize = require('../controllers/oauth/mastodon');

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
    .map(key => {
      return key + '=' + encodeURIComponent(options[key]);
    })
    .join('&');

  const authURL = mastoURL + '?' + queryString;

  res.redirect(authURL);
};

// Accessed in `callback` and `user`
let username;

// Callback
exports.callback = (req, res) => {
  authorize(req)
    .then(profile => {
      username = profile && profile.username && profile.display_name;
      res.status(200).redirect('/user');
    })
    .catch(err => {
      console.error(err);

      res.redirect('/');
    });
};

// User Profile
exports.user = (req, res) => {
  res.status(200).render('user', { title: 'User Profile', user: username });
};
