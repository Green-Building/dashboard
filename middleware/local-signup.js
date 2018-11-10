const db = require('../models');
const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
    user_type: req.body.user_type.trim(),
  };

  return db.user.create(userData)
  .then(user => {
    done(null);
  })
  .catch(err => {
    return done(err);
  })
});