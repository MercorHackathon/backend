const User = require('../models/User.js');

const register = (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    
}

module.exports = register;