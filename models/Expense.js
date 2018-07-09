const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    quantity: {
        type: Number
    },
    value: {
        type: Number
    },
    description: {
        type: String
    }
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);
