const express = require('express');
const router = express.Router();

// Rent model.
const Rent = require('../../models/Rent');


// @route   GET api/rents
// @desc    Get rents.
// @access  Public.

router.get('/', (req, res) => {
    Rent.find().sort({
        date: -1
    }).then(rents => {
        res.json(rents);
    }).catch(err => res.json(err));
});

// @route   POST api/rents
// @desc    Add rent.
// @access  Public.

router.post('/', (req, res) => {
    const newRent = new Rent({
        carId: req.body.carId,
        value: req.body.value,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }); 

    newRent.save().then(rent => res.json(rent));
});

module.exports = router;