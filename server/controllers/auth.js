'use strict';

exports.user = (req, res) => {
  res.status(200).render('user', { title: 'User Profile', user: 'toad' });
};
