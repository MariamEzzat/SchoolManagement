const express = require("express")
const app = express()
require('dotenv').config()
const connectDB = require("./db");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpec = require('./swagger');

const PORT = process.env.PORT_NUMBER;
const route = require("./Auth/Route")
app.use("/apiDoc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json())
app.use("/management", route)


//Connecting the Database
connectDB();
app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))
