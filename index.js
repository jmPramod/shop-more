const express = require('express');
const app = express();
require('dotenv').config(); //to import dot env file in index.js
const port = process.env.PORT;
const { engine } = require('express-handlebars');
const { adminAuthHB } = require('./routes/HB/adminAuthHB');
const { connectMongooseDB } = require('./config/db.connect');
const { signUpRoute, loginRoute } = require('./routes/REST/userAuth');
const { productRoute } = require('./routes/REST/productRoute');
const cookies = require('cookie-parser');
const flash = require('connect-flash');
var cors = require('cors');
const swaggerUI = require("swagger-ui-express")
const { swaggerSpec, CSS_URL } = require('./config/swaggerFiles');
const { globalStorage, corsOption, sessionOption } = require('./config/optionsHelper');



app.use(cors(corsOption));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, { customCssUrl: CSS_URL }))
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(sessionOption);
app.use(flash())
app.use(globalStorage);
//Handlebars route
app.use('/', adminAuthHB);

//REST API routes

app.use('/', signUpRoute);
app.use('/', loginRoute);
app.use('/', productRoute);
//404 page for handlebars
app.get('*', function (req, res) {
  res.status(404).render("404Error")
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
    `Server is running on port http://localhost:${port}/login/ !!!`
  );
});
