const express = require('express');
const app = express();
require('dotenv').config(); //to import dot env file in index.js
const port = process.env.PORT;
const { engine } = require('express-handlebars');
const { adminAuthHB } = require('./routes/HB/adminAuthHB');
const { connectMongooseDB } = require('./config/db.connect');
const { authRoute } = require('./routes/REST/userAuth');
const { productRouteRest } = require('./routes/REST/productRoute');
const cookies = require('cookie-parser');
const flash = require('connect-flash');
var cors = require('cors');
const swaggerUI = require("swagger-ui-express")
const { swaggerSpec, CSS_URL } = require('./config/swaggerFiles');
const { globalStorage, corsOption, sessionOption, handelbarIfHelper } = require('./config/optionsHelper');//don't remove this important line it gives error after hosting 
const { SwaggerUIBundle, SwaggerUIStandalonePreset } = require('swagger-ui-dist');
const { productRouteHB } = require('./routes/HB/productRoutesHB');

// handelbarIfHelper
// app.use(cors(corsOption));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, { customCssUrl: CSS_URL }))
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionOption);
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(flash())
app.use(globalStorage);
//Handlebars route
app.options('*', cors())
app.use('/', adminAuthHB);

//REST API routes
app.use('/', authRoute);
app.use('/', productRouteRest);
app.use('/', productRouteHB);
//404 page for handlebars
app.get('*', function (req, res) {
  res.status(404).render("404Error")
});
//! Error handing  middleware
app.use((err, req, res, next) => {
  // con  sole.log("err", err);
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!!!!';

  return res.status(500).json({
    Success: false,
    status: statusCode,
    message: errorMessage,
    stacks: err.stack,
  });
});

//!server running
connectMongooseDB();
app.listen(port, () => {
  console.log(
    `Server is running on port http://localhost:${port}/login/ !!!`
  );
});
