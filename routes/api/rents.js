const express = require('express');
const router = express.Router();

// Rent model.
const Rent = require('../../models/Rent');
const Car = require('../../models/Car');

const LIMIT = 10;

// @route   GET api/rents
// @desc    Get rents.
// @access  Public.

router.get('/', (req, res) => {
    Promise.all([
        Rent.countDocuments(),
        Rent.find().sort('-addedAt').skip((req.query.page - 1) * LIMIT).limit(LIMIT)
    ]).then(([size, rents]) => {
        res.json({
            rents,
            size
        });
    }).catch(err => { res.json(err); });
});

// @route   POST api/rents
// @desc    Add rent.
// @access  Public.

router.post('/', (req, res) => {

    Car.findById(req.body.carId).then(response => {

        const newRent = new Rent({
            carId: req.body.carId,
            regNumber: response.registrationNumber,
            value: req.body.value,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            addedAt: Date.now()
        });

        newRent.save().then(rent => res.json({}));
    });
});

module.exports = router;