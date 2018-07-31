const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({

    // Car info.
    carId: String,
    regNumber: String,

    // Rent info.
    value: Number,
    startDate: String,
    endDate: String,
    addedAt: Date,

    // Customer.
    name: String,
    surname: String,
    phone: String,

    // Misc.
    deposit: Boolean
});

module.exports = Rent = mongoose.model('rent', RentSchema);