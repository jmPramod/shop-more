const express = require("express");
const app = express();
const flash = require("connect-flash");
var cors = require("cors");
const cookies = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const hbs = require("express-handlebars");
const helmet = require("helmet");

const exphbs = require("express-handlebars");
const {
  SwaggerUIBundle,
  SwaggerUIStandalonePreset,
} = require("swagger-ui-dist");

require("dotenv").config(); //to import dot env file in index.js

const port = process.env.PORT;
const {
  globalStorage,
  corsOption,
  sessionOption,
  handelbarIfHelper,
} = require("./config/optionsHelper"); //don't remove this important line it gives error after hosting
const { connectMongooseDB } = require("./config/db.connect");
const { swaggerSpec, CSS_URL } = require("./config/swaggerFiles");
const { adminAuthHB } = require("./routes/HB/adminAuthHB");
const { authRoute } = require("./routes/REST/userAuth");
const { productRouteRest } = require("./routes/REST/productRoute");
const { productRouteHB } = require("./routes/HB/productRoutesHB");
const { paymentRouteRest } = require("./routes/REST/paymentRoutes");

// handelbarIfHelper
// app.use(cors(corsOption));
const createServer = () => {
  app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, { customCssUrl: CSS_URL })
  );
  // app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument, { customCssUrl: CSS_URL }));//rohit solution
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
  app.engine("handlebars", hbs.engine);
  app.set("views", __dirname + "/views");
  app.set("view engine", "handlebars");
  app.use(express.static(__dirname + "/public"));
  app.use(flash());
  app.use(globalStorage);
  //----------------------------------------------------
  // Configure Helmet for security headers
  // Configure Helmet for security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", "'unsafe-inline'",],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'", 
            "https://www.gstatic.com", // Allow Google Charts
            "https://cdnjs.cloudflare.com", // Allow CDNJS (for Font Awesome, Chart.js, etc.)
            "https://cdn.jsdelivr.net", // Allow JSDelivr for Bootstrap, GSAP, etc.
            
          ], // Example for specific script sources
          styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", // Allow external styles like Font Awesome
            "https://cdn.jsdelivr.net", // Allow Bootstrap from JSDelivr
            "https://fonts.googleapis.com", // Allow Google Fonts
            "https://www.gstatic.com",// Allow Google Charts CDN
        ],
          imgSrc: ["'self'", "data:", "https://raw.githubusercontent.com", "https://cdn.dribbble.com",   "https://res.cloudinary.com", 
          ],
          connectSrc: ["'self'"], // Restrict to same-origin requests (you can adjust if using APIs)
          objectSrc: ["'none'"], // Disallow objects and embeds
        },
      },
      frameguard: { action: "deny" }, // Sets X-Frame-Options to DENY
      hsts: {
        maxAge: 31536000, // One year in seconds
        includeSubDomains: true, // Include subdomains
        preload: true,
      },
    })
  );

  //----------------------------------------------------
  app.use(
    cors({
      origin: ["https://shop-more-fe.netlify.app", "http://localhost:3000"],
      credentials: true,
    })
  );
  // Handle preflight requests
  app.options("*", cors());
  //---------------------------------------------------
  app.use("/", adminAuthHB);

  //REST API routes
  app.use("/", authRoute);
  app.use("/", productRouteRest);
  app.use("/", productRouteHB);
  app.use("/", paymentRouteRest);
  //404 page for handlebars
  app.get("*", function (req, res) {
    res.status(404).render("404Error");
  });
  //! Error handing  middleware
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Something went wrong!!!!";

    return res.status(statusCode).json({
      data: null,
      Success: false,
      statusCode: statusCode,
      message: errorMessage,
      stacks: err.stack,
    });
  });
  return app;
};

module.exports = { app, createServer };
