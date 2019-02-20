const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({

    // Car info.
    carId: String,
    regNumber: String,

    // Rent info.
    value: {
        type: String,
        default: 0
    },
    startDate: Date,
    endDate: Date,
    addedAt: Date,

    // Customer.
    name: String,
    surname: String,
    phone: String,
    address: String,

    // Misc.
    notes: String,
    deposit: Boolean,
    odometer: {
        type: Number,
        default: 0
    }
});

module.exports = Rent = mongoose.model('rent', RentSchema);