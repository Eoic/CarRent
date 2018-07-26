const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({
    carId: String,
    regNumber: String,
    value: Number,
    startDate: String,
    endDate: String,
    addedAt: Date
});

module.exports = Rent = mongoose.model('rent', RentSchema);