const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { check, body, validationResult} = require('express-validator/check');
const { jwtSecret, expiresIn } = require('../config/index');

router.post('/login',(req, res) => {
    const user = {
        username: req.body.username.trim(),
        password: req.body.password.trim()
    };

    User.findOne({
        username: user.username
    }, (err, userObject) => {
        if (err)
            return res.status(500).send("Server error.");

        if (!userObject){
            return res.status(404).json({
                errors: ["Invalid username or password"]
            });
        }

        bcrypt.compare(user.password, userObject.password, (err, success) => {
            if (err || !success)
                res.status(401).send("Invalid password.");
            else {
                const token = jwt.sign({
                    id: userObject._id,
                    username: userObject.username
                }, process.env.JWT_SECRET || jwtSecret, {
                    expiresIn: process.env.JWT_EXPIRES || expiresIn
                });

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
                if(user)
                    return Promise.reject("Email is already in use.")
            });
        }),
    body('username')
        .custom(value => {
            return User.findOne({
                username: value
            }).then(user => {
                if(user)
                    return Promise.reject('Username already taken.');
            });
        }),
    check('passwordFirst')
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
    check('passwordSecond', 'Passwords does not match.')
        .custom((value, { req }) => value === req.body.passwordFirst)
], (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty())
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
    }).then((response) => {
        const token = jwt.sign({
            id: response._id
        }, process.env.JWT_SECRET || jwtSecret, {
            expiresIn: process.env.JWT_EXPIRES || expiresIn
        });

        res.json({
            auth: true,
            token
        });
    });
});

router.get('/logout', function (_req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});

module.exports = router;