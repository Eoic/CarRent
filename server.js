const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const helmet = require('helmet')

// API routes.
const cars = require('./routes/api/cars');
const expenses = require('./routes/api/expenses');
const users = require('./routes/users');
const rents = require('./routes/api/rents');
const turnover = require('./routes/api/turnover');
const admin = require('./routes/api/admin')

// Authorize user.
const verifyToken = require('./routes/verifyToken');

// Load environment variables (development only)
if (process.env.NODE_ENV === 'development')
    require('dotenv').config()

// Connect to MongoDB.
require('./models/Index').connect();

// Middleware
app.use(helmet())
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

// Use routes.
app.use('/api', verifyToken);

app.use('/', users);
app.use('/api/cars', cars);
app.use('/api/expenses', expenses);
app.use('/api/rents', rents);
app.use('/api/turnover', turnover);
app.use('/api/admin', admin)

// Serve static assets if in production.
if(process.env.NODE_ENV === 'production'){
    
    //Set static folder.
    app.use(express.static('client/build'));
    
    app.get('*', (_req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => { 
    console.log(`Server started on port ${port}`)
});
