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
            url: process.env.DEPLOYED_BE_BASE_URL, description: "base url for group ",
        }, , {
            url: "https://mern1-wine.vercel.app", description: "base url of this project-MERN",
        }]
    },
    apis: ["./routes/REST/*.js"]

}

const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const swaggerSpec = swaggerJSDoc(swaggerOption)


module.exports = { swaggerSpec, CSS_URL }