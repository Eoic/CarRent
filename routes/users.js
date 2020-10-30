const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { check, body, validationResult } = require('express-validator/check');

router.post('/login', (req, res) => {
    if (typeof req.body.username === 'undefined' || typeof req.body.password === 'undefined')
        return res.status(401).json({ errors: "Username or password was not provided." })

    const user = {
        username: req.body.username.trim(),
        password: req.body.password.trim()
    };

    User.findOne({
        username: user.username,
        is_verified: true
    }, (err, userObject) => {
        if (err)
            return res.status(500).json({ errors: ['An error has occurred. Please try again later.']})

        if (!userObject) {
            return res.status(404).json({ errors: ["Invalid username or password"]});
        }

        bcrypt.compare(user.password, userObject.password, (err, success) => {
            if (err || !success)
                res.status(401).json({
                    errors: ["Invalid username or password"]
                });
            else {
                const token = jwt.sign({
                    id: userObject._id,
                    username: userObject.username,
                    is_verified: userObject.is_verified,
                    is_admin: userObject.is_admin
                }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

                res.status(200).send({
                    auth: true,
                    token
                });
            }
        });
    }).catch(err => res.status(404).send("User not found."));
});

router.post('/register', [
    check('username')
        .isLength({ min: 3, max: 20 }).withMessage("Username too short.")
        .not().isEmpty().trim(),
    check('email')
        .isEmail().not().withMessage("Invalid email.")
        .isEmpty(),
    body('email')
        .custom(value => {
            return User.findOne({
                email: value
            }).then(user => {
                if (user)
                    return Promise.reject("Email is already in use.")
            });
        }),
    body('username')
        .custom(value => {
            return User.findOne({
                username: value
            }).then(user => {
                if (user)
                    return Promise.reject('Username already taken.');
            });
        }),
    check('passwordFirst')
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    check('passwordSecond', 'Passwords does not match.')
        .custom((value, { req }) => value === req.body.passwordFirst)
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    const user = {
        username: req.body.username.trim(),
        password: req.body.passwordFirst.trim(),
        email: req.body.email.trim()
    }

    User.create({
        username: user.username,
        password: user.password,
        email: user.email
    }).then(() => {
        res.sendStatus(200)
    });
});

router.get('/logout', function (_req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});

module.exports = router;