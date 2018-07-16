const express = require('express');
const router = express.Router();

// Car model.
const Log = require('../../models/Log');

// @route   GET api/logs
// @desc    Get logs.
// @access  Public.

router.get('/', (req, res) => {
    Log.find().sort({
        date: -1
    }).then(cars => {
        res.json(logs);
    });
});

// @route   GET api/logs
// @desc    Get log by id.
// @access  Public.

router.get('/:id', (req, res) => {
    Log.findById(req.params.id).then(response => {
        res.json(response);
    });
});

// @route   POST api/logs
// @desc    Create a log.
// @access  Public.

router.post('/', (req, res) => {
    const newLog = new Log({
        type: req.body.type,
        details: req.body.details,
        value: req.body.value
    });

    newLog.save().then(log => res.json(log));
});

module.exports = router;
