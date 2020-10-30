const mongoose = require('mongoose');

const build_uri = (user, password, database) => {
    return `mongodb+srv://${user}:${password}@cluster0.wrphj.mongodb.net/${database}?retryWrites=true&w=majority`
}

module.exports.connect = () => {
    const uri = build_uri(process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME)

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    mongoose.Promise = global.Promise;

    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });
}