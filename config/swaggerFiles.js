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
            description: "A sample doc with swagger test 1",
            contact: {
                name: "Pramod",
                url: "pramod.com",
                email: "pramodjm4@gmail.com"

            }
        },
        servers: [{ url: `http://localhost:${port}/`, description: " local host", }, {
            url: "https://shopmore-theta.vercel.app", description: "base url of this project",
        }]
    },
    apis: ["./routes/REST/*.js"]

}

const CSS_URL =
    "https://unpkg.com/swagger-ui-dist/swagger-ui.css";

const swaggerSpec = swaggerJSDoc(swaggerOption)


module.exports = { swaggerSpec, CSS_URL }