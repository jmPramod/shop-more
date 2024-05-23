const swaggerUI = require("swagger-ui-express")
const swaggerJSDoc = require("swagger-jsdoc")

require('dotenv').config();
const port = process.env.PORT;
const swaggerOption = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentation of E-commerce API",

            version: "1.0.0",
            description: "E-com product API with authentication ",
            contact: {
                name: "Shop More",
                url: "https://shop-more-fe.netlify.app/",


            }
        },
        components: {
            securitySchemes: {
                JWTAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            JWTAuth: []
        }],
        servers: [{ url: `http://localhost:${port}/`, description: " local host", }, {
            url: "https://shop-more.vercel.app", description: "base url of this project",
        }]
    },

    apis: ["./routes/REST/*.js"]

}

const CSS_URL =
    "https://unpkg.com/swagger-ui-dist/swagger-ui.css";

const swaggerSpec = swaggerJSDoc(swaggerOption)


module.exports = { swaggerSpec, CSS_URL }