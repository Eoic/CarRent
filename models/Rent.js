const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RentSchema = new Schema({

    // Car info.
    carId: Schema.Types.ObjectId,
    regNumber: String,

    // Rent info.
    value: {
        type: Number,
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
    paymentType: Schema.Types.String,
    odometer: {
        type: Number,
        default: 0
    },

    // Printing
    contractId: String,
    invoiceId: String
});

module.exports = Rent = mongoose.model('rent', RentSchema);