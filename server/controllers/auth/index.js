'use strict';

// User Profile
exports.user = (req, res) => {
  res
    .status(200)
    .render('user', { title: 'User Profile', user: req.session.user });
};
