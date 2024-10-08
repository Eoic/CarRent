const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Rent model.
const Rent = require('../../models/Rent');
const Car = require('../../models/Car');
const Print = require('../../models/Print');

const QueryBuilder = require('../../utils/query-builder');
const PrintPrefix = require('../../utils/print-prefix');

const ACTIVE_LIMIT = 20;
const RESERVED_LIMIT = 20;
const ENDED_LIMIT = 10;
const FILTER_RENTS_PER_PAGE = 15;

// Get all active and reserved rents.
router.get('/monthly', (_req, res) => {
    Promise.all([
        Rent.aggregate([{
            $match: {
                'endDate': { '$gt': new Date() }
            },
        },
        {
            $lookup: {
                from: 'cars',
                localField: 'carId',
                foreignField: '_id',
                as: 'carInfo'
            }
        },
        {
            $project: {
                _id: 1,
                carId: 1,
                color: 1,
                "color": "$carInfo.color",
                'title': '$regNumber',
                'start': '$startDate',
                'end': '$endDate'
            }
        }])
    ]).then(([activeRents]) => {
        res.json({ activeRents });
    }).catch(err => {
        res.json(err);
    });
});

// Get rents by given filter
router.post('/filter', (req, res) => {
    const tableSize = req.query.tableSize
    let queryBuilder = new QueryBuilder(req.body);
    let page = req.query.page;

    if (page === null)
        return res.json({ rents: {} });

    if (page <= 0)
        return res.json({ rents: {} });

    page = (req.query.page < 1 ? 0 : req.query.page - 1);

    queryBuilder.greaterThan("startDate", "startDate", true);
    queryBuilder.lessThan("endDate", "endDate", true);
    queryBuilder.range(true, true, "addedAt", "dateAddedFrom", "dateAddedTo");
    queryBuilder.matchWithException("Any", "deposit")
    queryBuilder.matchWithException("Any", "paymentType")
    queryBuilder.like("phone");
    queryBuilder.like("name", "firstName");
    queryBuilder.like("surname", "lastName");
    queryBuilder.like("address");
    filter = queryBuilder.getQueryObject();

    Promise.all([
        Rent.countDocuments(filter),
        Rent.find(filter).skip(page * tableSize).limit(parseInt(tableSize)).sort({ startDate: -1 })
    ]).then(([size, rents]) => {
        res.json({ rents, size })
    }).catch(err => console.log(err));
});

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
            activeRents: activeRents,
            size
        });
    }).catch(err => {
        res.json(err);
    });
});

router.get('/times-rented', (req, res) => {
    Rent.find().where({
        'carId': req.query.carId
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
        odometer: req.body.odometer,
        address: req.body.address,
        notes: req.body.notes
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
            carId: mongoose.Types.ObjectId(req.params.id)
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
    Promise.all([
        Car.findById(req.body.carId),
        Print.findOneAndUpdate({}, { $inc: { contractCount: 1, invoiceCount: 1 } })
    ]).then(([car, printCounter]) => {
        const newRent = new Rent({
            carId: req.body.carId,
            regNumber: car.registrationNumber,
            value: req.body.price,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            addedAt: new Date(),
            name: req.body.name,
            surname: req.body.surname,
            phone: req.body.phone,
            deposit: req.body.deposit,
            odometer: req.body.odometer,
            address: req.body.address,
            notes: req.body.notes,
            paymentType: req.body.paymentType,
            contractId: `${PrintPrefix.contract}${printCounter.contractCount}`,
            invoiceId: `${PrintPrefix.invoice}${printCounter.invoiceCount}`
        });

        newRent.save().then(rent => res.json(rent));
    });
});

/*

*/

module.exports = router;