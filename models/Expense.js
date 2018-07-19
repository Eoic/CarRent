const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

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
        type: String,
        default: moment().locale('lt').format('LLL')
    }
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);