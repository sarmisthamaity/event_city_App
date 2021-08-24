require('dotenv').config();
const mongoose = require('mongoose');
const mongoUrl = "mongodb+srv://Sarmi:Sarmi@1434@cluster0.h5aoy.mongodb.net/cityEvent?retryWrites=true&w=majority";

mongoose.connect(mongoUrl, ({
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})).then(() => {
    console.log(`database connected succesfully! `);
}).catch((err) => {
    console.log(`not connected`, err);
});