const express = require('express');
const router = express.Router();

// Rent model.
const Rent = require('../../models/Rent');
const Car = require('../../models/Car');

const ACTIVE_LIMIT = 20;
const RESERVED_LIMIT = 20;
const ENDED_LIMIT = 10;

// @route   GET api/rents
// @desc    Get rents.
// @access  Public.

router.get('/', (req, res) => {
    Promise.all([
        Rent.find({
            'endDate': {
                '$gt': new Date()
            },
            'startDate': {
                '$lte': new Date()
            }
        }).countDocuments(),
        Rent.find({
            'endDate': {
                '$gt': new Date()
            },
            'startDate': {
                '$lte': new Date()
            }
        }).skip((req.query.page - 1) * ACTIVE_LIMIT).limit(ACTIVE_LIMIT).sort('endDate'),

    ]).then(([size, activeRents]) => {
        res.json({
            rents: activeRents,
            size
        });
    }).catch(err => {
        res.json(err);
    });
});


router.get('/times-rented', (req, res) => {

    const currentYear = new Date().getFullYear();

    Rent.find().where({
        'carId': req.query.carId,
        'startDate':    { '$gte': new Date(currentYear, 0, 1)  },
        'endDate':      { '$lte': new Date(currentYear, 12, 0) }
    }).countDocuments().then(result => {
        res.json({ count: result });
    }).catch(err => res.jon(err));
});

router.get('/reserved', (req, res) => {
    Promise.all([
        Rent.find({
            'startDate': {
                '$gt': new Date()
            }
        }).countDocuments(),
        Rent.find({
            'startDate': {
                '$gt': new Date()
            }
        }).skip((req.query.page - 1) * RESERVED_LIMIT).limit(RESERVED_LIMIT).sort('startDate')
    ]).then(([size, reservedRents]) => {
        res.json({
            reservedRents,
            size
        });
    }).catch(err => {
        res.json(err);
    });
});

router.get('/ended', (req, res) => {
    Promise.all([
        Rent.find({
            'endDate': {
                '$lt': new Date()
            }
        }).countDocuments(),
        Rent.find({
            'endDate': {
                '$lt': new Date()
            }
        }).skip((req.query.page - 1) * ENDED_LIMIT).limit(ENDED_LIMIT).sort('-endDate')
    ]).then(([size, endedRents]) => {
        res.json({
            endedRents,
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