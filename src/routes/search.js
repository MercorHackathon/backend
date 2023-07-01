const User = require("../models/User");

async function search(req, res) {
    const username = req.query.username;
    const data = await User.find({username: {$regex: `${username}.*`}}).select({username: 1, _id: 0}).lean().exec()
    res.send(data)
}

module.exports = search;