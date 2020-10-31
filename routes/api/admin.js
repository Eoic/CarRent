const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/users', (req, res) => {
    User.find()
        .select('username email is_verified is_admin')
        .where('_id')
        .ne(req.userId)
        .sort({ username: 1})
        .then(users => {
            res.json(users);
    }).catch(() => {
        res.json([])
    })
});

router.patch('/user/verification/:id', (req, res) => {
    if (req.is_admin) {
        User.findById(req.params.id).then(user => {
            user.is_verified = !user.is_verified
            user.save()
                .then(() => { return res.sendStatus(200)})
                .catch(() => { return res.sendStatus(404) })
        }).catch(err => {
            return res.sendStatus(404)
        })
    } else {
        res.sendStatus(401)
    }
})

router.patch('/user/type/:id', (req, res) => {
    if (req.is_admin) {
        User.findById(req.params.id).then(user => {
            user.is_admin = !user.is_admin
            user.save()
                .then(() => { return res.sendStatus(200)})
                .catch(() => { return res.sendStatus(404) })
        }).catch(err => {
            return res.sendStatus(404)
        })
    } else {
        res.sendStatus(401)
    }
})



module.exports = router