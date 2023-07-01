const bcrypt = require('bcrypt')
const User = require('../models/User.js');

const register = async (req, res) => {
    const rounds = 10;
    const { username, password: plaintext_password } = req.body;
    const password = await bcrypt.hash(plaintext_password, rounds);
    const user = new User({ username, password });
    try {
        const data = await user.save();
        res.send(data)
    }
    catch(err) {
        console.error(err);
        res.status(500).send("Internal server error")
    }
}

module.exports = register;