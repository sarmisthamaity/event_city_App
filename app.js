const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());

const conneect = require('./connection/connect');

const route = require('./routes/index');

app.use('/', route);

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log(`server is working on port ${ process.env.PORT }`);
});