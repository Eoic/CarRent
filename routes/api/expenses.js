const express = require('express');
const router = express.Router();
const moment = require('moment');

const EXPENSES_PER_PAGE = 10

// Expense model.
const Expense = require('../../models/Expense');

// @route   GET api/expenses/
// @desc    Get expenses from all cars.
// @access  Public.

router.get('/', (req, res) => {
    Expense.find().then(costs => {
        res.json(costs);
    }).catch(err => res.json(err));
});

// @route   GET api/expenses/:id
// @desc    Get all car expenses.
// @access  Public.

router.get('/:id', (req, res) => {

    const page = (req.query.page < 1 ? 0 : req.query.page - 1);

    Expense.aggregate([{
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
        Expense.countDocuments({
            carId: req.params.id
        }).then(totalExpensesCount => {
            Expense.find({
                'carId': req.params.id
            }).skip(page * EXPENSES_PER_PAGE).limit(EXPENSES_PER_PAGE).sort({
                addedAt: -1
            }).then(response => {
                res.json({
                    response,
                    sum: (sum.length === 0 || err) ? 0 : sum[0].total,
                    size: totalExpensesCount
                });
            });
        })
    });
});

// @route   POST api/expenses/:id
// @desc    Add cost for car with id.
// @access  Public.

router.post('/', (req, res) => {
    const newCost = new Expense({
        carId: req.body.carId,
        value: req.body.value,
        details: req.body.details,
        added: moment(Date.now()).locale('lt').format('YYYY/MM/DD HH:mm:ss'),
        addedAt: new Date()
    });

    newCost.save().then(cost => res.json(cost)).catch(err => {
        res.status(400).send("Failed to add cost. ");
    });
});

// @route   DELETE api/expenses/:id
// @desc    Delete cost from car with id.
// @access  Public.

router.delete('/:id', (req, res) => {
    Expense.findByIdAndRemove(req.params.id).then(response => {
        res.json(response)
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;