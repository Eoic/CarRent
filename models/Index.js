const mongoose = require('mongoose');

module.exports.connect = (uri) => {
    mongoose.connect(uri, {
        useNewUrlParser: true
    });

    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });
}