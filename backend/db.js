const mongoose = require('mongoose')

const connectDB = (URI) => {
 console.log("Connected to mongo successfully")
return mongoose.connect(URI)
}

module.exports = connectDB