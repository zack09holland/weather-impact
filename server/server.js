require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// use body parser to get data from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use API routes from the api folder
const apis = require("./api");
app.use("/api", apis);
app.use(express.static(path.join(__dirname, '../client/src/assets/data')));

// Connect to Mongo
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))


app.listen(port, () => console.log(`Listening on port ${port}`));