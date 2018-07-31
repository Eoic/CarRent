const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    carId: String,
    value: Number,
    details: String,
    added: String,
    addedAt: Date
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);