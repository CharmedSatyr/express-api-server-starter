'use strict';

const mastoURL = 'https://charmed.social/oauth/authorize';

const options = {
  client_id: 'HY_q7kf5G1UtdMMq5kniprDZgwR4D9XvomIKz2vy5_o',
  redirect_uri: 'http://127.0.0.1:3000/skallback', // urn:ietf:wg:oauth:2.0:oob',
  response_type: 'code',
  scope: 'read:accounts',
};

const queryString = Object.keys(options)
  .map(key => {
    return key + '=' + encodeURIComponent(options[key]);
  })
  .join('&');

console.log('queryString:', queryString);

const authURL = mastoURL + '?' + queryString;

const loginbutton = document.getElementById('login');
loginbutton.innerHTML += `<div><a href='${authURL}'>Login with Mastodon</a></div>`;
