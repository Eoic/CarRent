const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// User model.
const User = require('../../models/User');

router.post('/register', (req, res) => {
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Not an email').isEmail();
    req.checkBody('passwordFirst', 'Password is required').notEmpty();
    req.checkBody('passwordFirst', 'Password too short').len(5, 100);
    req.checkBody('passwordSecond', 'Passwords do not match').equals(req.body.passwordFirst);

    var errors = req.validationErrors();

    if (errors) {
        res.json({
            errors: errors
        });
    } else {
        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.passwordFirst
        });

        User.createUser(newUser, function (err, user) {
            if (err) throw err;
            console.log(user);
        });

        res.json({});
    }
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err)
                throw err;

            if (!user) {
                return done(null, false, {
                    message: 'Unknown user.'
                });
            }

            User.comparePasswords(password, user.password, function (err, isMatch) {
                if (err)
                    throw err;

                if (isMatch)
                    return done(null, user);
                else
                    return done(null, false, {
                        message: 'Invalid password'
                    });
            })
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local'),

    function (req, res) {
        res.json({});
    });

router.get('/logout', function(req, res){
    req.logout();
});

module.exports = router;