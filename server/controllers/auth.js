'use strict';

exports.login = (req, res) => {
  res.status(200).render('login', { title: 'Login' });
};

exports.user = (req, res) => {
  res.status(200).render('user', { title: 'User Profile', user: 'toad' });
};
