'use strict';

const superagent = require('superagent');

const authorize = req => {
  const code = req.query.code;

  console.log('(1) CODE:', code);

  const tokenURL = 'https://charmed.social/oauth/token';
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
      return superagent.get(
        'https://charmed.social/api/v1/accounts/verify_credentials',
        { headers: { Authorization: `Bearer ${token}` } },
        function(err, res1, body) {
          if (err) {
            throw new Error(err);
          }

          if (res1.statusCode !== 200) {
            throw new Error('statusCode: ', res1.statusCode);
          }

          const parsed = JSON.parse(body);
          console.log('(3) PARSED:', parsed);

          const profile = {
            created_at: parsed.created_at,
            picture: parsed.avatar,
            nickname: parsed.display_name,
            user_id: parsed.id,
            username: parsed.username,
          };
          console.log('(4) PROFILE:', profile);

          return profile;
        }
      );
    });
};

module.exports = authorize;
