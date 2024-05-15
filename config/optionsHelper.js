
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
    res.locals.user_info_1 = req.session.user_info_1;
    next()
}
const corsOption = {
    origin: [
        'https://mern1-wine.vercel.app',
        'https://shopmore-nextjs.netlify.app/',
        'http://localhost:3000'],
    credentials: true,
}
Handlebars.registerHelper('isLoadingEnabled', function (loadingValue) {
    if (loadingValue[0] === 'true') {
        setTimeout(() => {
            loadingValue[0] = 'false';
        }, 1000);
        return true;
    } else {
        return false
    }
});
const sessionOption = session({
    secret: 'qscwdvefb', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: false,
})

const handelbarIfHelper = Handlebars.registerHelper('eq', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
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
module.exports = { globalStorage, handelbarIfHelper, corsOption, ErrorHandelingMiddlewear, sessionOption }