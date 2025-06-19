// create instance of mongoose
const mongoose = require('mongoose');

// load config of .env file
require('dotenv').config();

// function for connect db and express app
const connectDB = () => {

    mongoose.connect(process.env.MONGO_URI,{dbName:"SpeakVerse"})
    .then(() => {console.log("Connected With MongoDB");})
    .catch((error) => {
        console.log(error.message)
        process.exit(1);
    });

};

// export db connection function
module.exports = connectDB;