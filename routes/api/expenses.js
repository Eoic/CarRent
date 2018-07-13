const express = require('express');
const router = express.Router();

// Expense model.
const Expense = require('../../models/Expense');

// @route   GET api/expenses/:id
// @desc    Get all car expenses.
// @access  Public.

router.get('/:id', (req, res) => {
    Expense.find({
        'carId': req.params.id
    }).then(response => {
        res.json(response);
    }).catch(err => {
        console.log(err);
    })
});

// @route   POST api/expenses/:id
// @desc    Add cost for car with id.
// @access  Public.

router.post('/', (req, res) => {
    const newCost = new Expense({
        carId: req.body.carId,
        value: req.body.value,
        details: req.body.details
    });

    newCost.save().then(cost => res.json(cost));
});

// @route   DELETE api/expenses/:id
// @desc    Delete cost from car with id.
// @access  Public.

router.delete('/:id', (req, res) => {
    Expense.findByIdAndRemove(req.params.id).then(response => {
        console.log(response);
    }).catch(err => {
        console.log(err);
    });
});

module.exports = router;
