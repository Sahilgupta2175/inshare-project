require('dotenv').config()
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.ATLAS_MONGO_URL).then(() => {
        console.log("MongoDB Connected Successfully.");
    }).catch((err) => {
        console.log("MongoDB failed Connection.", err.message);
    });
}

module.exports = connectDB;