const User = require('../models/User.js');

const register = (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    user.save((err) => {
        if(err)
            res.status(500).send({ status: 'fail' });
        else
            res.send({ status: 'success' });
    })
}

module.exports = register;