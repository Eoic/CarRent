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

// @route   GET api/rents
// @desc    Get single rent document.
// @access  Public.
router.get('/:id', (req, res) => {
    Rent.findById(req.params.id).then(response => {
        res.json(response);
    });
});

// @route   POST api/rents
// @desc    Add rent.
// @access  Public.

router.post('/', (req, res) => {

    Car.findById(req.body.carId).then(response => {
        const newRent = new Rent({
            carId: req.body.carId,
            regNumber: response.registrationNumber,
            value: req.body.price,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            addedAt: new Date(),
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            deposit: req.body.deposit
        });

        newRent.save().then(rent => res.json({}));
    });
});

module.exports = router;