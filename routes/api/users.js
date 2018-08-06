const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret, expiresIn } = require('../../config/index');

router.post('/login', (req, res) => {

    const user = {
        username: req.body.username.trim(),
        password: req.body.password.trim()
    };

    User.findOne({
        username: user.username
    }, (err, userObject) => {
        if (err)
            return res.status(500).send("Server error.");

        if (!userObject)
            return res.status(404).send("User not found.");

        bcrypt.compare(user.password, userObject.password, (err, success) => {
            if (err || !success)
                res.status(401).send("Invalid password.");
            else {
                const token = jwt.sign({
                    id: userObject._id
                }, jwtSecret, {
                    expiresIn: expiresIn
                });

                res.status(200).send({
                    auth: true,
                    token
                });
            }
        });
    }).catch(err => res.status(404).send("User not found."));
});

router.post('/register', (req, res) => {

    const user = {
        username: req.body.username.trim(),
        password: req.body.password.trim(),
        email: req.body.email.trim()
    }

    User.create({
        username: user.username,
        password: user.password,
        email: user.email
    }).then((response) => {
        const token = jwt.sign({
            id: response._id
        }, jwtSecret, {
            expiresIn: expiresIn
        });

        res.json({
            auth: true,
            token
        });
    });
});

router.get('/profile', (req, res) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: "Failed to authenticate user."
            });
        }

        User.findById(decoded.id, {
            password: 0
        }, (err, user) => {
            if (err)
                return res.status(500).send("There was a problem finding the user.");

            if (!user)
                return res.status(404).send("User not found.");

            res.status(200).send(user);
        });
    });
});

module.exports = router;