const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    model: String,
    registrationNumber: String,
    isRented: {
        type: Boolean,
        default: false
    }
});

module.exports = Car = mongoose.model('car', CarSchema);
