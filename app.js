const express = require('express');
const app = express();
require('dotenv').config();
// const morgan = require('morgan')
app.use(express.json());

const conneect = require('./connection/connect');
// app.use(morgan);

const route = require('./routes/index');

app.use('/', route);


module.exports = app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${ process.env.PORT }`);
});