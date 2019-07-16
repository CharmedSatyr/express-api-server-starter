'use strict';

const superagent = require('superagent');

const authorize = req => {
  const code = req.query.code;
  console.log('(1) CODE:', code);

  const opts1 = {
    client_id: process.env.MASTODON_CLIENT_KEY,
    client_secret: process.env.MASTODON_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    scopes: 'read:accounts',
  };

  return superagent
    .post('https://charmed.social/oauth/token')
    .type('form')
    .send(opts1)
    .then(response => {
      const token = response.body.access_token;
      console.log('(2) ACCESS TOKEN:', token);
      // const profileUrl = 'https://charmed.social/api/v1/accounts/verify_credentials';
      const profileUrl = 'https://charmed.social/api/v1/admin/accounts';
      return superagent
        .get(profileUrl)
        .set('Authorization', `Bearer ${token}`)
        .then(info => {
          console.log('(3) INFO: ', info);
          const profile = info.body;
          console.log('(4) PROFILE:', profile);
          return profile;
        });
    })
    .catch(console.error);
};

module.exports = authorize;
