var express = require('express')
const login = require('./routes/login')

const register = require('./routes/register')
const fitAuth = require('./routes/fitAuth')

const search = require('./routes/search');
var router = express.Router()


// Add routes here
router.post("/register", register);
router.get("/login", login)
router.get('/search', search)

module.exports = router