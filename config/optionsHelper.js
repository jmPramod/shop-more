
const session = require('express-session');

const Handlebars = require('handlebars');

// Register a Handlebars helper

const globalStorage = function (req, res, next) {
    res.locals.Success_msg = req.flash('Success_msg');
    res.locals.Error_msg = req.flash('Error_msg');
    res.locals.Warning_msg = req.flash('Warning_msg');
    res.locals.Info_msg = req.flash('Info_msg');
    res.locals.Error_Form = req.flash('Error_Form');
    res.locals.Loading = req.flash('Loading');
    res.locals.user_info = req.user_info;

    next()
}
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true,
}
Handlebars.registerHelper('isLoadingEnabled', function (loadingValue) {
    // Check if loadingValue is equal to 'Loading is enabled!'
    if (loadingValue[0] === 'Loading is enabled!') {
        setTimeout(() => {
            // After 1 second, update the loading state to 'Loading is not enabled!'
            loadingValue[0] = 'Loading is not enabled!';
        }, 1000);
        return true; // Return a string indicating loading is enabled
    } else {
        return false // Return a string indicating loading is not enabled
    }
});
const sessionOption = session({
    secret: 'qscwdvefb', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: false,
})

Handlebars.registerHelper('saveUser', function (user) {

    global.user = user;

});

const ErrorHandelingMiddlewear = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!!!!';

    return res.status(500).json({
        Success: false,
        status: statusCode,
        message: errorMessage,
    });
}
module.exports = { globalStorage, corsOption, ErrorHandelingMiddlewear, sessionOption }