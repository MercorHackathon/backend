var mongoose = require('mongoose');
require('dotenv').config();
// Configures mongodb
const configDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
          useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log("Mongoose connected!")
    }
    catch(err) {
        console.error("Failed to connect to mongodb");
        throw err;
    }
}

module.exports = configDB;


