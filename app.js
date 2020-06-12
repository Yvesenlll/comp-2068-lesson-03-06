const express = require('express');
const app = express();

const path = require('path');

//set our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// our routes
const routes = require('./routes.js');
app.use('/',routes);

//start up our server
app.listen(process.env.PORT || 3000, port => console.log(
    `Listening on port ${port}`));

