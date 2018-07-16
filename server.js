// [ npm run dev ]
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cars = require('./routes/api/cars');
const expenses = require('./routes/api/expenses');
const logs = require('./routes/api/logs');
const path = require('path');

const app = express();

// Body parser middleware.
app.use(bodyParser.json());

// DB config.
const db = require('./config/keys').mongoURI;
 
// Connect to MongoDB.
mongoose.connect(db).then(() => {
    console.log('MongoDB connected.');
}).catch(err => console.log(err));

// Use routes.
app.use('/api/cars', cars);
app.use('/api/expenses', expenses);
app.use('/api/logs', logs);

app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
});

// Serve static assets if in production.
if(process.env.NODE_ENV === 'production'){
    //Set static folder.
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => { 
    console.log(`Server started on port ${port}`)
});
