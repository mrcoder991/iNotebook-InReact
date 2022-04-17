const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongoURI,{ useNewUrlParser: true }, () => {
        console.log('connected to mongo')
    })
};

module.exports = connectToMongo;