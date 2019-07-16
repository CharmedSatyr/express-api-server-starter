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
    redirect_uri: process.env.MASTODON_REDIRECT_URI,
    scopes: 'read:accounts',
  };

  return superagent
    .post('https://charmed.social/oauth/token')
    .type('form')
    .send(opts1)
    .then(response => {
      console.log('(2) RESPONSE: ', response);
      const token = response.body.access_token;
      console.log('(4) ACCESS TOKEN:', token);
      return (
        superagent
          .get('https://charmed.social/api/v1/accounts/verify_credentials')
          // .get('https://charmed.social/api/v1/admin/accounts/')
          .set('Authorization', `Bearer ${token}`)
          .then(info => {
            const profile = info.body;
            console.log('(5) PROFILE:', profile);
            return profile;
          })
      );
    })
    .catch(console.error);
};

module.exports = authorize;
