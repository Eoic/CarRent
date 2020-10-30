const mongoose = require('mongoose');

const build_uri = (user, password, database, srv, url, queryParams) => {
    let uri = `mongodb${process.env.DB_SRV === 'true' ? '+srv' : ''}://${user}:${password}@${url}/${database}`

    if (String(process.env.DB_PARAMS).trim())
        uri = `uri${process.env.DB_PARAMS}`

    return uri
}

module.exports.connect = () => {
    const uri = build_uri(process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME, false, process.env.DB_URL, process.env.DB_PARAMS)

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