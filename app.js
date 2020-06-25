const express = require('express');
const app = express();
require('dotenv').config();

const path = require('path');

//set our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/css', express.static('assets/css')); 
app.use('/javaScript', express.static('assets/javaScript'));
app.use('/iamges', express.static('assets/iamges'));

// mongo access 
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser:true,
    useUnifiedTopology: true
}).catch(err => console.error(`ERROR: ${err}`));

//Implements Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Setup our session
const session = require('express-session');
app.use(session({
    secret: 'any salty secret here',
    resave: true,
    saveUninitialized: false,
}));

//Setup flash notification
const flash = require('connect-flash');
app.use(flash());
app.use('/', (req, res, next) => {
    //setting default locals
    res.locals.pageTitle = "Untitled";

    //console.log(flash());
    
    // Passing along flash messages
    res.locals.flash = req.flash();
    res.locals.formData = req.session.formData || {};
    req.session.formData = {};
    console.log(res.locals.flash);

    next();
});

// our routes
const routes = require('./routes.js');
app.use('/',routes);

//start up our server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(
    `Listening on port ${port}`));

 