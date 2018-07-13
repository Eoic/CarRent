const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    carId: {
        type: String
    },
    value: {
        type: Number
    },
    details: {
        type: String
    },
    added: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);
