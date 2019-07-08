const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrintSchema = new Schema({
    contractCount: {
        type: Number,
        default: 0
    },
    invoiceCount: {
        type: Number,
        default: 0
    }
}, { capped: { size: 4096, max: 1 } });

module.exports = Print = mongoose.model('print', PrintSchema);