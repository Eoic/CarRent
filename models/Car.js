const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    model: {
        type: String
    },
    registrationNumber: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = Car = mongoose.model('car', CarSchema);
