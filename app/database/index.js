require('dotenv').config()
const mongoose = require('mongoose')
require('dotenv').config()
const openConnection = async () => {
    await mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017/`, {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
}

module.exports = openConnection;

