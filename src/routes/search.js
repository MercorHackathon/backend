function search(req, res) {
    const username = req.query.username;
    console.log(username);
    res.send(['Anish', 'Rohan', 'Pranav'])
}

module.exports = search;