const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://admin:zKWnWCD3iZvKTJm@cluster0.vhnw9.mongodb.net/inotebook?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('connected to mongo')
    })
};

module.exports = connectToMongo;