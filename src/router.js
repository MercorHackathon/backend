var express = require('express')
const login = require('./routes/login')
const register = require('./routes/register')
const search = require('./routes/search');
const twitterAPI = require('./routes/twitterAPI');
const huggingFaceAPI = require('./routes/huggingfaceAPI');
var router = express.Router()


// Add routes here
router.post("/register", register);
router.get("/login", login)
router.get('/search', search)
router.get('/twitter', twitterAPI)

// Test route (remove later)
router.get('/huggingface', async (req, res) => {
    const data = await huggingFaceAPI("Im sad");
    res.send(data)
})
module.exports = router