const express = require('express');
const app = express();
require('dotenv').config(); //to import dot env file in index.js
const port = process.env.PORT;
const { engine } = require('express-handlebars');
const { adminAuth } = require('./routes/adminAuth');
const { connectMongooseDB } = require('./config/db.connect');
const { signUpRoute, loginRoute } = require('./routes/userAuth');
const { productRoute } = require('./routes/productRoute');
const cookies = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
var cors = require('cors');
const swaggerUI = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const corsOprion = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOprion));
const swaggerOption = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "sample Api with swagger",
      version: "1.0.0",
      description: "A sample doc with swagger test 1"
    },
    servers: [{ url: `http://localhost:${port}/` }, {
      url: process.env.DEPLOYED_BE_BASE_URL
    }]
  },
  apis: ["./routes/*.js"]

}
const swaggerSpec = swaggerJSDoc(swaggerOption)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, { customCssUrl: CSS_URL }))
app.use(cookies());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//using session

// app.use(session({ secret: '' }));
//these two lines
app.engine('handlebars', engine()); //tells which template engine we have to use
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars'); //we can avoid putting .handlebars at the end of file
app.use(express.static(__dirname + '/public')); // to  tell server the static files (such as images, stylesheets, and scripts) are in  'public' folder

//On PAGE LOAD we get this route

// app.use(cors(corsOptions));
// res.cookie("accessToken", accessToken, {
//   httpOnly: true,
//   secure: false,
//   sameSite: 'none',
//   maxAge: 15 * 60 * 1000,
// });
app.use(
  session({
    secret: 'qscwdvefb', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash())


app.use(function (req, res, next) {
  console.log('Flash messages:', req.flash());
  app.locals.Success_msg = req.flash('Success_msg');
  app.locals.Error_msg = req.flash('Error_msg');
  app.locals.Warning_msg = req.flash('Warning_msg');
  app.locals.Info_msg = req.flash('Info_msg');
  next()
});
app.use('/', adminAuth);

//1.create a sign-up route(authentication) :URl/api/register
app.use('/', signUpRoute);

app.use('/', loginRoute);

app.use('/', productRoute);
app.use(function (req, res, next) {
  req.flash('message', 'Welcome to Blog');
  res.render('404Error');
  req.flash('Success_msg', 'Success!!');
});
//! Error handing  middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!!!!';

  return res.status(500).json({
    Success: false,
    status: statusCode,
    message: errorMessage,
  });
});

//!server running
connectMongooseDB();
app.listen(port, () => {
  console.log(
    `Server is running on port http://localhost:${port}/back-end/login/ !!!`
  );
});
