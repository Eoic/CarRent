const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');

module.exports = new PassportLocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, username, password, done) => {

    const userData = {
        username: username.trim(),
        password: password.trim()
    };

    return User.findOne({
        username: userData.username
    }, (err, user) => {
        if (err)
            return done(err);

        if (!user) {
            const error = new Error('Incorrect username or password');
            error.name = 'IncorrectCredentialsError';

            return done(error);
        }

        return user.comparePassword(userData.password, (passwordErr, isMatch) => {
            if (err)
                return done(err);

            if (!isMatch) {
                const error = new Error('Incorrect username or password');
                error.name = 'IncorrectCredentialsError';

                return done(error);
            }

            const payload = {
                sub: user._id
            };

            // Create token string.
            const token = jwt.sign(payload, config.jwtSecret);
            
            const data = {
                username: user.username
            };

            return done(null, token, data);
        });
    });
});