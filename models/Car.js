const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    model: String,
    registrationNumber: String,
    color: {
        type: String,
        default: "#000000"
    },
    isRented: {
        type: Boolean,
        default: false
    }
});

module.exports = Car = mongoose.model('car', CarSchema);
