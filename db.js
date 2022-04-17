const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI

const connectToMongo = () => {
    mongoose.connect(mongoURI,{ useNewUrlParser: true }, () => {
        console.log('connected to mongo')
    })
};

module.exports = connectToMongo;