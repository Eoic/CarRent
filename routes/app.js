const express = require('express');
const router = express.Router();

router.get('/name', (req, res) => {
    const appName = process.env.APP_NAME

    if (typeof(appName) !== "undefined" && String(appName).trim() !== '')
        return res.json({ appName })

    return res.json({ appName: '' })
});

module.exports = router