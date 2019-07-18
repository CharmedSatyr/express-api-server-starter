'use strict';

const superagent = require('superagent');

const authorize = req => {
  const code = req.query.code;

  console.log('(1) CODE:', code);

  const tokenURL = process.env.MASTODON_INSTANCE_URL + '/oauth/token';
  const profileURL =
    process.env.MASTODON_INSTANCE_URL + '/api/v1/accounts/verify_credentials';
  const opts1 = {
    client_id: process.env.MASTODON_CLIENT_KEY,
    client_secret: process.env.MASTODON_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.MASTODON_REDIRECT_URI,
    scopes: 'read:accounts',
  };

  return superagent
    .post(tokenURL)
    .type('form')
    .send(opts1)
    .then(response => {
      const token = response.body.access_token;
      console.log('(2) ACCESS TOKEN:', token);

      return superagent
        .get(profileURL)
        .set('Authorization', `Bearer ${token}`)
        .then(response => {
          const p = response.body;
          const profile = {
            created_at: p.created_at,
            picture: p.avatar,
            nickname: p.display_name,
            user_id: p.id,
            username: p.username,
          };
          console.log('(3) PROFILE:', profile);

          return profile;
        })
        .catch(console.error);
    });
};

const revoke = req => {
  const opts = {
    client_id: process.env.MASTODON_CLIENT_KEY,
    client_secret: process.env.MASTODON_CLIENT_SECRET,
  };
  const logoutURL = process.env.MASTODON_INSTANCE_URL + '/oauth/revoke';
  return superagent
    .post(logoutURL)
    .type('form')
    .send(opts)
    .then(response => response);
};

module.exports = { authorize, revoke };
