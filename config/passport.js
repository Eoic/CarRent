const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../models/User');
const config = require('../config/index');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

const strategy = new JwtStrategy(options, (payload, next) => {
    User.forge({
        id: payload.id
    }).fetch().then(res => {
        next(null, res);
    });
});

passport.use(strategy);

module.exports = passport;