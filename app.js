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

// our routes
const routes = require('./routes.js');
app.use('/',routes);

//start up our server
app.listen(process.env.PORT || 3000, port => console.log(
    `Listening on port ${port}`));

