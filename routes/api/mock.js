const express = require('express');
const router = express.Router();

router.get('/mock', (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this secret message.",
        user: req.user
    });
});

module.exports = router;   