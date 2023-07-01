const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const saltRounds = 10;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

// Hash the password before saving
userSchema.pre("save", (next) => {
    if(this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(document.password, saltRounds, (err, hash) => {
            if (err)
                next(err);
            else {
                document.password = hash;
                next();
            }
        })
    }
    else 
        next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;