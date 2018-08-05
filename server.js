const express = require('express');
const bodyParser = require('body-parser');

// API.
const cars = require('./routes/api/cars');
const expenses = require('./routes/api/expenses');
const users = require('./routes/api/users');
const rents = require('./routes/api/rents');
const turnover = require('./routes/api/turnover');

const path = require('path');
const session = require('express-session');
const passport = require('passport');
const config = require('./config');
const app = express();

require('./models/Index').connect(config.dbUri);

// Middleware
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));

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

// Use routes.
app.use('/api/cars', cars);
app.use('/api/expenses', expenses);
app.use('/api/users', users);
app.use('/api/rents', rents);
app.use('/api/turnover', turnover);

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
