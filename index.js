const express = require("express")
const app = express()
const PORT = 3000
const connectDB = require("./config/connect/db");

//Connecting the Database
connectDB();
app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))