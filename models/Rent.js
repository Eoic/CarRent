const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({
    carId: String,
    value: Number,
    startDate: String,
    endDate: String
});

module.exports = Rent = mongoose.model('rent', RentSchema);