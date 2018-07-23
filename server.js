const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cars = require('./routes/api/cars');
const expenses = require('./routes/api/expenses');
const users = require('./routes/api/users');
const logs = require('./routes/api/logs');
const mock = require('./routes/api/mock');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const expressValidator = require('express-validator');
const config = require('./config');

require('./models').connect(config.dbUri);

const app = express();

// Middleware
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); 

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Passport strategies.
const localRegisterStrategy = require('./passport/local-register');
const localLoginStrategy = require('./passport/local-login')

passport.use('local-register', localRegisterStrategy);
passport.use('local-login', localLoginStrategy);

// Auth check middleware.
//const authCheckMiddleware = require('./middleware/auth-check');

// Use routes.
app.use('/api/cars', cars);
app.use('/api/expenses', expenses);
app.use('/api/logs', logs);
app.use('/api/users', users);

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
