require('dotenv').config()
const mongoose = require('mongoose')

const openConnection = async () => {
    await mongoose.connect('mongodb://root:41567@localhost:27017/', {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
}

module.exports = openConnection;

