var express = require('express')
const login = require('./routes/login')
const register = require('./routes/register')
const search = require('./routes/search');
const twitterAPI = require('./routes/twitterAPI');
const huggingFaceAPI = require('./routes/huggingfaceAPI');
const mentalHealthData = require('./routes/mentalHealthData');
const Phealth = require('./routes/Phealth')
var router = express.Router()


// Add routes here
router.post("/register", register);
router.get("/login", login)
router.get('/search', search)
router.get('/twitter', twitterAPI)
router.get('/mental-health-data', mentalHealthData)
router.get('/Phealth',Phealth)

// Test route (remove later)
router.get('/huggingface', async (req, res) => {
    const data = await huggingFaceAPI("Im sad");
    res.send(data)
})
module.exports = router