const express = require('express');
const router = express.Router();

// Log model.
const Log = require('../../models/Log');

// Log types.
const Types = Object.freeze({
    'INCOME':   1,
    'COST':     2,
    'OTHER':    3
});

module.exports = router;
