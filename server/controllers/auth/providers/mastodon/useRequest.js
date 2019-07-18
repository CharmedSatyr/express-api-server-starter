'use strict';

const request = require('request');

const authorize = req => {
  const code = req.query.code;

  console.log('(1) CODE:', code);

  const tokenURL = process.env.MASTODON_INSTANCE_URL + '/oauth/token';
  const profileURL =
    process.env.MASTODON_INSTANCE_URL + '/api/v1/accounts/verify_credentials';

  const opts = {
    client_id: process.env.MASTODON_CLIENT_KEY,
    client_secret: process.env.MASTODON_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: process.env.MASTODON_REDIRECT_URI,
    scopes: 'read:accounts',
  };

  return new Promise((resolve, reject) => {
    request.post({ url: tokenURL, formData: opts }, (err, h, b) => {
      if (err) {
        reject(err);
      }

      const token = JSON.parse(b).access_token;
      console.log('(2) ACCESS TOKEN:', token);

      return request.get(
        profileURL,
        { headers: { Authorization: `Bearer ${token}` } },
        (e, res, body) => {
          if (e) {
            reject(e);
          }

          if (res.statusCode !== 200) {
            reject(`statusCode: ${res.statusCode}`);
          }

          const parsed = JSON.parse(body);
          const profile = {
            created_at: parsed.created_at,
            picture: parsed.avatar,
            nickname: parsed.display_name,
            user_id: parsed.id,
            username: parsed.username,
          };
          console.log('(3) PROFILE:', profile);

          resolve(profile);
        }
      );
    });
  });
};

const revoke = req => {
  const opts = {
    client_id: process.env.MASTODON_CLIENT_KEY,
    client_secret: process.env.MASTODON_CLIENT_SECRET,
  };
  const logoutURL = process.env.MASTODON_INSTANCE_URL + '/oauth/revoke';

return new Promise((resolve, reject) => {
  request.post({ url: logoutURL, formData: opts }, (err, h, b) => {
    if (err) {
      reject(err);
    }
    const body = JSON.parse(b);
    resolve(body);
  })
});
}
module.exports = { authorize, revoke };
