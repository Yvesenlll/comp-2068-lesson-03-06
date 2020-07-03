const User = require('../models/user');
const viewPath = 'sessions';
const passport = require('passport');

exports.new = (req, res) => {
    res.render(`${viewPath}/new`, {
        pageTitle: 'Login'
    });
};

exports.create = (req, res, next) => {
    passport.authenticate ('local', {
        successRedirect: '/blogs',
        successFlash:'You are successfully logged in.',
        failureRedirect: '/login',
        failureFlash: 'Invalidate credentials',
    })(req, res, next);
}; 

exports.delete = (req, res) => {
    req.logout();
    req.flash('success', 'You were logged out successfully.');
    res.redirect('/');
}


