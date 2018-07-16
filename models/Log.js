const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    type: {
        type: String
    },
    details: {
        type: String
    },
    value: {
        type: Number
    }
});

module.exports = Log = mongoose.model('log', LogSchema);
