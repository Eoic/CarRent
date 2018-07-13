const express = require('express');
const router = express.Router();

// Car model.
const Car = require('../../models/Car');

// @route   GET api/cars
// @desc    Get cars.
// @access  Public.

router.get('/', (req, res) => {
    Car.find().sort({
        date: -1
    }).then(cars => {
        res.json(cars);
    });
});

// @route   GET api/cars
// @desc    Get car by id.
// @access  Public.

router.get('/:id', (req, res) => {
    Car.findById(req.params.id).then(response => {
        res.json(response);
    });
});

// @route   POST api/cars
// @desc    Create a car.
// @access  Public.

router.post('/', (req, res) => {
    const newCar = new Car({
        model: req.body.model,
        registrationNumber: req.body.registrationNumber,
        status: req.body.status
    });

    newCar.save().then(car => res.json(car));
});

// @route   PUT api/cars/:id
// @desc    Update car info.
// @access  Public.
    
router.put('/', (req, res) => {
    Car.findByIdAndUpdate(req.body.id, {
        model: req.body.model,
        registrationNumber: req.body.registrationNumber
    }).then(response => {
        res.json(response);
    });
});

// @route   DELETE api/cars/:id
// @desc    Delete a car.
// @access  Public.

router.delete('/:id', (req, res) => {
    Car.findById(req.params.id).then(car => car.remove().then(() => res.json({
        success: true
    }))).catch(err => res.status(404).json({
        success: false
    }));
});

module.exports = router;
