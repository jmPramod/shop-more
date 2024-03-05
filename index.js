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
const swaggerUI=require("swagger-ui-express")
const swaggerJSDoc=require("swagger-jsdoc")
//It parses incoming request bodies
//!Middlewears

const corsOprion = {
  origin: '*',
  credential: true,
};
//swagger option
const swaggerOption={
definition:{
  openapi:"3.0.0",
  info:{
    title:"sample Api with swagger",
    version:"1.0.0",
    description:"A sample doc with swagger test 1"
  },
  servers:[{url:`http://localhost:${port}/`},{
    url:process.env.DEPLOYED_BE_BASE_URL
  }]
},
apis:["./routes/*.js"]

}
//server swagger ui
const swaggerSpec=swaggerJSDoc(swaggerOption)
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec))
app.use(cookies());
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secret key for session encryption
    resave: false,
    saveUninitialized: true,
  })
);
//middleware  to parse JSON data sent in req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//using session

// app.use(session({ secret: '' }));
//these two lines
app.engine('handlebars', engine()); //tells which template engine we have to use
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars'); //we can avoid putting .handlebars at the end of file
app.use(express.static(__dirname + '/public')); // to  tell server the static files (such as images, stylesheets, and scripts) are in  'public' folder
// app.use(function (req, res, next) {
//   res.locals.Success_msg = res.flash('Success_msg');
//   res.locals.Error_msg = res.flash('Error_msg');
//   res.locals.Warning_msg = res.flash('Warning_msg');
// });
//On PAGE LOAD we get this route

app.use(cors(corsOprion));
app.use('/', adminAuth);

//1.create a sign-up route(authentication) :URl/api/register
app.use('/', signUpRoute);

app.use('/', loginRoute);

app.use('/', productRoute);
app.use(function (req, res, next) {
  res.render('404Error');
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
