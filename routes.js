const router = require('express').Router();

//Our resource routes
(require('./routes/pages.js'))(router);


module.exports = router;