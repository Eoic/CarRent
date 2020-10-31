const mongoose = require('mongoose');

const build_uri = (user, password, database, srv, url, queryParams) => {
    let uri = `mongodb${srv === 'true' ? '+srv' : ''}://${user}:${password}@${url}/${database}`

    if (typeof(queryParams) !== 'undefined' && String(queryParams).trim() !== '')
        uri = `${uri}?${queryParams}`

    return uri
}

module.exports.connect = () => {
    const uri = build_uri(process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME, process.env.DB_SRV, process.env.DB_URL, process.env.DB_PARAMS)

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