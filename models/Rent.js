const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({

    // Car info.
    carId: String,
    regNumber: String,

    // Rent info.
    value: Number,
    startDate: Date,
    endDate: Date,
    addedAt: Date,

    // Customer.
    name: String,
    surname: String,
    phone: String,

    // Misc.
    deposit: Boolean,

    odometer: {
        type: Number,
        default: 0
    }
});

module.exports = Rent = mongoose.model('rent', RentSchema);