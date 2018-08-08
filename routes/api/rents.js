const express = require('express');
const router = express.Router();

// Rent model.
const Rent = require('../../models/Rent');
const Car = require('../../models/Car');

const moment = require('moment');

const LIMIT = 20;

// @route   GET api/rents
// @desc    Get rents.
// @access  Public.

router.get('/', (req, res) => {
    Promise.all([
        Rent.countDocuments(),
        Rent.find().sort('-addedAt').skip((req.query.page - 1) * LIMIT).limit(LIMIT)
    ]).then(([size, rents]) => {

        const activeRents = rents.filter(rent => {
            return (moment(rent.endDate).isBefore(moment())) ? false : true
        });

        res.json({
            rents: activeRents,
            size
        });
    }).catch(err => {
        res.json(err);
    });
});

router.put('/', (req, res) => {
    Rent.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        surname: req.body.surname,
        value: req.body.value,
        phone: req.body.phone,
        deposit: req.body.deposit,
        odometer: req.body.odometer
    }).then(response => {
        res.json(response);
    }).catch(err => 
        res.json(err)
    );
});

router.delete('/', (req, res) => {
    Rent.findByIdAndRemove(req.query.id).then(response => {
        res.json(response);
    }).catch(err => res.json(err));
});

router.put('/cancel/:id', (req, res) => {
    Rent.findByIdAndUpdate(req.params.id, {
        endDate: new Date()
    }).then(response => {
        res.json(response);
    }).catch(err => {
        res.json(err);
    });
});

router.get('/income/:id', (req, res) => {
    Rent.aggregate([{
        $match: {
            carId: req.params.id
        }
    }, {
        $group: {
            _id: null,
            total: {
                $sum: "$value"
            }
        }
    }], function (err, sum) {
        res.json({
            sum: (sum.length === 0) ? 0 : sum[0].total
        });
    });
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
            deposit: req.body.deposit,
            odometer: req.body.odometer
        });

        newRent.save().then(rent => res.json({}));
    });
});

module.exports = router;