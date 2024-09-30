
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const indexRouter= require("./routes/indexRoute.js")


app.use("/", indexRouter)



const PORT = process.env.PORT || 8444


// server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})












