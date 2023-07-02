const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET)
}

const login = async (req, res) => {
    const { username, password : plaintext_password } = req.body;
    const user_creds = await User.findOne({ username: username }).select({ username: 1, password: 1}).lean().exec()
    // const hash = await bcrypt.hash(plaintext_password);
    if(user_creds != null && await bcrypt.compare(plaintext_password, user_creds.password)) {
        const token = generateAccessToken(username);
        res.send({
            status: 'success',
            token: token
        })
    }
    else {
        res.send({
            status: 'failure',
        })
    }
}

module.exports = login;