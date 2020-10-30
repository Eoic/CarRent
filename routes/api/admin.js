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
    })
});


module.exports = router