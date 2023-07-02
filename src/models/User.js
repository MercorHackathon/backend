const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    Phealth:{
        type:Object
    },
    Mhealth:{
        type:Object
    }
})



const User = mongoose.model("User", userSchema);

module.exports = User;