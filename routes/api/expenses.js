const express = require('express');
const router = express.Router();

// Expense model.
const Expense = require('../../models/Expense');

// @route   DELETE api/cars/:id
// @desc    Delete a car.
// @access  Public.

router.get('/:id', (req, res) => {
    /*
    Expense.findById(req.params.id).then(car => car.remove().then(() => res.json({
        success: true
    }))).catch(err => res.status(404).json({
        success: false
    }));
    */
});

module.exports = router;
