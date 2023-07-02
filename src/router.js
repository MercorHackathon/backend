var express = require('express')
const jwt = require('jsonwebtoken')
const login = require('./routes/login')
const register = require('./routes/register')
const search = require('./routes/search');
const huggingFaceAPI = require('./routes/huggingfaceAPI');
const getMentalHealthData = require('./routes/getMentalHealthData');
const linkTwitterAccount = require('./routes/linkTwitterAccount');
const User = require('./models/User');
const updateMentalHealthData = require('./routes/updateMentalHealthData');
const Phealth = require('./routes/Phealth')

var router = express.Router()

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error(err)
            return res.sendStatus(403)
        }

        req.user = user
        next()
    })
}

// Add routes here
router.post("/register", register);
router.post("/login", login)
router.get('/search', authenticateToken, search)

router.get('/updateMentalHealthData', updateMentalHealthData)
router.get('/getMentalHealthData', authenticateToken, getMentalHealthData)
router.post('/linkTwitterAccount', authenticateToken, linkTwitterAccount)

// router.get('/twitter', twitterAPI)
// router.get('/mental-health-data', mentalHealthData)
router.get('/Phealth',Phealth)


// Test routes (remove later)
router.get('/huggingface', async (req, res) => {
    const data = await huggingFaceAPI("Im sad");
    res.send(data)
})

router.get("/addDummy", async (req, res) => {
    try {
        const username = req.query.username;
        const user_datapoints = [
            {
                date: "25-06-2023",
                m_health_score: 43,
            },
            {
                date: "26-06-2023",
                m_health_score: 34,
            },
            {
                date: "27-06-2023",
                m_health_score: 56,
            },
            {
                date: "28-06-2023",
                m_health_score: -20,
            },
            {
                date: "29-06-2023",
                m_health_score: -54,
            },
            {
                date: "30-06-2023",
                m_health_score: 3,
            },
            {
                date: "01-07-2023",
                m_health_score: 43,
            }
        ]
    
        const global_datapoints = [
            {
                date: "25-07-2023",
                m_health_score: 30,
            },
            {
                date: "26-06-2023",
                m_health_score: 32,
            },
            {
                date: "27-06-2023",
                m_health_score: 43,
            },
            {
                date: "28-06-2023",
                m_health_score: 0,
            },
            {
                date: "29-06-2023",
                m_health_score: -34,
            },
            {
                date: "30-06-2023",
                m_health_score: -10,
            },
            {
                date: "01-07-2023",
                m_health_score: 24,
            }
        ]
    
        const new_data = await User.findOneAndUpdate({username: username}, {mental_health_data: { user_data: user_datapoints, global_data: global_datapoints}}, {new: true})
        res.send(new_data)
    }
    catch(err) {
        console.error(err);
        res.send(500);
    }
})
module.exports = router