const express = require('express');
const app = express();
const flash = require('connect-flash');
var cors = require('cors');
const cookies = require('cookie-parser');
const swaggerUI = require("swagger-ui-express")
const hbs = require('express-handlebars');

const exphbs = require('express-handlebars');
const { SwaggerUIBundle, SwaggerUIStandalonePreset } = require('swagger-ui-dist');

require('dotenv').config(); //to import dot env file in index.js

const port = process.env.PORT;
const { globalStorage, corsOption, sessionOption, handelbarIfHelper } = require('./config/optionsHelper');//don't remove this important line it gives error after hosting 
const { connectMongooseDB } = require('./config/db.connect');
const { swaggerSpec, CSS_URL } = require('./config/swaggerFiles');
const { adminAuthHB } = require('./routes/HB/adminAuthHB');
const { authRoute } = require('./routes/REST/userAuth');
const { productRouteRest } = require('./routes/REST/productRoute');
const { productRouteHB } = require('./routes/HB/productRoutesHB');
const { paymentRouteRest } = require('./routes/REST/paymentRoutes');


// handelbarIfHelper
// app.use(cors(corsOption));
const createServer = () => {

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, { customCssUrl: CSS_URL }))
    app.use(cookies());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(sessionOption);
    // Set up Handlebars with custom helpers
    const hbs = exphbs.create({
        helpers: {
            json: function (context) {
                return JSON.stringify(context);
            },
        },
    });
    app.engine('handlebars', hbs.engine);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');
    app.use(express.static(__dirname + '/public'));
    app.use(flash())
    app.use(globalStorage);
    //----------------------------------------------------
    app.use(cors({
        // origin: ["https://shop-more.vercel.app", "http://localhost:3000", "https://shop-more-fe.netlify.app"],
        origin: "https://shop-more-fe.netlify.app/",
        credentials: true,
    }))
    //---------------------------------------------------
    app.use('/', adminAuthHB);

    //REST API routes
    app.use('/', authRoute);
    app.use('/', productRouteRest);
    app.use('/', productRouteHB);
    app.use("/", paymentRouteRest)
    //404 page for handlebars
    app.get('*', function (req, res) {
        res.status(404).render("404Error")
    });
    //! Error handing  middleware
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const errorMessage = err.message || 'Something went wrong!!!!';

        return res.status(statusCode).json({
            data: null,
            Success: false,
            statusCode: statusCode,
            message: errorMessage,
            stacks: err.stack,
        });
    });
    return app
}

module.exports = { app, createServer }
